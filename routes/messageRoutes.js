const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require('../controllers/messageController');

router.route('/')
  .post(sendMessage)
  .get(getMessages);

router.route('/:id')
  .delete(deleteMessage);

module.exports = router;
