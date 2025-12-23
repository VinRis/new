'use client';

import { TrendingDown, Syringe, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Insight } from '@/lib/types';
import { Button } from './ui/button';

type FarmInsightsProps = {
  insight: Insight | null;
};

const iconMap = {
  TrendingDown: TrendingDown,
  Syringe: Syringe,
  CheckCircle: CheckCircle
}

export function FarmInsights({ insight }: FarmInsightsProps) {

  if (!insight) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-white/10">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">No insights available at the moment. Keep your data updated for personalized suggestions.</p>
        </CardContent>
      </Card>
    )
  }

  const Icon = iconMap[insight.icon];

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10 hover:bg-card/70 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
            <div className='flex items-center gap-4'>
                <div className="bg-secondary p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
            </div>
            <Button variant="ghost" size="icon">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
