import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  index: number;
}

export const Section: React.FC<SectionProps> = ({ id, children, title, subtitle, index }) => {
  return (
    <section id={id} className="min-h-screen w-full flex flex-col justify-center py-20 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-[1200px] mx-auto w-full">
        {title && (
          <div className="mb-12 md:mb-16 fade-in-up">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs font-bold">
                {index}
              </span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                {subtitle}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f]">
              {title}
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">
          {children}
        </div>
      </div>
    </section>
  );
};