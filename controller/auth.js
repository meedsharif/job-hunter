exports.getLoginPage = (req, res) => {
    res.render('auth/login');
}

exports.getSignupPage = (req, res) => {
    res.render('auth/signup');
}