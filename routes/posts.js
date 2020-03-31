var router = require('express').Router();
var post = require('../models/post')

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
            author: req.session.user.id
        });

        newPost.save(function (err, result) {
            res.redirect('/show_post');
        });
    };
});

router.get('/show_post', async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn) {
        try {
            const userId = req.session.user.id;
            const posts = await post.find().populate('author', 'name');
            res.render('show_post', { posts, userid: userId })
        } catch (err) {
            console.log(err);
        }
    };
});

router.post('/delete/:id', async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn) {
    try {
        await post.deleteOne({ _id: req.params.id })

        res.redirect('/show_post');
    } catch (err) {
        console.log(err);
    }
};
})

router.get('/edit/:id', async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn) {
    try {
        var postDoc = await post.findById(req.params.id)
        res.render('update_post', { post: postDoc });
    } catch (err) {
        console.log(err)
    }
}
})

router.post('/updated/:id', async(req,res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn) {
    try {
        await post.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/show_post');
    } catch (err) {
        console.log(err);
    }
};
})


module.exports = router;