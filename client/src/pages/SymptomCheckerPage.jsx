import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stethoscope, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import SymptomInput from '../components/symptoms/SymptomInput';
import RecommendationResults from '../components/symptoms/RecommendationResults';
import DoctorList from '../components/doctors/DoctorList';
import LoadingSpinner from '../components/ui/LoadingSpinner';

/**
 * Symptom Checker Page
 * Main page where patients input symptoms and see recommendations
 */
export default function SymptomCheckerPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Auto-search if query param exists
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
      setError(err.response?.data?.message || 'Failed to get recommendations. Please try again.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Symptom Checker</h1>
          </div>
          <p className="text-slate-500 ml-13">
            Enter your symptoms to get doctor specialization recommendations
          </p>
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
          <div className="max-w-3xl mx-auto flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {results && !loading && (
          <div className="space-y-8 animate-fade-in">
            {/* Specialization Recommendations */}
            <RecommendationResults specializations={results.specializations} />

            {/* Matching Doctors */}
            <div className="max-w-7xl mx-auto">
              <DoctorList
                doctors={results.doctors}
                title={`Recommended Doctors (${results.totalDoctors} found)`}
              />
            </div>
          </div>
        )}

        {/* Empty state */}
        {hasSearched && !loading && !error && results?.doctors?.length === 0 && (
          <div className="text-center py-16">
            <Stethoscope className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No matching doctors found</h3>
            <p className="text-slate-400">Try different symptoms or check back later as new doctors join our platform.</p>
          </div>
        )}

        {/* Initial state */}
        {!hasSearched && !loading && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-10 h-10 text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Enter your symptoms above</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Start typing symptoms to see autocomplete suggestions, then click "Get Recommendations"
              to find the right specialist for you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
