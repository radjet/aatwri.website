import React, { useState } from 'react';
import { Crosshair, ShieldAlert, ChevronRight } from 'lucide-react';

interface StealthProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  glow?: boolean;
}

export const StealthCard: React.FC<StealthProps> = ({ children, className = '', title, glow = false }) => {
  return (
    <div 
      className={`relative group bg-aatwri-navy/80 border border-aatwri-cobalt/20 transition-all duration-300 hover:border-aatwri-cobalt ${className}`}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' }}
    >
      {/* Decorative Corner Lines */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-aatwri-cobalt opacity-50"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-aatwri-cobalt opacity-50"></div>
      
      {/* Header if title exists */}
      {title && (
        <div className="flex items-center gap-2 border-b border-aatwri-cobalt/20 p-3 bg-aatwri-cobalt/5">
          <ShieldAlert className="w-4 h-4 text-aatwri-cobalt" />
          <span className="text-xs font-display font-bold tracking-widest text-aatwri-cobalt uppercase">{title}</span>
        </div>
      )}

      {/* Content */}
      <div className="p-6 relative z-10">
        {children}
      </div>

      {/* Plasma Glow on Hover */}
      <div className={`absolute inset-0 bg-aatwri-cobalt/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${glow ? 'animate-pulse' : ''}`} />
    </div>
  );
};

interface TactButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secure';
}

export const TactButton: React.FC<TactButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = "relative font-display font-bold text-sm px-8 py-4 uppercase tracking-widest transition-all duration-200 overflow-hidden";
  const primaryStyles = "bg-aatwri-cobalt text-white hover:bg-white hover:text-aatwri-navy clip-path-button";
  const secureStyles = "bg-transparent border border-aatwri-cobalt text-aatwri-cobalt hover:bg-aatwri-cobalt/10";

  return (
    <button
      className={`${baseStyles} ${variant === 'primary' ? primaryStyles : secureStyles} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
      style={{
        clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)'
      }}
    >
      <span className="relative z-10 flex items-center gap-3">
        {variant === 'secure' && <Crosshair className={`w-4 h-4 ${isHovered ? 'animate-spin' : ''}`} />}
        {children}
        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
      </span>
      
      {/* Target Lock Scanline */}
      {isHovered && (
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/50 animate-[scan_1s_ease-in-out_infinite]" />
      )}
    </button>
  );
};