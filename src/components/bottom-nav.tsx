'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, DollarSign, HeartPulse, Settings, Plus, Droplets, Egg, Edit, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { ComponentType } from 'react';

type NavItemProps = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  livestock: string;
};

const NavItem = ({ href, label, icon: Icon, livestock }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === `/${livestock}${href}`;

  return (
    <Link href={`/${livestock}${href}`} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
      <Icon className={cn('h-6 w-6', isActive && 'text-primary')} />
      <span className={cn('text-xs', isActive && 'text-primary font-semibold')}>{label}</span>
    </Link>
  );
};

export function BottomNav({ livestock }: { livestock: string }) {
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/history', label: 'History', icon: BarChart2 },
    { href: '/finance', label: 'Finance', icon: DollarSign },
  ];

  const navItemsRight = [
    { href: '/health', label: 'Health', icon: HeartPulse },
    { href: '/reports', label: 'Reports', icon: FileText },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t shadow-t-lg z-50">
      <div className="container mx-auto h-full flex justify-around items-center">
        <div className="flex justify-around w-full relative">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} livestock={livestock} />
          ))}

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+10px)]">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  className="w-16 h-16 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 focus:ring-accent"
                  aria-label="Add New Record"
                >
                  <Plus className="h-8 w-8" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="font-headline">Add a new record</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button variant="outline" size="lg" className="justify-start text-base py-6">
                    <Droplets className="mr-2 h-5 w-5 text-primary"/> Add Production Record
                  </Button>
                  <Button variant="outline" size="lg" className="justify-start text-base py-6">
                    <DollarSign className="mr-2 h-5 w-5 text-primary"/> Add Financial Transaction
                  </Button>
                  <Button variant="outline" size="lg" className="justify-start text-base py-6">
                    <HeartPulse className="mr-2 h-5 w-5 text-primary"/> Add Health Record
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {navItemsRight.map((item) => (
            <NavItem key={item.href} {...item} livestock={livestock} />
          ))}
        </div>
      </div>
    </nav>
  );
}
