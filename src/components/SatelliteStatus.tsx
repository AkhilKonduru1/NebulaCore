import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Database, Zap } from 'lucide-react';

interface SatelliteData {
  id: string;
  name: string;
  type: string;
  dataQueue: number;
  maxQueue: number;
  status: 'active' | 'processing' | 'idle';
  dataRate: number;
}

const satelliteData: SatelliteData[] = [
  {
    id: 'sat-1',
    name: 'EO-Alpha',
    type: 'Earth Observation',
    dataQueue: 847,
    maxQueue: 1000,
    status: 'active',
    dataRate: 125,
  },
  {
    id: 'sat-2',
    name: 'SAR-Beta',
    type: 'Synthetic Aperture Radar',
    dataQueue: 623,
    maxQueue: 1000,
    status: 'processing',
    dataRate: 89,
  },
  {
    id: 'sat-3',
    name: 'IoT-Gamma',
    type: 'IoT Relay',
    dataQueue: 412,
    maxQueue: 1000,
    status: 'active',
    dataRate: 56,
  },
];

const statusColors = {
  active: 'bg-primary text-primary-foreground',
  processing: 'bg-secondary text-secondary-foreground',
  idle: 'bg-muted text-muted-foreground',
};

export default function SatelliteStatus() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Satellite Constellation
        </h2>
      </div>

      <div className="space-y-3">
        {satelliteData.map((sat) => (
          <Card
            key={sat.id}
            className="p-4 bg-card border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{sat.name}</h3>
                <p className="text-sm text-muted-foreground">{sat.type}</p>
              </div>
              <Badge className={statusColors[sat.status]}>{sat.status}</Badge>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Data Queue</span>
                  <span className="text-foreground font-mono">
                    {sat.dataQueue}/{sat.maxQueue} MB
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                    style={{ width: `${(sat.dataQueue / sat.maxQueue) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Database className="w-4 h-4" />
                  <span>{sat.dataRate} MB/s</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-warning animate-pulse-glow" />
                  <span className="text-sm text-warning">High Priority</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
