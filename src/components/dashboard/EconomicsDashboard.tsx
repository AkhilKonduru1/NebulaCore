import { Card, Badge } from '@/components/ui';
import { TrendingDown, DollarSign, Zap, Database } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Metrics {
  traditionalCost: number;
  edgeCost: number;
  bandwidthSaved: number;
  timeSaved: number;
}

export default function EconomicsDashboard() {
  const [metrics, setMetrics] = useState<Metrics>({
    traditionalCost: 0,
    edgeCost: 0,
    bandwidthSaved: 0,
    timeSaved: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const newTraditionalCost = prev.traditionalCost + Math.random() * 800 + 200;
        const newEdgeCost = prev.edgeCost + Math.random() * 300 + 100;
        const newBandwidthSaved = prev.bandwidthSaved + Math.random() * 15 + 5;
        const newTimeSaved = Math.min(prev.timeSaved + Math.random() * 0.15 + 0.05, 35);
        
        return {
          traditionalCost: Math.min(newTraditionalCost, 50000),
          edgeCost: Math.min(newEdgeCost, 20000),
          bandwidthSaved: Math.min(newBandwidthSaved, 1000),
          timeSaved: newTimeSaved,
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const savings = metrics.traditionalCost - metrics.edgeCost;
  const savingsPercent = metrics.traditionalCost > 0 
    ? ((savings / metrics.traditionalCost) * 100).toFixed(1) 
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-success" />
          Economics Dashboard
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-card border-border">
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm text-muted-foreground">Traditional</div>
            <div className="p-2 bg-destructive/10">
              <TrendingDown className="w-4 h-4 text-destructive rotate-180" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground font-mono">
            ${metrics.traditionalCost.toFixed(0)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Ground station + processing costs
          </div>
        </Card>

        <Card className="p-4 bg-primary/10 border-primary">
          <div className="flex items-start justify-between mb-2">
            <div className="text-sm text-primary font-semibold">Nebula Core</div>
            <div className="p-2 bg-primary/20">
              <TrendingDown className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground font-mono">
            ${metrics.edgeCost.toFixed(0)}
          </div>
          <div className="text-xs text-primary mt-1">
            In-orbit processing + minimal downlink
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-success/10 border-success">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-success">Total Savings</h3>
          <Badge className="bg-success text-success-foreground font-mono">
            {savingsPercent}% saved
          </Badge>
        </div>
        <div className="text-3xl font-bold text-success font-mono mb-1">
          ${savings.toFixed(0)}
        </div>
        <div className="text-xs text-muted-foreground">
          Real-time cost reduction during session
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 bg-card border-border">
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground">Bandwidth Saved</span>
          </div>
          <div className="text-xl font-bold text-foreground font-mono">
            {metrics.bandwidthSaved.toFixed(1)} GB
          </div>
        </Card>

        <Card className="p-3 bg-card border-border">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-warning" />
            <span className="text-xs text-muted-foreground">Time Reduced</span>
          </div>
          <div className="text-xl font-bold text-foreground font-mono">
            {metrics.timeSaved.toFixed(0)}%
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-primary/20 border-primary">
        <div className="text-sm font-semibold text-foreground mb-2">
          Projected Annual Savings
        </div>
        <div className="text-2xl font-bold text-primary font-mono">
          $850K
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Based on current session performance
        </div>
      </Card>
    </div>
  );
}

