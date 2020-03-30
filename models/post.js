var mongoose = require('mongoose');

var User = require('../models/User');

var PostSchema = mongoose.Schema({
    body: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
},{timestamps: true});

module.exports = mongoose.model('Post', PostSchema);
