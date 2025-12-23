
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Cloud, CloudOff, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useFarm } from '@/context/farm-context';
import { livestockDisplayNames } from '@/lib/data';

export function AppHeader({ livestock }: { livestock: string }) {
  const { farmName, farmLocation } = useFarm();
  const [isOnline, setIsOnline] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // This check is important to prevent errors on the server
    if (typeof window !== 'undefined' && 'onLine' in navigator) {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
           <Link href="/" passHref>
             <Button variant="ghost" size="icon" className="mr-2 h-10 w-10 rounded-full">
               <ChevronLeft className="h-6 w-6" />
             </Button>
           </Link>
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/farm-avatar/100/100" />
            <AvatarFallback>GA</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-bold font-headline text-foreground">{farmName}</h1>
            <p className="text-sm text-muted-foreground">
                {livestockDisplayNames[livestock]} - {farmLocation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isClient && (
            <div className="flex items-center gap-2 mr-2 p-2 rounded-full bg-muted">
              <div className={cn("w-3 h-3 rounded-full transition-colors", isOnline ? 'bg-green-500' : 'bg-red-500')} />
              <span className="text-sm text-muted-foreground hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          )}
          <Button variant="outline" size="icon" aria-label="Sync Data" className="h-10 w-10 rounded-full">
            {isOnline ? <Cloud className="h-5 w-5" /> : <CloudOff className="h-5 w-5 text-red-500" />}
          </Button>
           <Link href={`/${livestock}/settings`}>
              <Button variant="outline" size="icon" aria-label="Settings" className="h-10 w-10 rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}

    