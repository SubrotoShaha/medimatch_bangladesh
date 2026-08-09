import { HeartPulse } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';

/**
 * Login Page — professional medical card design
 */
export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-200 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100/70 dark:bg-blue-900/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100/60 dark:bg-teal-900/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md animate-fade-in z-10">
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-premium border border-slate-100 dark:border-slate-800 overflow-hidden">
          {/* Branded header */}
          <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 px-8 py-10 text-center overflow-hidden">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)',
              }}
            />
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 p-2 shadow-lg ring-4 ring-white/20">
                <img src="/favicon.svg" alt="MediMatch Bangladesh Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-extrabold text-white mb-1.5">Welcome Back</h1>
              <p className="text-blue-100 text-sm font-medium">Sign in to your MediMatch Bangladesh account</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
