import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Cloud, Satellite, Play, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Scenario {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  duration: number;
}

const scenarios: Scenario[] = [
  {
    id: 'wildfire',
    name: 'Wildfire Detection',
    icon: <Flame className="w-4 h-4" />,
    description: 'Real-time wildfire detection with 8min response vs 4hr traditional',
    color: 'bg-destructive',
    duration: 15,
  },
  {
    id: 'cloud-filter',
    name: 'Cloud Filtering',
    icon: <Cloud className="w-4 h-4" />,
    description: 'AI removes cloudy imagery, saves 70% bandwidth',
    color: 'bg-secondary',
    duration: 10,
  },
  {
    id: 'iot-aggregate',
    name: 'IoT Aggregation',
    icon: <Satellite className="w-4 h-4" />,
    description: 'Compress 10,000 sensor readings to actionable insights',
    color: 'bg-warning',
    duration: 12,
  },
];

export default function ScenarioPanel() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const runScenario = (scenario: Scenario) => {
    setActiveScenario(scenario.id);
    setIsRunning(true);

    toast({
      title: `🚀 ${scenario.name} Started`,
      description: scenario.description,
      duration: 3000,
    });

    // Simulate scenario completion
    setTimeout(() => {
      setIsRunning(false);
      toast({
        title: `✅ ${scenario.name} Complete`,
        description: `Demonstrated ${scenario.duration}s scenario successfully`,
        duration: 3000,
      });
    }, scenario.duration * 1000);
  };

  const resetDemo = () => {
    setActiveScenario(null);
    setIsRunning(false);
    toast({
      title: '🔄 Demo Reset',
      description: 'Ready for next presentation',
      duration: 2000,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Demo Scenarios</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={resetDemo}
          disabled={!activeScenario}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        {scenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className={`p-3 border ${
              activeScenario === scenario.id
                ? 'border-primary bg-primary/10 shadow-glow-teal'
                : 'border-border bg-card'
            }`}
            onClick={() => !isRunning && runScenario(scenario)}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${scenario.color} text-white flex-shrink-0`}>
                {scenario.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm text-foreground">
                    {scenario.name}
                  </h3>
                  {activeScenario === scenario.id && isRunning && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Play className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {scenario.description}
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  ⏱️ {scenario.duration}s demo
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {activeScenario && isRunning && (
        <Card className="p-4 bg-gradient-to-r from-primary/20 to-secondary/20 border-primary">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground font-semibold">Scenario Progress</span>
              <span className="text-primary">Running...</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-full" />
            </div>
            <p className="text-xs text-muted-foreground">
              💡 Tip: Explain the cost savings while this runs
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
