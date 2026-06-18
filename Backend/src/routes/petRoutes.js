const express = require('express');
const router = express.Router();
const { createPet, getMyPets, getPetById, updatePet, deletePet } = require('../controllers/petController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createPet);
router.route('/my-pets').get(protect, getMyPets);
router.route('/:id')
  .get(protect, getPetById)
  .put(protect, updatePet)
  .delete(protect, deletePet);

module.exports = router;