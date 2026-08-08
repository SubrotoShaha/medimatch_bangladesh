/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 * Email: subrotokumarshaha007@gmail.com
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import App from './App.jsx'

// ─── Developer Branding ──────────────────────────────────────
console.log(
  '%c🏥 MediMatch Bangladesh — Symptom-Based Doctor Recommendation System',
  'color: #2563eb; font-size: 14px; font-weight: bold;'
);
console.log(
  '%c👨‍💻 Developed by Subroto Kumar Shaha | Student of CSE\n🌐 Steps With SP | subrotokumarshaha007@gmail.com',
  'color: #0d9488; font-size: 11px;'
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
