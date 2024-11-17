const express = require('express');
const router = express.Router();
const { signUp, login, emailVerify } = require('../controllers/authController'); // Ensure these are imported

// Sign up route
router.post('/signup', signUp);

// Login route
router.post('/login', login);

// Email verification route
router.get('/verify/:token', emailVerify);

module.exports = router;
