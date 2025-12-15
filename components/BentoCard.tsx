import React from 'react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  dark?: boolean;
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = "", 
  title, 
  subtitle,
  colSpan = 1,
  rowSpan = 1,
  dark = false
}) => {
  const colClass = {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-2',
    3: 'col-span-1 md:col-span-3',
    4: 'col-span-1 md:col-span-2 lg:col-span-4',
  }[colSpan];

  const rowClass = {
    1: 'row-span-1',
    2: 'row-span-1 md:row-span-2',
  }[rowSpan];

  return (
    <div 
      className={`
        relative overflow-hidden rounded-[32px] p-8
        transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl
        ${dark ? 'bg-[#1d1d1f] text-white' : 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-[#1d1d1f]'}
        ${colClass} ${rowClass}
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-4 relative z-10">
          {subtitle && (
            <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              {subtitle}
            </p>
          )}
          {title && (
            <h3 className="text-2xl font-semibold tracking-tight leading-tight">
              {title}
            </h3>
          )}
        </div>
      )}
      <div className="relative z-10 h-full">
        {children}
      </div>
      
      {/* Glossy reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
    </div>
  );
};