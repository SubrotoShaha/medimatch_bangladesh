import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Star, Clock, Calendar, DollarSign,
  Award, ArrowLeft, Shield, CheckCircle,
} from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import BookingModal from '../components/ui/BookingModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';

/**
 * Doctor Detail Page — refined header, polished info grid, warmer copy
 */
export default function DoctorDetailPage() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await api.get(`/doctors/${id}`);
        setDoctor(data);
      } catch (error) {
        console.error('Failed to fetch doctor:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading doctor profile..." />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-3">Doctor Not Found</h2>
          <Link to="/symptoms" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            ← Back to Symptom Checker
          </Link>
        </div>
      </div>
    );
  }

  const name = doctor.userId?.name || 'Doctor';
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-blue-950/20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          to="/symptoms"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-slate-900 rounded-[1.375rem] shadow-lift border border-slate-100 dark:border-slate-800 overflow-hidden animate-fade-in">

          {/* Hero Header */}
          <div className="relative bg-gradient-to-br from-[#0d2461] via-[#0f3460] to-[#0a3d4d] px-8 py-12 overflow-hidden">
            {/* Background texture */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: 'radial-gradient(circle at 15% 55%, rgba(255,255,255,0.5) 0%, transparent 45%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.4) 0%, transparent 45%)',
              }}
            />

            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              {doctor.profilePhoto ? (
                <img
                  src={doctor.profilePhoto}
                  alt={name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-xl border-2 border-white/30 shrink-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`w-24 h-24 rounded-2xl bg-white/15 backdrop-blur-md items-center justify-center shrink-0 border border-white/20 ${doctor.profilePhoto ? 'hidden' : 'flex'}`}>
                <span className="text-3xl font-extrabold text-white">{initials}</span>
              </div>

              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h1 className="text-3xl font-extrabold text-white">{name}</h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-teal-400/15 border border-teal-400/25 rounded-full text-xs font-semibold text-teal-300">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>
                <p className="text-blue-200 text-lg font-medium mb-3">{doctor.specialization}</p>
                <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
                  <div className="flex items-center gap-1.5 text-white/75">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/75">
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span className="text-sm font-semibold">{doctor.rating?.toFixed(1)}</span>
                    <span className="text-sm text-white/50">({doctor.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">

            {/* About */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-500 to-teal-500" />
                About the Doctor
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {doctor.bio || 'No bio provided yet.'}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-5 text-center border border-blue-100 dark:border-blue-900/50">
                <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Consultation Fee</p>
                <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">৳{doctor.consultationFee}</p>
              </div>
              <div className="bg-teal-50 dark:bg-teal-950/30 rounded-2xl p-5 text-center border border-teal-100 dark:border-teal-900/50">
                <Award className="w-6 h-6 text-teal-700 dark:text-teal-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">BMDC Number</p>
                <p className="text-base font-bold text-teal-700 dark:text-teal-400 font-mono">{doctor.bmdcNumber}</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-5 text-center border border-indigo-100 dark:border-indigo-900/50">
                <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Available Days</p>
                <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{doctor.availability?.length || 0}</p>
              </div>
            </div>

            {/* Availability Schedule */}
            {doctor.availability?.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-500 to-teal-500" />
                  When to Book
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.availability.map((slot, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="w-9 h-9 bg-blue-50 dark:bg-blue-950/40 rounded-lg flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">{slot.day}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{slot.startTime} – {slot.endTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Booking CTA */}
            {isAuthenticated && user?.role === 'patient' ? (
              <button
                onClick={() => setShowBooking(true)}
                className="w-full btn-primary justify-center py-4 text-base"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
            ) : !isAuthenticated ? (
              <Link
                to="/login"
                className="block w-full text-center btn-primary justify-center py-4 text-base"
              >
                Sign in to Book
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <BookingModal
        doctor={doctor}
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </div>
  );
}
