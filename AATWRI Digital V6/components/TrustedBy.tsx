import React from 'react';

const TrustedBy: React.FC = () => {
  return (
    <section className="w-full border-y border-aatwri-cobalt/10 bg-aatwri-navy/50 backdrop-blur-sm py-16 relative z-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col items-center gap-12">
          {/* Text increased by ~100% (text-sm -> text-2xl/3xl) */}
          <div className="text-gray-300 text-3xl font-display font-bold tracking-[0.2em] uppercase whitespace-nowrap text-glow-sm">
            Trusted By The Nation
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
             {/* DRDO - Size increased 75% (h-16 -> h-28) */}
             <div className="h-32 flex items-center justify-center">
                <img 
                  src="assets/DRDO_seal.png" 
                  alt="DRDO" 
                  className="h-28 w-auto object-contain"
                />
             </div>
             
             {/* HAL - Size increased 75% (h-14 -> h-24) */}
             <div className="h-32 flex items-center justify-center">
                <img 
                  src="assets/Hindustan_Aeronautics_Limited_Logo.svg" 
                  alt="HAL" 
                  className="h-24 w-auto object-contain invert"
                />
             </div>

             {/* Indian Army - Size increased 75% */}
             <div className="h-32 flex items-center justify-center">
                <img 
                  src="assets/Indian Army Emblem.svg" 
                  alt="Indian Army" 
                  className="h-24 w-auto object-contain invert"
                />
             </div>

             {/* BBBS Solutions - New Addition */}
             <div className="h-32 flex items-center justify-center">
                <img 
                  src="assets/bbbs_logo.png" 
                  alt="BBBS Solutions" 
                  className="h-24 w-auto object-contain invert"
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;