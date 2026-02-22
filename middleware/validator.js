const { body, validationResult } = require('express-validator');

const signupValidation = [
  body('variables.username').notEmpty().withMessage('Username is required'),
  body('variables.email').isEmail().withMessage('Valid email is required'),
  body('variables.password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { signupValidation };