import type { ReactNode } from 'react';
import { AppHeader } from '@/components/app-header';
import { BottomNav } from '@/components/bottom-nav';

export default function LivestockLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { livestock: string };
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader livestock={params.livestock} />
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav livestock={params.livestock} />
    </div>
  );
}
