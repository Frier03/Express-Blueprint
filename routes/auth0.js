const express = require('express')

const config = require('../config.json')
const logger = require('../utils/logger')
const jwt = require('../utils/jwt')
const router = express.Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Create and sign a JWT
  const payload = { 'sub': username };
  const options = { expiresIn: '2h' };
  const token = jwt.createToken(payload, options);
  
  logger.debug(`Signing token for ${username}`, { ...options, action: 'Signing token'})

  // Send the JWT in the Authorization header
  res.set('Authorization', `Bearer ${token}`);
  res.set('WWW-Authenticate', `Bearer realm="${config.issuer}"`); // Indicate the authenticate scheme used by the server

  res.status(200).send();
  logger.debug(`${username} has logged in`, { action: 'Logged in'})
  });

router.post('/register', (req, res) => {
  const { mail, username, password } = req.body;
  console.log(mail, username, password);
})

module.exports = router