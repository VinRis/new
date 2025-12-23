'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { kpis, monthlyProduction, getInsight } from '@/lib/data';
import type { LivestockCategory } from '@/lib/types';
import { ArrowUp, ArrowDown, BrainCircuit } from 'lucide-react';
import { FarmInsights } from '@/components/farm-insights';
import { cn } from '@/lib/utils';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  production: {
    label: "Production",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;


export default function DashboardPage({ params }: { params: { livestock: LivestockCategory } }) {
  const currentKpis = kpis[params.livestock] || [];
  const farmName = "Sunrise Farms"; // Placeholder
  const productionData = monthlyProduction[params.livestock] || [];
  const insight = getInsight(params.livestock, currentKpis);

  const showChart = params.livestock === 'dairy' || params.livestock === 'poultry';

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-headline text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to {farmName}!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {currentKpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-headline text-primary">
                {kpi.value}
                {kpi.unit && <span className="text-xl ml-1 font-body font-normal text-muted-foreground">{kpi.unit}</span>}
              </div>
              {kpi.change !== undefined && (
                <p className="text-xs text-muted-foreground flex items-center">
                  <span className={cn(
                    "flex items-center",
                    kpi.change >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {kpi.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    {Math.abs(kpi.change)}%
                  </span>
                   vs last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {showChart && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Production</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="production" fill="var(--color-production)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      <FarmInsights insight={insight} />

    </div>
  );
}
