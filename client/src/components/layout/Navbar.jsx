import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import {
  Menu, X, User, LogOut,
  LayoutDashboard, Stethoscope, Shield,
  ChevronDown,
} from 'lucide-react';

/**
 * Main Navigation Bar — professional medical theme with official MediMatch Bangladesh logo
 */
export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
    setProfileOpen(false);
  };

  const dashboardPath = user?.role === 'doctor'
    ? '/dashboard/doctor'
    : user?.role === 'admin'
      ? '/dashboard/admin'
      : '/dashboard/patient';

  const DashIcon = user?.role === 'doctor' ? Stethoscope
    : user?.role === 'admin' ? Shield
    : LayoutDashboard;

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800 shadow-[0_1px_20px_rgba(15,23,42,0.06)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Official Logo */}
          <Link to="/" className="group flex items-center" onClick={() => setMobileOpen(false)}>
            <Logo size="sm" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#00A896] dark:hover:text-teal-400 rounded-lg hover:bg-teal-50/60 dark:hover:bg-slate-800/60 transition-all"
            >
              Home
            </Link>
            <Link
              to="/symptoms"
              className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#00A896] dark:hover:text-teal-400 rounded-lg hover:bg-teal-50/60 dark:hover:bg-slate-800/60 transition-all"
            >
              Symptom Checker
            </Link>
          </div>

          {/* Desktop Auth / Profile & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 max-w-[120px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 animate-slide-down">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{user?.email}</p>
                      <span className="badge badge-teal mt-2 capitalize">{user?.role}</span>
                    </div>
                    <Link
                      to={dashboardPath}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#00A896] dark:hover:text-teal-400 hover:bg-teal-50/60 dark:hover:bg-slate-800/60 transition-all"
                    >
                      <DashIcon className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#00A896] dark:hover:text-teal-400 transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-800 py-4 space-y-1 animate-slide-down">
            <div className="px-4 pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Theme Mode</p>
              <ThemeToggle compact={true} />
            </div>

            <Link to="/" onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#00A896] dark:hover:text-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-slate-800 transition-all">
              Home
            </Link>
            <Link to="/symptoms" onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#00A896] dark:hover:text-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-slate-800 transition-all">
              Symptom Checker
            </Link>

            {isAuthenticated ? (
              <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2">
                <div className="px-4 py-2">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role}</p>
                </div>
                <Link to={dashboardPath} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#00A896] dark:hover:text-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-slate-800 transition-all">
                  <DashIcon className="w-4 h-4" />
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2 space-y-1">
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#00A896] dark:hover:text-teal-400 rounded-lg hover:bg-teal-50 dark:hover:bg-slate-800 transition-all">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}
                  className="block mx-4 text-center btn-primary text-sm justify-center">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {profileOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setProfileOpen(false)} />
      )}
    </nav>
  );
}
