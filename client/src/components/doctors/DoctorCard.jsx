import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, DollarSign, Calendar, Shield, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BookingModal from '../ui/BookingModal';

/**
 * Doctor Card Component — premium design with clear CTAs and refined copy
 */
export default function DoctorCard({ doctor }) {
  const { isAuthenticated, user } = useAuth();
  const [showBooking, setShowBooking] = useState(false);

  const name = doctor.userId?.name || 'Doctor';
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const colors = [
    'from-blue-500 to-blue-600',
    'from-teal-500 to-emerald-600',
    'from-indigo-500 to-indigo-600',
    'from-violet-500 to-violet-600',
    'from-cyan-500 to-cyan-600',
    'from-emerald-500 to-green-600',
  ];
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const avatarGradient = colors[colorIndex];

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-[1.375rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden card-hover group flex flex-col">
        <div className="p-5 flex-1 flex flex-col">

          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            {doctor.profilePhoto ? (
              <img
                src={doctor.profilePhoto}
                alt={name}
                className="w-16 h-16 rounded-xl object-cover shadow-md shrink-0 border border-slate-200 dark:border-slate-700"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${avatarGradient} items-center justify-center shadow-lg shrink-0 ${
                doctor.profilePhoto ? 'hidden' : 'flex'
              }`}
            >
              <span className="text-white font-bold text-xl">{initials}</span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-slate-800 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {name}
              </h3>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{doctor.specialization}</p>
              <div className="flex items-center gap-1 mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{doctor.location}</span>
              </div>
            </div>

            {/* Verified badge */}
            <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" title="Verified Doctor" />
          </div>

          {/* Bio */}
          {doctor.bio && (
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
              {doctor.bio}
            </p>
          )}

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {doctor.rating?.toFixed(1) || 'New'}
              </span>
              {doctor.totalReviews > 0 && (
                <span className="text-xs text-slate-400">({doctor.totalReviews})</span>
              )}
            </div>

            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />

            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <span className="text-xs font-medium text-slate-400">Fee</span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">৳{doctor.consultationFee}</span>
            </div>
          </div>

          {/* Availability chips */}
          {doctor.availability?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {doctor.availability.slice(0, 3).map((slot, i) => (
                <span key={i} className="text-xs px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg border border-slate-100 dark:border-slate-700 font-medium">
                  {slot.day.slice(0, 3)}
                </span>
              ))}
              {doctor.availability.length > 3 && (
                <span className="text-xs px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-lg border border-slate-100 dark:border-slate-700">
                  +{doctor.availability.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* BMDC */}
          <div className="text-xs text-slate-400 dark:text-slate-500 mb-4 font-mono">
            BMDC Reg: {doctor.bmdcNumber}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-auto">
            <Link
              to={`/doctors/${doctor._id}`}
              className="flex-1 text-center py-2.5 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 rounded-xl transition-all border border-blue-100 dark:border-blue-900/50 flex items-center justify-center gap-1.5"
            >
              View Profile
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            {isAuthenticated && user?.role === 'patient' ? (
              <button
                onClick={() => setShowBooking(true)}
                className="flex-1 btn-secondary text-sm justify-center py-2.5"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
            ) : !isAuthenticated ? (
              <Link
                to="/login"
                className="flex-1 text-center py-2.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 rounded-xl transition-all border border-emerald-100 dark:border-emerald-900/50"
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
    </>
  );
}
