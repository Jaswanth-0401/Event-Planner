const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventsController');

router.get('/', eventController.getEvents);

router.post('/add', eventController.createEvent);

router.get('/registration/events', async (req, res) => {
    const studentId = req.query.student_id;
  
    try {
      const query = `
        SELECT events.* 
        FROM events
        JOIN registrations ON events.event_id = registrations.event_id
        WHERE registrations.student_id = ?;
      `;
      const [events] = await db.execute(query, [studentId]);
  
      res.json({ events });
    } catch (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ message: 'Error fetching events' });
    }
});

module.exports = router;
