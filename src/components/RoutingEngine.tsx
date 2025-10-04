import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, TrendingDown, Clock, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RoutingDecision {
  id: string;
  timestamp: Date;
  sourceSatellite: string;
  destination: string;
  dataSize: number;
  routeType: 'satellite-to-hub' | 'hub-to-earth';
  reason: string;
  costSavings: number;
  latencyReduction: number;
}

export default function RoutingEngine() {
  const [decisions, setDecisions] = useState<RoutingDecision[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const edgeSatellites = ['EO-Alpha', 'SAR-Beta', 'IoT-Gamma', 'Comm-Relay'];
      const earthCenters = ['NASA Ground Station', 'ESA Processing Center', 'Commercial Data Hub', 'Defense Command Center', 'NOAA Weather Center', 'USGS Monitoring Station'];
      
      // Randomly alternate between satellite-to-hub and hub-to-earth (50/50 chance)
      const isSatelliteToHub = Math.random() < 0.5;
      
      const newDecision: RoutingDecision = {
        id: Date.now().toString(),
        timestamp: new Date(),
        sourceSatellite: isSatelliteToHub ? edgeSatellites[Math.floor(Math.random() * edgeSatellites.length)] : 'LEO Data Hub',
        destination: isSatelliteToHub ? 'LEO Data Hub' : earthCenters[Math.floor(Math.random() * earthCenters.length)],
        dataSize: Math.floor(Math.random() * 500) + 100,
        routeType: isSatelliteToHub ? 'satellite-to-hub' : 'hub-to-earth',
        reason: '',
        costSavings: Math.floor(Math.random() * 1000) + 200,
        latencyReduction: Math.floor(Math.random() * 80) + 10,
      };

      if (newDecision.routeType === 'satellite-to-hub') {
        newDecision.reason = 'Sending raw data to LEO Data Hub for processing';
      } else {
        newDecision.reason = 'Downlinking processed data to Earth center';
      }

      setDecisions((prev) => [newDecision, ...prev.slice(0, 4)]);
    }, Math.floor(Math.random() * 2000) + 2000); // Random interval between 2-4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Brain className="w-5 h-5 text-secondary" />
          Routing Engine
        </h2>
      </div>

      <Card className="p-4 bg-card border-border">
        <div className="text-sm text-muted-foreground mb-4">
          Real-time routing: Edge satellites → LEO Data Hub → Earth centers
        </div>

        <div className="space-y-3">
          {decisions.map((decision, index) => (
            <div
              key={decision.id}
              className={`p-3 rounded-lg border ${
                index === 0 ? 'border-primary bg-primary/5' : 'border-border bg-muted/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">
                    {decision.sourceSatellite}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground text-sm">
                    {decision.destination}
                  </span>
                  <Badge
                    className={
                      decision.routeType === 'satellite-to-hub'
                        ? 'bg-teal-500 text-white'
                        : 'bg-orange-500 text-white'
                    }
                  >
                    {decision.routeType === 'satellite-to-hub' ? 'To Hub' : 'To Earth'}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {decision.dataSize} MB
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-2">{decision.reason}</p>

              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1 text-success">
                  <DollarSign className="w-3 h-3" />
                  <span>${decision.costSavings} saved</span>
                </div>
                <div className="flex items-center gap-1 text-secondary">
                  <Clock className="w-3 h-3" />
                  <span>{decision.latencyReduction}% faster</span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <TrendingDown className="w-3 h-3" />
                  <span>70% bandwidth</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
