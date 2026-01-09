import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { StealthCard } from './UI';
import { TrendingUp, Database } from 'lucide-react';

const growthData = [
  { name: 'Q1', idex: 4000, cagr: 2400 },
  { name: 'Q2', idex: 3000, cagr: 1398 },
  { name: 'Q3', idex: 2000, cagr: 9800 },
  { name: 'Q4', idex: 2780, cagr: 3908 },
  { name: 'Q1', idex: 1890, cagr: 4800 },
  { name: 'Q2', idex: 2390, cagr: 3800 },
  { name: 'Q3', idex: 3490, cagr: 4300 },
];

const moqData = [
  { name: 'UNIT A', val: 80 },
  { name: 'UNIT B', val: 120 },
  { name: 'UNIT C', val: 60 },
  { name: 'UNIT D', val: 95 },
];

const MetricDashboard: React.FC = () => {
  return (
    <section className="relative z-10 py-24 bg-aatwri-navy/50 border-y border-aatwri-cobalt/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <TrendingUp className="text-aatwri-cobalt w-8 h-8" />
            <h2 className="text-4xl font-mono font-bold text-white tracking-tight">SOVEREIGN METRICS</h2>
          </div>
          <div className="text-right hidden md:block">
             <div className="text-xs text-aatwri-cobalt">DATA SOURCE</div>
             <div className="font-mono text-white">LIVE_TELEMETRY_FEED</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Main Chart: iDEX Grants */}
          <StealthCard className="col-span-1 lg:col-span-2 min-h-[400px]" title="CAPITAL VELOCITY [CAGR]">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorIdex" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0055FF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0055FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontFamily="JetBrains Mono" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontFamily="JetBrains Mono" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A192F', border: '1px solid #0055FF', fontFamily: 'JetBrains Mono' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="idex" stroke="#0055FF" fillOpacity={1} fill="url(#colorIdex)" />
                  <Area type="monotone" dataKey="cagr" stroke="#00d8ff" strokeDasharray="5 5" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </StealthCard>

          {/* Secondary Chart: MOQ */}
          <div className="space-y-8">
            <StealthCard title="UNIT EFFICIENCY [MOQ]">
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moqData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} fontFamily="JetBrains Mono" />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#0A192F', borderColor: '#0055FF' }} />
                    <Bar dataKey="val" fill="#0055FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </StealthCard>

            <StealthCard title="SYSTEM STATUS">
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-aatwri-cobalt/10 p-4 border border-aatwri-cobalt/20">
                    <div className="text-xs text-gray-400 mb-1">UPTIME</div>
                    <div className="text-2xl font-mono text-white">99.9%</div>
                 </div>
                 <div className="bg-aatwri-cobalt/10 p-4 border border-aatwri-cobalt/20">
                    <div className="text-xs text-gray-400 mb-1">LATENCY</div>
                    <div className="text-2xl font-mono text-green-400">12ms</div>
                 </div>
               </div>
            </StealthCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MetricDashboard;