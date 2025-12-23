'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Cloud, CloudOff, Sun, Cloudy, CloudRain, Plus, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const weatherData = {
  temp: 24,
  condition: 'Sunny',
  icon: Sun,
};

export function AppHeader({ livestock }: { livestock: string }) {
  const [isOnline, setIsOnline] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
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
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/farm-avatar/100/100" />
            <AvatarFallback>GA</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-bold font-headline text-foreground">Green Acres Farm</h1>
            <p className="text-sm text-muted-foreground">Vermont, USA</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isClient && (
            <div className="flex items-center gap-2 mr-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-muted-foreground">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          )}
          <Button variant="ghost" size="icon" aria-label="Sync Data" className="h-9 w-9">
            {isOnline ? <Cloud className="h-5 w-5" /> : <CloudOff className="h-5 w-5 text-red-500" />}
          </Button>
           <Link href={`/${livestock}/settings`}>
              <Button variant="ghost" size="icon" aria-label="Settings" className="h-9 w-9">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
