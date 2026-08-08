/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 */

const mongoose = require('mongoose');

/**
 * Bangladesh cities for the location enum
 */
const BD_CITIES = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna',
  'Barishal', 'Rangpur', 'Mymensingh', 'Comilla', 'Gazipur',
  'Narayanganj', 'Bogra', 'Cox\'s Bazar', 'Jessore', 'Dinajpur',
];

/**
 * Doctor Profile Schema
 * Linked to a User document via userId reference
 */
const doctorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bmdcNumber: {
    type: String,
    required: [true, 'BMDC registration number is required'],
    unique: true,
    trim: true,
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    enum: {
      values: BD_CITIES,
      message: '{VALUE} is not a supported city',
    },
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot exceed 1000 characters'],
    default: '',
  },
  profilePhoto: {
    type: String,
    default: '',
  },
  consultationFee: {
    type: Number,
    required: [true, 'Consultation fee is required'],
    min: [0, 'Fee cannot be negative'],
  },
  availability: [{
    day: {
      type: String,
      enum: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      required: true,
    },
    startTime: {
      type: String, // Format: "09:00"
      required: true,
    },
    endTime: {
      type: String, // Format: "17:00"
      required: true,
    },
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes for fast searching
doctorProfileSchema.index({ specialization: 1 });
doctorProfileSchema.index({ location: 1 });
doctorProfileSchema.index({ specialization: 1, location: 1 });

module.exports = mongoose.model('DoctorProfile', doctorProfileSchema);
module.exports.BD_CITIES = BD_CITIES;
