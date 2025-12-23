import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CowIcon, ChickenIcon, PigIcon, GoatIcon } from '@/components/icons';
import { placeholderImages } from '@/lib/placeholder-images';
import { FileText, Trophy } from 'lucide-react';

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
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">
            FarmSync
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage your farm with intelligence and ease.
          </p>
        </div>

        <div className="w-full max-w-5xl">
          <h2 className="text-xl font-semibold text-center mb-6 font-headline">Select a livestock category to begin</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {livestockTypes.map((livestock) => (
              <Link href={`/${livestock.slug}/dashboard`} key={livestock.slug} passHref>
                <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300 bg-card/50 backdrop-blur-sm border-white/10">
                  <CardContent className="p-0 flex flex-col items-center text-center">
                    <div className="relative w-full h-40">
                      <Image
                        src={livestock.image.imageUrl}
                        alt={livestock.image.description}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={livestock.image.imageHint}
                      />
                       <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                    </div>
                    <div className="p-4 bg-card w-full">
                       <livestock.icon className="h-10 w-10 text-primary mx-auto mb-2" />
                      <h3 className="font-semibold text-lg font-headline">{livestock.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
            
          <Card className="mt-8 bg-card/50 backdrop-blur-sm border-white/10">
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
                  <div className="flex items-center gap-4 text-amber-400">
                    <Trophy className="h-8 w-8" />
                    <div>
                      <p className="text-sm text-muted-foreground">Top Performer</p>
                      <h4 className="font-bold text-lg">Poultry</h4>
                      <p className="text-sm">Highest revenue generation this quarter.</p>
                    </div>
                  </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>

      <footer className="p-4 border-t bg-card">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-4">
            <Button variant="outline">App Backup</Button>
            <Button variant="outline">Restore Backup</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Have an account?{' '}
            <Button variant="link" className="p-0 h-auto">
              Log in to sync
            </Button>
          </p>
        </div>
      </footer>
    </div>
  );
}
