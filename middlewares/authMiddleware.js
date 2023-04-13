const logger = require('../utils/logger')
const { runSql } = require('../utils/database')
const { verifyPassword } = require('../utils/password')

async function authMiddleware(req, res, next) { // Authenticate middleware
    const { username, password } = req.body;
  
    logger.debug(`Validating login credentials for user ${username}`, {...req.body, action: 'Authentication'})
  
    try {
        const user = await runSql('get-user.sql', [username]);

        if (user) { // User exists, handle the result here
            // Verify password with user.password
            const isPasswordValid = await verifyPassword(password, user.password);
            if (isPasswordValid) {
                logger.debug(`Authenticated ${username} successfully (${user.id})`);
                next();
                return;
            }
    }

    return next({ message: `Invalid username or password`, statusCode: 401 });
    } catch (err) {
      // Handle the error here
      logger.error(`Failed to execute SQL command: ${err.message}`);
      next(err);
    }
  }
    
module.exports = { authMiddleware };