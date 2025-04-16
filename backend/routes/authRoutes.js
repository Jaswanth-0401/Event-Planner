const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginUser);
router.post('/register-student', authController.registerStudent);
router.post('/register-organizer', authController.registerOrganizer);

module.exports = router;
