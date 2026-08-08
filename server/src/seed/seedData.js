/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path');

// Load env from parent directory
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const User = require('../models/User');
const DoctorProfile = require('../models/DoctorProfile');
const SymptomMapping = require('../models/SymptomMapping');

/**
 * Comprehensive symptom-to-specialization mappings
 * Covers common symptoms patients in Bangladesh search for
 */
const symptomMappings = [
  // General Medicine
  { symptom: 'fever', specializations: ['General Medicine', 'Pediatrics'], description: 'Elevated body temperature' },
  { symptom: 'cold', specializations: ['General Medicine', 'ENT'], description: 'Common cold symptoms' },
  { symptom: 'cough', specializations: ['General Medicine', 'Pulmonology'], description: 'Persistent coughing' },
  { symptom: 'fatigue', specializations: ['General Medicine', 'Endocrinology'], description: 'Persistent tiredness' },
  { symptom: 'weakness', specializations: ['General Medicine', 'Neurology'], description: 'General body weakness' },
  { symptom: 'weight loss', specializations: ['General Medicine', 'Endocrinology'], description: 'Unexplained weight loss' },

  // Cardiology
  { symptom: 'chest pain', specializations: ['Cardiology', 'Pulmonology'], description: 'Pain in the chest area' },
  { symptom: 'heart palpitations', specializations: ['Cardiology'], description: 'Irregular or racing heartbeat' },
  { symptom: 'shortness of breath', specializations: ['Cardiology', 'Pulmonology'], description: 'Difficulty breathing' },
  { symptom: 'high blood pressure', specializations: ['Cardiology', 'General Medicine'], description: 'Hypertension symptoms' },

  // Dermatology
  { symptom: 'skin rash', specializations: ['Dermatology'], description: 'Skin irritation or rash' },
  { symptom: 'acne', specializations: ['Dermatology'], description: 'Acne breakouts' },
  { symptom: 'skin issue', specializations: ['Dermatology'], description: 'General skin problems' },
  { symptom: 'itching', specializations: ['Dermatology', 'General Medicine'], description: 'Persistent itching' },
  { symptom: 'hair loss', specializations: ['Dermatology'], description: 'Hair thinning or loss' },
  { symptom: 'eczema', specializations: ['Dermatology'], description: 'Chronic skin inflammation' },

  // Orthopedics
  { symptom: 'joint pain', specializations: ['Orthopedics', 'Rheumatology'], description: 'Pain in joints' },
  { symptom: 'back pain', specializations: ['Orthopedics', 'Neurology'], description: 'Lower or upper back pain' },
  { symptom: 'bone fracture', specializations: ['Orthopedics'], description: 'Broken bones' },
  { symptom: 'knee pain', specializations: ['Orthopedics'], description: 'Pain in knee area' },
  { symptom: 'muscle pain', specializations: ['Orthopedics', 'General Medicine'], description: 'Muscular discomfort' },

  // Neurology
  { symptom: 'headache', specializations: ['Neurology', 'General Medicine'], description: 'Head pain' },
  { symptom: 'migraine', specializations: ['Neurology'], description: 'Severe recurring headaches' },
  { symptom: 'dizziness', specializations: ['Neurology', 'ENT'], description: 'Feeling of unsteadiness' },
  { symptom: 'numbness', specializations: ['Neurology'], description: 'Loss of sensation' },
  { symptom: 'seizures', specializations: ['Neurology'], description: 'Epileptic episodes' },

  // Gastroenterology
  { symptom: 'stomach pain', specializations: ['Gastroenterology', 'General Medicine'], description: 'Abdominal pain' },
  { symptom: 'nausea', specializations: ['Gastroenterology', 'General Medicine'], description: 'Feeling of sickness' },
  { symptom: 'vomiting', specializations: ['Gastroenterology'], description: 'Throwing up' },
  { symptom: 'diarrhea', specializations: ['Gastroenterology'], description: 'Loose watery stools' },
  { symptom: 'acidity', specializations: ['Gastroenterology'], description: 'Acid reflux or heartburn' },
  { symptom: 'bloating', specializations: ['Gastroenterology'], description: 'Abdominal distension' },

  // ENT
  { symptom: 'ear pain', specializations: ['ENT'], description: 'Pain in the ear' },
  { symptom: 'sore throat', specializations: ['ENT', 'General Medicine'], description: 'Throat pain' },
  { symptom: 'hearing loss', specializations: ['ENT'], description: 'Difficulty hearing' },
  { symptom: 'nasal congestion', specializations: ['ENT'], description: 'Blocked nose' },

  // Ophthalmology
  { symptom: 'eye pain', specializations: ['Ophthalmology'], description: 'Pain in eyes' },
  { symptom: 'blurred vision', specializations: ['Ophthalmology', 'Neurology'], description: 'Vision problems' },
  { symptom: 'red eye', specializations: ['Ophthalmology'], description: 'Eye redness or irritation' },

  // Psychiatry
  { symptom: 'anxiety', specializations: ['Psychiatry'], description: 'Anxiety and panic disorders' },
  { symptom: 'depression', specializations: ['Psychiatry'], description: 'Persistent sadness' },
  { symptom: 'insomnia', specializations: ['Psychiatry', 'Neurology'], description: 'Difficulty sleeping' },
  { symptom: 'stress', specializations: ['Psychiatry', 'General Medicine'], description: 'Mental stress' },

  // Gynecology
  { symptom: 'menstrual problems', specializations: ['Gynecology'], description: 'Irregular or painful periods' },
  { symptom: 'pregnancy care', specializations: ['Gynecology'], description: 'Prenatal care' },
  { symptom: 'pelvic pain', specializations: ['Gynecology', 'Urology'], description: 'Pain in pelvic region' },

  // Urology
  { symptom: 'urinary problems', specializations: ['Urology'], description: 'Difficulty urinating' },
  { symptom: 'kidney pain', specializations: ['Urology', 'General Medicine'], description: 'Pain in kidney area' },

  // Pediatrics
  { symptom: 'child fever', specializations: ['Pediatrics'], description: 'Fever in children' },
  { symptom: 'child cough', specializations: ['Pediatrics', 'Pulmonology'], description: 'Cough in children' },

  // Pulmonology
  { symptom: 'asthma', specializations: ['Pulmonology'], description: 'Breathing difficulty and wheezing' },
  { symptom: 'breathing difficulty', specializations: ['Pulmonology', 'Cardiology'], description: 'Dyspnea' },
  { symptom: 'tuberculosis', specializations: ['Pulmonology', 'Infectious Disease'], description: 'Persistent cough, weight loss, night sweats' },
  { symptom: 'bronchitis', specializations: ['Pulmonology', 'General Medicine'], description: 'Cough with mucus, chest discomfort' },
  { symptom: 'pneumonia', specializations: ['Pulmonology', 'General Medicine'], description: 'Fever, chills, breathing difficulty' },
  { symptom: 'copd', specializations: ['Pulmonology'], description: 'Chronic obstructive pulmonary disease' },

  // Endocrinology
  { symptom: 'diabetes', specializations: ['Endocrinology', 'General Medicine'], description: 'Blood sugar issues' },
  { symptom: 'thyroid problems', specializations: ['Endocrinology'], description: 'Thyroid gland disorders' },
  { symptom: 'obesity', specializations: ['Endocrinology', 'Dietetics'], description: 'Excessive body weight' },
  { symptom: 'hormonal imbalance', specializations: ['Endocrinology', 'Gynecology'], description: 'Irregular hormones' },

  // Infectious Disease
  { symptom: 'dengue', specializations: ['Infectious Disease', 'General Medicine'], description: 'High fever, severe joint pain, rash' },
  { symptom: 'malaria', specializations: ['Infectious Disease', 'General Medicine'], description: 'Chills, fever, sweating' },
  { symptom: 'typhoid', specializations: ['Infectious Disease', 'General Medicine'], description: 'Prolonged fever, abdominal pain' },
  { symptom: 'cholera', specializations: ['Infectious Disease', 'Gastroenterology'], description: 'Severe diarrhea and dehydration' },
  { symptom: 'covid-19', specializations: ['Infectious Disease', 'Pulmonology'], description: 'Fever, cough, loss of taste or smell' },

  // Rheumatology
  { symptom: 'arthritis', specializations: ['Rheumatology', 'Orthopedics'], description: 'Joint inflammation and pain' },
  { symptom: 'gout', specializations: ['Rheumatology', 'General Medicine'], description: 'Severe joint pain, redness' },

  // Nephrology
  { symptom: 'kidney stone', specializations: ['Nephrology', 'Urology'], description: 'Severe lower back pain, blood in urine' },
  { symptom: 'chronic kidney disease', specializations: ['Nephrology'], description: 'Gradual loss of kidney function' },
];

