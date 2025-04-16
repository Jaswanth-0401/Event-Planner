const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const organizerModel = require('../models/organizerModel');
const db = require('../config/db');

exports.loginUser = async (req, res) => {
    const { email, password, role } = req.body;
  
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const table = role === 'student' ? 'user' : 'organizer';
      const idField = role === 'student' ? 'user_id' : 'organizer_id';
  
      const [rows] = await db.promise().query(`SELECT * FROM ${table} WHERE email = ?`, [email]);
  
      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const user = rows[0];
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign(
        { id: user[idField], role },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        token,
        userId: user[idField],
        role,
      });
  
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
};

exports.registerStudent = async (req, res) => {
  const { name, email, password, phone, year_of_study } = req.body;

  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await userModel.createUser(name, email, hashedPassword, phone, year_of_study);
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering student', error: err });
  }
};

exports.registerOrganizer = async (req, res) => {
  const { name, email, password, phone, description } = req.body;

  try {
    
    const existingOrganizer = await organizerModel.findOrganizerByEmail(email);
    if (existingOrganizer) {
      return res.status(400).json({ message: 'Organizer already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newOrganizer = await organizerModel.createOrganizer(name, email, hashedPassword, phone, description);
    res.status(201).json({ message: 'Organizer registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering organizer', error: err });
  }
};
