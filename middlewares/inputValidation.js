function validateInput(requiredFields) {
  return (req, res, next) => {
    const input = req.body;

    if (!input || typeof input !== 'object') {
      return next(new Error('Invalid request body'));
    }
    for (const field of requiredFields) {
      if (!input.hasOwnProperty(field)) {
        return next(new Error(`Missing '${field}' field`));
      }
      if (typeof input[field] !== 'string' || input[field].trim() === '') {
        return next(new Error(`Invalid '${field}' field`));
      }
    }
    next();
  };
}

module.exports = { validateInput };