const express = require('express')

const config = require('../config.json')
const logger = require('../utils/logger')
const jwt = require('../utils/jwt')
const { validateInput } = require('../middlewares/inputValidation')
const router = express.Router()

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // If valid, create and sign a JWT
    const payload = { 'sub': username };
    const options = { expiresIn: '2h' };
    const token = jwt.createToken(payload, options);
    
    logger.debug(`Signing token for ${username}`, { ...options, action: 'Signing token'})

    // Send the JWT in the Authorization header
    res.set('Authorization', `Bearer ${token}`);
    res.set('WWW-Authenticate', `Bearer realm="${config.Issuer}"`); // Indicate the authenticate scheme used by the server

    logger.debug(`Sending token to ${username}`, { action: 'Sending token'})
    res.status(200).send();

    logger.debug(`User ${username} has logged in`, { action: 'Logged in'})
  });

router.post('/signup', (req, res) => {
    // Handle login logic here
    res.status(200).send("Hello")
})

module.exports = router