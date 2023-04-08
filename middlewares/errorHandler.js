function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500; // default if no status code provided
  res.status(statusCode).send(err.message)
  }
  
  module.exports = { errorHandler };