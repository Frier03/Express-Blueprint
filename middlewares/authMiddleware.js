const logger = require('../utils/logger')

function authMiddleware(req, res, next) { // Authenticate middleware
    const { username, password } = req.body;

    logger.debug(`Validating login credentials for user ${username}
    `, {...req.body, action: 'Authentication'})

    if(username != 'admin' || password != '123'){
        return next({ message: `Invalid username or password`, statusCode: 401 });
    }
    next()
}
    
module.exports = { authMiddleware };