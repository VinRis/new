'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { kpis, monthlyProduction, getInsight, mockHealthRecords } from '@/lib/data';
import type { LivestockCategory } from '@/lib/types';
import { ArrowUp, ArrowDown, PawPrint, Droplet, HeartPulse, TrendingDown, Syringe, CheckCircle, Sun, Activity, AlertTriangle, ChevronRight, CalendarClock, Bell } from 'lucide-react';
import { FarmInsights } from '@/components/farm-insights';
import { cn } from '@/lib/utils';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMemo } from 'react';

const chartConfig = {
  production: {
    label: "Production",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const iconMap: { [key: string]: { icon: React.ElementType, color: string } } = {
  'Daily Yield': { icon: Droplet, color: 'text-blue-400' },
  'Total Herd': { icon: PawPrint, color: 'text-orange-400' },
  'Conception Rate': { icon: HeartPulse, color: 'text-pink-400' },
  'Health Incidents': { icon: AlertTriangle, color: 'text-red-400' },
  'Egg Production': { icon: Droplet, color: 'text-amber-400' },
  'Flock Size': { icon: PawPrint, color: 'text-orange-400' },
  'Feed Conversion': { icon: TrendingDown, color: 'text-teal-400' },
  'Avg. Egg Weight': { icon: Activity, color: 'text-indigo-400' },
  'Avg. Weight Gain': { icon: TrendingDown, color: 'text-lime-400' },
  'Pigs per Litter': { icon: PawPrint, color: 'text-orange-400' },
  'Farrowing Rate': { icon: HeartPulse, color: 'text-pink-400' },
  'Milk Yield (Goat)': { icon: Droplet, color: 'text-blue-400' },
  'Wool Yield (Sheep)': { icon: PawPrint, color: 'text-purple-400' },
  'Kidding/Lambing Rate': { icon: HeartPulse, color: 'text-pink-400' },
};


export default function DashboardPage({ params }: { params: { livestock: LivestockCategory } }) {
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
        .filter(event => event.nextDueDate && new Date(event.nextDueDate) >= new Date())
        .sort((a, b) => new Date(a.nextDueDate!).getTime() - new Date(b.nextDueDate!).getTime());
    return sortedEvents[0];
  }, []);

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
            const IconConfig = iconMap[kpi.label as keyof typeof iconMap] || { icon: PawPrint, color: 'text-gray-400' };
            const Icon = IconConfig.icon;
            return (
              <Card key={kpi.label} className="bg-card/50 backdrop-blur-sm border-white/10">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                   <div className="bg-secondary p-2 rounded-lg">
                      <Icon className={cn("h-5 w-5", IconConfig.color)} />
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
                  <LineChart data={productionData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="production" stroke="var(--color-production)" strokeWidth={2} dot={{r: 4, fill: "hsl(var(--background))", stroke: "var(--color-production)" }} />
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
            <FarmInsights insight={insight} />
            {upcomingEvent && (
              <Card className="bg-card/50 backdrop-blur-sm border-white/10 hover:bg-card/70 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                      <div className='flex items-center gap-4'>
                          <div className="bg-amber-900/50 p-3 rounded-lg">
                              <CalendarClock className="h-6 w-6 text-amber-400" />
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
  );
}
