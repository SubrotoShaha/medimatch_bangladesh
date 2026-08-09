import { useState, useEffect } from 'react';
import { Calendar, History, CheckCircle, Clock, XCircle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import AppointmentCard from '../components/appointments/AppointmentCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get('/appointments');
      setAppointments(data.appointments);
    } catch (error) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, { status });
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  const upcoming = appointments.filter(a => ['pending', 'confirmed'].includes(a.status));
  const past = appointments.filter(a => ['completed', 'cancelled'].includes(a.status));
  const current = activeTab === 'upcoming' ? upcoming : past;

  const statCards = [
    {
      label: 'Total',
      val: appointments.length,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-100 dark:border-blue-900/50',
      accent: 'bg-blue-500',
      icon: Activity,
    },
    {
      label: 'Pending',
      val: appointments.filter(a => a.status === 'pending').length,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-100 dark:border-amber-900/50',
      accent: 'bg-amber-500',
      icon: Clock,
    },
    {
      label: 'Confirmed',
      val: appointments.filter(a => a.status === 'confirmed').length,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/30',
      border: 'border-teal-100 dark:border-teal-900/50',
      accent: 'bg-teal-500',
      icon: CheckCircle,
    },
    {
      label: 'Completed',
      val: appointments.filter(a => a.status === 'completed').length,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-100 dark:border-emerald-900/50',
      accent: 'bg-emerald-500',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-blue-950/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome header */}
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-blue-500/20 shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Good to see you, <span className="text-gradient">{user?.name}</span> 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                {appointments.length === 0
                  ? "You don't have any appointments yet. Browse doctors to get started."
                  : `You have ${upcoming.length} upcoming appointment${upcoming.length !== 1 ? 's' : ''}.`
                }
              </p>
            </div>
          </div>

          {appointments.length === 0 && !loading && (
            <Link
              to="/symptoms"
              className="mt-4 inline-flex btn-primary text-sm"
            >
              <Activity className="w-4 h-4" />
              Find a Doctor
            </Link>
          )}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {statCards.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`relative bg-white dark:bg-slate-900 rounded-2xl p-4 border ${s.border} shadow-sm overflow-hidden`}>
                <div className={`absolute top-0 left-0 bottom-0 w-1 ${s.accent} rounded-l-2xl`} />
                <Icon className={`w-4 h-4 ${s.color} mb-2`} />
                <p className={`text-2xl font-extrabold ${s.color} tabular-nums`}>{s.val}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl p-1 mb-6 w-fit border border-slate-200 dark:border-slate-800">
          {[
            { id: 'upcoming', label: 'Upcoming', Icon: Calendar, c: upcoming.length },
            { id: 'past', label: 'Past', Icon: History, c: past.length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <tab.Icon className="w-4 h-4" />
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === tab.id
                  ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}>
                {tab.c}
              </span>
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <LoadingSpinner text="Loading appointments..." />
        ) : current.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.map(apt => (
              <AppointmentCard
                key={apt._id}
                appointment={apt}
                userRole="patient"
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <Calendar className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-600 dark:text-slate-400">
              No {activeTab} appointments
            </h3>
            {activeTab === 'upcoming' && (
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                <Link to="/symptoms" className="text-blue-500 hover:underline font-medium">
                  Find a doctor
                </Link>{' '}
                to book your first appointment.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
