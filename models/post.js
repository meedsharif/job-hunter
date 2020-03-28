var mongoose = require('mongoose');

var User = mongoose.model('User');

var PostSchema = new mongoose.Schema({
    body: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
}, {timestamps: true});
