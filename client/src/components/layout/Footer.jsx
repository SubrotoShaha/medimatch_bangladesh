/**
 * Symptom-Based Doctor Recommendation System for Bangladesh
 * Author: Subroto Kumar Shaha | Student of CSE
 * Brand: Steps With SP
 * Email: subrotokumarshaha007@gmail.com
 */

import { Link } from 'react-router-dom';
import { Mail, MapPin, Code, ExternalLink, MessageCircle } from 'lucide-react';
import Logo from '../common/Logo';

/* Brand SVG Icons */
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/>
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

const WhatsappIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.928 0-3.816-.517-5.474-1.498l-.393-.233-4.072 1.068 1.087-3.968-.256-.408a10.024 10.024 0 0 1-1.536-5.321c0-5.528 4.498-10.025 10.027-10.025 2.678 0 5.195 1.044 7.087 2.937 1.892 1.892 2.934 4.409 2.934 7.088 0 5.53-4.498 10.03-10.027 10.03m0-21.848C5.358 0 0 5.357 0 12.001c0 2.122.554 4.196 1.607 6.02L0 24l6.155-1.614a11.968 11.968 0 0 0 5.897 1.545c6.643 0 12.002-5.358 12.002-12.002 0-3.206-1.248-6.218-3.513-8.483A11.93 11.93 0 0 0 12.051 0z"/>
  </svg>
);

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/SKShartha',
    icon: FacebookIcon,
    hoverBg: 'hover:bg-[#1877F2]/15 hover:border-[#1877F2]/40 hover:text-[#1877F2]',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/subroto-kumar-shaha-fdr/',
    icon: LinkedinIcon,
    hoverBg: 'hover:bg-[#0A66C2]/15 hover:border-[#0A66C2]/40 hover:text-[#0A66C2]',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/SubrotoShaha',
    icon: GithubIcon,
    hoverBg: 'hover:bg-slate-700/60 hover:border-slate-500 hover:text-white',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/8801618044502',
    icon: WhatsappIcon,
    hoverBg: 'hover:bg-[#25D366]/15 hover:border-[#25D366]/40 hover:text-[#25D366]',
  },
];

/**
 * Footer — professional medical design with developer attribution and social links
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
            <p className="text-sm text-slate-500 leading-relaxed mb-5">
              Bangladesh's smart doctor recommendation system. Find the right specialist based on your symptoms.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-400 flex items-center justify-center transition-all duration-200 ${item.hoverBg}`}
                    title={item.name}
                    aria-label={item.name}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
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
              <li>
                <a
                  href="https://wa.me/8801618044502"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <WhatsappIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  +880 1618-044502
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Code className="w-4 h-4 text-teal-400 shrink-0" />
                <span>
                  <span className="text-slate-300 font-semibold">Subroto Kumar Shaha</span>
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
          {/* Developer attribution badge with social icons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
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

            {/* Quick Social Badges */}
            <div className="flex items-center gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/70 text-slate-400 flex items-center justify-center transition-all duration-200 ${item.hoverBg}`}
                    title={item.name}
                    aria-label={item.name}
                  >
                    <Icon width="15" height="15" />
                  </a>
                );
              })}
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

