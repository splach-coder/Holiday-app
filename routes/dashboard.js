const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { fetchUserData } = require("../utils/fetchData");
const { normalizeKeys } = require('../utils/functions');

// Apply requireAuth middleware to all dashboard routes
router.use(requireAuth);

router.get('/', async (req, res) => {
  const currentHour = new Date().getHours();
  let initialGreeting;
  
  if (currentHour >= 5 && currentHour < 12) {
    initialGreeting = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    initialGreeting = 'Good Afternoon';
  } else {
    initialGreeting = 'Good Evening';
  }

  if (req.user.role === 'Admin') {
    return res.render('admin_dashboard', {user: req.user});
  } else {
    user_data = await fetchUserData(req.user.username, "balance");
    req.user = normalizeKeys({...req.user, ...user_data}); 
    return res.render('user_dashboard', {user: req.user, initialGreeting: initialGreeting});
  }
});

router.get('/profile', (req, res) => {
  res.render('dashboard/profile', { user: req.user });
});

module.exports = router;