const express = require('express');
const router = express.Router();
const traceController = require('../controllers/TraceController');

router.get('/trace/:productId', traceController.getTraceByProductId);
router.post('/trace', traceController.createTraceStep);
router.put('/trace/:id', traceController.updateTraceStep);
router.get('/trace', traceController.getAllTraceSteps); // New route to get all trace steps

module.exports = router;
