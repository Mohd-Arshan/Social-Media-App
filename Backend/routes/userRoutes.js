const express = require('express');

const protect = require('../middleware/authMiddleware');

const { getProfileById, getRecommendedProfiles } = require('../controllers/userController');

const router = express.Router();

router.get('/profile/:id', getProfileById);
router.get('/recommend-profiles', protect, getRecommendedProfiles);

module.exports = router;
