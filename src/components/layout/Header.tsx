import { Badge } from '@/components/ui';
import { Satellite } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-lg">
      <div className="px-6 py-4 flex items-center">
        <h1 className="text-2xl font-bold text-foreground">Nebula Core</h1>
      </div>
    </header>
  );
}
