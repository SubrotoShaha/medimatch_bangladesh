import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, Eye, EyeOff, Stethoscope, User as UserIcon, Shield, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Demo credentials for university presentation
 */
const DEMO_ACCOUNTS = [
  {
    label: 'Patient',
    email: 'patient@medimatchbd.com',
    password: 'patient123',
    icon: UserIcon,
    color: 'from-blue-500 to-blue-600',
    bgHover: 'hover:bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
  },
  {
    label: 'Doctor',
    email: 'dr.aminul@medimatchbd.com',
    password: 'doctor123',
    icon: Stethoscope,
    color: 'from-teal-500 to-teal-600',
    bgHover: 'hover:bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-700',
  },
  {
    label: 'Admin',
    email: 'admin@medimatchbd.com',
    password: 'admin123',
    icon: Shield,
    color: 'from-indigo-500 to-indigo-600',
    bgHover: 'hover:bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
  },
];

/**
 * Login Form component with email/password fields
 * Includes one-click demo login for MediMatch Bangladesh university presentation
 */
export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const data = await login(formData.email, formData.password);
      toast.success(`Welcome back, ${data.user.name}!`);

      // Redirect based on role
      const redirectPath = data.user.role === 'doctor'
        ? '/dashboard/doctor'
        : data.user.role === 'admin'
          ? '/dashboard/admin'
          : '/dashboard/patient';
      navigate(redirectPath);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (account) => {
    setDemoLoading(account.label);
    setFormData({ email: account.email, password: account.password });

    try {
      let data;
      try {
        data = await login(account.email, account.password);
      } catch (firstErr) {
        // Fallback to legacy seed email if DB was seeded prior to domain rename
        const legacyEmail = account.email.replace('@medimatchbd.com', '@docbd.com');
        setFormData({ email: legacyEmail, password: account.password });
        data = await login(legacyEmail, account.password);
      }

      toast.success(`Welcome, ${data.user.name}! (Demo ${account.label})`);

      const redirectPath = data.user.role === 'doctor'
        ? '/dashboard/doctor'
        : data.user.role === 'admin'
          ? '/dashboard/admin'
          : '/dashboard/patient';
      navigate(redirectPath);
    } catch (error) {
      toast.error(`Demo login failed: ${error.response?.data?.message || 'Server error'}`);
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Quick Demo Login Buttons ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Demo Login</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {DEMO_ACCOUNTS.map((account) => {
            const Icon = account.icon;
            const isLoading = demoLoading === account.label;
            return (
              <button
                key={account.label}
                type="button"
                disabled={!!demoLoading}
                onClick={() => handleDemoLogin(account)}
                className={`group relative flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border ${account.border} ${account.bgHover} transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed bg-white`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
                ) : (
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${account.color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className={`text-xs font-bold ${account.text}`}>{account.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs font-medium text-slate-400">or sign in manually</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* ── Manual Login Form ── */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input-field !pl-11"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none z-10" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input-field !pl-11 !pr-11"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors z-10"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary justify-center py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Sign In
            </>
          )}
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
