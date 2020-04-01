const socket = io();

const m = document.getElementById('message');

socket.emit("room", room);

socket.on("welcome", data => {
  console.log(data);
})

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit("new-message", m.value);
})

socket.on("send-message", data => {
  console.log(data);
})
