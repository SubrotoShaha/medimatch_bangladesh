/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 */

const express = require('express');
const DoctorProfile = require('../models/DoctorProfile');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roleCheck');

const router = express.Router();

// ─── GET /api/doctors ────────────────────────────────────────
// List doctors with optional filters: specialization, location
router.get('/', async (req, res) => {
  try {
    const { specialization, location, minFee, maxFee, page = 1, limit = 20 } = req.query;

    // Build filter query
    const filter = {};
    if (specialization) {
      filter.specialization = { $regex: specialization, $options: 'i' };
    }
    if (location) {
      filter.location = location;
    }
    if (minFee || maxFee) {
      filter.consultationFee = {};
      if (minFee) filter.consultationFee.$gte = Number(minFee);
      if (maxFee) filter.consultationFee.$lte = Number(maxFee);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [doctors, total] = await Promise.all([
      DoctorProfile.find(filter)
        .populate('userId', 'name email')
        .sort({ rating: -1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      DoctorProfile.countDocuments(filter),
    ]);

    res.json({
      doctors,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get doctors error:', error.message);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
});

// ─── GET /api/doctors/:id ────────────────────────────────────
// Get a single doctor profile by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await DoctorProfile.findById(req.params.id)
      .populate('userId', 'name email');

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    console.error('Get doctor error:', error.message);
    res.status(500).json({ message: 'Error fetching doctor profile' });
  }
});

// ─── POST /api/doctors/profile ───────────────────────────────
// Create a doctor profile (doctor role only)
router.post('/profile', protect, authorizeRoles('doctor'), async (req, res) => {
  try {
    const { bmdcNumber, specialization, location, bio, consultationFee, availability } = req.body;

    // Check if profile already exists
    const existing = await DoctorProfile.findOne({ userId: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'Doctor profile already exists. Use PUT to update.' });
    }

    const profile = await DoctorProfile.create({
      userId: req.user._id,
      bmdcNumber,
      specialization,
      location,
      bio,
      consultationFee,
      availability,
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error('Create profile error:', error.message);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'BMDC number already registered' });
    }
    res.status(500).json({ message: 'Error creating doctor profile' });
  }
});

// ─── PUT /api/doctors/profile ────────────────────────────────
// Update own doctor profile
router.put('/profile', protect, authorizeRoles('doctor'), async (req, res) => {
  try {
    const { bmdcNumber, specialization, location, bio, consultationFee, availability } = req.body;

    const profile = await DoctorProfile.findOneAndUpdate(
      { userId: req.user._id },
      { bmdcNumber, specialization, location, bio, consultationFee, availability },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Doctor profile not found. Create one first.' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Update profile error:', error.message);
    res.status(500).json({ message: 'Error updating doctor profile' });
  }
});

// ─── GET /api/doctors/me/profile ─────────────────────────────
// Get own doctor profile
router.get('/me/profile', protect, authorizeRoles('doctor'), async (req, res) => {
  try {
    const profile = await DoctorProfile.findOne({ userId: req.user._id })
      .populate('userId', 'name email');

    if (!profile) {
      return res.status(404).json({ message: 'No profile found. Please create one.' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Get my profile error:', error.message);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

module.exports = router;
