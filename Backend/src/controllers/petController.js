const Pet = require('../models/Pet');

// @desc    Create a new pet
// @route   POST /api/pets
const createPet = async (req, res) => {
  const { petName, petType, breed, age, weight, medicalNotes, image } = req.body;

  const pet = new Pet({
    owner: req.user._id,
    petName,
    petType,
    breed,
    age,
    weight,
    medicalNotes,
    image
  });

  const createdPet = await pet.save();
  res.status(201).json(createdPet);
};

// @desc    Get all pets for logged in user
// @route   GET /api/pets/my-pets
const getMyPets = async (req, res) => {
  const pets = await Pet.find({ owner: req.user._id });
  res.json(pets);
};

// @desc    Get a single pet by ID
// @route   GET /api/pets/:id
const getPetById = async (req, res) => {
  const pet = await Pet.findById(req.params.id);

  if (pet && pet.owner.toString() === req.user._id.toString()) {
    res.json(pet);
  } else {
    res.status(404).json({ message: 'Pet not found or unauthorized' });
  }
};

// @desc    Update a pet
// @route   PUT /api/pets/:id
const updatePet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);

  if (pet && pet.owner.toString() === req.user._id.toString()) {
    pet.petName = req.body.petName || pet.petName;
    pet.petType = req.body.petType || pet.petType;
    pet.breed = req.body.breed || pet.breed;
    pet.age = req.body.age || pet.age;
    pet.weight = req.body.weight || pet.weight;
    pet.medicalNotes = req.body.medicalNotes || pet.medicalNotes;
    pet.image = req.body.image || pet.image;

    const updatedPet = await pet.save();
    res.json(updatedPet);
  } else {
    res.status(404).json({ message: 'Pet not found or unauthorized' });
  }
};

// @desc    Delete a pet
// @route   DELETE /api/pets/:id
const deletePet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);

  if (pet && pet.owner.toString() === req.user._id.toString()) {
    await pet.deleteOne();
    res.json({ message: 'Pet removed successfully' });
  } else {
    res.status(404).json({ message: 'Pet not found or unauthorized' });
  }
};

module.exports = { createPet, getMyPets, getPetById, updatePet, deletePet };