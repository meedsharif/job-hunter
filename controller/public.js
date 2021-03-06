const cleanDeep = require('clean-deep');
const User = require('../models/User');
const post = require('../models/post');

exports.getHomePage = async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;
  let username = "Anonymous";
  if (isLoggedIn) {
    try {
      username = req.session.user.name;
      const posts = await post.find().populate('author', 'name');
      res.render('index', { username, posts });
    } catch{
      console.log(err);
    }
  }else {
    res.redirect('/auth/login')
  }
};

exports.showAllUsers = async (req, res) => {
  try {
    lists = req.query;
    let users = await User.find(cleanDeep(lists));
    // Remove current user from the list
    users = users.filter(u => {
      return u._id.toString() !== req.session.user.id.toString();
    })
    res.render('users', { users });
  } catch (error) {
    console.log(error)
  }
}

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await User.findById(req.params.id);
    let posts = await post.find({ author: user._id }).populate('author', 'name');

    let months = [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
    ];

    posts.forEach(post => {

      let date = new Date(post.createdAt);

      post['formattedDate'] = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    })


    res.render('profile', { user, posts, userid: userId })
  } catch (error) {
    console.log(error);
  }
}