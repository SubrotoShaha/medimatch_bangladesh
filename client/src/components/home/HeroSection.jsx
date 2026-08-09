import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, HeartPulse, Shield, Stethoscope,
  Activity, Brain, Bone, Eye, ArrowRight,
  CheckCircle, Sparkles,
} from 'lucide-react';
import api from '../../api/axios';

const defaultQuickSymptoms = [
  'Fever', 'Headache', 'Chest Pain', 'Skin Rash',
  'Back Pain', 'Cough', 'Asthma', 'Diabetes',
];

/**
 * Hero Section — Premium hero with live autocomplete and human-first copy
 */
export default function HeroSection() {
  const [searchInput, setSearchInput] = useState('');
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const { data } = await api.get('/recommend/symptoms');
        setAllSymptoms(data.map(s => s.symptom));
      } catch (err) {
        console.error('Failed to load symptoms for hero search:', err);
      }
    };
    fetchSymptoms();
  }, []);

  useEffect(() => {
    const query = searchInput.trim().toLowerCase();
    if (query.length >= 1) {
      const filtered = allSymptoms.filter(s => {
        const words = s.toLowerCase().split(/\s+/);
        return words.some(w => w.startsWith(query));
      });
      filtered.sort((a, b) => {
        const aStarts = a.toLowerCase().startsWith(query);
        const bStarts = b.toLowerCase().startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.localeCompare(b);
      });
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchInput, allSymptoms]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchInput.trim()) {
      navigate(`/symptoms?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate('/symptoms');
    }
  };

  const selectSuggestion = (symptom) => {
    setSearchInput(symptom);
    setShowSuggestions(false);
    navigate(`/symptoms?q=${encodeURIComponent(symptom)}`);
  };

  return (
    <section className="relative overflow-hidden bg-medical-gradient min-h-[90vh] flex items-center">

      {/* Background glow layers */}
      <div className="absolute inset-0 bg-hero-pattern" />

      {/* Decorative rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-white/[0.05]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-white/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1060px] h-[1060px] rounded-full border border-white/[0.02]" />

        {/* Floating icons */}
        <HeartPulse className="absolute top-[14%] left-[7%] w-9 h-9 text-blue-300/25 animate-float" style={{ animationDelay: '0s' }} />
        <Activity className="absolute top-[22%] right-[10%] w-10 h-10 text-teal-300/22 animate-float" style={{ animationDelay: '1.3s' }} />
        <Brain className="absolute bottom-[28%] left-[13%] w-9 h-9 text-indigo-300/18 animate-float" style={{ animationDelay: '2.5s' }} />
        <Bone className="absolute top-[48%] right-[7%] w-7 h-7 text-blue-200/15 animate-float" style={{ animationDelay: '0.9s' }} />
        <Eye className="absolute bottom-[18%] right-[18%] w-8 h-8 text-teal-200/18 animate-float" style={{ animationDelay: '1.9s' }} />
        <Stethoscope className="absolute top-[62%] left-[4%] w-10 h-10 text-blue-300/15 animate-float" style={{ animationDelay: '3.1s' }} />

        {/* Glow blobs */}
        <div className="absolute top-16 left-1/4 w-96 h-96 bg-blue-600/14 rounded-full blur-[80px]" />
        <div className="absolute bottom-16 right-1/4 w-[28rem] h-[28rem] bg-teal-500/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/08 rounded-full blur-[60px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">

        {/* Trust badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 glass-navy rounded-full text-sm font-semibold text-blue-200 mb-10 animate-fade-in">
          <Shield className="w-4 h-4 text-teal-400 shrink-0" />
          Bangladesh's #1 Symptom-to-Doctor Platform
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-ring ml-0.5" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-[3.6rem] lg:text-[4.5rem] font-extrabold text-white leading-[1.08] tracking-tight mb-7 animate-slide-up">
          Describe What's Wrong.
          <br />
          <span className="relative inline-block mt-2">
            <span className="text-gradient-hero">
              We'll Find Your Doctor.
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-slate-300/75 max-w-2xl mx-auto mb-12 animate-slide-up leading-relaxed px-4 sm:px-0"
          style={{ animationDelay: '0.12s' }}
        >
          No guesswork. No confusion. Just tell us how you're feeling and we'll
          match you with the right specialist — fast, free, and accurate.
        </p>

        {/* Search bar */}
        <div
          ref={wrapperRef}
          className="max-w-2xl mx-auto relative z-50 animate-slide-up px-2 sm:px-0"
          style={{ animationDelay: '0.22s' }}
        >
          <form onSubmit={handleSearch} className="relative group">
            {/* Glow ring */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 rounded-2xl blur-xl opacity-25 group-focus-within:opacity-50 transition-opacity duration-500" />
            {/* Box */}
            <div className="relative flex flex-col sm:flex-row sm:items-center bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 p-2 sm:p-0">
              <div className="flex items-center flex-1 w-full min-w-0 py-3 sm:py-5 pl-3 sm:pl-5">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => searchInput.trim().length >= 1 && setShowSuggestions(true)}
                  placeholder="What symptom or condition are you experiencing?"
                  className="w-full px-3 text-base text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none bg-transparent"
                  id="hero-symptom-search"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto sm:mr-2 px-6 py-3.5 text-sm shrink-0 justify-center"
              >
                Find My Doctor
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Autocomplete dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-left z-[100] animate-slide-down">
              <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span>Suggested Conditions</span>
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              </div>
              {suggestions.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => selectSuggestion(symptom)}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-left border-b border-slate-100 dark:border-slate-800 last:border-0"
                >
                  <Search className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="capitalize font-medium">{symptom}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick symptom chips */}
        <div className="mt-7 flex flex-wrap justify-center gap-2 relative z-10 animate-slide-up" style={{ animationDelay: '0.32s' }}>
          <span className="text-xs text-slate-400/80 self-center mr-1 font-medium">People often search for:</span>
          {defaultQuickSymptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => navigate(`/symptoms?q=${encodeURIComponent(symptom.toLowerCase())}`)}
              className="px-3.5 py-1.5 text-xs font-semibold text-blue-200 glass-navy hover:bg-white/12 rounded-full border border-white/12 transition-all duration-200 hover:scale-105 hover:border-teal-400/40 hover:text-teal-200 cursor-pointer"
            >
              {symptom}
            </button>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 relative z-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {[
            'No registration needed to browse',
            'Always free for patients',
            'Verified & licensed doctors only',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-300/65">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
