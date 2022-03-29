const express = require('express');

const router = express.Router();
const trainingsController = require('../controllers/trainingsController')

router.get('/', trainingsController.trainingsList);
router.get('/pdf', trainingsController.convertToPdf)

module.exports = router;
