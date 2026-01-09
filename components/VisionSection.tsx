import React from 'react';
import { StealthCard } from './UI';
import { Target } from 'lucide-react';

const VisionSection: React.FC = () => {
  return (
    <section id="vision" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
               <span className="text-aatwri-cobalt text-sm font-display font-bold tracking-widest uppercase">
                 / THE SOVEREIGN OPERATING SYSTEM /
               </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
              BUILT BY ENGINEERS. <br/> 
              <span className="text-aatwri-cobalt">VETTED BY COMMANDERS.</span>
            </h2>
            <div className="text-gray-400 font-mono text-lg leading-relaxed mb-8 space-y-6">
              <p>
                For decades, pilot readiness was measured in fuel burn and physical flight hours. But in the age of <strong className="text-white">Beyond Visual Range (BVR)</strong> engagements, the airframe is only as capable as the cognitive architecture behind it.
              </p>
              <p>
                AATWRI bridges the gap between raw hardware and operational intelligence. Our CFS platform doesn't just mimic a cockpit; it simulates the <strong className="text-white">electromagnetic friction</strong> of modern war where AI reacts with role-based autonomy to every pilot maneuver.
              </p>
            </div>
            
            <div className="flex gap-4 border-t border-aatwri-cobalt/20 pt-8">
               <div className="pl-4 border-l-2 border-aatwri-cobalt">
                  <h4 className="text-white font-display font-bold mb-1">Unknown Threats</h4>
                  <p className="text-xs text-gray-500 font-mono">Rapidly evolving adversarial vectors require adaptive AI response.</p>
               </div>
               <div className="pl-4 border-l-2 border-aatwri-cobalt">
                  <h4 className="text-white font-display font-bold mb-1">Intelligent Autonomy</h4>
                  <p className="text-xs text-gray-500 font-mono">Bridging the gap between human command and autonomous execution.</p>
               </div>
            </div>
          </div>

          <StealthCard title="MISSION_BRIEF" glow>
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <Target className="text-aatwri-cobalt w-5 h-5 mt-1" />
                   <div>
                      <h4 className="text-white font-display font-bold text-lg">Open Architecture</h4>
                      <p className="text-gray-400 font-mono text-sm mt-2">Seamless integration across numerous platforms, ensuring existing assets become smarter, not obsolete.</p>
                   </div>
                </div>
                <div className="h-[1px] bg-aatwri-cobalt/20 w-full" />
                 <div className="flex items-start gap-4">
                   <Target className="text-aatwri-cobalt w-5 h-5 mt-1" />
                   <div>
                      <h4 className="text-white font-display font-bold text-lg">Novel AI Models</h4>
                      <p className="text-gray-400 font-mono text-sm mt-2">Proprietary algorithms designed specifically for high-stakes, low-latency combat environments.</p>
                   </div>
                </div>
             </div>
          </StealthCard>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;