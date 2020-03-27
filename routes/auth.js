const express = require('express');
const loginController = require('../controller/auth');

const router = express.Router();

const { getSignupPage, getLoginPage, getLogoutPage } = loginController;

// Signup
router.get('/signup', getSignupPage);

// Login
router.get('/login', getLoginPage);


module.exports = router;