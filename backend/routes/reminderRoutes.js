const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

router.get('/user', reminderController.getRemindersByUser);

module.exports = router;
