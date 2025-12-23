'use client';

import { useState } from 'react';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { generateFarmInsights, type GenerateFarmInsightsInput } from '@/ai/flows/generate-farm-insights';

type FarmInsightsProps = {
  livestockType: string;
  keyPerformanceIndicators: Record<string, any>;
};

export function FarmInsights({ livestockType, keyPerformanceIndicators }: FarmInsightsProps) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInsights = async () => {
    setLoading(true);
    setError(null);
    setInsights(null);
    
    try {
      const input: GenerateFarmInsightsInput = {
        livestockType,
        keyPerformanceIndicators,
      };
      const result = await generateFarmInsights(input);
      setInsights(result.insights);
    } catch (e) {
      setError('Failed to generate insights. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span>AI Farm Insights</span>
        </CardTitle>
        <CardDescription>
          Get personalized, data-driven suggestions to optimize your farm.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[75%]" />
          </div>
        ) : insights ? (
          <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
            <p>{insights}</p>
          </div>
        ) : error ? (
            <p className="text-destructive">{error}</p>
        ) : (
          <p className="text-muted-foreground">Click the button to generate your personalized farm insights.</p>
        )}
      </CardContent>
      <div className="p-6 pt-0">
        <Button onClick={handleGenerateInsights} disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/90">
          {loading ? (
            'Generating...'
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Insights
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
