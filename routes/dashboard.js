const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');

// Apply requireAuth middleware to all dashboard routes
router.use(requireAuth);

router.get('/', (req, res) => {
  res.render('dashboard', { user: req.user });
});

// For example:
router.get('/profile', (req, res) => {
  res.render('dashboard/profile', { user: req.user });
});

module.exports = router;