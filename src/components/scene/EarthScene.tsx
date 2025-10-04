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
    id: 'nebula-hub',
    name: 'Nebula Core Hub',
    type: 'earth-observation',
    color: '#FF6B6B',
    radius: 120,
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
      const containerAspect = containerRect.width / containerRect.height;
      
      // Use the smaller dimension to ensure the canvas fits in the container
      const maxSize = Math.min(containerRect.width, containerRect.height);
      
      // Set canvas size to maintain square aspect ratio
      canvas.width = maxSize;
      canvas.height = maxSize;
      
      // Set CSS size to fill container while maintaining aspect ratio
      if (containerAspect > 1) {
        // Container is wider than tall
        canvas.style.width = `${maxSize}px`;
        canvas.style.height = `${maxSize}px`;
        canvas.style.margin = '0 auto';
      } else {
        // Container is taller than wide
        canvas.style.width = `${maxSize}px`;
        canvas.style.height = `${maxSize}px`;
        canvas.style.margin = 'auto 0';
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load Earth image
    const earthImage = new Image();
    earthImage.src = '/earth.png';

    const animate = () => {
      // Get current canvas dimensions
      const currentWidth = canvas.width;
      const currentHeight = canvas.height;
      const currentCenterX = currentWidth / 2;
      const currentCenterY = currentHeight / 2;
      const currentEarthRadius = Math.min(currentWidth, currentHeight) * 0.15;
      
      // Clear canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, currentWidth, currentHeight);

      // Draw Earth image as perfect circle
      if (earthImage.complete) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(currentCenterX, currentCenterY, currentEarthRadius, 0, Math.PI * 2);
        ctx.clip();
        
        // Calculate image dimensions to maintain aspect ratio and fill circle
        const imageAspect = earthImage.width / earthImage.height;
        const circleDiameter = currentEarthRadius * 2;
        
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imageAspect > 1) {
          // Image is wider than tall - fit height to circle diameter
          drawHeight = circleDiameter;
          drawWidth = drawHeight * imageAspect;
          drawX = currentCenterX - drawWidth / 2;
          drawY = currentCenterY - drawHeight / 2;
        } else {
          // Image is taller than wide - fit width to circle diameter
          drawWidth = circleDiameter;
          drawHeight = drawWidth / imageAspect;
          drawX = currentCenterX - drawWidth / 2;
          drawY = currentCenterY - drawHeight / 2;
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
        
        // Scale satellite radius proportionally
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

        // Scale satellite size proportionally
        const baseSatelliteSize = satellite.id === 'nebula-hub' ? 6 : 4;
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
        <div className="bg-black/50 p-3 border border-white/10">
          <h3 className="text-white font-bold text-xs mb-2 uppercase">Satellites</h3>
          <div className="space-y-1">
            {satellites
              .sort((a, b) => a.radius - b.radius)
              .map((satellite) => (
                <div key={satellite.id} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3"
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