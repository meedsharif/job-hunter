const mongoose = require('mongoose');

const privateChatSchema = mongoose.Schema({
  user1: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  messages: [
    {
      senderId: String,
      message: String
    }
  ]
});

module.exports = mongoose.model('PrivateChat', privateChatSchema);
