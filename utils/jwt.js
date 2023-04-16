const jwt = require('jsonwebtoken')
const config = require('../config.json')
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "defaultkey"

function createToken(payload, options = {}) {
  const defaultOptions = { expiresIn: '1h' };
  const tokenOptions = { ...defaultOptions, ...options };
  const tokenPayload = { sub: payload.sub, iss: config.issuer, ...payload };

  const token = jwt.sign(tokenPayload, JWT_SECRET_KEY, tokenOptions);
  return token;
}

function verifyToken(token) {
  try {
    jwt.verify(token, JWT_SECRET_KEY); // Verifies the token, if not valid, then raises an error
    return true;
  } catch(err) {
    return false;
  }
}

module.exports = { createToken, verifyToken }