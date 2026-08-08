/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 */

const mongoose = require('mongoose');

/**
 * Appointment Schema
 * Links a patient to a doctor with date, time, and status tracking
 */
const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient ID is required'],
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Doctor ID is required'],
  },
  date: {
    type: String, // Format: "2024-12-25"
    required: [true, 'Appointment date is required'],
  },
  time: {
    type: String, // Format: "10:30"
    required: [true, 'Appointment time is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  symptoms: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    default: '',
  },
}, {
  timestamps: true,
});

// Indexes for efficient queries
appointmentSchema.index({ patientId: 1, date: -1 });
appointmentSchema.index({ doctorId: 1, date: -1 });
appointmentSchema.index({ status: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
