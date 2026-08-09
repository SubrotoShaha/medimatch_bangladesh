/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 * Email: subrotokumarshaha007@gmail.com
 */

import { Link } from 'react-router-dom';
import { HeartPulse, Mail, MapPin, Code, ExternalLink, ArrowUpRight } from 'lucide-react';
import Logo from '../common/Logo';

/**
 * Footer — refined dark design with better copy and micro-interactions
 */
export default function Footer() {
  return (
    <footer className="bg-[#060e1f] text-slate-400">
      {/* Top gradient accent */}
      <div className="h-[2px] bg-gradient-to-r from-blue-700 via-teal-500 to-blue-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-5 group">
              <Logo variant="light" size="md" showTagline={true} />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Find the right doctor for your symptoms — anytime, anywhere
              in Bangladesh. Fast, free, and reliable.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs text-slate-500 font-medium">Platform is live & active</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/symptoms', label: 'Symptom Checker' },
                { to: '/register', label: 'Create Account' },
                { to: '/login', label: 'Sign In' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-slate-400 hover:text-blue-300 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-200 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">For Doctors</h4>
            <ul className="space-y-3.5">
              {[
                { to: '/register', label: 'Join as a Doctor' },
                { to: '/dashboard/doctor', label: 'Doctor Portal' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-slate-400 hover:text-teal-300 transition-all duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-teal-400 transition-all duration-200 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li>
                <a
                  href="mailto:subrotokumarshaha007@gmail.com"
                  className="flex items-start gap-3 text-sm hover:text-blue-300 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="break-all">subrotokumarshaha007@gmail.com</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Code className="w-4 h-4 text-teal-400 shrink-0" />
                <span>
                  <span className="text-slate-300 font-semibold">Subroto Kumar Shaha</span>
                  <span className="text-slate-500 ml-1.5">— CSE Student</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-14 pt-8">
          {/* Developer badge */}
          <div className="flex justify-center mb-7">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/[0.04] rounded-xl border border-white/[0.07] hover:border-white/[0.12] transition-colors">
              <Code className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-slate-300">
                Developed by{' '}
                <span className="font-bold text-white">Subroto Kumar Shaha</span>
              </span>
              <span className="text-xs px-2.5 py-1 bg-teal-500/12 text-teal-400 rounded-full border border-teal-500/20 font-bold">
                Steps With SP
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} MediMatch Bangladesh. All rights reserved.
            </p>
            <p className="text-xs text-slate-600 text-center max-w-sm">
              ⚕️ This platform provides doctor recommendations only. Always consult a licensed
              medical professional for diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
