import React, { useEffect, useRef } from 'react';

// Shared state interface for the background to consume
declare global {
  interface Window {
    __FLIGHT_STATE__: {
      pitch: number;
      roll: number;
      heading: number;
      altitude: number;
      speed: number;
    };
  }
}

const HUDOverlay: React.FC = () => {
  // Direct DOM refs for high-performance updates
  const compassTapeRef = useRef<HTMLDivElement>(null);
  const horizonRef = useRef<HTMLDivElement>(null);
  const pitchLadderRef = useRef<HTMLDivElement>(null);
  const altRef = useRef<HTMLSpanElement>(null);
  const machRef = useRef<HTMLSpanElement>(null);
  const hdgRef = useRef<HTMLSpanElement>(null);
  const gForceRef = useRef<HTMLSpanElement>(null);

  // Physics state (mutable ref, avoids re-renders)
  const physics = useRef({
    pitch: 0,
    roll: 0,
    heading: 0,
    altitude: 35000,
    speed: 0.85,
    targetPitch: 0,
    targetRoll: 0
  });

  useEffect(() => {
    // Initialize shared state
    window.__FLIGHT_STATE__ = physics.current;

    // --- INPUT HANDLING ---

    // 1. Mouse Control (Desktop)
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1; 
      const y = (e.clientY / innerHeight) * 2 - 1; 

      const deadzone = 0.05;
      const effectiveX = Math.abs(x) < deadzone ? 0 : x;
      const effectiveY = Math.abs(y) < deadzone ? 0 : y;

      // Sensitivity reduced by ~30%
      physics.current.targetRoll = effectiveX * 14; 
      physics.current.targetPitch = effectiveY * 10;
    };

    // 2. Gyroscope Control (Mobile/Tablet)
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // If we don't have valid data, ignore
      if (e.beta === null || e.gamma === null) return;
      
      const pitchInput = e.beta;  // Front-to-back tilt [-180, 180]
      const rollInput = e.gamma;  // Left-to-right tilt [-90, 90]
      
      // Neutral position: Phone held at ~40 degree angle (viewing posture)
      // Tilt Back (Top Up) -> Beta Increases. We want Pitch Up.
      // Tilt Forward (Top Down) -> Beta Decreases. We want Pitch Down.
      const neutralBeta = 40; 
      
      // Calculate targets with dampening (0.4)
      let targetPitch = (pitchInput - neutralBeta) * 0.4;
      let targetRoll = rollInput * 0.4; 
      
      // Clamp values to prevent extreme spins
      const MAX_PITCH = 15; // Matches approx mouse limit
      const MAX_ROLL = 25;  // Matches approx mouse limit
      
      physics.current.targetPitch = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, targetPitch));
      physics.current.targetRoll = Math.max(-MAX_ROLL, Math.min(MAX_ROLL, targetRoll));
    };

    // Initialize Inputs
    window.addEventListener('mousemove', handleMouseMove);

    // Permission Handling for iOS 13+ Gyroscope
    const initGyro = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        const grant = () => {
           (DeviceOrientationEvent as any).requestPermission()
           .then((state: string) => {
              if (state === 'granted') {
                 window.addEventListener('deviceorientation', handleOrientation);
              }
           })
           .catch((e: any) => console.error(e));
           
           document.removeEventListener('click', grant);
           document.removeEventListener('touchstart', grant);
        };
        // Wait for user interaction
        document.addEventListener('click', grant);
        document.addEventListener('touchstart', grant);
      } else {
        // Non-iOS or older devices
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };
    initGyro();


    // --- PHYSICS LOOP ---
    let animationFrameId: number;

    const loop = () => {
      const p = physics.current;
      
      // Physics Smoothing
      // Reduced from 0.05 to 0.035 for "heavier" feel (more inertia)
      const k = 0.035; 
      p.roll += (p.targetRoll - p.roll) * k;
      p.pitch += (p.targetPitch - p.pitch) * k;

      // Heading Dynamics
      p.heading += (p.roll * 0.03); 
      if (p.heading >= 360) p.heading -= 360;
      if (p.heading < 0) p.heading += 360;

      // Altitude
      p.altitude += p.pitch * 5; 
      if (p.altitude < 500) p.altitude = 500;
      
      // Speed
      const targetSpeed = 0.85 - (p.pitch * 0.005);
      p.speed += (targetSpeed - p.speed) * 0.02;

      // Update Global State
      window.__FLIGHT_STATE__ = { ...p };

      // --- DIRECT DOM UPDATES (No React Re-render) ---

      // 1. Compass Tape Translation
      if (compassTapeRef.current) {
        // We render a wide strip. Center of strip is 0 heading.
        // 12px per degree.
        const pxPerDeg = 12;
        const centerOffset = -360 * pxPerDeg; 
        const offset = -p.heading * pxPerDeg;
        compassTapeRef.current.style.transform = `translateX(${centerOffset + offset}px)`;
      }

      // 2. Horizon Rotation
      if (horizonRef.current) {
        horizonRef.current.style.transform = `rotate(${-p.roll}deg)`;
      }

      // 3. Pitch Ladder Translation
      if (pitchLadderRef.current) {
         // Pitch UP (positive) -> Horizon moves DOWN (positive Y)
         pitchLadderRef.current.style.transform = `translateY(${p.pitch * 25}px)`;
      }

      // 4. Text Updates
      if (altRef.current) altRef.current.innerText = Math.floor(p.altitude).toLocaleString();
      if (machRef.current) machRef.current.innerText = `M ${p.speed.toFixed(2)}`;
      if (hdgRef.current) hdgRef.current.innerText = Math.floor(p.heading).toString().padStart(3, '0');
      if (gForceRef.current) {
        const g = (1 + Math.abs(p.pitch/20) + Math.abs(p.roll/40)).toFixed(1);
        gForceRef.current.innerText = `${g} G`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Static Compass Strip Generator
  // Renders a long strip from -360 to 720 to cover all wrap arounds smoothly
  const renderCompassStrip = () => {
     const ticks = [];
     for (let i = -360; i <= 720; i+=5) {
       ticks.push(i);
     }
     return (
       <div ref={compassTapeRef} className="flex will-change-transform" style={{ marginLeft: '50%' }}>
          {ticks.map(deg => {
            // Normalize for display label
            let label = deg % 360;
            if (label < 0) label += 360;
            return (
              <div key={deg} className="w-[60px] shrink-0 text-center relative opacity-80" style={{ width: '60px' }}>
                 {deg % 10 === 0 ? label.toString().padStart(3, '0') : '|'}
              </div>
            );
          })}
       </div>
     );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-screen select-none">
      
      {/* 1. Compass Tape - Moved to Top-32 */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[480px] h-14 overflow-hidden mask-fade-sides border-b border-aatwri-cobalt/30 bg-gradient-to-b from-aatwri-navy/50 to-transparent backdrop-blur-sm">
        <div className="absolute left-1/2 top-0 h-3 w-[2px] bg-white z-10 shadow-[0_0_10px_white]"></div>
        
        {/* Container for the strip */}
        <div className="absolute top-3 w-full flex justify-center text-aatwri-cobalt font-mono text-xs font-bold">
            {renderCompassStrip()}
        </div>
      </div>

      {/* 2. Horizon & Pitch Ladder */}
      <div 
        ref={horizonRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        {/* Horizon Line */}
        <div 
           ref={pitchLadderRef}
           className="relative flex flex-col items-center justify-center will-change-transform"
        >
            {/* The Horizon Line */}
            <div className="absolute w-[300vw] h-[1px] bg-aatwri-cobalt/50 flex items-center justify-center shadow-[0_0_5px_#0055FF]">
               <div className="w-32 h-4 border-l-2 border-r-2 border-t-0 border-aatwri-cobalt/50 opacity-50"></div> 
            </div>

            {/* Pitch Lines */}
            <div className="flex flex-col items-center justify-center gap-[50px]">
               {/* +20 */}
               <div className="flex items-center gap-3 opacity-50">
                 <div className="w-8 h-[2px] bg-aatwri-cobalt"></div>
                 <span className="text-aatwri-cobalt text-xs font-bold">20</span>
                 <div className="w-8 h-[2px] bg-aatwri-cobalt"></div>
               </div>
               {/* +10 */}
               <div className="flex items-center gap-3 opacity-60">
                 <div className="w-16 h-[2px] bg-aatwri-cobalt shadow-[0_0_5px_#0055FF]"></div>
                 <span className="text-aatwri-cobalt text-xs font-bold">10</span>
                 <div className="w-16 h-[2px] bg-aatwri-cobalt shadow-[0_0_5px_#0055FF]"></div>
               </div>

               {/* Gap for 0 */}
               <div className="h-[2px] w-[300px] mb-[2px]"></div> 

               {/* -10 */}
               <div className="flex items-center gap-3 opacity-60">
                 <div className="w-16 border-t-2 border-dashed border-aatwri-cobalt shadow-[0_0_5px_#0055FF]"></div>
                 <span className="text-aatwri-cobalt text-xs font-bold">-10</span>
                 <div className="w-16 border-t-2 border-dashed border-aatwri-cobalt shadow-[0_0_5px_#0055FF]"></div>
               </div>
               {/* -20 */}
               <div className="flex items-center gap-3 opacity-50">
                 <div className="w-8 border-t-2 border-dashed border-aatwri-cobalt"></div>
                 <span className="text-aatwri-cobalt text-xs font-bold">-20</span>
                 <div className="w-8 border-t-2 border-dashed border-aatwri-cobalt"></div>
               </div>
            </div>
        </div>
      </div>

      {/* 3. FPM REMOVED */}
      
      {/* 4. Data Block */}
      <div className="absolute top-24 right-8 text-right font-mono text-xs tracking-widest space-y-2 z-50 bg-aatwri-navy/20 backdrop-blur-sm p-4 border-r-2 border-aatwri-cobalt/50 rounded-l-lg">
        <div className="flex items-center justify-end gap-3">
          <span className="text-gray-400 text-[10px] uppercase">Altitude</span>
          <span ref={altRef} className="text-white text-xl font-bold font-display">35,000</span>
          <span className="text-aatwri-cobalt">FT</span>
        </div>
        <div className="flex items-center justify-end gap-3">
           <span className="text-gray-400 text-[10px] uppercase">MACH NUMBER</span>
           <span ref={machRef} className="text-aatwri-cobalt text-lg font-bold">M 0.85</span>
        </div>
        <div className="flex items-center justify-end gap-3">
           <span className="text-gray-400 text-[10px] uppercase">Hdg</span>
           <span ref={hdgRef} className="text-white text-lg font-bold">000</span>
           <span className="text-aatwri-cobalt">°</span>
        </div>
        <div className="h-[1px] bg-gray-700 w-full my-2"></div>
        <div className="flex items-center justify-end gap-3">
           <span className="text-gray-400 text-[10px] uppercase">G FORCE</span>
           <span ref={gForceRef} className="text-aatwri-cobalt text-lg font-bold">1.0 G</span>
        </div>
      </div>

      {/* 5. Bottom Status */}
      <div className="absolute bottom-8 left-8 border-l-4 border-aatwri-cobalt pl-4 py-2 bg-gradient-to-r from-aatwri-navy/80 to-transparent">
        <div className="text-[10px] text-gray-400 tracking-widest mb-1">FLIGHT CONTROL SYSTEM</div>
        <div className="text-sm font-bold text-white tracking-wider flex items-center gap-2">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
           MANUAL OVERRIDE
        </div>
      </div>

    </div>
  );
};

export default HUDOverlay;