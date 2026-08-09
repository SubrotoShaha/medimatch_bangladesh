import { useState, useEffect, useRef } from 'react';
import { Search, X, Plus, Sparkles } from 'lucide-react';
import api from '../../api/axios';

/**
 * Symptom Input Component
 * Tag-based multi-select with autocomplete suggestions
 * Users can type symptoms and see matching suggestions from the database
 */
export default function SymptomInput({ onSearch, initialQuery = '' }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Load all available symptoms for autocomplete
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const { data } = await api.get('/recommend/symptoms');
        setAllSymptoms(data.map(s => s.symptom));
      } catch (error) {
        console.error('Failed to fetch symptoms:', error);
      }
    };
    fetchSymptoms();
  }, []);

  // Handle initial query from URL params
  useEffect(() => {
    if (initialQuery && selectedSymptoms.length === 0) {
      const symptoms = initialQuery.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      if (symptoms.length > 0) {
        setSelectedSymptoms(symptoms);
      }
    }
  }, [initialQuery]);

  // Filter suggestions based on input (word boundary matching)
  useEffect(() => {
    const query = inputValue.trim().toLowerCase();
    if (query.length >= 1) {
      const filtered = allSymptoms.filter(s => {
        if (selectedSymptoms.includes(s.toLowerCase())) return false;
        const words = s.toLowerCase().split(/\s+/);
        return words.some(w => w.startsWith(query));
      });
      
      // Prioritize symptoms that start with the query, then alphabetical
      filtered.sort((a, b) => {
        const aStarts = a.toLowerCase().startsWith(query);
        const bStarts = b.toLowerCase().startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.localeCompare(b);
      });

      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, allSymptoms, selectedSymptoms]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addSymptom = (symptom) => {
    const normalized = symptom.toLowerCase().trim();
    if (normalized && !selectedSymptoms.includes(normalized)) {
      setSelectedSymptoms(prev => [...prev, normalized]);
    }
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        addSymptom(suggestions[0]);
      } else if (inputValue.trim()) {
        addSymptom(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && selectedSymptoms.length > 0) {
      removeSymptom(selectedSymptoms[selectedSymptoms.length - 1]);
    }
  };

  const handleSearch = () => {
    if (selectedSymptoms.length > 0) {
      setLoading(true);
      onSearch(selectedSymptoms);
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto" ref={wrapperRef}>
      {/* Input Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-200">
        {/* Selected Symptoms (Tags) */}
        <div className="flex flex-wrap gap-2 p-4 pb-2 min-h-[56px]">
          {selectedSymptoms.map((symptom) => (
            <span
              key={symptom}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-semibold border border-blue-200 dark:border-blue-800/80 animate-fade-in"
            >
              {symptom}
              <button
                onClick={() => removeSymptom(symptom)}
                className="ml-0.5 text-blue-400 hover:text-blue-600 dark:hover:text-blue-200 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}

          {/* Text Input */}
          <div className="relative flex-1 min-w-[200px]">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => inputValue.trim() && setShowSuggestions(true)}
              placeholder={selectedSymptoms.length === 0 ? 'Type a symptom (e.g., fever, headache, skin rash)...' : 'Add another symptom...'}
              className="w-full py-2 px-1 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none bg-transparent font-medium"
              id="symptom-input"
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800/80">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center sm:text-left">
            {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
          </span>
          <button
            onClick={handleSearch}
            disabled={selectedSymptoms.length === 0 || loading}
            className="btn-primary px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none min-w-[190px]"
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center text-white">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white shrink-0" />
                <span className="text-white font-bold">Get Recommendations</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Autocomplete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 animate-slide-down max-h-60 overflow-auto z-50">
          {suggestions.map((symptom) => (
            <button
              key={symptom}
              onClick={() => addSymptom(symptom)}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-left"
            >
              <Plus className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span className="capitalize">{symptom}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
