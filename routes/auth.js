const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

const { getSignupPage, getLoginPage, createUser, loginUser } = authController;

// Signup
router.get('/signup', getSignupPage);

router.post('/create-user', createUser)

// Login
router.get('/login', getLoginPage);

router.post('/login-user', loginUser)

module.exports = router;