'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { kpis, monthlyProduction, getInsight } from '@/lib/data';
import type { LivestockCategory } from '@/lib/types';
import { ArrowUp, ArrowDown, PawPrint, Droplet, HeartPulse, TrendingDown, Syringe, CheckCircle, Sun } from 'lucide-react';
import { FarmInsights } from '@/components/farm-insights';
import { cn } from '@/lib/utils';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const chartConfig = {
  production: {
    label: "Production",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const iconMap = {
  'Daily Yield': Droplet,
  'Total Herd': PawPrint,
  'Fertility Rate': HeartPulse,
  'Somatic Cell Count': Droplet,
  'Egg Production': Droplet,
  'Flock Size': PawPrint,
  'Feed Conversion': TrendingDown,
  'Avg. Egg Weight': Droplet,
  'Avg. Weight Gain': TrendingDown,
  'Pigs per Litter': PawPrint,
  'Farrowing Rate': HeartPulse,
  'Milk Yield (Goat)': Droplet,
  'Wool Yield (Sheep)': PawPrint,
  'Kidding/Lambing Rate': HeartPulse,
};


export default function DashboardPage({ params }: { params: { livestock: LivestockCategory } }) {
  const currentKpis = kpis[params.livestock] || [];
  const farmName = "Green Acres Farm";
  const userName = "John";
  const productionData = monthlyProduction[params.livestock] || [];
  const insight = getInsight(params.livestock, currentKpis);

  const showChart = params.livestock === 'dairy' || params.livestock === 'poultry';

  const herdHealth = {
    healthy: 142,
    monitoring: 2,
    sick: 1,
  };
  const totalAnimals = herdHealth.healthy + herdHealth.monitoring + herdHealth.sick;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline text-foreground">Good Morning, {userName}</h1>
        <div className="flex items-center justify-between text-muted-foreground">
          <p>Here's what's happening on the farm today.</p>
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-amber-400" />
            <span>24°C Sunny</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-headline">Key Metrics</h2>
          <Link href={`/${params.livestock}/reports`}>
             <Button variant="link" className="text-primary">View Report</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentKpis.map((kpi) => {
            const Icon = iconMap[kpi.label as keyof typeof iconMap] || PawPrint;
            return (
              <Card key={kpi.label} className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                   <div className="bg-secondary p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  {kpi.change !== undefined && (
                    <p className={cn(
                      "text-sm font-medium flex items-center",
                      kpi.change >= 0 ? "text-green-400" : "text-red-400"
                    )}>
                      {kpi.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      {Math.abs(kpi.change)}%
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground uppercase">{kpi.label}</p>
                  <div className="text-3xl font-bold font-headline text-foreground">
                    {kpi.value}
                    {kpi.unit && <span className="text-lg ml-1 font-body font-normal text-muted-foreground">{kpi.unit}</span>}
                  </div>
                </CardContent>
              </Card>
            )})}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="font-headline">Herd Health Status</span>
              <span className="text-xs font-normal text-muted-foreground">Updated 10m ago</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-3 rounded-full bg-muted flex overflow-hidden mb-2">
              <div className="progress-bar-segment bg-green-500" style={{ width: `${(herdHealth.healthy / totalAnimals) * 100}%` }}></div>
              <div className="progress-bar-segment bg-yellow-500" style={{ width: `${(herdHealth.monitoring / totalAnimals) * 100}%` }}></div>
              <div className="progress-bar-segment bg-red-500" style={{ width: `${(herdHealth.sick / totalAnimals) * 100}%` }}></div>
            </div>
            <div className="flex justify-between text-sm">
                <div className="text-center">
                    <p className="text-muted-foreground">Healthy</p>
                    <p className="font-bold text-lg">{herdHealth.healthy}</p>
                </div>
                 <div className="text-center">
                    <p className="text-muted-foreground">Monitoring</p>
                    <p className="font-bold text-lg">{herdHealth.monitoring}</p>
                </div>
                 <div className="text-center">
                    <p className="text-muted-foreground">Sick</p>
                    <p className="font-bold text-lg">{herdHealth.sick}</p>
                </div>
            </div>
          </CardContent>
        </Card>

        {showChart && (
          <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="font-headline">Monthly Production</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="w-full h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productionData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Bar dataKey="production" fill="var(--color-production)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>

       <div className="mb-6">
          <h2 className="text-xl font-bold font-headline mb-4">Smart Insights</h2>
          <FarmInsights insight={insight} />
       </div>

    </div>
  );
}
