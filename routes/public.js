const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const isLoggedIn = req.session.isLoggedIn;
  let username = "Anonymous";
  if (isLoggedIn) {
    username = req.session.user.name;
  }
  res.render('index', { username });
})

module.exports = router;