import { ArrowRight } from 'lucide-react';

const features = [
  {
    emoji: '🔍',
    title: 'Tell Us How You Feel',
    description:
      'Type a symptom, condition, or just describe what bothers you. Our system understands both plain language and medical terms.',
    step: '01',
    accentColor: '#1a56db',
    accentBg: 'rgba(26, 86, 219, 0.08)',
    accentBorder: 'rgba(26, 86, 219, 0.18)',
    accentText: '#1649b7',
  },
  {
    emoji: '⚡',
    title: 'We Match You Instantly',
    description:
      'Our algorithm cross-references your symptoms with medical specializations and surfaces the most relevant, verified doctors — in seconds.',
    step: '02',
    accentColor: '#059669',
    accentBg: 'rgba(5, 150, 105, 0.08)',
    accentBorder: 'rgba(5, 150, 105, 0.18)',
    accentText: '#047857',
  },
  {
    emoji: '📅',
    title: 'Book in One Click',
    description:
      "See the doctor's availability, pick a time that works for you, and confirm your appointment — all without leaving the page.",
    step: '03',
    accentColor: '#6366f1',
    accentBg: 'rgba(99, 102, 241, 0.08)',
    accentBorder: 'rgba(99, 102, 241, 0.18)',
    accentText: '#4f46e5',
  },
];

/**
 * Features Section — How It Works, with a conversational, human tone
 */
export default function FeaturesSection() {
  return (
    <section className="py-28 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 divider-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="section-label mx-auto dark:!bg-blue-950/40 dark:!text-blue-300 dark:!border-blue-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
            Simple. Fast. Accurate.
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 leading-tight tracking-tight">
            Healthcare shouldn't{' '}
            <span className="text-gradient">be complicated</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Three effortless steps to go from "I don't feel well" to sitting
            in the right doctor's office.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-4 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[25%] right-[25%] h-px bg-gradient-to-r from-blue-200 via-green-200 to-indigo-200 dark:from-blue-900 dark:via-green-900 dark:to-indigo-900 z-0" />

          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white dark:bg-slate-900 rounded-[1.375rem] p-8 border border-slate-100 dark:border-slate-800 card-hover shadow-premium overflow-hidden z-10"
            >
              {/* Hover background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.375rem]"
                style={{ background: `radial-gradient(ellipse at 28% 28%, ${feature.accentBg} 0%, transparent 68%)` }}
              />

              {/* Watermark step number */}
              <span className="absolute -top-4 -right-0.5 text-[6rem] font-black leading-none select-none pointer-events-none text-slate-100 dark:text-slate-800/80 group-hover:text-slate-50 dark:group-hover:text-slate-800/60 transition-colors duration-300">
                {feature.step}
              </span>

              {/* Emoji icon */}
              <div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-7 shadow-sm border group-hover:scale-110 transition-transform duration-300"
                style={{ background: feature.accentBg, borderColor: feature.accentBorder }}
              >
                {feature.emoji}
              </div>

              {/* Step badge */}
              <div
                className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full border mb-4"
                style={{ background: feature.accentBg, borderColor: feature.accentBorder, color: feature.accentText }}
              >
                Step {feature.step}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug">
                {feature.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Arrow connector (desktop) */}
              {index < features.length - 1 && (
                <div className="hidden md:flex absolute -right-5 top-14 z-20 w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-md border border-slate-100 dark:border-slate-800 items-center justify-center text-slate-300 dark:text-slate-600 group-hover:border-blue-200 dark:group-hover:border-blue-900 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 inset-x-0 divider-gradient" />
    </section>
  );
}
