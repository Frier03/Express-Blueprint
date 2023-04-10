const jwt = require('jsonwebtoken')
const config = require('../config.json')
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "defaultkey"

// Function to create and sign JWT token
function createToken(payload, options = {}) {
    const defaultOptions = { expiresIn: '1h' };
    const tokenOptions = { ...defaultOptions, ...options };
    const tokenPayload = { sub: payload.sub, iss: config.issuer, ...payload };

    const token = jwt.sign(tokenPayload, JWT_SECRET_KEY, tokenOptions);
    return token;
  }

module.exports = { createToken }