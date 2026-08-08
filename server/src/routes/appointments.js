/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 */

const express = require('express');
const Appointment = require('../models/Appointment');
const DoctorProfile = require('../models/DoctorProfile');
const { protect } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/roleCheck');

const router = express.Router();

// ─── POST /api/appointments ──────────────────────────────────
// Book a new appointment (patient only)
router.post('/', protect, authorizeRoles('patient'), async (req, res) => {
  try {
    const { doctorId, date, time, symptoms, notes } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: 'Doctor, date, and time are required' });
    }

    // Verify the doctor exists
    const doctorProfile = await DoctorProfile.findById(doctorId);
    if (!doctorProfile) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check for conflicting appointment
    const conflict = await Appointment.findOne({
      doctorId: doctorProfile.userId,
      date,
      time,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (conflict) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }

    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId: doctorProfile.userId,
      date,
      time,
      symptoms: symptoms || '',
      notes: notes || '',
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Book appointment error:', error.message);
    res.status(500).json({ message: 'Error booking appointment' });
  }
});

// ─── GET /api/appointments ───────────────────────────────────
// Get appointments for the current user (patient or doctor)
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // Build filter based on user role
    const filter = {};
    if (req.user.role === 'patient') {
      filter.patientId = req.user._id;
    } else if (req.user.role === 'doctor') {
      filter.doctorId = req.user._id;
    } else if (req.user.role === 'admin') {
      // Admin can see all
    }

    if (status) {
      filter.status = status;
    }

    const [appointments, total] = await Promise.all([
      Appointment.find(filter)
        .populate('patientId', 'name email')
        .populate('doctorId', 'name email')
        .sort({ date: -1, time: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Appointment.countDocuments(filter),
    ]);

    res.json({
      appointments,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get appointments error:', error.message);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// ─── PUT /api/appointments/:id/status ────────────────────────
// Update appointment status
// Doctor: confirm, complete   |   Patient: cancel
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Authorization: only the doctor or patient involved can update
    const isDoctor = req.user._id.toString() === appointment.doctorId.toString();
    const isPatient = req.user._id.toString() === appointment.patientId.toString();

    if (!isDoctor && !isPatient && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }

    // Validate status transitions
    if (isDoctor && !['confirmed', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Doctor can only confirm or complete appointments' });
    }
    if (isPatient && status !== 'cancelled') {
      return res.status(400).json({ message: 'Patient can only cancel appointments' });
    }

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (error) {
    console.error('Update appointment error:', error.message);
    res.status(500).json({ message: 'Error updating appointment' });
  }
});

module.exports = router;
