import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, DollarSign, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BookingModal from '../ui/BookingModal';

/**
 * Doctor Card Component
 * Displays doctor info in a visually appealing card with booking CTA
 */
export default function DoctorCard({ doctor }) {
  const { isAuthenticated, user } = useAuth();
  const [showBooking, setShowBooking] = useState(false);

  const name = doctor.userId?.name || 'Doctor';
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  // Generate a consistent color from the doctor's name
  const colors = [
    'from-blue-500 to-blue-600',
    'from-teal-500 to-teal-600',
    'from-indigo-500 to-indigo-600',
    'from-violet-500 to-violet-600',
    'from-cyan-500 to-cyan-600',
    'from-emerald-500 to-emerald-600',
  ];
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const avatarGradient = colors[colorIndex];

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden card-hover group">
        <div className="p-5">
          {/* Header with avatar */}
          <div className="flex items-start gap-4 mb-4">
            {doctor.profilePhoto ? (
              <img
                src={doctor.profilePhoto}
                alt={name}
                className="w-14 h-14 rounded-xl object-cover shadow-md shrink-0 border border-slate-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${avatarGradient} items-center justify-center shadow-lg shrink-0 ${
                doctor.profilePhoto ? 'hidden' : 'flex'
              }`}
            >
              <span className="text-white font-bold text-lg">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                {name}
              </h3>
              <p className="text-sm font-medium text-teal-600">{doctor.specialization}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500">{doctor.location}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {doctor.bio && (
            <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
              {doctor.bio}
            </p>
          )}

          {/* Stats Row */}
          <div className="flex items-center gap-4 mb-4">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-sm font-semibold text-slate-700">
                {doctor.rating?.toFixed(1) || 'N/A'}
              </span>
              {doctor.totalReviews > 0 && (
                <span className="text-xs text-slate-400">({doctor.totalReviews})</span>
              )}
            </div>

            {/* Fee */}
            <div className="flex items-center gap-1 text-slate-500">
              <DollarSign className="w-3.5 h-3.5" />
              <span className="text-sm font-medium">৳{doctor.consultationFee}</span>
            </div>
          </div>

          {/* Availability chips */}
          {doctor.availability?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {doctor.availability.slice(0, 3).map((slot, i) => (
                <span key={i} className="text-xs px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md">
                  {slot.day.slice(0, 3)}
                </span>
              ))}
              {doctor.availability.length > 3 && (
                <span className="text-xs px-2 py-0.5 bg-slate-50 text-slate-400 rounded-md">
                  +{doctor.availability.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* BMDC */}
          <div className="text-xs text-slate-400 mb-4">
            BMDC: {doctor.bmdcNumber}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              to={`/doctors/${doctor._id}`}
              className="flex-1 text-center py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              View Profile
            </Link>
            {isAuthenticated && user?.role === 'patient' ? (
              <button
                onClick={() => setShowBooking(true)}
                className="flex-1 btn-secondary text-sm justify-center py-2.5"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </button>
            ) : !isAuthenticated ? (
              <Link
                to="/login"
                className="flex-1 text-center py-2.5 text-sm font-medium text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors"
              >
                Login to Book
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        doctor={doctor}
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </>
  );
}
