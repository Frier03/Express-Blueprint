const express = require('express')

const config = require('../config.json')
const logger = require('../utils/logger')
const jwt = require('../utils/jwt')
const { validateInput } = require('../middlewares/inputValidation')
const router = express.Router()

router.post('/login', validateInput(['username', 'password']), (req, res) => {
    const { username, password } = req.body;
    // Check if the username and password are valid
    // ...

    // If valid, create and sign a JWT
    const payload = { 'sub': username };
    const options = { expiresIn: '2h' };
    const token = jwt.createToken(payload, options);
    
    logger.debug(`Signing token for ${username}`, { ...options, action: 'Signing token'})

    // Send the JWT in the Authorization header
    res.set('Authorization', `Bearer ${token}`);
    res.set('WWW-Authenticate', `Bearer realm="${config.Issuer}"`); // Indicate the authenticate scheme used by the server
    res.status(200).send();
  });

router.post('/signup', (req, res) => {
    // Handle login logic here
    res.status(200).send("Hello")
})

module.exports = router