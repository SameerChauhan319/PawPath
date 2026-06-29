const Pet = require('../models/Pet');



const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({ userId: req.user._id });
    return res.json(pets);
  } catch (error) {
    return res.json({ message: error.message }, 500);
  }
};



const createPet = async (req, res) => {
  const { name, species, breed, age, weight, vaccinationStatus, medicalNotes, image } = req.body;

  if (!name || !species || !breed || age === undefined || weight === undefined || !vaccinationStatus) {
    return res.json({ message: 'Missing required pet information fields' }, 400);
  }

  try {
    const pet = new Pet({
      userId: req.user._id,
      name,
      species,
      breed,
      age: Number(age),
      weight: Number(weight),
      vaccinationStatus,
      medicalNotes: medicalNotes || '',
      image: image || ''
    });

    const createdPet = await pet.save();
    return res.json(createdPet, 201);
  } catch (error) {
    return res.json({ message: error.message }, 500);
  }
};



const updatePet = async (req, res) => {
  const { name, species, breed, age, weight, vaccinationStatus, medicalNotes, image } = req.body;

  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.json({ message: 'Pet not found' }, 404);
    }

    
    if (pet.userId.toString() !== req.user._id.toString()) {
      return res.json({ message: 'Not authorized to modify this pet' }, 403);
    }

    pet.name = name || pet.name;
    pet.species = species || pet.species;
    pet.breed = breed || pet.breed;
    pet.age = age !== undefined ? Number(age) : pet.age;
    pet.weight = weight !== undefined ? Number(weight) : pet.weight;
    pet.vaccinationStatus = vaccinationStatus || pet.vaccinationStatus;
    pet.medicalNotes = medicalNotes !== undefined ? medicalNotes : pet.medicalNotes;
    pet.image = image !== undefined ? image : pet.image;

    const updatedPet = await pet.save();
    return res.json(updatedPet);
  } catch (error) {
    return res.json({ message: error.message }, 500);
  }
};



const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.json({ message: 'Pet not found' }, 404);
    }

    
    if (pet.userId.toString() !== req.user._id.toString()) {
      return res.json({ message: 'Not authorized to delete this pet' }, 403);
    }

    await pet.deleteOne();
    return res.json({ message: 'Pet removed successfully' });
  } catch (error) {
    return res.json({ message: error.message }, 500);
  }
};

module.exports = {
  getPets,
  createPet,
  updatePet,
  deletePet
};
