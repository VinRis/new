'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockHistory } from "@/lib/data";
import { Download, Filter, Search, Droplets, Utensils, HeartPulse, DollarSign, Package } from "lucide-react";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { LivestockCategory } from "@/lib/types";
import { useParams } from "next/navigation";

const iconMap: { [key: string]: { icon: React.ElementType, color: string, bgColor: string } } = {
  Production: { icon: Droplets, color: 'text-blue-400', bgColor: 'bg-blue-900/50' },
  Financial: { icon: DollarSign, color: 'text-lime-400', bgColor: 'bg-lime-900/50' },
  Health: { icon: HeartPulse, color: 'text-red-400', bgColor: 'bg-red-900/50' },
  Feeding: { icon: Utensils, color: 'text-yellow-400', bgColor: 'bg-yellow-900/50' },
  Inventory: { icon: Package, color: 'text-indigo-400', bgColor: 'bg-indigo-900/50' },
};


export default function HistoryPage() {
    const params = useParams() as { livestock: LivestockCategory };

    const history = useMemo(() => {
        return mockHistory.filter(h => h.livestockCategory === params.livestock);
    }, [params.livestock]);

  const groupedHistory = useMemo(() => {
    const groups: { [key: string]: typeof history } = {
      Today: [],
      Yesterday: [],
      'Older': [],
    };

    history.forEach(record => {
      const recordDate = parseISO(record.date);
      if (isToday(recordDate)) {
        groups.Today.push(record);
      } else if (isYesterday(recordDate)) {
        groups.Yesterday.push(record);
      } else {
        groups.Older.push(record);
      }
    });
    if (groups.Older.length) {
        // Create sub-groups by date for older records
        const olderByDate = groups.Older.reduce((acc, record) => {
            const dateStr = format(parseISO(record.date), 'MMMM d, yyyy');
            if (!acc[dateStr]) {
                acc[dateStr] = [];
            }
            acc[dateStr].push(record);
            return acc;
        }, {} as { [key: string]: typeof history });
        
        // This is a simplified grouping for demonstration.
        // A full implementation would sort and format these dates.
        delete groups.Older;
        return {...groups, ...olderByDate};
    }
     delete groups.Older;
    return groups;

  }, [history]);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-headline text-foreground">Record History</h1>
        <p className="text-muted-foreground">View all records saved for your {params.livestock}.</p>
      </div>

       <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search records..." className="pl-10" />
            </div>
             <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

      <div className="space-y-8">
        {Object.entries(groupedHistory).map(([group, records]) => (
          records.length > 0 && (
            <div key={group}>
              <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-4 tracking-wider">{group}</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {records.map((record) => {
                      const IconConfig = iconMap[record.type as keyof typeof iconMap] || { icon: Utensils, color: 'text-gray-400', bgColor: 'bg-gray-800' };
                      const Icon = IconConfig.icon;
                      return (
                        <div key={record.id} className="flex items-center gap-4 p-4">
                           <div className={cn("p-3 rounded-lg", IconConfig.bgColor)}>
                             <Icon className={cn("h-6 w-6", IconConfig.color)} />
                           </div>
                           <div className="flex-1">
                                <p className="font-semibold">{record.description}</p>
                                <p className="text-sm text-muted-foreground">{record.details}</p>
                           </div>
                           <div className="text-right">
                               <p className="text-sm font-medium text-foreground">{record.value || ''}</p>
                               <p className="text-xs text-muted-foreground">{format(parseISO(record.date), 'p')}</p>
                           </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
