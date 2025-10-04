import { Card } from '@/components/ui/card';
import { TrendingDown, Zap, DollarSign, Clock } from 'lucide-react';

const stats = [
  {
    label: 'Cost Reduction',
    value: '62%',
    icon: DollarSign,
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    label: 'Bandwidth Saved',
    value: '70%',
    icon: TrendingDown,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    label: 'Response Time',
    value: '8min',
    icon: Clock,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    label: 'Faster Processing',
    value: '90%',
    icon: Zap,
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
];

export default function QuickStats() {
  return (
    <Card className="p-4 bg-card border-border">
      <h3 className="text-sm font-semibold text-foreground mb-3">Key Metrics</h3>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`${stat.bg} p-3 rounded-lg`}
          >
            <div className="flex items-center justify-between mb-1">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold ${stat.color} font-mono`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
