import React from 'react';
import { User, Milestone } from 'lucide-react';

const FoundrySection: React.FC = () => {
  return (
    <section id="foundry" className="py-24 px-6 relative z-10">
       <div className="max-w-7xl mx-auto">
          <div className="mb-16">
             <h2 className="text-4xl font-display font-bold text-white mb-4">THE TEAM</h2>
             <p className="text-gray-400 font-mono max-w-2xl">
               Architects of the new synthetic era. Backed by Big Bang Boom Solutions.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
             {/* Leadership */}
             <div className="space-y-6">
                <h3 className="text-xl text-aatwri-cobalt font-display font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                   <User className="w-5 h-5" /> The Founders
                </h3>
                
                <div className="group flex items-start gap-6 p-6 border border-aatwri-cobalt/10 hover:border-aatwri-cobalt/50 bg-aatwri-navy transition-all duration-300">
                   <div className="w-20 h-20 bg-gray-800 rounded-full flex-shrink-0 overflow-hidden border-2 border-aatwri-cobalt/30">
                      <img 
                        src="assets/pranav.png" 
                        alt="Pranav Chandran" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                      />
                   </div>
                   <div>
                      <h4 className="text-white font-display font-bold text-lg">Pranav Chandran</h4>
                      <div className="text-aatwri-cobalt text-xs font-mono mb-2">CHIEF EXECUTIVE OFFICER</div>
                      <p className="text-gray-500 text-sm font-mono leading-relaxed">
                        Ex-Big Bang Boom Solutions. Instrumental in the development and deployment of See-Through Armor and Anti-Drone Defense Systems.
                      </p>
                   </div>
                </div>

                <div className="group flex items-start gap-6 p-6 border border-aatwri-cobalt/10 hover:border-aatwri-cobalt/50 bg-aatwri-navy transition-all duration-300">
                   <div className="w-20 h-20 bg-gray-800 rounded-full flex-shrink-0 overflow-hidden border-2 border-aatwri-cobalt/30">
                      <img 
                        src="assets/praveen.png" 
                        alt="Praveen Deevi" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                      />
                   </div>
                   <div>
                      <h4 className="text-white font-display font-bold text-lg">Praveen Deevi</h4>
                      <div className="text-aatwri-cobalt text-xs font-mono mb-2">CHIEF TECHNOLOGY OFFICER</div>
                      <p className="text-gray-500 text-sm font-mono leading-relaxed">
                        M.Tech Aerospace (DIAT, DRDO). Expertise in autonomous drones, Missile Guidance Algorithms (RCI, DRDO), and AI wargaming.
                      </p>
                   </div>
                </div>
             </div>

             {/* Roadmap */}
             <div>
                <h3 className="text-xl text-aatwri-cobalt font-display font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                   <Milestone className="w-5 h-5" /> Trajectory
                </h3>
                
                <div className="relative border-l border-aatwri-cobalt/20 ml-3 space-y-12 py-4">
                   <div className="relative pl-8">
                      <div className="absolute -left-[5px] top-2 w-2 h-2 bg-aatwri-cobalt rounded-full shadow-[0_0_10px_#0055FF]" />
                      <h4 className="text-white font-display font-bold">Technology Launch</h4>
                      <p className="text-gray-500 text-xs font-mono mt-1">Finalisation of core simulation engines.</p>
                   </div>
                   <div className="relative pl-8">
                      <div className="absolute -left-[5px] top-2 w-2 h-2 bg-aatwri-cobalt rounded-full shadow-[0_0_10px_#0055FF]" />
                      <h4 className="text-white font-display font-bold">Industry Partnerships</h4>
                      <p className="text-gray-500 text-xs font-mono mt-1">Strategic collaboration with DPSUs.</p>
                   </div>
                   <div className="relative pl-8">
                      <div className="absolute -left-[5px] top-2 w-2 h-2 bg-gray-600 rounded-full" />
                      <h4 className="text-gray-400 font-display font-bold">Global Expansion</h4>
                      <p className="text-gray-600 text-xs font-mono mt-1">Exporting sovereign tech to friendly nations.</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

export default FoundrySection;