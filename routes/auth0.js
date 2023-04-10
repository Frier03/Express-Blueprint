const express = require('express')
const axios = require('axios')

const config = require('../config.json')
const logger = require('../utils/logger')
const jwt = require('../utils/jwt')
const router = express.Router()

// Create an Axios instance with a base URL and port
const instance = axios.create({
  baseURL: 'http://localhost:8888'
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    const has2faEnabled = true
    if (has2faEnabled){ // Check if user has 2FA enabled, generate OTP
      try {
        logger.debug(`Generating OTP code for ${username}`, { ...otp, action: 'Generate OTP'})
        const response = await instance.post('/api/0auth2/otp/generate', { username });
        const otp = response.data
        const code = otp.code
        const createdAt = otp.createdAt

        // Await verification for OTP
      } catch (error) {
        res.status(500).send(error)
      }
    }

    // Create and sign a JWT
    const payload = { 'sub': username };
    const options = { expiresIn: '2h' };
    const token = jwt.createToken(payload, options);
    
    logger.debug(`Signing token for ${username}`, { ...options, action: 'Signing token'})

    // Send the JWT in the Authorization header
    res.set('Authorization', `Bearer ${token}`);
    res.set('WWW-Authenticate', `Bearer realm="${config.issuer}"`); // Indicate the authenticate scheme used by the server

    res.status(200).send();
    logger.debug(`User ${username} has logged in`, { action: 'Logged in'})
  });

router.post('/register', (req, res) => {

})

module.exports = router