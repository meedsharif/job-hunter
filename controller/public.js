const cleanDeep = require('clean-deep');
const User = require('../models/User');
const post = require('../models/post');

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


    res.render('profile', { user, posts })
  } catch (error) {
    console.log(error);
  }
}