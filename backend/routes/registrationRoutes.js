const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');


router.post('/', registrationController.registerForEvent);


router.get('/check', registrationController.checkRegistration);


router.delete('/cancel', registrationController.cancelRegistration);


router.get('/upcoming-events', registrationController.getUpcomingRegisteredEvents);


router.get('/test', (req, res) => {
    res.send('Test route is working!');
});

module.exports = router;
