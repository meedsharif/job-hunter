const express = require('express');
const router = express.Router();

const publicController = require('../controller/public');

const { getHomePage, showAllUsers, getUserProfile } = publicController;

router.get('/', getHomePage)

router.get('/users', showAllUsers);

router.get('/profile/:id', getUserProfile);

module.exports = router;
