'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, DollarSign, HeartPulse, FileText, PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ComponentType } from 'react';
import type { LivestockCategory } from '@/lib/types';

type NavItemProps = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  livestock: string;
};

const NavItem = ({ href, label, icon: Icon, livestock }: NavItemProps) => {
  const pathname = usePathname();
  const fullPath = `/${livestock}${href}`;
  const isActive = pathname === fullPath;

  return (
    <Link href={fullPath} className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors flex-1 min-w-0 text-center h-full">
      <Icon className={cn('h-6 w-6', isActive ? 'text-primary' : 'group-hover:text-primary')} />
      <span className={cn('text-xs font-medium truncate', isActive && 'text-primary font-semibold')}>{label}</span>
    </Link>
  );
};

export function BottomNav({ livestock }: { livestock: LivestockCategory }) {
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    ...(livestock === 'dairy' || livestock === 'pigs'
      ? [{ href: '/herd', label: 'Herd', icon: PawPrint }]
      : [{ href: '/history', label: 'History', icon: BarChart2 }]),
    { href: '/finance', label: 'Finance', icon: DollarSign },
    { href: '/health', label: 'Health', icon: HeartPulse },
    { href: '/reports', label: 'Reports', icon: FileText },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t shadow-t-lg z-40 rounded-t-2xl">
      <div className="container mx-auto h-full flex justify-around items-center">
        {navItems.map((item) => (
            <NavItem key={item.href} {...item} livestock={livestock} />
        ))}
      </div>
    </nav>
  );
}
