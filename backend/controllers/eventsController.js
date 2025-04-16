const db = require('../config/db');

exports.createEvent = async (req, res) => {
  const { title, date, time, location, description, category, organizer_id } = req.body;

  if (!title || !date || !time || !location || !description || !category || !organizer_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const insertEventQuery = `
      INSERT INTO event (title, date, time, location, description, organizer_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [eventResult] = await db.promise().query(insertEventQuery, [
      title, date, time, location, description, organizer_id,
    ]);

    const eventId = eventResult.insertId;

    // insert category into event_category table
    const insertCategoryQuery = `INSERT INTO event_category (event_id, category_id) VALUES (?, ?)`;
    const [categoryRow] = await db.promise().query(
      'SELECT category_id FROM category WHERE category_id = ?',
      [category]
    );

    if (!categoryRow.length) {
      return res.status(400).json({ message: 'Invalid category name' });
    }

    await db.promise().query(insertCategoryQuery, [eventId, categoryRow[0].category_id]);

    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const query = `
      SELECT 
        event.event_id, 
        event.title, 
        event.date, 
        event.time, 
        event.location, 
        event.description, 
        category.name AS category, 
        organizer.name AS organizerName
      FROM event
      JOIN event_category ON event.event_id = event_category.event_id
      JOIN category ON event_category.category_id = category.category_id
      JOIN organizer ON event.organizer_id = organizer.organizer_id
      WHERE CONCAT(event.date, ' ', event.time) > NOW()
      ORDER BY event.date ASC, event.time ASC
    `;
    const [events] = await db.promise().query(query);

    if (events.length === 0) {
      return res.status(404).json({ message: 'No upcoming events found' });
    }

    res.status(200).json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


  
