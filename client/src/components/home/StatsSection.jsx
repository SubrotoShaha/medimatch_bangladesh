import { useEffect, useState, useRef } from 'react';
import { Stethoscope, MapPin, Activity, Users } from 'lucide-react';

/**
 * Stats Section — premium cards with animated counters
 */
export default function StatsSection() {
  const stats = [
    { icon: Stethoscope, value: 13,  suffix: '+', label: 'Medical Specializations', gradient: 'from-blue-500 to-blue-600',   bg: 'bg-blue-50',   text: 'text-blue-600',   ring: 'ring-blue-100' },
    { icon: Users,       value: 500, suffix: '+', label: 'Registered Doctors',      gradient: 'from-teal-500 to-teal-600',   bg: 'bg-teal-50',   text: 'text-teal-600',   ring: 'ring-teal-100' },
    { icon: MapPin,      value: 15,  suffix: '+', label: 'Cities Covered',           gradient: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-100' },
    { icon: Activity,    value: 50,  suffix: '+', label: 'Symptoms Tracked',         gradient: 'from-rose-500 to-pink-500',   bg: 'bg-rose-50',   text: 'text-rose-500',   ring: 'ring-rose-100' },
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
      const duration = 2200;
      const steps = 70;
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
    <section ref={sectionRef} className="py-24 bg-section-alt relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/60 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100/50 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge badge-teal mx-auto mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            Platform Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            Trusted across{' '}
            <span className="text-gradient">Bangladesh</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Our growing network connects patients with qualified doctors and specialists nationwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 card-hover shadow-premium text-center overflow-hidden group"
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl`} />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-13 h-13 rounded-xl ${stat.bg} ring-1 ${stat.ring} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.text}`} />
                </div>

                {/* Counter */}
                <div className={`text-4xl sm:text-5xl font-extrabold ${stat.text} mb-2 tabular-nums`}>
                  {counts[index]}{stat.suffix}
                </div>

                {/* Label */}
                <div className="text-sm text-slate-500 font-medium leading-snug">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
