const db = require('../config/db');

exports.getAllCategories = (req, res) => {
  db.query('SELECT * FROM category', (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json({ categories: results });
  });
};