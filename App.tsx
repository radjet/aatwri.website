import React from 'react';
import AirstreamBackground from './components/AirstreamBackground';
import HUDOverlay from './components/HUDOverlay';
import VisionSection from './components/VisionSection';
import PlatformSection from './components/PlatformSection';
import ImpactSection from './components/ImpactSection';
import FoundrySection from './components/FoundrySection';
import TrustedBy from './components/TrustedBy';
import SideNav from './components/SideNav';
import { TactButton } from './components/UI';
import { ArrowDown, ExternalLink, Menu } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-aatwri-navy font-mono selection:bg-aatwri-cobalt selection:text-white overflow-hidden cursor-crosshair">
      {/* 1. Global Visual Layers */}
      <AirstreamBackground />
      <HUDOverlay />
      <SideNav />
      
      {/* 2. Navigation / Header */}
      <nav className="fixed top-0 left-0 w-full z-40 border-b border-aatwri-cobalt/20 bg-aatwri-navy/90 backdrop-blur-md supports-[backdrop-filter]:bg-aatwri-navy/60">
        <div className="max-w-[1920px] mx-auto px-8 h-28 flex items-center justify-between">
          
          {/* Logo - Increased size */}
          <div className="flex items-center gap-3 shrink-0 w-[200px]">
             <div className="h-14 flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <img 
                  src="assets/aatwri_logo.png" 
                  alt="AATWRI Logo" 
                  className="h-12 w-auto"
                />
             </div>
          </div>

          {/* Desktop Links (Product Pages) - Centered */}
          {/* Using flex-1 and justify-center to occupy the center stage */}
          <div className="hidden xl:flex flex-1 items-center justify-center gap-16">
             {['About Us', 'Our Products', 'Our Solutions', 'Autonomous Systems'].map((item) => (
               <a 
                 key={item} 
                 href="#" 
                 className="relative group py-2"
               >
                 <span className="text-sm font-display font-bold tracking-widest text-gray-400 group-hover:text-white transition-colors uppercase">
                   {item}
                 </span>
                 <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-aatwri-cobalt transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#0055FF]"></span>
               </a>
             ))}
          </div>

          {/* Right Action: Contact - Moved Left to avoid HUD overlap */}
          <div className="flex items-center gap-6 w-[200px] justify-end xl:w-auto xl:mr-64">
             {/* Mobile Menu Icon (Visible < XL) */}
             <button className="xl:hidden text-white hover:text-aatwri-cobalt">
                <Menu className="w-6 h-6" />
             </button>

             <div className="hidden md:block">
                <TactButton variant="primary" onClick={() => console.log('Contact')}>
                  CONTACT US
                </TactButton>
             </div>
          </div>

        </div>
      </nav>

      {/* 3. Hero Section */}
      <main className="relative z-10 pt-32">
        <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 max-w-6xl mx-auto mb-12">
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight tracking-tight mt-8 drop-shadow-2xl">
            THE OPERATING SYSTEM <br/>
            <span className="text-aatwri-cobalt text-glow">FOR MODERN COMBAT</span>
          </h1>
          
          <p className="max-w-3xl text-gray-400 text-lg md:text-xl mb-12 leading-relaxed font-mono">
            Indian air superiority is no longer just about the airframe. It’s won in the synthetic layer, where high-fidelity AI redefines the margin of victory.
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <TactButton onClick={() => document.getElementById('platform')?.scrollIntoView({behavior: 'smooth'})}>
              EXPLORE PLATFORM
            </TactButton>
            <TactButton variant="secure" onClick={() => document.getElementById('vision')?.scrollIntoView({behavior: 'smooth'})}>
              SYSTEM ARCHITECTURE
            </TactButton>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <ArrowDown className="text-aatwri-cobalt w-6 h-6" />
          </div>
        </section>

        {/* 4. Trusted By */}
        <TrustedBy />

        {/* 5. Sections */}
        <VisionSection />
        <PlatformSection />
        <ImpactSection />
        <FoundrySection />

        {/* Footer */}
        <footer className="border-t border-aatwri-cobalt/20 bg-aatwri-navy py-12 px-6">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                 <h4 className="text-white font-display font-bold text-2xl tracking-widest mb-2">AATWRI</h4>
                 <p className="text-gray-500 text-xs font-mono">SOVEREIGN SIMULATION SYSTEMS © 2026</p>
                 <div className="flex gap-4 mt-2 text-xs text-gray-600 font-mono justify-center md:justify-start">
                    <a href="mailto:pranav@aatwri.com" className="hover:text-aatwri-cobalt transition-colors">pranav@aatwri.com</a>
                    <span>|</span>
                    <a href="mailto:praveen@aatwri.com" className="hover:text-aatwri-cobalt transition-colors">praveen@aatwri.com</a>
                 </div>
              </div>
              <div className="flex gap-6">
                 <a href="#" className="text-gray-400 hover:text-aatwri-cobalt transition-colors"><ExternalLink className="w-5 h-5" /></a>
              </div>
           </div>
        </footer>

      </main>
    </div>
  );
};

export default App;