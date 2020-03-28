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

router.get('/investors', (req, res) => {
  res.render('investors');
});

router.get('/employee', (req, res) => {
  res.render('employee');
});

router.get('/partner', (req, res) => {
  res.render('partner');
});

module.exports = router;
