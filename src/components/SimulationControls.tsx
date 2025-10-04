import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { FastForward } from 'lucide-react';
import { useState } from 'react';

export default function SimulationControls() {
  const [speed, setSpeed] = useState([1]);

  const speedLabels = ['0.5x', '1x', '2x', '5x'];

  return (
    <Card className="p-4 bg-card border-border">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Simulation</h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Speed</span>
            <span className="text-foreground font-mono">
              {speedLabels[speed[0]]}
            </span>
          </div>
          <Slider
            value={speed}
            onValueChange={setSpeed}
            max={3}
            step={1}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Slow</span>
            <FastForward className="w-3 h-3" />
            <span>Fast</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <div className="text-muted-foreground">Satellites</div>
              <div className="text-foreground font-mono">5 Active</div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Uptime</div>
              <div className="text-foreground font-mono">99.8%</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
