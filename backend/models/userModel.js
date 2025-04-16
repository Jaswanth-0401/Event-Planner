const db = require('../config/db');

exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

exports.createUser = (name, email, password, phone, year_of_study) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO user (name, email, password, phone, year_of_study) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, password, phone, year_of_study], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
