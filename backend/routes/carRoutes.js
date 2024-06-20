const express = require('express');
const router = express.Router();
const { createCar, getCars, updateCar, deleteCar } = require('../controllers/carController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createCar);
router.get('/', auth, getCars);
router.put('/:id', auth, updateCar);
router.delete('/:id', auth, deleteCar);

module.exports = router;