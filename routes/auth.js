const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

const { getSignupPage, getLoginPage, createUser, loginUser, logoutUser } = authController;

// Signup
router.get('/signup', getSignupPage);
router.post('/create-user', createUser)

// Login
router.get('/login', getLoginPage);
router.post('/login-user', loginUser);

// Logout
router.post('/logout', logoutUser);

module.exports = router;