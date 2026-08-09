import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, HeartPulse, Shield, Stethoscope,
  Activity, Brain, Bone, Eye, ArrowRight,
  CheckCircle, Sparkles, Plus,
} from 'lucide-react';
import api from '../../api/axios';

const defaultQuickSymptoms = [
  'Fever', 'Headache', 'Chest Pain', 'Skin Rash',
  'Back Pain', 'Cough', 'Asthma', 'Diabetes',
];

/**
 * Hero Section — Premium professional medical design with live autocomplete
 */
export default function HeroSection() {
  const [searchInput, setSearchInput] = useState('');
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Load symptoms for hero autocomplete
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

  // Filter suggestions (word boundary matching)
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

  // Click outside listener
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
    <section className="relative overflow-hidden bg-medical-gradient min-h-[88vh] flex items-center">

      {/* Layered background glow */}
      <div className="absolute inset-0 bg-hero-pattern" />

      {/* Decorative ring / grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large faint rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-white/[0.02]" />

        {/* Floating medical icons */}
        <HeartPulse className="absolute top-[14%] left-[7%]  w-9 h-9 text-blue-300/20 animate-float" style={{ animationDelay: '0s' }} />
        <Activity    className="absolute top-[22%] right-[10%] w-10 h-10 text-teal-300/20 animate-float"  style={{ animationDelay: '1.2s' }} />
        <Brain       className="absolute bottom-[28%] left-[13%] w-9 h-9 text-indigo-300/18 animate-float" style={{ animationDelay: '2.4s' }} />
        <Bone        className="absolute top-[48%] right-[7%] w-7 h-7 text-blue-200/15 animate-float"    style={{ animationDelay: '0.8s' }} />
        <Eye         className="absolute bottom-[18%] right-[18%] w-8 h-8 text-teal-200/18 animate-float" style={{ animationDelay: '1.8s' }} />
        <Stethoscope className="absolute top-[62%] left-[4%] w-10 h-10 text-blue-300/15 animate-float"   style={{ animationDelay: '3s' }} />

        {/* Soft glow blobs */}
        <div className="absolute top-16 left-1/4 w-80 h-80 bg-blue-500/12 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/08 rounded-full blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 glass-navy rounded-full text-sm font-medium text-blue-200 mb-10 animate-fade-in">
          <Shield className="w-4 h-4 text-teal-400" />
          Trusted Healthcare Platform for Bangladesh
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-ring ml-1" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold text-white leading-[1.1] tracking-tight mb-7 animate-slide-up">
          Find the Right Doctor
          <br />
          <span className="relative inline-block mt-1">
            <span className="bg-gradient-to-r from-blue-300 via-teal-300 to-blue-300 bg-clip-text text-transparent animate-gradient">
              Based on Your Symptoms
            </span>
            {/* Underline accent */}
            <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-slate-300/80 max-w-2xl mx-auto mb-12 animate-slide-up leading-relaxed px-4 sm:px-0"
          style={{ animationDelay: '0.1s' }}
        >
          Enter your symptoms or disease and our intelligent system will recommend the right
          medical specialist for you — across all major cities in Bangladesh.
        </p>

        {/* Search Bar with Autocomplete */}
        <div
          ref={wrapperRef}
          className="max-w-2xl mx-auto relative z-50 animate-slide-up px-2 sm:px-0"
          style={{ animationDelay: '0.2s' }}
        >
          <form onSubmit={handleSearch} className="relative group">
            {/* Outer glow */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 rounded-2xl blur-lg opacity-30 group-focus-within:opacity-55 transition-opacity duration-500" />
            {/* Search box */}
            <div className="relative flex flex-col sm:flex-row sm:items-center bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 p-2 sm:p-0">
              <div className="flex items-center flex-1 w-full min-w-0 py-3 sm:py-5 pl-3 sm:pl-5">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => searchInput.trim().length >= 1 && setShowSuggestions(true)}
                  placeholder="Type a symptom or disease (e.g. fever, headache, chest pain)..."
                  className="w-full px-3 text-base text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                  id="hero-symptom-search"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto sm:mr-2 px-6 py-3.5 text-sm shrink-0 justify-center"
              >
                Check Symptoms
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Floating Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left z-[100] animate-slide-down">
              <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>SUGGESTED SYMPTOMS & DISEASES</span>
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              </div>
              {suggestions.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => selectSuggestion(symptom)}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left border-b border-slate-100 last:border-0"
                >
                  <Search className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="capitalize font-medium">{symptom}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 relative z-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <span className="text-xs text-slate-400 self-center mr-1">Popular:</span>
          {defaultQuickSymptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => navigate(`/symptoms?q=${encodeURIComponent(symptom.toLowerCase())}`)}
              className="px-3.5 py-1.5 text-xs font-medium text-blue-200 glass-navy hover:bg-white/15 rounded-full border border-white/15 transition-all hover:scale-105 hover:border-teal-400/40 cursor-pointer"
            >
              {symptom}
            </button>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 relative z-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {[
            'No Registration Required to Browse',
            'Free Symptom Analysis',
            'Verified Doctors Only',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-slate-300/70">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
