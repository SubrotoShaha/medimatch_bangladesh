/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 */

const express = require('express');
const User = require('../models/User');
const DoctorProfile = require('../models/DoctorProfile');
const Appointment = require('../models/Appointment');
const SymptomMapping = require('../models/SymptomMapping');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roleCheck');

const router = express.Router();

// All admin routes require authentication + admin role
router.use(protect, authorizeRoles('admin'));

// ─── GET /api/admin/stats ────────────────────────────────────
// Dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalDoctors, totalPatients, totalAppointments, pendingAppointments] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: 'doctor' }),
        User.countDocuments({ role: 'patient' }),
        Appointment.countDocuments(),
        Appointment.countDocuments({ status: 'pending' }),
      ]);

    res.json({
      totalUsers,
      totalDoctors,
      totalPatients,
      totalAppointments,
      pendingAppointments,
    });
  } catch (error) {
    console.error('Admin stats error:', error.message);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// ─── GET /api/admin/users ────────────────────────────────────
// List all users
router.get('/users', async (req, res) => {
  try {
    const { role, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (role) filter.role = role;

    const skip = (Number(page) - 1) * Number(limit);

    const [users, total] = await Promise.all([
      User.find(filter).select('-password').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      User.countDocuments(filter),
    ]);

    res.json({ users, pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } });
  } catch (error) {
    console.error('Admin users error:', error.message);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// ─── POST /api/admin/symptoms ────────────────────────────────
// Add a new symptom mapping
router.post('/symptoms', async (req, res) => {
  try {
    const { symptom, specializations, description } = req.body;

    if (!symptom || !specializations || specializations.length === 0) {
      return res.status(400).json({ message: 'Symptom and specializations are required' });
    }

    const mapping = await SymptomMapping.create({
      symptom: symptom.toLowerCase().trim(),
      specializations,
      description,
    });

    res.status(201).json(mapping);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'This symptom mapping already exists' });
    }
    console.error('Add symptom error:', error.message);
    res.status(500).json({ message: 'Error adding symptom mapping' });
  }
});

// ─── GET /api/admin/symptoms ─────────────────────────────────
// List all symptom mappings
router.get('/symptoms', async (req, res) => {
  try {
    const symptoms = await SymptomMapping.find().sort({ symptom: 1 });
    res.json(symptoms);
  } catch (error) {
    console.error('Get symptoms error:', error.message);
    res.status(500).json({ message: 'Error fetching symptoms' });
  }
});

module.exports = router;
