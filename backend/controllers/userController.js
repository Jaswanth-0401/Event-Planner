const db = require('../config/db');

const getUserById = (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT user_id, name, email, phone, year_of_study FROM user WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
};

module.exports = {
  getUserById,
};
