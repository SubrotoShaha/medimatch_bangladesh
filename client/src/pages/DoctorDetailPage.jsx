import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Star, Clock, Calendar, DollarSign,
  Award, ArrowLeft, User,
} from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import BookingModal from '../components/ui/BookingModal';
import LoadingSpinner from '../components/ui/LoadingSpinner';

/**
 * Doctor Detail Page
 * Full profile view with booking capability
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
          <h2 className="text-2xl font-bold text-slate-600 mb-2">Doctor Not Found</h2>
          <Link to="/symptoms" className="text-blue-600 hover:underline">Back to Symptom Checker</Link>
        </div>
      </div>
    );
  }

  const name = doctor.userId?.name || 'Doctor';
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          to="/symptoms"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-8 py-10">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {doctor.profilePhoto ? (
                <img
                  src={doctor.profilePhoto}
                  alt={name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-lg border-2 border-white/40 shrink-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-md items-center justify-center shrink-0 ${doctor.profilePhoto ? 'hidden' : 'flex'}`}>
                <span className="text-3xl font-bold text-white">{initials}</span>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-white mb-1">{name}</h1>
                <p className="text-blue-100 text-lg">{doctor.specialization}</p>
                <div className="flex items-center gap-4 mt-3 justify-center sm:justify-start">
                  <div className="flex items-center gap-1 text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/80">
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span className="text-sm">{doctor.rating?.toFixed(1)} ({doctor.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Bio */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">About</h3>
              <p className="text-slate-600 leading-relaxed">{doctor.bio || 'No bio available.'}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Consultation Fee</p>
                <p className="text-2xl font-bold text-blue-600">৳{doctor.consultationFee}</p>
              </div>
              <div className="bg-teal-50 rounded-xl p-4 text-center">
                <Award className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500">BMDC Number</p>
                <p className="text-lg font-bold text-teal-600">{doctor.bmdcNumber}</p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4 text-center">
                <Calendar className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Available Days</p>
                <p className="text-2xl font-bold text-indigo-600">{doctor.availability?.length || 0}</p>
              </div>
            </div>

            {/* Availability Schedule */}
            {doctor.availability?.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Availability Schedule</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctor.availability.map((slot, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                      <div>
                        <p className="font-medium text-slate-700">{slot.day}</p>
                        <p className="text-sm text-slate-500">{slot.startTime} – {slot.endTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book Button */}
            {isAuthenticated && user?.role === 'patient' ? (
              <button
                onClick={() => setShowBooking(true)}
                className="w-full btn-primary justify-center py-4 text-lg"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
            ) : !isAuthenticated ? (
              <Link
                to="/login"
                className="block w-full text-center btn-primary justify-center py-4 text-lg"
              >
                Sign in to Book Appointment
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
