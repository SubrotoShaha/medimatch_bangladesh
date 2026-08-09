/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 * Email: subrotokumarshaha007@gmail.com
 */

import { Link } from 'react-router-dom';
import { HeartPulse, Mail, MapPin, Code, ExternalLink } from 'lucide-react';

import Logo from '../common/Logo';

/**
 * Footer — professional medical design
 */
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4 group">
              <Logo variant="light" size="md" showTagline={true} />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Bangladesh's smart doctor recommendation system. Find the right specialist based on your symptoms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/symptoms', label: 'Symptom Checker' },
                { to: '/register', label: 'Register' },
                { to: '/login', label: 'Sign In' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-200 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">For Doctors</h4>
            <ul className="space-y-3">
              {[
                { to: '/register', label: 'Join as Doctor' },
                { to: '/dashboard/doctor', label: 'Doctor Dashboard' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-teal-400 transition-all duration-200 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Developer */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact & Developer</h4>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                Dhaka, Bangladesh
              </li>
              <li>
                <a
                  href="mailto:subrotokumarshaha007@gmail.com"
                  className="flex items-center gap-2.5 text-sm hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  subrotokumarshaha007@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Code className="w-4 h-4 text-teal-400 shrink-0" />
                <span>
                  <span className="text-slate-300 font-medium">Subroto Kumar Shaha</span>
                  <span className="text-slate-500 ml-1">— CSE Student</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <ExternalLink className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-teal-400 font-semibold">Steps With SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          {/* Developer attribution */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-800/70 rounded-xl border border-slate-700/50">
              <Code className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-slate-300">
                Developed by{' '}
                <span className="font-bold text-white">Subroto Kumar Shaha</span>
              </span>
              <span className="text-xs px-2 py-0.5 bg-teal-500/15 text-teal-400 rounded-full border border-teal-500/25 font-semibold">
                Steps With SP
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} MediMatch Bangladesh. All rights reserved.
            </p>
            <p className="text-xs text-slate-600 text-center max-w-md">
              ⚕️ Disclaimer: This platform provides recommendations only. Always consult a qualified medical professional for diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
