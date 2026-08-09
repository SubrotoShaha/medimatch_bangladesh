import { useEffect, useState, useRef } from 'react';
import { Stethoscope, MapPin, Activity, Users } from 'lucide-react';

/**
 * Stats Section — animated counters with warm, human-feeling copy
 */
export default function StatsSection() {
  const stats = [
    {
      icon: Stethoscope,
      value: 13,
      suffix: '+',
      label: 'Specializations covered',
      sublabel: 'from cardiology to dermatology',
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      text: 'text-blue-600 dark:text-blue-400',
      ring: 'ring-blue-100 dark:ring-blue-900/50',
      accentBar: 'from-blue-400 to-blue-600',
    },
    {
      icon: Users,
      value: 500,
      suffix: '+',
      label: 'Registered doctors',
      sublabel: 'verified & licensed practitioners',
      gradient: 'from-teal-500 to-teal-600',
      bg: 'bg-teal-50 dark:bg-teal-950/30',
      text: 'text-teal-700 dark:text-teal-400',
      ring: 'ring-teal-100 dark:ring-teal-900/50',
      accentBar: 'from-teal-400 to-teal-600',
    },
    {
      icon: MapPin,
      value: 15,
      suffix: '+',
      label: 'Cities nationwide',
      sublabel: 'across Bangladesh',
      gradient: 'from-indigo-500 to-indigo-600',
      bg: 'bg-indigo-50 dark:bg-indigo-950/30',
      text: 'text-indigo-600 dark:text-indigo-400',
      ring: 'ring-indigo-100 dark:ring-indigo-900/50',
      accentBar: 'from-indigo-400 to-indigo-600',
    },
    {
      icon: Activity,
      value: 50,
      suffix: '+',
      label: 'Symptoms tracked',
      sublabel: 'for accurate matching',
      gradient: 'from-rose-500 to-pink-500',
      bg: 'bg-rose-50 dark:bg-rose-950/30',
      text: 'text-rose-500 dark:text-rose-400',
      ring: 'ring-rose-100 dark:ring-rose-900/50',
      accentBar: 'from-rose-400 to-pink-500',
    },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), stat.value);
        setCounts((prev) => {
          const next = [...prev];
          next[index] = current;
          return next;
        });
        if (step >= steps) clearInterval(timer);
      }, duration / steps);
    });
  };

  return (
    <section ref={sectionRef} className="py-28 bg-section-alt relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100/50 dark:bg-blue-900/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/40 dark:bg-emerald-900/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label mx-auto dark:!bg-blue-950/40 dark:!text-blue-300 dark:!border-blue-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
            Growing Every Day
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 leading-tight tracking-tight">
            Numbers that speak{' '}
            <span className="text-gradient">for themselves</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            MediMatch Bangladesh is growing fast — and so is the quality of
            care our patients receive every day.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative bg-white dark:bg-slate-900 rounded-[1.375rem] p-6 sm:p-7 border border-slate-100 dark:border-slate-800 card-hover shadow-premium text-center overflow-hidden group"
              >
                {/* Top accent bar — always visible, stronger on hover */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${stat.accentBar} opacity-60 group-hover:opacity-100 transition-opacity duration-300 rounded-t-[1.375rem]`} />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} ring-1 ${stat.ring} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${stat.text}`} />
                </div>

                {/* Counter */}
                <div className={`text-4xl sm:text-5xl font-extrabold ${stat.text} mb-1.5 tabular-nums tracking-tight ${hasAnimated ? 'animate-fade-in' : ''}`}>
                  {counts[index]}{stat.suffix}
                </div>

                {/* Label */}
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 leading-snug">
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
