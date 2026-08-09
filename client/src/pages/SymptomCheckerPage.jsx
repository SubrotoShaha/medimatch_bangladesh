import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stethoscope, AlertCircle, Search, Sparkles } from 'lucide-react';
import api from '../api/axios';
import SymptomInput from '../components/symptoms/SymptomInput';
import RecommendationResults from '../components/symptoms/RecommendationResults';
import DoctorList from '../components/doctors/DoctorList';
import LoadingSpinner from '../components/ui/LoadingSpinner';

/**
 * Symptom Checker Page — human-first copy, refined design
 */
export default function SymptomCheckerPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery.split(',').map(s => s.trim().toLowerCase()).filter(Boolean));
    }
  }, []);

  const handleSearch = async (symptoms) => {
    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const { data } = await api.post('/recommend', { symptoms });
      setResults(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-blue-950/20">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Find Your Specialist
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base">
                Describe your symptoms and we'll match you with the right medical specialist.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Symptom Input */}
        <SymptomInput onSearch={handleSearch} initialQuery={initialQuery} />

        {/* Loading */}
        {loading && <LoadingSpinner text="Analyzing your symptoms..." />}

        {/* Error */}
        {error && (
          <div className="max-w-3xl mx-auto flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl text-red-700 dark:text-red-400 animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-0.5">Something went wrong</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <div className="space-y-8 animate-fade-in">
            <RecommendationResults specializations={results.specializations} />
            <div className="max-w-7xl mx-auto">
              <DoctorList
                doctors={results.doctors}
                title={`Recommended Doctors (${results.totalDoctors} found)`}
              />
            </div>
          </div>
        )}

        {/* Empty results state */}
        {hasSearched && !loading && !error && results?.doctors?.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Search className="w-10 h-10 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">No doctors found for these symptoms</h3>
            <p className="text-slate-400 dark:text-slate-500 max-w-sm mx-auto text-sm leading-relaxed">
              Try rephrasing your symptoms or searching with a different term. Our database is
              growing — check back soon!
            </p>
          </div>
        )}

        {/* Initial / welcome state */}
        {!hasSearched && !loading && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950/40 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
              <Sparkles className="w-10 h-10 text-blue-300 dark:text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              Start by describing how you feel
            </h3>
            <p className="text-slate-400 dark:text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
              Type a symptom like "fever" or "chest pain" in the search box above,
              select from suggestions, then tap{' '}
              <span className="font-semibold text-blue-500">"Get Recommendations"</span> — it's that simple.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
