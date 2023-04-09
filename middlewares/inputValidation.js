function validateInput(requiredFields) {
  const numRequiredFields = requiredFields.length;
  return (req, res, next) => {
    const input = req.body;
    const numInputFields = Object.keys(input).length;

    if (!input || typeof input !== 'object') {
      return next({ message: `Invalid request body`, statusCode: 400 });
    }
    if (numInputFields !== numRequiredFields) {
      return next({ message: `Expected ${numRequiredFields} fields, but received ${numInputFields}`, statusCode: 400 });
    }
    for (const field of requiredFields) {
      if (!input.hasOwnProperty(field)) {
        return next({ message: `Missing '${field}' field`, statusCode: 400 });
      }
      if (typeof input[field] !== 'string' || input[field].trim() === '') {
        return next({ message: `Invalid '${field}' field type`, statusCode: 400 });
      }
    }
    next();
  };
}

module.exports = { validateInput };