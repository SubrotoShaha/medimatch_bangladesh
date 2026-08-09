import { useState, useEffect } from 'react';
import { Calendar, Clock, History } from 'lucide-react';
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
      toast.error('Failed to fetch appointments');
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

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">Welcome, {user?.name} 👋</h1>
          <p className="text-slate-500">Manage your appointments</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', val: appointments.length, color: 'text-blue-600' },
            { label: 'Pending', val: appointments.filter(a => a.status === 'pending').length, color: 'text-amber-500' },
            { label: 'Confirmed', val: appointments.filter(a => a.status === 'confirmed').length, color: 'text-teal-600' },
            { label: 'Completed', val: appointments.filter(a => a.status === 'completed').length, color: 'text-emerald-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
          {[{ id: 'upcoming', label: 'Upcoming', Icon: Calendar, c: upcoming.length },
            { id: 'past', label: 'Past', Icon: History, c: past.length }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              <tab.Icon className="w-4 h-4" />{tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>{tab.c}</span>
            </button>
          ))}
        </div>

        {loading ? <LoadingSpinner text="Loading..." /> : current.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.map(apt => <AppointmentCard key={apt._id} appointment={apt} userRole="patient" onStatusChange={handleStatusChange} />)}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
            <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-600">No {activeTab} appointments</h3>
          </div>
        )}
      </div>
    </div>
  );
}
