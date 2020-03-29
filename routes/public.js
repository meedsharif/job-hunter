const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const user = require('../models/User')

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

router.get('/profile/:name', function (req, res){
  user.find({name:req.params.name}, function(err,docs) {
    if(err) res.json(err);
    else    res.render('profile',{user: docs[0]});
  });
});

module.exports = router;
