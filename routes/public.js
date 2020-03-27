const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
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
