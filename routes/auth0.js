const express = require('express')
const uuid = require('uuid')
const bcrypt = require('bcrypt')

const config = require('../config.json')
const logger = require('../utils/logger')
const jwt = require('../utils/jwt')
const { runSql } = require('../utils/database')
const router = express.Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Create and sign a JWT
  const payload = { 'sub': username };
  const options = { expiresIn: '2h' };
  const token = jwt.createToken(payload, options);
  
  logger.debug(`Signing token for ${username}`, { ...options, action: 'Signing token'});

  // Send the JWT in the Authorization header
  res.set('Authorization', `Bearer ${token}`);
  res.set('WWW-Authenticate', `Bearer realm="${config.issuer}"`); // Indicate the authenticate scheme used by the server

  res.status(200).send();
  logger.debug(`${username} has logged in`, { action: 'Logged in'});
  });

router.post('/register', async(req, res) => {
  const { mail, username, password } = req.body;

  // Generate a new UUID for the user
  const userid = uuid.v4();

  // Hash the user's password using bcrypt
  const passwordHash = await bcrypt.hash(password, 10) 

  // Register user in sql
  runSql('register-user.sql', [userid, username, mail, passwordHash])
    .then(() => {
      logger.info(`Registered ${username} succesfully (${userid})`)

      return res.status(200).json({ message: `Registered ${username} successfully`})
    })
    .catch((err) => {
      if (err.code === 'SQLITE_CONSTRAINT'){
        // The user already exists in the database
        return res.status(400).json({ message: 'Username or mail already in use'})
      }
      logger.debug(`Failed to register ${username}`)
    })
})

module.exports = router