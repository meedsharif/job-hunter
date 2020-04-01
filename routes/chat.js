const express = require('express');
const router = express.Router();

const chatController = require('../controller/chat');

const { getPrivateChatPage } = chatController;

router.get('/:id', getPrivateChatPage);

module.exports = router;