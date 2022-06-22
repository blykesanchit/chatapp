// node server which will handle socket io connection

const {
    socket
} = require("socket.io");

// port 8000
// const io = require("socket.io")(8000);
// io.origins('*:*');
// io.set('origins', '*:*');
// const io = require('socket.io')(8000, { origins: '*:*'});
const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});

// const io = require("socket.io")(httpServer, {
//     cors: {
//         origin: "https://example.com",
//         methods: ["GET", "POST"],
//         allowedHeaders: ["my-custom-header"],
//         credentials: true
//     }
// });

// const io = require("socket.io")(httpServer, {
//     cors: {
//         origin: "http://localhost:8000",
//         methods: ["GET", "POST"]
//     }
// });
// const io = require('socket.io')(server, {
//     cors: {
//         origin: '*',
//     }
// });

// httpServer.listen(8000);

// httpServer.listen(3000);

// httpServer.listen(8000);

const users = {};

// io refers to whole server and on means listen to all events. inside it, we mention different events

io.on('connection', socket => {

    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        console.log("new user", name);

        socket.broadcast.emit('user-joined', name);
        //name is sent to whoever receives it
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        });
    })
})