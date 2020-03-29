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

exports.getUserProfile = function (req, res){
  User.find({name:req.params.name}, function(err,docs) {
    if(err) res.json(err);
    else    res.render('profile',{user: docs[0]});
  });
}