/**
 * Sample doctors list — Guaranteed 5+ doctors for every specialization & disease
 */
const specializationsData = [
  {
    specialization: 'General Medicine',
    doctors: [
      { name: 'Dr. Rahman Chowdhury', email: 'dr.rahman@docbd.com', location: 'Chittagong', fee: 800, rating: 4.8, bio: 'Senior Consultant in Internal Medicine with 14 years experience at Chittagong Medical College.' },
      { name: 'Dr. Alamgir Hossain', email: 'dr.alamgir@docbd.com', location: 'Dhaka', fee: 1000, rating: 4.7, bio: 'Internal medicine specialist with expertise in chronic disease management and preventive care.' },
      { name: 'Dr. Shahana Parveen', email: 'dr.shahana@docbd.com', location: 'Sylhet', fee: 900, rating: 4.6, bio: 'Experienced General Practitioner focusing on adult medicine and infectious diseases.' },
      { name: 'Dr. Mizanur Rahman', email: 'dr.mizanur@docbd.com', location: 'Rajshahi', fee: 750, rating: 4.5, bio: 'General physician with 10 years experience treating complex multi-system ailments.' },
      { name: 'Dr. Jesmin Akter', email: 'dr.jesmin@docbd.com', location: 'Dhaka', fee: 1100, rating: 4.9, bio: 'Senior Consultant at Square Hospital specializing in internal medicine and fever management.' },
    ]
  },
  {
    specialization: 'Cardiology',
    doctors: [
      { name: 'Dr. Aminul Islam', email: 'dr.aminul@docbd.com', location: 'Dhaka', fee: 1500, rating: 4.9, bio: 'Experienced cardiologist at National Heart Foundation specializing in interventional cardiology.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Hasan-Faruque-Bhuiyan.jpg' },
      { name: 'Dr. Sajjad Hossain', email: 'dr.sajjad@docbd.com', location: 'Chittagong', fee: 1400, rating: 4.8, bio: 'Consultant Cardiologist specializing in echocardiography and hypertension management.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-M.-Reazul-Alam.jpg' },
      { name: 'Dr. Nazmul Huda', email: 'dr.nazmul@docbd.com', location: 'Dhaka', fee: 1600, rating: 4.7, bio: 'Expert in heart failure, arrhythmia treatment, and coronary interventions at United Hospital.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Ishteak-Ahmed-Oneek.jpg' },
      { name: 'Dr. Farzana Haque', email: 'dr.farzana@docbd.com', location: 'Sylhet', fee: 1200, rating: 4.6, bio: 'Cardiologist with specialized training in preventive cardiology and lipidology.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Tanvir Ahmed', email: 'dr.tanvir@docbd.com', location: 'Rajshahi', fee: 1300, rating: 4.8, bio: 'Clinical Cardiologist with 12 years of practice at Rajshahi Heart Centre.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Toufiqe-E-Ealahi.jpg' },
    ]
  },
  {
    specialization: 'Dermatology',
    doctors: [
      { name: 'Dr. Fatema Begum', email: 'dr.fatema@docbd.com', location: 'Dhaka', fee: 1200, rating: 4.8, bio: 'Board-certified dermatologist specializing in skin allergies, eczema, and cosmetic dermatology.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2020/08/Prof.-Dr.-Md.-Rashidul-Hasan.jpg' },
      { name: 'Dr. Kazi Nahid', email: 'dr.kazi@docbd.com', location: 'Chittagong', fee: 1000, rating: 4.6, bio: 'Expert in acne treatment, psoriasis management, and pediatric dermatology.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Fatima-Farhana.jpg' },
      { name: 'Dr. Mehedi Hasan', email: 'dr.mehedi@docbd.com', location: 'Dhaka', fee: 1300, rating: 4.9, bio: 'Senior Dermatologist specializing in laser surgery, skin cancer screening, and hair loss.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Kabir-Hasan-Parvez.jpg' },
      { name: 'Dr. Rumana Chowdhury', email: 'dr.rumana@docbd.com', location: 'Sylhet', fee: 1100, rating: 4.7, bio: 'Consultant Dermatologist focusing on autoimmune skin conditions and aesthetic dermatology.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Zarin Subah', email: 'dr.zarin@docbd.com', location: 'Khulna', fee: 900, rating: 4.5, bio: 'Dermatologist with 8 years of clinical experience treating fungal infections and allergies.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Debabrata-Ghosh.jpg' },
    ]
  },
  {
    specialization: 'Orthopedics',
    doctors: [
      { name: 'Dr. Rafiq Ahmed', email: 'dr.rafiq@docbd.com', location: 'Dhaka', fee: 1800, rating: 4.9, bio: 'Orthopedic surgeon specializing in joint replacement and sports injuries trained at BSMMU.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Shrikantha-Karmaker.jpg' },
      { name: 'Dr. Golam Kibria', email: 'dr.golam@docbd.com', location: 'Chittagong', fee: 1500, rating: 4.7, bio: 'Spine specialist and orthopedic trauma surgeon at Chittagong Medical College Hospital.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Atiqure-Rahman-Rimel.jpg' },
      { name: 'Dr. Jahangir Alam', email: 'dr.jahangir@docbd.com', location: 'Dhaka', fee: 1600, rating: 4.8, bio: 'Arthroscopy specialist focusing on knee and shoulder ligament reconstruction.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-M.-Reazul-Alam.jpg' },
      { name: 'Dr. Saiful Islam', email: 'dr.saiful@docbd.com', location: 'Sylhet', fee: 1300, rating: 4.6, bio: 'Consultant Orthopedic Surgeon with 10 years experience in bone fracture repair.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Toufiqe-E-Ealahi.jpg' },
      { name: 'Dr. Taskin Ahmed', email: 'dr.taskin@docbd.com', location: 'Rajshahi', fee: 1200, rating: 4.5, bio: 'Expert in pediatric orthopedics, joint pain management, and arthritis surgery.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Ariful-Islam.jpg' },
    ]
  },
  {
    specialization: 'Neurology',
    doctors: [
      { name: 'Dr. Kamal Hossain', email: 'dr.kamal@docbd.com', location: 'Dhaka', fee: 2000, rating: 4.9, bio: 'Neurologist specializing in epilepsy, stroke, and headache disorders. Former chief at BIRDEM.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Mohammad-Shafiqul-Islam.jpg' },
      { name: 'Dr. Syed Ali', email: 'dr.syed@docbd.com', location: 'Chittagong', fee: 1700, rating: 4.7, bio: 'Expert in movement disorders, Parkinson\'s disease, and peripheral neuropathy.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Atiqure-Rahman-Rimel.jpg' },
      { name: 'Dr. Anowar Hossain', email: 'dr.anowar@docbd.com', location: 'Dhaka', fee: 1800, rating: 4.8, bio: 'Senior Consultant Neurologist specializing in neuro-intensive care and stroke prevention.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Kabir-Hasan-Parvez.jpg' },
      { name: 'Dr. Rehana Parvin', email: 'dr.rehana@docbd.com', location: 'Sylhet', fee: 1500, rating: 4.6, bio: 'Consultant Neurologist focusing on migraine management, dementia, and nerve conduction studies.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Mahfuzur Rahman', email: 'dr.mahfuzur@docbd.com', location: 'Khulna', fee: 1400, rating: 4.5, bio: 'Clinical Neurologist with expertise in seizure disorders and neuromuscular diseases.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Debabrata-Ghosh.jpg' },
    ]
  },
  {
    specialization: 'Gastroenterology',
    doctors: [
      { name: 'Dr. Habibur Rahman', email: 'dr.habib@docbd.com', location: 'Khulna', fee: 1100, rating: 4.6, bio: 'Gastroenterologist with expertise in endoscopy and liver diseases at Khulna Medical College.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Tasmir-Arefin.jpg' },
      { name: 'Dr. Towhidul Islam', email: 'dr.towhidul@docbd.com', location: 'Dhaka', fee: 1600, rating: 4.9, bio: 'Senior Gastroenterologist specializing in IBS, peptic ulcer disease, and therapeutic endoscopy.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-M.-Reazul-Alam.jpg' },
      { name: 'Dr. Salma Khatun', email: 'dr.salma@docbd.com', location: 'Chittagong', fee: 1300, rating: 4.7, bio: 'Consultant Hepatologist specializing in fatty liver disease, hepatitis, and GI disorders.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Zakir Hossain', email: 'dr.zakir@docbd.com', location: 'Dhaka', fee: 1500, rating: 4.8, bio: 'Expert in inflammatory bowel disease (IBD) and colonoscopy interventions at Labaid.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Shovon-Rahut.jpg' },
      { name: 'Dr. Afroza Begum', email: 'dr.afroza@docbd.com', location: 'Sylhet', fee: 1200, rating: 4.5, bio: 'Gastroenterology specialist focusing on acidity, GERD, and gall bladder conditions.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Fatima-Farhana.jpg' },
    ]
  },
  {
    specialization: 'ENT',
    doctors: [
      { name: 'Dr. Mahmuda Akter', email: 'dr.mahmuda@docbd.com', location: 'Comilla', fee: 1000, rating: 4.7, bio: 'ENT specialist treating sinus, throat, and ear disorders. Previously worked at Apollo Hospitals.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Prof.-Brig.-Gen-Dr.-Md.-Bashir-Ahmed.jpg' },
      { name: 'Dr. Delwar Hossain', email: 'dr.delwar@docbd.com', location: 'Dhaka', fee: 1400, rating: 4.9, bio: 'Senior Otolaryngologist specializing in endoscopic sinus surgery and hearing loss.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Kabir-Hasan-Parvez.jpg' },
      { name: 'Dr. Suraiya Begum', email: 'dr.suraiya@docbd.com', location: 'Chittagong', fee: 1100, rating: 4.6, bio: 'Consultant ENT Surgeon specializing in tonsillectomy, vertigo, and throat pathologies.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Ariful Islam', email: 'dr.ariful@docbd.com', location: 'Dhaka', fee: 1300, rating: 4.8, bio: 'Expert in micro-ear surgery and vocal cord disorders at BSMMU.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Ariful-Islam.jpg' },
      { name: 'Dr. Humayun Kabir', email: 'dr.humayun@docbd.com', location: 'Sylhet', fee: 1000, rating: 4.5, bio: 'ENT surgeon with 9 years experience in allergic rhinitis and snoring disorders.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Toufiqe-E-Ealahi.jpg' },
    ]
  },
  {
    specialization: 'Ophthalmology',
    doctors: [
      { name: 'Dr. Sharmin Jahan', email: 'dr.sharmin@docbd.com', location: 'Sylhet', fee: 1000, rating: 4.6, bio: 'Eye specialist with expertise in cataract surgery and glaucoma treatment at Ispahani Islamia.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Mosharraf Hossain', email: 'dr.mosharraf@docbd.com', location: 'Dhaka', fee: 1500, rating: 4.9, bio: 'Senior Vitreoretinal Surgeon specializing in diabetic retinopathy and LASIK vision correction.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Debabrata-Ghosh.jpg' },
      { name: 'Dr. Reshma Parveen', email: 'dr.reshma@docbd.com', location: 'Chittagong', fee: 1200, rating: 4.7, bio: 'Consultant Ophthalmologist specializing in pediatric eye care and squint surgery.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Fatima-Farhana.jpg' },
      { name: 'Dr. Faisal Ahmed', email: 'dr.faisal@docbd.com', location: 'Dhaka', fee: 1400, rating: 4.8, bio: 'Cornea and Refractive surgery specialist at National Institute of Ophthalmology.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Mohammad-Shafiqul-Islam.jpg' },
      { name: 'Dr. Dilruba Khanom', email: 'dr.dilruba@docbd.com', location: 'Rajshahi', fee: 950, rating: 4.5, bio: 'Ophthalmologist specializing in dry eye syndrome, glaucoma, and prescription optics.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2020/08/Prof.-Dr.-Md.-Rashidul-Hasan.jpg' },
    ]
  },
  {
    specialization: 'Psychiatry',
    doctors: [
      { name: 'Dr. Tahmina Rahman', email: 'dr.tahmina@docbd.com', location: 'Dhaka', fee: 1500, rating: 4.9, bio: 'Psychiatrist focusing on anxiety, depression, and cognitive behavioral therapy.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Kabir-Hasan-Parvez.jpg' },
      { name: 'Dr. Imran Khan', email: 'dr.imran@docbd.com', location: 'Chittagong', fee: 1300, rating: 4.7, bio: 'Consultant Psychiatrist specializing in bipolar disorder, OCD, and stress management.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Shovon-Rahut.jpg' },
      { name: 'Dr. Nigar Sultana', email: 'dr.nigar@docbd.com', location: 'Dhaka', fee: 1600, rating: 4.8, bio: 'Child and Adolescent Psychiatrist specializing in ADHD, autism, and behavioral therapy.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Firoz Ahmed', email: 'dr.firoz@docbd.com', location: 'Sylhet', fee: 1200, rating: 4.6, bio: 'Psychiatrist with expertise in sleep disorders, PTSD, and psychopharmacology.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Julfikar-Saif.jpg' },
      { name: 'Dr. Sadia Afroze', email: 'dr.sadia@docbd.com', location: 'Khulna', fee: 1100, rating: 4.5, bio: 'Clinical Psychiatrist advocating mental health wellness, panic disorder treatment.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Fatima-Farhana.jpg' },
    ]
  },
  {
    specialization: 'Gynecology',
    doctors: [
      { name: 'Dr. Nasrin Akter', email: 'dr.nasrin@docbd.com', location: 'Sylhet', fee: 1000, rating: 4.8, bio: 'Expert in women\'s health, prenatal care, and gynecological surgery at MAG Osmani.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Sultana Razia', email: 'dr.sultana@docbd.com', location: 'Dhaka', fee: 1600, rating: 4.9, bio: 'Senior Consultant Obstetrician specializing in high-risk pregnancy and laparoscopic surgery.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Fatima-Farhana.jpg' },
      { name: 'Dr. Laila Arjumand', email: 'dr.laila@docbd.com', location: 'Chittagong', fee: 1300, rating: 4.7, bio: 'Consultant Gynecologist specializing in PCOS management, infertility, and menopause care.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Nusrat Jahan', email: 'dr.nusrat@docbd.com', location: 'Dhaka', fee: 1500, rating: 4.8, bio: 'Specialist in reproductive endocrinology and IVF at Square Hospital.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Fatima-Farhana.jpg' },
      { name: 'Dr. Shamima Nasrin', email: 'dr.shamima@docbd.com', location: 'Rajshahi', fee: 1100, rating: 4.6, bio: 'Gynecologist with 11 years experience in prenatal care, fibroid treatment, and deliveries.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
    ]
  },
  {
    specialization: 'Urology',
    doctors: [
      { name: 'Dr. Kabir Hossain', email: 'dr.kabir@docbd.com', location: 'Dhaka', fee: 1600, rating: 4.8, bio: 'Senior Urologist specializing in kidney stone laser surgery and prostate diseases.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Debabrata-Ghosh.jpg' },
      { name: 'Dr. Shafiqul Islam', email: 'dr.shafiqul@docbd.com', location: 'Chittagong', fee: 1400, rating: 4.7, bio: 'Consultant Urologist specializing in reconstructive urology and urinary tract infections.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Ariful-Islam.jpg' },
      { name: 'Dr. Rashedul Hasan', email: 'dr.rashedul@docbd.com', location: 'Dhaka', fee: 1700, rating: 4.9, bio: 'Expert in urological oncology, male infertility, and endourology at BSMMU.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-M.-Reazul-Alam.jpg' },
      { name: 'Dr. Sabrina Akter', email: 'dr.sabrina.urology@docbd.com', location: 'Sylhet', fee: 1300, rating: 4.6, bio: 'Female Urologist specializing in incontinence, bladder issues, and pelvic floor disorders.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Jahangir Kabir', email: 'dr.jahangir.k@docbd.com', location: 'Khulna', fee: 1200, rating: 4.5, bio: 'Clinical Urologist with 9 years experience in laparoscopic urological procedures.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Toufiqe-E-Ealahi.jpg' },
    ]
  },
  {
    specialization: 'Pediatrics',
    doctors: [
      { name: 'Dr. Sufia Khatun', email: 'dr.sufia@docbd.com', location: 'Rajshahi', fee: 700, rating: 4.6, bio: 'Pediatrician specializing in neonatal care and child growth & development.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Abu Sayed', email: 'dr.sayed@docbd.com', location: 'Dhaka', fee: 1400, rating: 4.9, bio: 'Senior Consultant Pediatrician specializing in pediatric respiratory diseases and nutrition.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Shovon-Rahut.jpg' },
      { name: 'Dr. Kaniz Fatima', email: 'dr.kaniz@docbd.com', location: 'Chittagong', fee: 1100, rating: 4.7, bio: 'Pediatric specialist focusing on childhood allergies, vaccination, and infectious diseases.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Fatima-Farhana.jpg' },
      { name: 'Dr. Mostafa Kamal', email: 'dr.mostafa@docbd.com', location: 'Dhaka', fee: 1300, rating: 4.8, bio: 'Pediatric Cardiologist focusing on congenital heart defects and child emergency care.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Ishteak-Ahmed-Oneek.jpg' },
      { name: 'Dr. Sharmin Akter', email: 'dr.sharmin.peds@docbd.com', location: 'Sylhet', fee: 900, rating: 4.5, bio: 'Consultant Pediatrician with 8 years experience in infant nutrition and fevers.', photo: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
    ]
  },
  {
    specialization: 'Pulmonology',
    doctors: [
      { name: 'Dr. Anisur Rahman', email: 'dr.anisur@docbd.com', location: 'Dhaka', fee: 1300, rating: 4.8, bio: 'Pulmonologist specializing in asthma, COPD, and respiratory infections at NIDCH.' },
      { name: 'Dr. Gazi Abdul Haq', email: 'dr.gazi@docbd.com', location: 'Chittagong', fee: 1400, rating: 4.7, bio: 'Senior Chest Specialist focusing on tuberculosis, pneumonia, and sleep apnea.' },
      { name: 'Dr. Sabrina Ferdous', email: 'dr.sabrina.chest@docbd.com', location: 'Dhaka', fee: 1500, rating: 4.9, bio: 'Consultant Pulmonologist specializing in interstitial lung disease and bronchoscopy.' },
      { name: 'Dr. Mahmudul Hasan', email: 'dr.mahmudul@docbd.com', location: 'Sylhet', fee: 1200, rating: 4.6, bio: 'Chest Physician with 10 years experience treating chronic cough and asthma.' },
      { name: 'Dr. Faruq Hossain', email: 'dr.faruq@docbd.com', location: 'Rajshahi', fee: 1100, rating: 4.5, bio: 'Pulmonology specialist focusing on allergic airway diseases and smoking cessation.' },
    ]
  },
  {
    specialization: 'Endocrinology',
    doctors: [
      { name: 'Dr. Farhana Yasmin', email: 'dr.farhana@docbd.com', location: 'Dhaka', fee: 1400, rating: 4.9, bio: 'Expert in diabetes management and thyroid disorders. Senior consultant at Square Hospital.' },
      { name: 'Dr. Motiur Rahman', email: 'dr.motiur@docbd.com', location: 'Chittagong', fee: 1300, rating: 4.7, bio: 'Consultant Endocrinologist specializing in metabolic syndrome and adrenal disorders.' },
      { name: 'Dr. Roksana Begum', email: 'dr.roksana@docbd.com', location: 'Dhaka', fee: 1500, rating: 4.8, bio: 'Senior Endocrinologist at BIRDEM focusing on gestational diabetes and osteoporosis.' },
      { name: 'Dr. Kamrul Hasan', email: 'dr.kamrul@docbd.com', location: 'Sylhet', fee: 1200, rating: 4.6, bio: 'Diabetologist and Endocrinologist specializing in insulin therapy and obesity care.' },
      { name: 'Dr. Nazia Hassan', email: 'dr.nazia@docbd.com', location: 'Khulna', fee: 1100, rating: 4.5, bio: 'Endocrinology specialist focusing on pituitary gland conditions and hormone disorders.' },
    ]
  },
  {
    specialization: 'Infectious Disease',
    doctors: [
      { name: 'Dr. Tariqul Islam', email: 'dr.tariqul@docbd.com', location: 'Dhaka', fee: 1600, rating: 4.9, bio: 'Specialist in viral & bacterial infections (COVID-19, Dengue, TB). Associate Professor at ICDDR,B.' },
      { name: 'Dr. Muniruzzaman', email: 'dr.munir@docbd.com', location: 'Chittagong', fee: 1300, rating: 4.7, bio: 'Consultant in Tropical Medicine and Dengue/Typhoid fever management.' },
      { name: 'Dr. Rubaiyat Ferdous', email: 'dr.rubaiyat@docbd.com', location: 'Dhaka', fee: 1500, rating: 4.8, bio: 'Senior Infectious Disease Specialist focusing on antimicrobial resistance and HIV/viral care.' },
      { name: 'Dr. Asif Iqbal', email: 'dr.asif@docbd.com', location: 'Sylhet', fee: 1200, rating: 4.6, bio: 'Epidemiologist and Infectious Disease Physician specializing in seasonal epidemic fevers.' },
      { name: 'Dr. Sanjida Khan', email: 'dr.sanjida@docbd.com', location: 'Rajshahi', fee: 1100, rating: 4.5, bio: 'Specialist in fungal infections, post-viral complications, and travel medicine.' },
    ]
  },
  {
    specialization: 'Rheumatology',
    doctors: [
      { name: 'Dr. Shireen Akhter', email: 'dr.shireen@docbd.com', location: 'Chittagong', fee: 1300, rating: 4.7, bio: 'Rheumatologist specializing in arthritis, lupus, and autoimmune disorders.' },
      { name: 'Dr. Enamul Hoque', email: 'dr.enamul@docbd.com', location: 'Dhaka', fee: 1700, rating: 4.9, bio: 'Senior Rheumatology Consultant specializing in rheumatoid arthritis, gout, and ankylosing spondylitis.' },
      { name: 'Dr. Sharmeen Ahmed', email: 'dr.sharmeen@docbd.com', location: 'Dhaka', fee: 1500, rating: 4.8, bio: 'Expert in pediatric rheumatology and systemic lupus erythematosus (SLE).' },
      { name: 'Dr. Obaidul Islam', email: 'dr.obaidul@docbd.com', location: 'Sylhet', fee: 1200, rating: 4.6, bio: 'Consultant Rheumatologist with expertise in joint pain, osteoporosis, and vasculitis.' },
      { name: 'Dr. Tamanna Yeasmin', email: 'dr.tamanna@docbd.com', location: 'Rajshahi', fee: 1100, rating: 4.5, bio: 'Rheumatology physician focusing on fibromyalgia, soft tissue rheumatism, and osteoarthritis.' },
    ]
  },
  {
    specialization: 'Nephrology',
    doctors: [
      { name: 'Dr. Hasan Mahmud', email: 'dr.hasan@docbd.com', location: 'Sylhet', fee: 1200, rating: 4.8, bio: 'Nephrologist specializing in chronic kidney disease and dialysis management.', profilePhoto: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg' },
      { name: 'Dr. Sirajul Islam', email: 'dr.sirajul@docbd.com', location: 'Dhaka', fee: 1800, rating: 4.9, bio: 'Senior Kidney Specialist and Transplant Nephrologist at National Institute of Kidney Diseases.', profilePhoto: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-M.-Reazul-Alam.jpg' },
      { name: 'Dr. Bilkis Nahar', email: 'dr.bilkis@docbd.com', location: 'Chittagong', fee: 1400, rating: 4.7, bio: 'Consultant Nephrologist specializing in diabetic nephropathy and hypertension.', profilePhoto: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Fatima-Farhana.jpg' },
      { name: 'Dr. Monirul Haque', email: 'dr.monirul@docbd.com', location: 'Dhaka', fee: 1600, rating: 4.8, bio: 'Expert in acute kidney injury, hemodialysis, and glomerulonephritis.', profilePhoto: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Shovon-Rahut.jpg' },
      { name: 'Dr. Fahmida Sultana', email: 'dr.fahmida@docbd.com', location: 'Khulna', fee: 1100, rating: 4.5, bio: 'Nephrologist focusing on electrolyte disorders, proteinuria, and renal disease prevention.', profilePhoto: 'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Debabrata-Ghosh.jpg' },
    ]
  }
];

// Flatten into sampleDoctors array with unique BMDC numbers
let bmdcCounter = 10001;
const doctorPhotosList = [
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Kabir-Hasan-Parvez.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Toufiqe-E-Ealahi.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-M.-Reazul-Alam.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Tannita-Das.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Mohammad-Shafiqul-Islam.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2020/08/Prof.-Dr.-Md.-Rashidul-Hasan.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Ariful-Islam.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Shrikantha-Karmaker.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Debabrata-Ghosh.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Prof.-Brig.-Gen-Dr.-Md.-Bashir-Ahmed.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Raihan-Bin-Sharif.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Shovon-Rahut.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Hasan-Faruque-Bhuiyan.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Julfikar-Saif.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Ishteak-Ahmed-Oneek.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Fatima-Farhana.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Atiqure-Rahman-Rimel.jpg',
  'https://www.doctorbangladesh.com/wp-content/uploads/2026/07/Dr.-Md.-Tasmir-Arefin.jpg',
];

let photoIdx = 0;
const sampleDoctors = specializationsData.flatMap((specGroup) =>
  specGroup.doctors.map((doc) => {
    const photo = doc.profilePhoto || doc.photo || doctorPhotosList[photoIdx % doctorPhotosList.length];
    photoIdx++;
    return {
      name: doc.name,
      email: doc.email,
      specialization: specGroup.specialization,
      location: doc.location,
      bmdcNumber: `BMDC-${bmdcCounter++}`,
      bio: doc.bio,
      profilePhoto: photo,
      consultationFee: doc.fee,
      availability: [
        { day: 'Saturday', startTime: '09:00', endTime: '13:00' },
        { day: 'Monday', startTime: '14:00', endTime: '18:00' },
        { day: 'Wednesday', startTime: '16:00', endTime: '20:00' },
      ],
      rating: doc.rating,
    };
  })
);

/**
 * Main seed function
 */
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      DoctorProfile.deleteMany({}),
      SymptomMapping.deleteMany({}),
    ]);

    // ─── Seed Symptom Mappings ─────────────────────────────
    console.log('💊 Seeding symptom mappings...');
    await SymptomMapping.insertMany(symptomMappings);
    console.log(`   ✅ ${symptomMappings.length} symptom mappings created`);

    // ─── Create Admin User ─────────────────────────────────
    console.log('👤 Creating admin user...');
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@docbd.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`   ✅ Admin: admin@docbd.com / admin123`);

    // ─── Create Sample Doctors ─────────────────────────────
    console.log('🩺 Creating sample doctors...');
    for (const doc of sampleDoctors) {
      const user = await User.create({
        name: doc.name,
        email: doc.email,
        password: 'doctor123',
        role: 'doctor',
      });

      await DoctorProfile.create({
        userId: user._id,
        bmdcNumber: doc.bmdcNumber,
        specialization: doc.specialization,
        location: doc.location,
        bio: doc.bio,
        profilePhoto: doc.profilePhoto,
        consultationFee: doc.consultationFee,
        availability: doc.availability,
        rating: doc.rating,
        totalReviews: Math.floor(Math.random() * 100) + 10,
      });

      console.log(`   ✅ ${doc.name} — ${doc.specialization} (${doc.location})`);
    }

    // ─── Create Sample Patient ─────────────────────────────
    console.log('🧑 Creating sample patient...');
    await User.create({
      name: 'Rahim Uddin',
      email: 'patient@docbd.com',
      password: 'patient123',
      role: 'patient',
    });
    console.log(`   ✅ Patient: patient@docbd.com / patient123`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('─────────────────────────────────');
    console.log('Demo Accounts:');
    console.log('  Admin:   admin@docbd.com   / admin123');
    console.log('  Doctor:  dr.aminul@docbd.com / doctor123');
    console.log('  Patient: patient@docbd.com / patient123');
    console.log('─────────────────────────────────');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
