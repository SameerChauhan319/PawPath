const Package = require('../models/Package');
const Review = require('../models/Review');



const getPackages = async (req, res) => {
  try {
    const { destination, budget, petSize, transportType, rating, duration } = req.query;
    let query = {};

    if (destination) {
      query.destination = { $regex: destination, $options: 'i' };
    }
    if (budget) {
      query.price = { $lte: Number(budget) };
    }
    if (petSize && petSize !== 'All') {
      query.petSizeAllowed = { $in: [petSize, 'All'] };
    }
    if (transportType) {
      query.transportType = transportType;
    }
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }
    if (duration) {
      query.duration = { $regex: duration, $options: 'i' };
    }

    const packages = await Package.find(query);
    return res.json(packages);
  } catch (error) {
    return res.json({ message: error.message }, 500);
  }
};



const getPackageById = async (req, res) => {
  try {
    const packageItem = await Package.findById(req.params.id);
    if (!packageItem) {
      return res.json({ message: 'Package not found' }, 404);
    }

    
    const reviews = await Review.find({ packageId: req.params.id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    return res.json({
      package: packageItem,
      reviews
    });
  } catch (error) {
    return res.json({ message: error.message }, 500);
  }
};

module.exports = {
  getPackages,
  getPackageById
};
