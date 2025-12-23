import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { livestockDisplayNames } from '@/lib/data';

export function AppHeader({ livestock }: { livestock: string }) {
  const displayName = livestockDisplayNames[livestock] || livestock;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" passHref>
          <Button variant="ghost" size="icon" aria-label="Back to livestock selection">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold font-headline capitalize">
          {displayName}
        </h1>
        <div className="w-10"></div> {/* Spacer */}
      </div>
    </header>
  );
}
