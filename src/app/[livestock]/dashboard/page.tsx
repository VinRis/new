import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { kpis } from '@/lib/data';
import type { LivestockCategory } from '@/lib/types';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { FarmInsights } from '@/components/farm-insights';
import { cn } from '@/lib/utils';

export default function DashboardPage({ params }: { params: { livestock: LivestockCategory } }) {
  const currentKpis = kpis[params.livestock] || [];
  const farmName = "Sunrise Farms"; // Placeholder

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
                    {kpi.change}%
                  </span>
                   vs last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <FarmInsights livestockType={params.livestock} keyPerformanceIndicators={currentKpis} />

    </div>
  );
}
