const User = require('../models/User');
const PrivateChat = require('../models/PrivateChat');

module.exports = io => {
  io.on('connection', socket => {
    // console.log(socket.handshake.session.user)
    let room;
    socket.on('room', data => {
      room = data;
      socket.join(data);
      socket.to(data).emit('welcome', 'WELCOME');
    });
    
    socket.on("new-message", async data => {
      try {
        const pChat = await PrivateChat.findById(room);
        pChat.messages.push({
          message: data,
          senderId: socket.handshake.session.user.id
        })
  
        await pChat.save();
  
        socket.to(room).emit("send-message", data);
      } catch (error) {
        console.log(error)
      }
    })
  })

}