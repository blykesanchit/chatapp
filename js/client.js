const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");
const messageInp = document.getElementById("messageInp");
const btn = document.getElementById("btn");
const messageContainer = document.querySelector(".container");

const msgSound = new Audio("../tiRng.mp3");

function append(msg, pos) {
    const newMsg = document.createElement("div");
    newMsg.innerHTML = msg;
    newMsg.classList.add('message');
    newMsg.classList.add(pos);
    messageContainer.append(newMsg);
    if (pos == 'left') {
        msgSound.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newMessage = messageInp.value;
    append(`You: ${newMessage}`, 'right');
    socket.emit('send', newMessage);
    messageInp.value = '';
})

const name = prompt("Enter you name to join : ");
socket.emit('new-user-joined', name);
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.message}: ${data.name}`, 'left');
});

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
});