const socket = io();

const messageContainer = document.getElementById('message-container');

const m = document.getElementById('message');

socket.emit("room", room);

socket.on("welcome", data => {
  console.log(data);
})

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit("new-message", m.value);

  const span = document.createElement('span');
  span.className = "chat-message__list chat-message__list--right";
  span.textContent = m.value;
  messageContainer.append(span);
  m.value = '';
})

socket.on("send-message", data => {
  const span = document.createElement('span');
  span.className = "chat-message__list chat-message__list--left";
  span.textContent = data;
  messageContainer.append(span);
})
