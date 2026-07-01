const Pet = require('../models/Pet');



const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({ userId: req.user._id });
    return res.json({
      success: true,
      message: 'Pets fetched successfully',
      data: pets
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const createPet = async (req, res) => {
  const { name, species, breed, age, weight, vaccinationStatus, medicalNotes, image } = req.body;

  if (!name || !species || !breed || age === undefined || weight === undefined || !vaccinationStatus) {
    return res.json({ success: false, message: 'Missing required pet information fields' }, 400);
  }

  const ageNum = Number(age);
  const weightNum = Number(weight);

  if (isNaN(ageNum) || ageNum < 0 || ageNum > 30) {
    return res.json({ success: false, message: 'Please enter a valid pet age between 0 and 30 years' }, 400);
  }

  if (isNaN(weightNum) || weightNum <= 0 || weightNum > 150) {
    return res.json({ success: false, message: 'Please enter a valid pet weight between 0.1 and 150 kg' }, 400);
  }

  try {
    const pet = new Pet({
      userId: req.user._id,
      name,
      species,
      breed,
      age: ageNum,
      weight: weightNum,
      vaccinationStatus,
      medicalNotes: medicalNotes || '',
      image: image || ''
    });

    const createdPet = await pet.save();
    return res.json({
      success: true,
      message: 'Pet registered successfully',
      data: createdPet
    }, 201);
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const updatePet = async (req, res) => {
  const { name, species, breed, age, weight, vaccinationStatus, medicalNotes, image } = req.body;

  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.json({ success: false, message: 'Pet profile not found' }, 404);
    }

    
    if (pet.userId.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: 'Not authorized to modify this pet profile' }, 403);
    }

    if (age !== undefined) {
      const ageNum = Number(age);
      if (isNaN(ageNum) || ageNum < 0 || ageNum > 30) {
        return res.json({ success: false, message: 'Please enter a valid pet age between 0 and 30 years' }, 400);
      }
      pet.age = ageNum;
    }

    if (weight !== undefined) {
      const weightNum = Number(weight);
      if (isNaN(weightNum) || weightNum <= 0 || weightNum > 150) {
        return res.json({ success: false, message: 'Please enter a valid pet weight between 0.1 and 150 kg' }, 400);
      }
      pet.weight = weightNum;
    }

    pet.name = name || pet.name;
    pet.species = species || pet.species;
    pet.breed = breed || pet.breed;
    pet.vaccinationStatus = vaccinationStatus || pet.vaccinationStatus;
    pet.medicalNotes = medicalNotes !== undefined ? medicalNotes : pet.medicalNotes;
    pet.image = image !== undefined ? image : pet.image;

    const updatedPet = await pet.save();
    return res.json({
      success: true,
      message: 'Pet profile updated successfully',
      data: updatedPet
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};



const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.json({ success: false, message: 'Pet not found' }, 404);
    }

    
    if (pet.userId.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: 'Not authorized to delete this pet profile' }, 403);
    }

    await pet.deleteOne();
    return res.json({
      success: true,
      message: 'Pet removed successfully'
    });
  } catch (error) {
    return res.json({ success: false, message: error.message }, 500);
  }
};

module.exports = {
  getPets,
  createPet,
  updatePet,
  deletePet
};
