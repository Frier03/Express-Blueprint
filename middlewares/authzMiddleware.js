const config = require('../config.json');
const { verifyToken } = require('../utils/jwt');

async function authzMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const realm = config.issuer;
    res.set('WWW-Authenticate', `Bearer realm="${realm}"`);
    return res.status(401).json({ message: 'Authentication required' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    const realm = config.issuer;
    res.set('WWW-Authenticate', `Bearer realm="${realm}"`);
    return res.status(401).json({ message: 'Invalid authentication scheme or token' });
  }

  const isTokenValid = verifyToken(token);

  if (!isTokenValid) {
    const realm = config.issuer;
    res.set('WWW-Authenticate', `Bearer realm="${realm}"`);
    return res.status(401).json({ message: 'Invalid token' });
  }

  const decodedToken = verifyToken(token);
  req.user = decodedToken; // Set the authenticated user in the request object
  next();
}

module.exports = { authzMiddleware };