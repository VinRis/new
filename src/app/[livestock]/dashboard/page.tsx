'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { kpis, monthlyProduction, getInsight, mockHealthRecords } from '@/lib/data';
import type { LivestockCategory } from '@/lib/types';
import { ArrowUp, ArrowDown, PawPrint, Droplet, HeartPulse, TrendingDown, Syringe, CheckCircle, Sun, Activity, AlertTriangle, ChevronRight, CalendarClock, Bell, ArrowRight } from 'lucide-react';
import { FarmInsights } from '@/components/farm-insights';
import { cn } from '@/lib/utils';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const chartConfig = {
  production: {
    label: "Production",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const iconMap: { [key: string]: { icon: React.ElementType, color: string, bgColor: string } } = {
  'Daily Yield': { icon: Droplet, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/50' },
  'Total Herd': { icon: PawPrint, color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/50' },
  'Conception Rate': { icon: HeartPulse, color: 'text-pink-500', bgColor: 'bg-pink-100 dark:bg-pink-900/50' },
  'Health Incidents': { icon: AlertTriangle, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/50' },
  'Egg Production': { icon: Droplet, color: 'text-amber-500', bgColor: 'bg-amber-100 dark:bg-amber-900/50' },
  'Flock Size': { icon: PawPrint, color: 'text-cyan-500', bgColor: 'bg-cyan-100 dark:bg-cyan-900/50' },
  'Feed Conversion': { icon: TrendingDown, color: 'text-teal-500', bgColor: 'bg-teal-100 dark:bg-teal-900/50' },
  'Avg. Egg Weight': { icon: Activity, color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-900/50' },
  'Avg. Weight Gain': { icon: TrendingDown, color: 'text-lime-500', bgColor: 'bg-lime-100 dark:bg-lime-900/50' },
  'Pigs per Litter': { icon: PawPrint, color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/50' },
  'Farrowing Rate': { icon: HeartPulse, color: 'text-rose-500', bgColor: 'bg-rose-100 dark:bg-rose-900/50' },
  'Milk Yield (Goat)': { icon: Droplet, color: 'text-sky-500', bgColor: 'bg-sky-100 dark:bg-sky-900/50' },
  'Wool Yield (Sheep)': { icon: PawPrint, color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/50' },
  'Kidding/Lambing Rate': { icon: HeartPulse, color: 'text-fuchsia-500', bgColor: 'bg-fuchsia-100 dark:bg-fuchsia-900/50' },
};


export default function DashboardPage({ params }: { params: { livestock: LivestockCategory } }) {
  const [isInsightModalOpen, setInsightModalOpen] = useState(false);
  const currentKpis = kpis[params.livestock] || [];
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
  
  const upcomingEvent = useMemo(() => {
    const sortedEvents = [...mockHealthRecords]
        .filter(event => event.livestockCategory === params.livestock && event.nextDueDate && new Date(event.nextDueDate) >= new Date())
        .sort((a, b) => new Date(a.nextDueDate!).getTime() - new Date(b.nextDueDate!).getTime());
    return sortedEvents[0];
  }, [params.livestock]);

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-headline text-foreground">Good Morning, {userName}</h1>
          <div className="flex items-center justify-between text-muted-foreground">
            <p>Here's what's happening on the farm today.</p>
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-amber-500" />
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
              const IconConfig = iconMap[kpi.label as keyof typeof iconMap] || { icon: PawPrint, color: 'text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-800' };
              const Icon = IconConfig.icon;
              return (
                <Card key={kpi.label} className="bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                     <div className={cn("p-2 rounded-lg", IconConfig.bgColor)}>
                        <Icon className={cn("h-5 w-5", IconConfig.color)} />
                      </div>
                    {kpi.change !== undefined && (
                      <p className={cn(
                        "text-sm font-medium flex items-center",
                        kpi.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      )}>
                        {kpi.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        {Math.abs(kpi.change)}%
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground uppercase">{kpi.label}</p>
                    <div className="text-2xl font-bold font-headline text-foreground">
                      {kpi.value}
                      {kpi.unit && <span className="text-base ml-1 font-body font-normal text-muted-foreground">{kpi.unit}</span>}
                    </div>
                  </CardContent>
                </Card>
              )})}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-card/80 backdrop-blur-sm">
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
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-headline">Monthly Production</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={productionData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="production" stroke="hsl(var(--primary))" strokeWidth={2} dot={{r: 4, fill: "hsl(var(--background))", stroke: "hsl(var(--primary))" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          )}
        </div>

         <div className="mb-6">
            <h2 className="text-xl font-bold font-headline mb-4">Smart Insights</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <div onClick={() => insight && setInsightModalOpen(true)} className="cursor-pointer">
                    <FarmInsights insight={insight} />
                </div>
                {upcomingEvent && (
                <Card className="bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-colors">
                    <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div className='flex items-center gap-4'>
                            <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-lg">
                                <CalendarClock className="h-6 w-6 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Upcoming Health Event</h3>
                                <p className="text-sm text-muted-foreground">{upcomingEvent.event} for {upcomingEvent.animalId} on {upcomingEvent.nextDueDate}</p>
                            </div>
                        </div>
                        <Link href={`/${params.livestock}/health`}>
                            <Button variant="ghost" size="icon">
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </Link>
                    </div>
                    </CardContent>
                </Card>
                )}
            </div>
         </div>

      </div>
      <Dialog open={isInsightModalOpen} onOpenChange={setInsightModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline flex items-center gap-2">
              {insight && <FarmInsights.Icon iconName={insight.icon} className="h-6 w-6 text-primary" />}
              {insight?.title}
            </DialogTitle>
            <DialogDescription>
              {insight?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-foreground">
              Based on our analysis of your recent data, we've identified an opportunity to improve efficiency.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Actionable Tip: Consider reviewing your herd's diet composition or consulting a nutritionist to optimize performance.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
