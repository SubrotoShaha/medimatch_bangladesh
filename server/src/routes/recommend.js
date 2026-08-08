/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 */

const express = require('express');
const SymptomMapping = require('../models/SymptomMapping');
const DoctorProfile = require('../models/DoctorProfile');

const router = express.Router();

// ─── POST /api/recommend ────────────────────────────────────
// Accept symptoms array, return matching specializations and doctors
// Body: { symptoms: ["fever", "chest pain", "skin rash"], location?: "Dhaka" }
router.post('/', async (req, res) => {
  try {
    const { symptoms, location } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of symptoms' });
    }

    // Normalize symptoms: lowercase, trim whitespace
    const normalizedSymptoms = symptoms.map(s => s.toLowerCase().trim()).filter(Boolean);

    // ─── Step 1: Find matching specializations ─────────────
    // Use regex to do partial matching (e.g., "head" matches "headache")
    const matchPromises = normalizedSymptoms.map(symptom => {
      return SymptomMapping.find({
        symptom: { $regex: symptom, $options: 'i' },
      });
    });

    const matchResults = await Promise.all(matchPromises);

    // Aggregate specializations with match counts for relevance scoring
    const specMap = {}; // { specialization: { count, matchedSymptoms } }

    matchResults.forEach((mappings, index) => {
      mappings.forEach(mapping => {
        mapping.specializations.forEach(spec => {
          if (!specMap[spec]) {
            specMap[spec] = { count: 0, matchedSymptoms: [] };
          }
          specMap[spec].count += 1;
          if (!specMap[spec].matchedSymptoms.includes(normalizedSymptoms[index])) {
            specMap[spec].matchedSymptoms.push(normalizedSymptoms[index]);
          }
        });
      });
    });

    // Sort specializations by relevance (match count)
    const specializations = Object.entries(specMap)
      .map(([name, data]) => ({
        name,
        relevanceScore: data.count,
        matchedSymptoms: data.matchedSymptoms,
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    // ─── Step 2: Find matching doctors ─────────────────────
    const specNames = specializations.map(s => s.name);

    const doctorFilter = {
      specialization: { $in: specNames },
    };
    if (location) {
      doctorFilter.location = location;
    }

    const doctors = await DoctorProfile.find(doctorFilter)
      .populate('userId', 'name email')
      .sort({ rating: -1 });

    // ─── Step 3: Get all available symptoms for autocomplete
    const allSymptoms = await SymptomMapping.find({}).select('symptom -_id');

    res.json({
      query: normalizedSymptoms,
      specializations,
      doctors,
      totalDoctors: doctors.length,
      availableSymptoms: allSymptoms.map(s => s.symptom),
    });
  } catch (error) {
    console.error('Recommend error:', error.message);
    res.status(500).json({ message: 'Error processing symptom recommendations' });
  }
});

// ─── GET /api/recommend/symptoms ─────────────────────────────
// Get all available symptoms for autocomplete
router.get('/symptoms', async (req, res) => {
  try {
    const { q } = req.query;
    let filter = {};

    if (q) {
      filter.symptom = { $regex: q, $options: 'i' };
    }

    const symptoms = await SymptomMapping.find(filter)
      .select('symptom specializations')
      .sort({ symptom: 1 });

    res.json(symptoms);
  } catch (error) {
    console.error('Get symptoms error:', error.message);
    res.status(500).json({ message: 'Error fetching symptoms' });
  }
});

module.exports = router;
