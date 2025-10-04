import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

const talkingPoints = [
  {
    title: 'The Problem',
    points: [
      'Satellites generate massive data volumes',
      'Ground station time is expensive ($1000+/hour)',
      'Critical data can wait hours for downlink',
      'Bandwidth constraints limit what gets transmitted',
    ],
    color: 'text-destructive',
  },
  {
    title: 'Nebula Core Solution',
    points: [
      'Dedicated compute satellites in orbit',
      'AI-powered routing: edge vs ground',
      'Real-time processing: filter, compress, analyze',
      'Inter-satellite laser links for speed',
    ],
    color: 'text-primary',
  },
  {
    title: 'The Value',
    points: [
      '70% bandwidth reduction typical',
      '60%+ cost savings demonstrated',
      '8 min response vs 4hr traditional (wildfire)',
      'Pay-per-compute like AWS Lambda',
    ],
    color: 'text-success',
  },
  {
    title: 'Market Opportunity',
    points: [
      'EO companies: Planet, Spire, ICEYE',
      'CubeSat operators need lightweight compute',
      'Defense & disaster response markets',
      '$2B+ addressable market by 2027',
    ],
    color: 'text-warning',
  },
];

export default function TalkingPoints() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-warning" />
          Presentation Guide
        </h2>
      </div>

      <div className="space-y-3">
        {talkingPoints.map((section, idx) => (
          <Card
            key={idx}
            className="p-4 border border-border bg-card"
          >
            <h3 className={`font-semibold mb-2 ${section.color}`}>
              {idx + 1}. {section.title}
            </h3>
            <ul className="space-y-1">
              {section.points.map((point, pidx) => (
                <li key={pidx} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="text-xs text-muted-foreground text-center p-2 bg-muted/50 rounded-lg">
        💡 Reference guide for presentations
      </div>
    </div>
  );
}
