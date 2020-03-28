const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.getLoginPage = (req, res) => {
	if(req.session.isLoggedIn) return res.redirect('/');

	res.render('auth/login');
};

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) return res.redirect('/auth/login');

		const passwordMatched = await bcrypt.compare(password, user.password);
		if (!passwordMatched) {
			res.redirect('/auth/login');
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
	if(req.session.isLoggedIn) return res.redirect('/');
	
	res.render('auth/signup');
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

	try {
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

		res.redirect('/');
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
