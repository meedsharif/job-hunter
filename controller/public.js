const cleanDeep = require('clean-deep');
const User = require('../models/User');

exports.getHomePage = (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;
  let username = "Anonymous";
  if (isLoggedIn) {
    username = req.session.user.name;
  }
  res.render('index', { username });
}

exports.showAllUsers = async(req, res) => {
  try {
    lists = req.query;
    const users = await User.find(cleanDeep(lists));
    res.render('users', { users });
  } catch (error) {
    console.log(error)
  }
}

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    // const posts = await post.find({ author: user._id });
    // console.log(posts);
    res.render('profile', { user })
  } catch (error) {
    console.log(error);
  }
}