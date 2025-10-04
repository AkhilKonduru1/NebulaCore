import { Badge } from '@/components/ui/badge';
import { Satellite } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-lg">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Satellite className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Nebula Core</h1>
            <p className="text-sm text-muted-foreground">Cloud Computing in Orbit</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
        </div>
      </div>
    </header>
  );
}
