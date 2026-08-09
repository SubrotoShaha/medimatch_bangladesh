import { useState, useEffect } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

/**
 * Booking Modal - Date/Time picker for appointment booking
 * Shows doctor info, available days, and allows date/time selection
 */
export default function BookingModal({ doctor, isOpen, onClose, onBooked }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setDate('');
      setTime('');
      setSymptoms('');
      setNotes('');
    }
  }, [isOpen]);

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !doctor) return null;

  const doctorName = doctor.userId?.name || 'Doctor';

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) {
      toast.error('Please select both date and time');
      return;
    }

    setLoading(true);
    try {
      await api.post('/appointments', {
        doctorId: doctor._id,
        date,
        time,
        symptoms,
        notes,
      });
      toast.success('Appointment booked successfully!');
      onBooked?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-slide-up overflow-y-auto max-h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-xl font-bold">Book Appointment</h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/80 text-sm mt-1">
            with {doctorName} — {doctor.specialization}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Available Days Info */}
          {doctor.availability?.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-blue-700 mb-1">Available Days:</p>
              <div className="flex flex-wrap gap-1">
                {doctor.availability.map((slot, i) => (
                  <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {slot.day} ({slot.startTime}–{slot.endTime})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              <Calendar className="w-4 h-4 inline mr-1" />
              Appointment Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              required
              className="input-field"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              <Clock className="w-4 h-4 inline mr-1" />
              Preferred Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Symptoms (optional)
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms..."
              rows={2}
              className="input-field resize-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Additional Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information..."
              rows={2}
              className="input-field resize-none"
            />
          </div>

          {/* Fee Info */}
          <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between">
            <span className="text-sm text-slate-600">Consultation Fee:</span>
            <span className="text-lg font-bold text-blue-600">৳{doctor.consultationFee}</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary justify-center py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}
