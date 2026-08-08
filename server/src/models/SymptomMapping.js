/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 */

const mongoose = require('mongoose');

/**
 * Symptom Mapping Schema
 * Maps symptom keywords to medical specializations
 * Used by the recommendation engine to match patient symptoms to doctor types
 */
const symptomMappingSchema = new mongoose.Schema({
  symptom: {
    type: String,
    required: [true, 'Symptom keyword is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  specializations: [{
    type: String,
    required: true,
    trim: true,
  }],
  description: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Text index for fuzzy/partial matching
symptomMappingSchema.index({ symptom: 'text' });

module.exports = mongoose.model('SymptomMapping', symptomMappingSchema);
