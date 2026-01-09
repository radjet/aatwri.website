import React, { useState } from 'react';
import { FlightLayer, SystemNode } from '../types';
import { Activity, Box, Cpu, Layers } from 'lucide-react';
import { StealthCard } from './UI';

const tacticalData: Record<FlightLayer, SystemNode[]> = {
  [FlightLayer.LAYER_01]: [
    { id: 'l1-1', title: 'Aero-Structure', description: 'Composite frame analysis with real-time stress testing.', status: 'active', specs: ['Carbon-Ti', 'Mach 2.2', '7.5G'] },
    { id: 'l1-2', title: 'Avionics Bus', description: 'High-throughput data stream for sensor fusion.', status: 'active', specs: ['100Gbps', 'Redundant', 'Mil-Spec'] },
  ],
  [FlightLayer.LAYER_02]: [
    { id: 'l2-1', title: 'Simulated Reality', description: 'High-fidelity metaverse injection for pilot training.', status: 'locked', specs: ['UE5 Core', '0ms Latency'] },
    { id: 'l2-2', title: 'Tactical AI', description: 'Adversarial neural networks for combat prediction.', status: 'active', specs: ['Transformer', 'Predictive'] },
  ]
};

const TacticalEngine: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<FlightLayer>(FlightLayer.LAYER_01);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
         <Cpu className="text-aatwri-cobalt w-8 h-8" />
         <h2 className="text-4xl font-mono font-bold text-white tracking-tight">ACE TACTICAL ENGINE</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Layer Selection / Navigation */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <button
            onClick={() => setActiveLayer(FlightLayer.LAYER_01)}
            className={`text-left p-6 font-mono transition-all duration-300 border-l-4 ${activeLayer === FlightLayer.LAYER_01 ? 'bg-aatwri-cobalt/10 border-aatwri-cobalt text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-sm tracking-widest">LAYER 01</span>
            </div>
            <h3 className="text-xl font-bold">FLIGHT DYNAMICS</h3>
          </button>

          <button
            onClick={() => setActiveLayer(FlightLayer.LAYER_02)}
            className={`text-left p-6 font-mono transition-all duration-300 border-l-4 ${activeLayer === FlightLayer.LAYER_02 ? 'bg-aatwri-cobalt/10 border-aatwri-cobalt text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Box className="w-4 h-4" />
              <span className="text-sm tracking-widest">LAYER 02</span>
            </div>
            <h3 className="text-xl font-bold">METAVERSE INTEGRATION</h3>
          </button>
        </div>

        {/* Visualizer / Content */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {tacticalData[activeLayer].map((node) => (
            <StealthCard 
              key={node.id} 
              title={`SYS_${node.id.toUpperCase()}`}
              className="h-full"
              glow={true}
            >
              <div 
                className="h-full flex flex-col justify-between"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div>
                  <h4 className="text-2xl text-white font-mono mb-4">{node.title}</h4>
                  <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
                    {node.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="h-[1px] w-full bg-aatwri-cobalt/20" />
                  <div className="grid grid-cols-3 gap-2">
                    {node.specs.map((spec, i) => (
                      <div key={i} className="text-[10px] text-aatwri-cobalt border border-aatwri-cobalt/30 px-2 py-1 text-center">
                        {spec}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                     <span className="text-gray-500">STATUS</span>
                     <span className={`uppercase tracking-widest ${node.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                        [{node.status}]
                     </span>
                  </div>
                </div>
              </div>
            </StealthCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TacticalEngine;