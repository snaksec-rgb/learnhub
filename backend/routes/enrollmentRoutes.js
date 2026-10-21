const express = require('express');
const router = express.Router();
const {
  enroll,
  getMyCourses,
  updateProgress,
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/enroll', protect, authorize('student'), enroll);
router.get('/my-courses', protect, authorize('student'), getMyCourses);
router.put('/:id/progress', protect, authorize('student'), updateProgress);

module.exports = router;