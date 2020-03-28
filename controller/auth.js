const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const User = require('../models/User');

exports.getLoginPage = (req, res) => {
	if(req.session.isLoggedIn) return res.redirect('/');

	res.render('auth/login', {errorMessage: ''});
};

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(422).render('auth/login', {
				errorMessage: "User does not exist"
			})
		};

		const passwordMatched = await bcrypt.compare(password, user.password);
		if (!passwordMatched) {
			return res.status(422).render('auth/login', {
				errorMessage: "Invalid password"
			})
		}

		req.session.isLoggedIn = true;
		req.session.user = { name: user.name, email: user.email };

		req.session.save(err => {
			if (err) return console.log(err);
			res.redirect('/');
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getSignupPage = (req, res) => {
	let error = req.flash('error');
	if (error.length > 0) {
		error = error[0];
	} else {
		error = null;
	}

	if(req.session.isLoggedIn) return res.redirect('/');

	res.render('auth/signup', { errorMessage: error });
};

exports.createUser = async (req, res) => {
	const {
		name,
		password,
		email,
		phone,
		date_of_birth,
		country,
		state,
		city,
		category,
		bio,
		gender,
		experience,
		role
	} = req.body;

	const errors = validationResult(req);

	try {
		if(!errors.isEmpty()) {
			return res.status(422).render('auth/signup', {
					errorMessage: errors.array()[0].msg
			});			
		}


		const hashedPW = await bcrypt.hash(password, 12);
		const user = User({
			name,
			password: hashedPW,
			email,
			phone,
			address: { city, state, country },
			category,
			bio,
			gender,
			date_of_birth,
			work_experience: experience,
			role
		});

		await user.save();

		res.status(422).render('auth/login', {
			errorMessage: "Account created. you can login to your account."
		})
	} catch (error) {
		console.log(error);
	}
};

exports.logoutUser = (req, res, next) => {
	req.session.destroy(err => {
		if (err) return console.log(err);
		res.redirect('/');
	});
}
