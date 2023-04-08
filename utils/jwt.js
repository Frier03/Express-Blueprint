const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "something if key not found in .env"
console.log(JWT_SECRET_KEY)
// Function to create and sign JWT token
function createToken(payload, options = {}) {
    const defaultOptions = { expiresIn: '1h' };
    const tokenOptions = { ...defaultOptions, ...options };
    const tokenPayload = { sub: payload.sub, iss: 'Express-Blueprint', ...payload };

    const token = jwt.sign(tokenPayload, JWT_SECRET_KEY, tokenOptions);
    return token;
  }

// Function to verify and decode JWT token
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY)
        return decoded;
    } catch(err) {
        return null; // Invalid token
    }
}

module.exports = {
    createToken,
    verifyToken
}