const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Pet = require('../models/Pet');
const Package = require('../models/Package');
const Booking = require('../models/Booking');
const Review = require('../models/Review');

const packages = [
  {
    destination: 'Paris Romantic Escape',
    description: 'Fly your pet to Paris in a climate-controlled pet cabin. Includes 7 nights at a pet-friendly boutique hotel, guided walking tours in pet-welcome parks, and professional vet support throughout the trip.',
    price: 1200,
    duration: '7 Days',
    transportType: 'Flight',
    petSizeAllowed: 'Small',
    maximumPets: 2,
    images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80'],
    availableSeats: 5,
    rating: 4.8
  },
  {
    destination: 'Swiss Alps Caravan',
    description: 'A beautiful ground road trip across the Swiss Alps in an air-conditioned luxury pet van. All sizes allowed. Spotless private cabins for pets, grooming sessions, and mountain hikes included.',
    price: 1800,
    duration: '5 Days',
    transportType: 'Ground',
    petSizeAllowed: 'All',
    maximumPets: 4,
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'],
    availableSeats: 8,
    rating: 4.9
  },
  {
    destination: 'Tokyo Express Adventure',
    description: 'Pre-vetted express flight to Tokyo. Features custom-designed pet transport capsules, premium dietary accommodations, and 10 days of activities including pet cafés and gardens.',
    price: 2200,
    duration: '10 Days',
    transportType: 'Flight',
    petSizeAllowed: 'Small',
    maximumPets: 2,
    images: ['https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80'],
    availableSeats: 3,
    rating: 4.7
  },
  {
    destination: 'London Royal Rail Tour',
    description: 'Scenic train ride through the UK countryside. Pet-welcoming cabins, onboard vet assistance, and 4 nights in a premium pet-resort near Hyde Park.',
    price: 950,
    duration: '4 Days',
    transportType: 'Train',
    petSizeAllowed: 'Medium',
    maximumPets: 3,
    images: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80'],
    availableSeats: 6,
    rating: 4.5
  },
  {
    destination: 'New York Luxury Getaway',
    description: 'Treat your pet to the ultimate high-rise getaway. Flight transport, dog walking services on Central Park, spa treatments, and 6 nights in Manhattan.',
    price: 1500,
    duration: '6 Days',
    transportType: 'Flight',
    petSizeAllowed: 'All',
    maximumPets: 5,
    images: ['https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80'],
    availableSeats: 12,
    rating: 4.6
  }
];

const seedData = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pawpath';
    await mongoose.connect(connUri);
    console.log('Connected to MongoDB for seeding...');

    
    await User.deleteMany({});
    await Pet.deleteMany({});
    await Package.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    console.log('Database cleared.');

    
    const createdPackages = await Package.insertMany(packages);
    console.log(`${createdPackages.length} travel packages seeded.`);

    
    const saltAdmin = await bcrypt.genSalt(10);
    const adminPasswordHashed = await bcrypt.hash('adminpassword', saltAdmin);
    const adminUser = await User.create({
      name: 'Admin PawPaths',
      email: 'admin@pawpaths.com',
      password: adminPasswordHashed,
      role: 'admin'
    });
    console.log(`Admin account seeded: ${adminUser.email} / adminpassword`);

    
    const saltUser = await bcrypt.genSalt(10);
    const userPasswordHashed = await bcrypt.hash('userpassword', saltUser);
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'user@pawpaths.com',
      password: userPasswordHashed,
      role: 'user'
    });
    console.log(`User account seeded: ${regularUser.email} / userpassword`);

    
    const samplePet = await Pet.create({
      userId: regularUser._id,
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      weight: 30,
      vaccinationStatus: 'Vaccinated',
      medicalNotes: 'Friendly, loves swimming. Slightly allergic to wheat.',
      image: ''
    });
    console.log(`Sample pet seeded for User: ${samplePet.name}`);

    
    const sampleBooking = await Booking.create({
      userId: regularUser._id,
      petId: samplePet._id,
      packageId: createdPackages[1]._id, 
      travelDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
      paymentStatus: 'Pending',
      bookingStatus: 'Approved'
    });
    console.log(`Sample booking seeded: ${sampleBooking.bookingId}`);

    
    const sampleReview = await Review.create({
      userId: regularUser._id,
      packageId: createdPackages[1]._id,
      rating: 5,
      comment: 'An absolute dream! Buddy loved the van ride and the vet on board was very attentive.'
    });
    console.log(`Sample review seeded.`);

    
    createdPackages[1].availableSeats -= 1;
    await createdPackages[1].save();

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
