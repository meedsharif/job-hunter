var mongoose = require('mongoose');
var router = require('express').Router();
var post = mongoose.model('post');
var User = mongoose.model('User');
var auth = require('controller/auth');

router.post('/', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}        
        var post = new post(req.body.post);
        post.author = user;
        return post.save().then(function(){
            return res.json({post: post.toJSONFor(user)})
        });
    }).catch(next);
});

router.put('/:post', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(req.post.author._id.toString() === req.payload.id.toString()){
            if(typeof req.body.post.body !== 'undefined'){
                req.post.body = req.body.post.body;
            }            return req.post.save().then(function(){
                return res.json({post: req.post.toJSONFor(user)});
            });
        } else {
            return res.sendStatus(403);
        }
    }).catch(next);
});

router.delete('/:post', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(req.post.author._id.toString() === req.payload.id.toString()){
            req.post.remove().then(function(){
                return res.sendStatus(204);
            });
        } else {
            return res.sendStatus(403);
        }
    }).catch(next);
});

module.exports = router;