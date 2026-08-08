import { UserPlus } from 'lucide-react';
import RegisterForm from '../components/auth/RegisterForm';

/**
 * Register Page — professional medical card design
 */
export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-section-alt relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-100/70 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/60 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md animate-fade-in z-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
          {/* Branded header */}
          <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-blue-700 px-8 py-10 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)',
              }}
            />
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 p-2 shadow-lg ring-4 ring-white/20">
                <img src="/favicon.svg" alt="MediMatch Bangladesh Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-extrabold text-white mb-1.5">Create Account</h1>
              <p className="text-teal-100 text-sm font-medium">Join MediMatch Bangladesh as a Patient or Doctor</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
