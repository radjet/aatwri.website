import React, { useState } from 'react';
import { Layers, Box, Cpu, Plane, Globe, Zap } from 'lucide-react';
import { StealthCard } from './UI';

type PlatformTab = 'sim' | 'meta' | 'auto';

const PlatformSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlatformTab>('sim');

  const content = {
    sim: {
      title: 'COMBAT FLIGHT SIMULATOR',
      icon: Plane,
      desc: 'A Full mission simulator capable of simulating LFE (Large Force Engagements) and BVR (Beyond Visual Range) missions.',
      specs: [
        { label: 'FDM', value: 'Physics Based' },
        { label: 'VR', value: 'Integrated' },
        { label: 'AI', value: 'Role Based' },
        { label: 'EW', value: 'Reconfigurable' }
      ],
      features: ['Multi-airframe FDM', 'Debriefing with Replay', 'AI Controlled CGFs', 'Simulated Ground Targets']
    },
    meta: {
      title: 'DEFENCE METAVERSE',
      icon: Globe,
      desc: 'Virtual battlefields enabling immersive wargaming, multi-user collaboration, and advanced analytics in customizable environments.',
      specs: [
        { label: 'Users', value: 'Multi-Collab' },
        { label: 'Terrain', value: 'Global Scale' },
        { label: 'Assets', value: 'High Fidelity' },
        { label: 'Analytics', value: 'Real-time' }
      ],
      features: ['Immersive Wargaming', 'Tactical Rehearsal', 'Scenario Building', 'Cross-Branch Ops']
    },
    auto: {
      title: 'AUTONOMOUS SYSTEMS',
      icon: Zap,
      desc: 'Intelligent aerial systems designed for autonomous decision making, swarming capabilities, and precision execution.',
      specs: [
        { label: 'Control', value: 'Autonomous' },
        { label: 'Comms', value: 'Mesh Network' },
        { label: 'Payload', value: 'Modular' },
        { label: 'Range', value: 'Extended' }
      ],
      features: ['Swarm Logic', 'Target Recognition', 'Path Planning', 'Auto-Return']
    }
  };

  const ActiveIcon = content[activeTab].icon;

  return (
    <section id="platform" className="relative z-10 py-24 px-6 bg-aatwri-navy/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
           <Layers className="text-aatwri-cobalt w-8 h-8" />
           <h2 className="text-4xl font-display font-bold text-white tracking-tight">PLATFORM CAPABILITIES</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Navigation */}
           <div className="lg:col-span-4 flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab('sim')}
                className={`flex items-center gap-4 p-6 text-left transition-all duration-300 border-l-2 ${activeTab === 'sim' ? 'bg-aatwri-cobalt/10 border-aatwri-cobalt text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
              >
                <Plane className="w-5 h-5" />
                <span className="font-display font-bold tracking-widest">FLIGHT SIMULATOR</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('meta')}
                className={`flex items-center gap-4 p-6 text-left transition-all duration-300 border-l-2 ${activeTab === 'meta' ? 'bg-aatwri-cobalt/10 border-aatwri-cobalt text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
              >
                <Globe className="w-5 h-5" />
                <span className="font-display font-bold tracking-widest">DEFENCE METAVERSE</span>
              </button>

              <button 
                onClick={() => setActiveTab('auto')}
                className={`flex items-center gap-4 p-6 text-left transition-all duration-300 border-l-2 ${activeTab === 'auto' ? 'bg-aatwri-cobalt/10 border-aatwri-cobalt text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
              >
                <Zap className="w-5 h-5" />
                <span className="font-display font-bold tracking-widest">AUTONOMOUS SYSTEMS</span>
              </button>
           </div>

           {/* Content Display */}
           <div className="lg:col-span-8">
              <StealthCard className="h-full min-h-[400px]" glow>
                 <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-3xl font-display font-bold text-white">{content[activeTab].title}</h3>
                        <ActiveIcon className="w-12 h-12 text-aatwri-cobalt opacity-50" />
                      </div>
                      <p className="text-lg text-gray-300 font-mono leading-relaxed mb-8">
                        {content[activeTab].desc}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                         {content[activeTab].features.map((feat, i) => (
                           <div key={i} className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                              <div className="w-1 h-1 bg-aatwri-cobalt rounded-full" />
                              {feat}
                           </div>
                         ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 border-t border-aatwri-cobalt/20 pt-6">
                       {content[activeTab].specs.map((spec, i) => (
                          <div key={i} className="text-center">
                             <div className="text-[10px] text-aatwri-cobalt font-display font-bold uppercase mb-1">{spec.label}</div>
                             <div className="text-white font-mono text-xs">{spec.value}</div>
                          </div>
                       ))}
                    </div>
                 </div>
              </StealthCard>
           </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;