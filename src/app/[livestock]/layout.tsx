'use client';

import type { ReactNode } from 'react';
import { AppHeader } from '@/components/app-header';
import { BottomNav } from '@/components/bottom-nav';
import { AddRecordFAB } from '@/components/add-record-fab';
import { useParams } from 'next/navigation';
import type { LivestockCategory } from '@/lib/types';
import { FarmProvider } from '@/context/farm-context';

export default function LivestockLayout({
  children,
}: {
  children: ReactNode;
}) {
  const params = useParams() as { livestock: LivestockCategory };
  
  return (
    <FarmProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <AppHeader livestock={params.livestock} />
        <main className="flex-1 pb-24">{children}</main>
        <BottomNav livestock={params.livestock} />
        <AddRecordFAB />
      </div>
    </FarmProvider>
  );
}
