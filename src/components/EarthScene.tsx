import { useEffect, useRef } from 'react';

interface Satellite {
  id: string;
  name: string;
  type: 'earth-observation' | 'sar' | 'iot';
  color: string;
  radius: number;
  speed: number;
  angle: number;
}

const satellites: Satellite[] = [
  {
    id: 'leo-hub',
    name: 'LEO Data Hub',
    type: 'earth-observation',
    color: '#FF6B6B',
    radius: 150,
    speed: 0.005,
    angle: Math.PI / 2,
  },
  {
    id: 'sat-1',
    name: 'EO-Alpha',
    type: 'earth-observation',
    color: '#30D8A7',
    radius: 150,
    speed: 0.01,
    angle: 0,
  },
  {
    id: 'sat-2',
    name: 'SAR-Beta',
    type: 'sar',
    color: '#4D9FFF',
    radius: 170,
    speed: 0.008,
    angle: Math.PI / 3,
  },
  {
    id: 'sat-3',
    name: 'IoT-Gamma',
    type: 'iot',
    color: '#FFB84D',
    radius: 135,
    speed: 0.012,
    angle: Math.PI,
  },
  {
    id: 'edge-node',
    name: 'Comm-Relay',
    type: 'earth-observation',
    color: '#30D8A7',
    radius: 190,
    speed: 0.007,
    angle: Math.PI * 1.5,
  },
];

export default function EarthScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      const size = Math.min(containerRect.width, containerRect.height, 600);
      
      canvas.width = size;
      canvas.height = size;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const earthRadius = Math.min(canvas.width, canvas.height) * 0.15;

    // Load Earth image
    const earthImage = new Image();
    earthImage.src = '/earth.png';

    const animate = () => {
      // Recalculate dimensions for responsive scaling
      const currentCenterX = canvas.width / 2;
      const currentCenterY = canvas.height / 2;
      const currentEarthRadius = Math.min(canvas.width, canvas.height) * 0.12;
      
      // Clear canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Earth image as perfect circle
      if (earthImage.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(currentCenterX, currentCenterY, currentEarthRadius, 0, Math.PI * 2);
        ctx.clip();
        
        // Calculate image dimensions to maintain aspect ratio and fill circle
        const imageAspect = earthImage.width / earthImage.height;
        let drawWidth = currentEarthRadius * 2;
        let drawHeight = currentEarthRadius * 2;
        let drawX = currentCenterX - currentEarthRadius;
        let drawY = currentCenterY - currentEarthRadius;
        
        if (imageAspect > 1) {
          // Image is wider than tall
          drawHeight = drawWidth / imageAspect;
          drawY = currentCenterY - drawHeight / 2;
        } else {
          // Image is taller than wide
          drawWidth = drawHeight * imageAspect;
          drawX = currentCenterX - drawWidth / 2;
        }
        
        ctx.drawImage(earthImage, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
        
        // Add subtle border
        ctx.beginPath();
        ctx.arc(currentCenterX, currentCenterY, currentEarthRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#1E40AF';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // Fallback to solid color while image loads
        ctx.beginPath();
        ctx.arc(currentCenterX, currentCenterY, currentEarthRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#1E3A8A';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(currentCenterX, currentCenterY, currentEarthRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#1E40AF';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw satellite orbits and satellites
      satellites.forEach(satellite => {
        // Update satellite position
        satellite.angle += satellite.speed;
        
        // Scale satellite radius proportionally with better scaling
        const baseRadius = 80;
        const scaleFactor = currentEarthRadius / baseRadius;
        const scaledRadius = satellite.radius * scaleFactor;
        
        // Draw orbit circle
        ctx.beginPath();
        ctx.arc(currentCenterX, currentCenterY, scaledRadius, 0, Math.PI * 2);
        ctx.strokeStyle = satellite.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Calculate satellite position
        const x = currentCenterX + Math.cos(satellite.angle) * scaledRadius;
        const y = currentCenterY + Math.sin(satellite.angle) * scaledRadius;

        // Scale satellite size proportionally with better scaling
        const baseSatelliteSize = satellite.id === 'leo-hub' ? 6 : 4;
        const satelliteSize = Math.max(baseSatelliteSize * scaleFactor, 2);

        // Draw satellite
        ctx.beginPath();
        ctx.arc(x, y, satelliteSize, 0, Math.PI * 2);
        ctx.fillStyle = satellite.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />

      {/* Satellite Key/Legend */}
      <div className="absolute bottom-4 right-4 pointer-events-none" style={{ zIndex: 2 }}>
        <div className="bg-black/50 rounded-lg p-3 border border-white/10">
          <h3 className="text-white font-bold text-xs mb-2 uppercase">Satellites</h3>
          <div className="space-y-1">
            {satellites
              .sort((a, b) => a.radius - b.radius)
              .map((satellite) => (
                <div key={satellite.id} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: satellite.color
                    }}
                  />
                  <span className="text-white text-xs">{satellite.name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}