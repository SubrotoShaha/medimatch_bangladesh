import { useState, useEffect } from 'react';
import { Shield, Users, Activity, Stethoscope, Calendar, Plus } from 'lucide-react';
import api from '../api/axios';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);
  const [newSymptom, setNewSymptom] = useState({ symptom: '', specializations: '', description: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, symptomsRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/users'),
          api.get('/admin/symptoms'),
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data.users);
        setSymptoms(symptomsRes.data);
      } catch (error) {
        toast.error('Failed to load admin data');
      } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleAddSymptom = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/admin/symptoms', {
        symptom: newSymptom.symptom,
        specializations: newSymptom.specializations.split(',').map(s => s.trim()),
        description: newSymptom.description,
      });
      setSymptoms(prev => [...prev, data]);
      setNewSymptom({ symptom: '', specializations: '', description: '' });
      toast.success('Symptom mapping added!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add symptom');
    }
  };

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm">System management & analytics</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6 w-fit">
          {['stats', 'users', 'symptoms'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Stats Tab */}
        {activeTab === 'stats' && stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Total Users', val: stats.totalUsers, icon: Users, color: 'text-blue-600 bg-blue-50' },
              { label: 'Doctors', val: stats.totalDoctors, icon: Stethoscope, color: 'text-teal-600 bg-teal-50' },
              { label: 'Patients', val: stats.totalPatients, icon: Users, color: 'text-indigo-600 bg-indigo-50' },
              { label: 'Appointments', val: stats.totalAppointments, icon: Calendar, color: 'text-amber-600 bg-amber-50' },
              { label: 'Pending', val: stats.pendingAppointments, icon: Activity, color: 'text-rose-600 bg-rose-50' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-slate-800">{s.val}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map(u => (
                    <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">{u.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                          u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                          u.role === 'doctor' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Symptoms Tab */}
        {activeTab === 'symptoms' && (
          <div className="space-y-6">
            {/* Add Form */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Plus className="w-4 h-4" /> Add Symptom Mapping</h3>
              <form onSubmit={handleAddSymptom} className="flex flex-col sm:flex-row gap-3">
                <input value={newSymptom.symptom} onChange={e => setNewSymptom(p => ({ ...p, symptom: e.target.value }))}
                  placeholder="Symptom (e.g., fever)" className="input-field flex-1" required />
                <input value={newSymptom.specializations} onChange={e => setNewSymptom(p => ({ ...p, specializations: e.target.value }))}
                  placeholder="Specializations (comma-separated)" className="input-field flex-1" required />
                <button type="submit" className="btn-primary shrink-0">Add</button>
              </form>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Symptom</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Specializations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {symptoms.map(s => (
                      <tr key={s._id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700 capitalize">{s.symptom}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {s.specializations.map(sp => (
                              <span key={sp} className="text-xs px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full">{sp}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
