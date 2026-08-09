import { Search, UserCheck, CalendarCheck, ArrowRight } from 'lucide-react';

/**
 * Features Section — premium 3-step process, professional medical design
 */
export default function FeaturesSection() {
  const features = [
    {
      icon: Search,
      title: 'Enter Symptoms',
      description:
        'Type your symptoms into our smart search. From fever to skin issues — our system understands natural language and medical terminology alike.',
      step: '01',
      gradient: 'from-blue-500 to-blue-600',
      ring: 'ring-blue-200',
      badge: 'bg-blue-50 text-blue-700 border-blue-100',
      glow: 'rgba(37, 99, 235, 0.12)',
    },
    {
      icon: UserCheck,
      title: 'Get Recommendations',
      description:
        'Our intelligent algorithm maps your symptoms to the right medical specializations and surfaces matching, verified doctors near you.',
      step: '02',
      gradient: 'from-teal-500 to-teal-600',
      ring: 'ring-teal-200',
      badge: 'bg-teal-50 text-teal-700 border-teal-100',
      glow: 'rgba(13, 148, 136, 0.12)',
    },
    {
      icon: CalendarCheck,
      title: 'Book Appointment',
      description:
        'Choose your preferred doctor, select a convenient time slot, and confirm your appointment — all in just a few effortless clicks.',
      step: '03',
      gradient: 'from-indigo-500 to-indigo-600',
      ring: 'ring-indigo-200',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      glow: 'rgba(99, 102, 241, 0.12)',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Top section divider */}
      <div className="absolute top-0 inset-x-0 divider-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-18">
          <div className="badge badge-blue mx-auto mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-5 leading-tight">
            Simple steps to better{' '}
            <span className="text-gradient">healthcare</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            Three seamless steps to connect you with the right healthcare professional — fast, accurate, and free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-14">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative group bg-white rounded-2xl p-8 border border-slate-100 card-hover shadow-premium overflow-hidden"
                style={{ '--glow': feature.glow }}
              >
                {/* Hover background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 30%, ${feature.glow} 0%, transparent 70%)` }}
                />

                {/* Step number — watermark */}
                <span
                  className="absolute -top-5 -right-1 text-[6.5rem] font-black leading-none select-none pointer-events-none text-slate-100 group-hover:text-slate-50 transition-colors"
                >
                  {feature.step}
                </span>

                {/* Icon */}
                <div
                  className={`relative w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg mb-7 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Step badge */}
                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${feature.badge}`}>
                  Step {feature.step}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Arrow connector (desktop) */}
                {index < features.length - 1 && (
                  <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 items-center justify-center text-slate-300 group-hover:border-slate-200 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom section divider */}
      <div className="absolute bottom-0 inset-x-0 divider-gradient" />
    </section>
  );
}
