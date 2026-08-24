const express = require('express');

const protect = require('../middleware/authMiddleware');

const { getProfileById, getRecommendedProfiles, updateProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/profile/:id', getProfileById);
router.get('/recommend-profiles', protect, getRecommendedProfiles);
router.patch('/update/:id', protect, updateProfile);

module.exports = router;
