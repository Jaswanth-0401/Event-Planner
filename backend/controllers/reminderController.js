const db = require('../config/db');

exports.getRemindersByUser = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const [rows] = await db.promise().query(
      `SELECT 
         r.reminder_id,
         r.reminder_time,
         e.event_id,
         e.title,
         e.date,
         e.time,
         e.location,
         e.description,
         o.name AS organizerName
       FROM reminder r
       JOIN event e ON r.event_id = e.event_id
       JOIN organizer o ON e.organizer_id = o.organizer_id
       WHERE r.user_id = ?  // Filter reminders by user_id
       ORDER BY r.reminder_time ASC`,
      [user_id]
    );

    res.status(200).json({ reminders: rows });
  } catch (err) {
    console.error('Error fetching reminders:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
