'use client';

import { BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Insight } from '@/lib/types';

type FarmInsightsProps = {
  insight: Insight | null;
};

export function FarmInsights({ insight }: FarmInsightsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span>Farm Insights</span>
        </CardTitle>
        <CardDescription>
          Data-driven suggestions to optimize your farm.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {insight ? (
          <div className="prose prose-sm max-w-none text-foreground">
            <h3 className="font-semibold text-foreground">{insight.title}</h3>
            <p className="text-muted-foreground">{insight.description}</p>
          </div>
        ) : (
          <p className="text-muted-foreground">No insights available at the moment. Keep your data updated for personalized suggestions.</p>
        )}
      </CardContent>
    </Card>
  );
}
