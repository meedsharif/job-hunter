var mongoose = require('mongoose');
var router = require('express').Router();
var post = require('../models/post')
var user = require('../models/User')
var auth = require('../controller/auth');

router.get('/post', (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn) {
        res.render('post')
    };
});

router.post('/redirect', function (req, res) {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn) {
    var newPost = post({
        body: req.body.body,
        author: req.session.user._id
    });
    newPost.save(function (err, result) {
        res.redirect('/show_post');
    });
};
});

router.get('/show_post', async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn) {
	try{
        const userId = req.session.user._id;
		const posts = await post.find().populate('author', 'name');
	res.render('show_post', { posts , userid : userId})
	} catch(err) {
		console.log(err);
    }
};
});

router.post('/edit', function (req, res) {
        res.redirect('/');
});


module.exports = router;