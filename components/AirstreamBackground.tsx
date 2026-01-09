import React, { useEffect, useRef } from 'react';

interface FlightState {
  pitch: number;
  roll: number;
  heading: number;
  altitude: number;
  speed: number;
}

interface Star {
  azimuth: number; // 0-360
  elevation: number; // 15 to 90 (Upper atmosphere only)
  brightness: number;
}

const AirstreamBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    // --- CELESTIAL CONFIG ---
    // Increased by 20% (200 -> 240)
    const starCount = 240; 
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        azimuth: Math.random() * 360,
        // Concentrated in upper sky (15 degrees to 90 degrees)
        // This ensures they don't appear "below" the clouds
        elevation: 15 + (Math.random() * 75), 
        brightness: 0.3 + Math.random() * 0.7
      });
    }

    const moonAzimuth = 45; 
    const moonElevation = 25;

    // --- CLOUD CONFIG ---
    const gridSize = 100;
    const rows = 30; // Further draw distance
    const cols = 60; 
    
    // Cloud Noise Map
    const cloudData: number[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: number[] = [];
      for (let c = 0; c < cols; c++) {
        const x = c * 0.15;
        const y = r * 0.15;
        const n1 = Math.sin(x) * Math.cos(y);
        const n2 = Math.sin(x * 0.5 + y * 0.5) * 2;
        const noise = (n1 + n2) * 200; 
        row.push(noise);
      }
      cloudData.push(row);
    }

    let offsetZ = 0; 

    // --- RENDER LOOP ---
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Get Physics State
      const flightState = (window as any).__FLIGHT_STATE__ as FlightState || { pitch: 0, roll: 0, heading: 0, altitude: 35000, speed: 0.85 };
      const { pitch, roll, heading, speed } = flightState;

      // Camera Parameters
      const fov = height; // Approximate FOV based on screen height for 1:1 feel
      const centerX = width / 2;
      const centerY = height / 2;

      // 1. STARS & MOON (Infinity Layer)
      // Rotates with Roll and Pitch, Pans with Heading
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((-roll * Math.PI) / 180);
      
      const ppd = height / 60; // Pixels per degree

      // Draw Stars
      ctx.fillStyle = 'white';
      stars.forEach(star => {
        let relAz = star.azimuth - heading;
        if (relAz < -180) relAz += 360;
        if (relAz > 180) relAz -= 360;

        const x = relAz * ppd;
        const y = -(star.elevation - pitch) * ppd;

        // Clip stars if they go too low (into the horizon fade)
        if (y < height/2 && x > -width && x < width && y > -height) {
           ctx.globalAlpha = star.brightness * Math.max(0, 1 - (y + height/2)/height); // Fade near edges
           ctx.beginPath();
           ctx.arc(x, y, 1.2, 0, Math.PI * 2); // Slightly larger
           ctx.fill();
        }
      });

      // Draw Moon
      let relMoonAz = moonAzimuth - heading;
      if (relMoonAz < -180) relMoonAz += 360;
      if (relMoonAz > 180) relMoonAz -= 360;
      
      const moonX = relMoonAz * ppd;
      const moonY = -(moonElevation - pitch) * ppd;

      if (moonY < height/2) {
        ctx.globalAlpha = 1;
        const grad = ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, 60);
        grad.addColorStop(0, 'rgba(200, 220, 255, 0.6)');
        grad.addColorStop(1, 'rgba(0, 85, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(moonX, moonY, 60, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#EEF2FF';
        ctx.beginPath();
        ctx.arc(moonX, moonY, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();


      // 2. WIREFRAME CLOUDS (3D Projection Layer)
      offsetZ += speed * 0.8; 

      const cloudDeckY = 1500; // Vertical distance from camera to clouds (Camera is above)

      // Rotation Pre-calc (Pitch in Radians)
      // We rotate the WORLD around the Camera X axis.
      // If we pitch UP (positive), world rotates DOWN relative to us.
      // So we rotate world by -pitch.
      const pitchRad = (-pitch * Math.PI) / 180;
      const cosP = Math.cos(pitchRad);
      const sinP = Math.sin(pitchRad);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((-roll * Math.PI) / 180); // Roll applied to viewport

      // Increased Opacity (+8%)
      ctx.strokeStyle = 'rgba(0, 85, 255, 0.38)';
      ctx.lineWidth = 1;

      // Helper function for 3D Projection
      const project = (x: number, y: number, z: number) => {
        // 1. Rotate around X (Pitch)
        // Standard rotation matrix for X-axis
        // y' = y*cos - z*sin
        // z' = y*sin + z*cos
        const yRot = y * cosP - z * sinP;
        const zRot = y * sinP + z * cosP;

        // 2. Project to Screen
        if (zRot <= 10) return null; // Clip behind camera
        const scale = fov / zRot;
        return {
          x: x * scale,
          y: yRot * scale
        };
      };

      const zStep = gridSize;
      const zOffset = offsetZ % zStep;

      // Draw Grid
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        let started = false;

        for (let c = 0; c < cols; c++) {
           const wx = (c - cols / 2) * gridSize * 4; 
           // Cloud Deck is below us, so positive Y in world space relative to camera
           // Add noise to Y
           const noiseY = cloudData[r % rows][c];
           const wy = cloudDeckY + noiseY; 
           
           // Z moves towards us
           const baseZ = (rows - r) * gridSize * 2 + 500; // +500 to push start point out
           const wz = baseZ - zOffset; 

           const p = project(wx, wy, wz);

           if (p) {
             if (!started) {
               ctx.moveTo(p.x, p.y);
               started = true;
             } else {
               ctx.lineTo(p.x, p.y);
             }
           }
        }
        
        // Distance Fade
        const alpha = Math.max(0, (r / rows) * 0.5 - 0.1); 
        ctx.strokeStyle = `rgba(0, 85, 255, ${alpha})`;
        if (started) ctx.stroke();
      }

      // Draw Longitudinals (every 4th for performance/style)
      for (let c = 0; c < cols; c += 4) {
        ctx.beginPath();
        let started = false;
        // Increased opacity (+8%)
        ctx.strokeStyle = `rgba(0, 85, 255, 0.23)`;

        for (let r = 0; r < rows; r++) {
           const wx = (c - cols / 2) * gridSize * 4; 
           const noiseY = cloudData[r % rows][c];
           const wy = cloudDeckY + noiseY;
           const baseZ = (rows - r) * gridSize * 2 + 500;
           const wz = baseZ - zOffset;

           const p = project(wx, wy, wz);

           if (p) {
             if (!started) {
               ctx.moveTo(p.x, p.y);
               started = true;
             } else {
               ctx.lineTo(p.x, p.y);
             }
           }
        }
        if (started) ctx.stroke();
      }

      ctx.restore();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default AirstreamBackground;