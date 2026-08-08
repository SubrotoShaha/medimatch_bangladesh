# DocBD — Symptom-Based Doctor Recommendation System

DocBD is a comprehensive healthcare web application tailored for Bangladesh. It allows patients to input their symptoms, matches them with the right medical specializations using a smart algorithm, and recommends available doctors. Patients can then book appointments directly through the platform.

## 🚀 Features

- **Symptom Checker:** Enter symptoms to get AI-driven specialization recommendations.
- **Doctor Directory:** Search doctors by location, specialization, and fee.
- **Online Booking:** Real-time appointment scheduling with conflict prevention.
- **Role-based Dashboards:**
  - **Patients:** Manage upcoming and past appointments.
  - **Doctors:** Manage availability, profile, and accept/cancel appointments.
  - **Admins:** System-wide analytics, user management, and symptom mapping configuration.
- **Authentication:** Secure JWT-based login and registration.

## 📁 Project Structure

This project uses a standard Client-Server monorepo structure:

```
DocBD/
├── client/           # Frontend: React + Vite + Tailwind CSS
├── server/           # Backend: Node.js + Express + MongoDB
├── package.json      # Workspace root package (concurrent scripts)
└── README.md
```

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Lucide Icons, Axios.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT), bcryptjs.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally on default port 27017 or a cloud URI)

### 1. Installation

Install all dependencies for both frontend and backend using the root command:
```bash
npm run install:all
```

### 2. Environment Setup

Create `.env` files in both the `server` and `client` directories using `.env.example` as a template.

**`server/.env`**:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/docbd
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
```

### 3. Database Seeding

To populate the database with demo accounts, doctors, and symptom mappings, run:
```bash
cd server
npm run seed
```

### 4. Running the Application

You can start both the frontend and backend concurrently from the root directory:
```bash
npm run dev
```

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5173/api](http://localhost:5173/api)

## 🔐 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| **Patient** | `patient@docbd.com` | `patient123` |
| **Doctor** | `dr.aminul@docbd.com` | `doctor123` |
| **Admin** | `admin@docbd.com` | `admin123` |

## 👨‍💻 Author
**Subroto Kumar Shaha** | Student of CSE
Brand: Steps With SP
