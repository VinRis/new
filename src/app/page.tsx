
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CowIcon, ChickenIcon, PigIcon, GoatIcon } from '@/components/icons';
import { placeholderImages } from '@/lib/placeholder-images';
import { FileText, Trophy, Cloud, LifeBuoy } from 'lucide-react';
import { mockTransactions, livestockDisplayNames } from '@/lib/data';
import type { LivestockCategory } from '@/lib/types';
import { useMemo } from 'react';

type Livestock = {
  name: string;
  slug: 'dairy' | 'poultry' | 'pigs' | 'goats-sheep';
  icon: React.ComponentType<{ className?: string }>;
  image: (typeof placeholderImages)[number];
};

const livestockTypes: Livestock[] = [
  { name: 'Dairy', slug: 'dairy', icon: CowIcon, image: placeholderImages.find(p => p.id === 'dairy-cow')! },
  { name: 'Poultry', slug: 'poultry', icon: ChickenIcon, image: placeholderImages.find(p => p.id === 'poultry-chickens')! },
  { name: 'Pigs', slug: 'pigs', icon: PigIcon, image: placeholderImages.find(p => p.id === 'pigs-farm')! },
  { name: 'Goats/Sheep', slug: 'goats-sheep', icon: GoatIcon, image: placeholderImages.find(p => p.id === 'goats-sheep')! },
];

export default function WelcomePage() {

  const topPerformer = useMemo(() => {
    const revenueByCategory = mockTransactions
      .filter(tx => tx.category === 'Income')
      .reduce((acc, tx) => {
        if (tx.livestockCategory !== 'general') {
          acc[tx.livestockCategory] = (acc[tx.livestockCategory] || 0) + tx.amount;
        }
        return acc;
      }, {} as Record<LivestockCategory, number>);

    const topCategory = Object.entries(revenueByCategory).sort((a, b) => b[1] - a[1])[0];

    if (!topCategory) {
      return {
        name: 'N/A',
        reason: 'No income data available.'
      }
    }

    return {
      name: livestockDisplayNames[topCategory[0]],
      reason: 'Highest revenue generation this quarter.'
    }

  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 border-b">
         <div className="container mx-auto flex items-center justify-between">
             <h1 className="font-headline text-2xl font-bold text-primary">
                Farm Manager Pro
            </h1>
            <div className="flex items-center gap-2">
                <Button variant="ghost">
                    <LifeBuoy className="mr-2 h-4 w-4"/>
                    Help
                </Button>
                 <Button variant="link" className="p-0 h-auto">
                    Log in
                </Button>
            </div>
         </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="text-center mb-12">
           <h1 className="font-headline text-4xl md:text-6xl font-bold text-foreground">
            Farm Management, Simplified
          </h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
            Welcome to Farm Manager Pro. Select a livestock category to get a detailed overview of your farm's performance.
          </p>
        </div>

        <div className="w-full max-w-5xl">
          <h2 className="text-xl font-semibold text-center mb-6 font-headline text-primary">Get Started</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {livestockTypes.map((livestock) => (
              <Link href={`/${livestock.slug}/dashboard`} key={livestock.slug} passHref>
                <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 bg-card hover:-translate-y-1">
                  <CardContent className="p-0 flex flex-col items-center text-center">
                    <div className="relative w-full h-40">
                      <Image
                        src={livestock.image.imageUrl}
                        alt={livestock.image.description}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={livestock.image.imageHint}
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-colors duration-300" />
                       <div className="absolute bottom-4 left-4 text-left">
                           <livestock.icon className="h-10 w-10 text-white mb-2" />
                           <h3 className="font-semibold text-lg font-headline text-white">{livestock.name}</h3>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
            
          <Card className="mt-8 bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">Master Report</CardTitle>
                <p className="text-muted-foreground text-sm">A complete overview of your entire farm.</p>
              </div>
               <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate Master Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="border-t border-border pt-4 mt-4">
                  <div className="flex items-center gap-4 text-amber-500">
                    <Trophy className="h-8 w-8" />
                    <div>
                      <p className="text-sm text-muted-foreground">Top Performer</p>
                      <h4 className="font-bold text-lg text-foreground">{topPerformer.name}</h4>
                      <p className="text-sm text-muted-foreground">{topPerformer.reason}</p>
                    </div>
                  </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>

      <footer className="p-4 border-t bg-muted/50">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
           &copy; {new Date().getFullYear()} Farm Manager Pro. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
