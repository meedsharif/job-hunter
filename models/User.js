const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    thumbnail: String,
    mobile: String,
    desktop: String
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  chat: [
    {
      userId: String,
      roomId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'PrivateChat' 
      }
    }
  ],
  socketID: String,
  phone: String,
  city: {
    type: String,
    required: true
  },
  state: String,
  country: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true    
  },
  bio: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  work_experience: Number,
  role: String
},  { timestamps: true })

module.exports = mongoose.model('User', userSchema);