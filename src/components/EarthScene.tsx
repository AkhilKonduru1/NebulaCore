import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={earthRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#2C5FFF"
        emissive="#1A3D8F"
        emissiveIntensity={0.2}
        metalness={0.4}
        roughness={0.7}
      />
    </Sphere>
  );
}

interface Satellite {
  id: string;
  name: string;
  type: 'earth-observation' | 'sar' | 'iot';
  color: string;
  radius: number;
  speed: number;
  angle: number;
}

function SatelliteOrbit({ satellite }: { satellite: Satellite }) {
  const satelliteRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (satelliteRef.current) {
      satellite.angle += satellite.speed;
      const x = Math.cos(satellite.angle) * satellite.radius;
      const z = Math.sin(satellite.angle) * satellite.radius;
      const y = 0; // Keep satellites on flat orbits
      satelliteRef.current.position.set(x, y, z);
    }
  });

  // Create orbit line points - straight circular orbits
  const orbitPoints: [number, number, number][] = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    orbitPoints.push([
      Math.cos(angle) * satellite.radius,
      0, // Keep orbits flat (straight)
      Math.sin(angle) * satellite.radius,
    ]);
  }

  return (
    <>
      <Line
        points={orbitPoints}
        color={satellite.color}
        lineWidth={1}
        opacity={0.3}
        transparent
      />
      <mesh ref={satelliteRef}>
        <boxGeometry args={satellite.id === 'leo-hub' ? [0.2, 0.2, 0.2] : [0.1, 0.1, 0.1]} />
        <meshStandardMaterial
          color={satellite.color}
          emissive={satellite.color}
          emissiveIntensity={satellite.id === 'leo-hub' ? 0.8 : 0.5}
        />
      </mesh>
    </>
  );
}

const satellites: Satellite[] = [
  {
    id: 'leo-hub',
    name: 'LEO Data Hub',
    type: 'earth-observation',
    color: '#FF6B6B',
    radius: 2.8,
    speed: 0.005,
    angle: Math.PI / 2,
  },
  {
    id: 'sat-1',
    name: 'EO-Alpha',
    type: 'earth-observation',
    color: '#30D8A7',
    radius: 3.5,
    speed: 0.01,
    angle: 0,
  },
  {
    id: 'sat-2',
    name: 'SAR-Beta',
    type: 'sar',
    color: '#4D9FFF',
    radius: 4,
    speed: 0.008,
    angle: Math.PI / 3,
  },
  {
    id: 'sat-3',
    name: 'IoT-Gamma',
    type: 'iot',
    color: '#FFB84D',
    radius: 3.2,
    speed: 0.012,
    angle: Math.PI,
  },
  {
    id: 'edge-node',
    name: 'Comm-Relay',
    type: 'earth-observation',
    color: '#30D8A7',
    radius: 4.5,
    speed: 0.007,
    angle: Math.PI / 2,
  },
];

export default function EarthScene() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Earth />
        {satellites.map((satellite) => (
          <SatelliteOrbit key={satellite.id} satellite={satellite} />
        ))}
        <OrbitControls enableZoom={true} enablePan={false} minDistance={6} maxDistance={15} />
      </Canvas>

      {/* Satellite Key/Legend */}
      <div className="absolute bottom-4 right-4 pointer-events-none" style={{ zIndex: 2 }}>
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <h3 className="text-white/90 font-bold text-xs mb-2 uppercase tracking-wide">Satellites</h3>
          <div className="space-y-1">
            {satellites
              .sort((a, b) => a.radius - b.radius)
              .map((satellite) => (
                <div key={satellite.id} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: satellite.color,
                      boxShadow: `0 0 8px ${satellite.color}`
                    }}
                  />
                  <span className="text-white/80 text-xs font-mono">{satellite.name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
