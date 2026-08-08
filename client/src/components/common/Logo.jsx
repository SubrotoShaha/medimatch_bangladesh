/**
 * Official MediMatch Bangladesh Logo Component
 * Rendered using clean vector SVG (100% transparent background)
 */
export default function Logo({
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
}) {
  const heightClasses = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="/logo.svg"
        alt="MediMatch Bangladesh"
        className={`${heightClasses[size] || 'h-12'} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
      />
    </div>
  );
}
