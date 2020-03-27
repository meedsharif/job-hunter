const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  address: {
    city: {
      type: String,
      required: true
    },
    state: String,
    country: {
      type: String,
      required: true
    }
  },
  category: {
    type: String,
    required: true    
  },
  bio: {
    type: String,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  work_experience: Number,
  role: String
})

module.exports = mongoose.model('User', userSchema);