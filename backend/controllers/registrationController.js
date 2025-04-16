const db = require('../config/db');

exports.registerForEvent = async (req, res) => {
  const { student_id, event_id } = req.body;

  if (!student_id || !event_id) {
    return res.status(400).json({ message: 'Missing student_id or event_id' });
  }

  try {
    await db.promise().query(
      `INSERT INTO registration (user_id, event_id) VALUES (?, ?)`,
      [student_id, event_id]
    );
    res.status(201).json({ message: 'Registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.checkRegistration = async (req, res) => {
  const { student_id, event_id } = req.query;

  if (!student_id || !event_id) {
    return res.status(400).json({ message: 'Missing student_id or event_id' });
  }

  try {
    const [rows] = await db.promise().query(
      `SELECT * FROM registration WHERE user_id = ? AND event_id = ?`,
      [student_id, event_id]
    );
    if (rows.length > 0) {
      return res.status(200).json({ isRegistered: true });
    } else {
      return res.status(200).json({ isRegistered: false });
    }
  } catch (error) {
    console.error('Error checking registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.cancelRegistration = async (req, res) => {
    const { student_id, event_id } = req.body;
  
    console.log(student_id);

    if (!student_id || !event_id) {
      return res.status(400).json({ message: 'Missing student_id or event_id' });
    }
  
    try {
      
      const [result] = await db.promise().query(
        `DELETE FROM registration WHERE user_id = ? AND event_id = ?`,
        [student_id, event_id]
      );
  
      
      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Registration canceled successfully' });
      } else {
        return res.status(400).json({ message: 'No registration found to cancel' });
      }
    } catch (error) {
      console.error('Error canceling registration:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getUpcomingRegisteredEvents = async (req, res) => {
    const { student_id } = req.query;
  
    if (!student_id) {
      return res.status(400).json({ message: 'Student ID is required' });
    }
  
    try {
      const [rows] = await db.promise().query(
        `SELECT 
           e.event_id, 
           e.title, 
           e.date, 
           e.time, 
           e.location, 
           e.description, 
           o.name AS organizerName
         FROM registration r
         JOIN event e ON r.event_id = e.event_id
         JOIN organizer o ON e.organizer_id = o.organizer_id
         WHERE r.user_id = ? AND e.date > CURDATE()
         ORDER BY e.date ASC`,
        [student_id]
      );
  
      res.json({ events: rows });
    } catch (err) {
      console.error('Error fetching upcoming registered events:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  exports.getPastRegisteredEvents = async (req, res) => {
    const { student_id } = req.query;
  
    if (!student_id) {
      return res.status(400).json({ message: 'Student ID is required' });
    }
  
    try {
      const [rows] = await db.promise().query(
        `SELECT 
           e.event_id, 
           e.title, 
           e.date, 
           e.time, 
           e.location, 
           e.description, 
           o.name AS organizerName
         FROM registration r
         JOIN event e ON r.event_id = e.event_id
         JOIN organizer o ON e.organizer_id = o.organizer_id
         WHERE r.user_id = ? AND e.date < CURDATE()
         ORDER BY e.date DESC`,
        [student_id]
      );
  
      res.json({ events: rows });
    } catch (err) {
      console.error('Error fetching past registered events:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  exports.getPresentRegisteredEvents = async (req, res) => {
    const { student_id } = req.query;
  
    if (!student_id) {
      return res.status(400).json({ message: 'Student ID is required' });
    }
  
    try {
      const now = new Date();
      const todayDate = now.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      const currentTime = now.toTimeString().split(' ')[0]; // Get current time in HH:MM:SS format
  
      const [rows] = await db.promise().query(
        `SELECT 
           e.event_id, 
           e.title, 
           e.date, 
           e.time, 
           e.location, 
           e.description, 
           o.name AS organizerName
         FROM registration r
         JOIN event e ON r.event_id = e.event_id
         JOIN organizer o ON e.organizer_id = o.organizer_id
         WHERE r.user_id = ? AND e.date = ? AND e.time <= ? AND (e.end_time >= ? OR e.end_time IS NULL)
         ORDER BY e.date ASC`,
        [student_id, todayDate, currentTime, currentTime]
      );
  
      res.json({ events: rows });
    } catch (err) {
      console.error('Error fetching present registered events:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
  
  
  
  

  