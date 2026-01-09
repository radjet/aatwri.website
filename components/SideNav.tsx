import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'vision', label: 'VISION' },
  { id: 'platform', label: 'PLATFORM' },
  { id: 'impact', label: 'IMPACT' },
  { id: 'foundry', label: 'FOUNDRY' },
];

const SideNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px', // Trigger when section is in middle of screen
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-6">
      {/* Decorative vertical line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-aatwri-cobalt/20 -z-10" />

      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center justify-center"
        >
          {/* Label (Tooltip style, appears on left) */}
          <span 
            className={`absolute right-8 text-[10px] font-display font-bold tracking-widest uppercase transition-all duration-300 ${
              activeSection === section.id 
                ? 'opacity-100 text-aatwri-cobalt translate-x-0' 
                : 'opacity-0 text-gray-500 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
            }`}
          >
            {section.label}
          </span>

          {/* Dot Indicator */}
          <div 
            className={`w-3 h-3 border rotate-45 transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-aatwri-cobalt border-aatwri-cobalt shadow-[0_0_10px_#0055FF] scale-125'
                : 'bg-aatwri-navy border-gray-600 group-hover:border-aatwri-cobalt'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default SideNav;