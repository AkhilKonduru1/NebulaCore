import { Card, Badge } from '@/components/ui';
import { TrendingDown, Zap, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SatelliteSizeComparison {
  id: string;
  name: string;
  type: 'traditional' | 'edge-enabled';
  size: number; // relative size multiplier
  processingPower: number; // onboard processing capability
  collisionRisk: number; // collision probability
  dataTransmission: number; // data sent to ground
  costSavings: number; // cost reduction percentage
  description: string;
}

export default function SatelliteSizeOptimization() {
  const [satellites, setSatellites] = useState<SatelliteSizeComparison[]>([]);
  const [networkEffect, setNetworkEffect] = useState(0);
  const [totalCollisionReduction, setTotalCollisionReduction] = useState(0);

  useEffect(() => {
    const satelliteData: SatelliteSizeComparison[] = [
      {
        id: 'traditional-large',
        name: 'Traditional Large Sat',
        type: 'traditional',
        size: 100,
        processingPower: 85,
        collisionRisk: 12.8,
        dataTransmission: 100,
        costSavings: 0,
        description: 'Heavy onboard processors, high collision risk'
      },
      {
        id: 'traditional-medium',
        name: 'Traditional Medium Sat',
        type: 'traditional',
        size: 60,
        processingPower: 60,
        collisionRisk: 12.8,
        dataTransmission: 100,
        costSavings: 0,
        description: 'Moderate processing, still significant risk'
      },
      {
        id: 'edge-small',
        name: 'Nebula Core Small Sat',
        type: 'edge-enabled',
        size: 25,
        processingPower: 15,
        collisionRisk: 7.1,
        dataTransmission: 20,
        costSavings: 32,
        description: 'Minimal onboard processing, offloads to hub'
      },
      {
        id: 'edge-micro',
        name: 'Nebula Core Micro Sat',
        type: 'edge-enabled',
        size: 10,
        processingPower: 5,
        collisionRisk: 4.2,
        dataTransmission: 10,
        costSavings: 38,
        description: 'Ultra-lightweight, maximum safety'
      }
    ];

    setSatellites(satelliteData);

    // Simulate network effect growth
    const interval = setInterval(() => {
      setNetworkEffect(prev => Math.min(prev + 0.5, 100));
      setTotalCollisionReduction(prev => Math.min(prev + 0.3, 28.5));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSizeColor = (type: string) => {
    return type === 'traditional' ? 'text-red-500 bg-red-500/10' : 'text-green-500 bg-green-500/10';
  };

  const getSizeIcon = (size: number) => {
    return '';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-primary" />
          Size Optimization & Collision Reduction
        </h2>
        <Badge className="bg-primary text-primary-foreground">
          Network Effect: {networkEffect.toFixed(0)}%
        </Badge>
      </div>

      {/* Satellite Comparison */}
      <div className="space-y-3">
        {satellites.map((satellite, index) => (
          <Card 
            key={satellite.id} 
            className={`p-4 border-2 ${
              satellite.type === 'edge-enabled' 
                ? 'border-green-500/50 bg-green-500/5' 
                : 'border-red-500/50 bg-red-500/5'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{getSizeIcon(satellite.size)}</div>
                <div>
                  <h3 className="font-semibold text-foreground">{satellite.name}</h3>
                  <p className="text-xs text-muted-foreground">{satellite.description}</p>
                </div>
              </div>
              <Badge className={`${getSizeColor(satellite.type)} hover:bg-current`}>
                {satellite.type === 'traditional' ? 'Traditional' : 'Edge-Enabled'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Size</span>
                  <span className="text-sm font-semibold text-foreground">{satellite.size}%</span>
                </div>
                <div className="w-full bg-muted h-2">
                  <div 
                    className={`h-2 ${
                      satellite.type === 'traditional' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${satellite.size}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Collision Risk</span>
                  <span className={`text-sm font-semibold ${
                    satellite.collisionRisk > 10 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {satellite.collisionRisk}%
                  </span>
                </div>
                <div className="w-full bg-muted h-2">
                  <div 
                    className={`h-2 ${
                      satellite.collisionRisk > 10 ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${satellite.collisionRisk * 5}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Onboard Processing</span>
                  <span className="text-sm font-semibold text-foreground">{satellite.processingPower}%</span>
                </div>
                <div className="w-full bg-muted h-2">
                  <div 
                    className="h-2 bg-blue-500"
                    style={{ width: `${satellite.processingPower}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Unnecessary Data to Earth</span>
                  <span className="text-sm font-semibold text-foreground">{satellite.dataTransmission}%</span>
                </div>
                <div className="w-full bg-muted h-2">
                  <div 
                    className="h-2 bg-orange-500"
                    style={{ width: `${satellite.dataTransmission}%` }}
                  />
                </div>
              </div>
            </div>

            {satellite.type === 'edge-enabled' && (
              <div className="mt-3 p-2 bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-500 font-semibold">
                    Processing offloaded to Nebula Core Hub
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {satellite.costSavings}% cost reduction • {100 - satellite.collisionRisk}% safer
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Technical Benefits */}
      <Card className="p-4 bg-card border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-warning" />
          Technical Benefits of Size Reduction
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary/10 p-3">
            <div className="text-sm font-semibold text-primary mb-1">Launch Cost</div>
            <div className="text-xs text-muted-foreground">45% reduction in launch mass</div>
          </div>
          <div className="bg-success/10 p-3">
            <div className="text-sm font-semibold text-success mb-1">Collision Risk</div>
            <div className="text-xs text-muted-foreground">28.5% lower probability</div>
          </div>
          <div className="bg-secondary/10 p-3">
            <div className="text-sm font-semibold text-secondary mb-1">Power Consumption</div>
            <div className="text-xs text-muted-foreground">52% less onboard processing</div>
          </div>
          <div className="bg-warning/10 p-3">
            <div className="text-sm font-semibold text-warning mb-1">Data Efficiency</div>
            <div className="text-xs text-muted-foreground">28% bandwidth reduction</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
