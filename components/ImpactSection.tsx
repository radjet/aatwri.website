import React from 'react';
import { StealthCard } from './UI';
import { Award, Quote } from 'lucide-react';

const ImpactSection: React.FC = () => {
  return (
    <section id="impact" className="relative z-10 py-24 px-6 border-y border-aatwri-cobalt/20 bg-aatwri-navy/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <Award className="text-aatwri-cobalt w-8 h-8" />
          <h2 className="text-4xl font-display font-bold text-white tracking-tight">COMMAND VALIDATION</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
           {/* Testimonial 01 */}
           <StealthCard title="LOG_01" className="h-full">
              <div className="flex flex-col h-full justify-between gap-6">
                 <Quote className="text-aatwri-cobalt w-8 h-8 opacity-50" />
                 <p className="text-white font-mono text-lg italic leading-relaxed">
                   "Tested and validated for next-generation combat readiness. A true force multiplier."
                 </p>
                 <div className="border-t border-aatwri-cobalt/20 pt-4">
                   <div className="text-aatwri-cobalt font-display font-bold tracking-wider">GEN STEPHANE MILLE</div>
                   <div className="text-xs text-gray-500 font-mono mt-1">CHIEF OF AIR STAFF, FRENCH AIR FORCE</div>
                 </div>
              </div>
           </StealthCard>

           {/* Testimonial 02 */}
           <StealthCard title="LOG_02" className="h-full">
              <div className="flex flex-col h-full justify-between gap-6">
                 <Quote className="text-aatwri-cobalt w-8 h-8 opacity-50" />
                 <p className="text-white font-mono text-lg italic leading-relaxed">
                   "AATWRI's simulation fidelity is critical for our pilot training infrastructure."
                 </p>
                 <div className="border-t border-aatwri-cobalt/20 pt-4">
                   <div className="text-aatwri-cobalt font-display font-bold tracking-wider">AIR MARSHAL AP SINGH</div>
                   <div className="text-xs text-gray-500 font-mono mt-1">CHIEF OF AIR STAFF, INDIAN AIR FORCE</div>
                 </div>
              </div>
           </StealthCard>

           {/* Testimonial 03 */}
           <StealthCard title="LOG_03" className="h-full">
              <div className="flex flex-col h-full justify-between gap-6">
                 <Quote className="text-aatwri-cobalt w-8 h-8 opacity-50" />
                 <p className="text-white font-mono text-lg italic leading-relaxed">
                   "Bridging the gap between physical airframes and digital twins with unprecedented accuracy."
                 </p>
                 <div className="border-t border-aatwri-cobalt/20 pt-4">
                   <div className="text-aatwri-cobalt font-display font-bold tracking-wider">ALAIN GARCIA</div>
                   <div className="text-xs text-gray-500 font-mono mt-1">VICE PRESIDENT, BOEING INDIA</div>
                 </div>
              </div>
           </StealthCard>

        </div>
      </div>
    </section>
  );
};

export default ImpactSection;