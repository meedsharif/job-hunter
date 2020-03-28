const express = require('express');
const { check } = require('express-validator');

const User = require('../models/User');
const authController = require('../controller/auth');

const router = express.Router();

const {
	getSignupPage,
	getLoginPage,
	createUser,
	loginUser,
	logoutUser
} = authController;

// Signup
router.get('/signup', getSignupPage);
router.post(
	'/create-user',
	[
		check('name', 'Name cannot be empty').notEmpty(),
		check('password', 'Password must be atleast 8 characters long')
			.isLength({ min: 8 })
			.custom((password, { req }) => {
				if (password !== req.body.confirmpassword) {
					throw new Error('Passwords have to match');
				}
				return true;
      }),
		check('email', 'Not a valid email').isEmail().normalizeEmail().custom(async emailInput => {
			const user = await User.findOne({ email: emailInput });
			if(user) {
				return Promise.reject('User with this email already exists');
			}
		}),
		check('date_of_birth', 'Enter a valid date'),
		check('country', 'Enter the name of your country').notEmpty(),
		check('city', 'Enter the name of your city').notEmpty(),
		check('experience', 'Enter your work experience. \'0\' if you have not worked professionally').notEmpty(),
		check('role', 'Role field cannot be empty').notEmpty(),
		check('bio', 'Tell us about yourself').notEmpty().isLength({ min: 10 }),
	],
	createUser
);

// Login
router.get('/login', getLoginPage);
router.post('/login-user', loginUser);

// Logout
router.post('/logout', logoutUser);

module.exports = router;
