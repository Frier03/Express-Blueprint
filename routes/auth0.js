const express = require('express');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const config = require('../config.json');
const logger = require('../utils/logger');
const jwt = require('../utils/jwt');
const { runSql } = require('../utils/database');
const { hashPassword } = require('../utils/password');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username } = req.body;

  // Create and sign a JWT
  const payload = { 'sub': username };
  const options = { expiresIn: '2h' };
  const token = jwt.createToken(payload, options);

  logger.debug(`Signing token for user ${username}`, { ...options, action: 'Signing token' });

  // Send the JWT in the Authorization header
  res.set('Authorization', `Bearer ${token}`);

  logger.info(`User ${username} logged in successfully`, { action: 'Logged in' });
  res.status(200).send();
});

router.post('/register', async (req, res) => {
  const { mail, username, password } = req.body;

  // Generate a new UUID for the user
  const userId = uuid.v4();

  // Hash the user's password using bcrypt
  const passwordHash = await hashPassword(password);

  // Register user in SQL
  try {
    await runSql('register-user.sql', [userId, username, mail, passwordHash]);
    logger.info(`User ${username} registered successfully (ID: ${userId})`);
    return res.status(200).json({ message: `User ${username} registered successfully` });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      // The user already exists in the database
      logger.debug(`Failed to register user ${username}: username or mail already in use`);
      return res.status(400).json({ message: 'Username or mail already in use' });
    }
    logger.error(`Failed to register user ${username}: ${err.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/logout', async (req, res) => {
  // TODO: Implement logout functionality
  logger.debug('Logout endpoint called', { action: 'Logout' });
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;