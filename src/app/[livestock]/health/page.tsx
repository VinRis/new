'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockHealthRecords } from "@/lib/data";
import { Bell, Download, Edit, Filter, MoreVertical, Search, Trash, Syringe, Pill, Stethoscope, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMemo } from "react";
import type { LivestockCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const eventIconMap: { [key: string]: { icon: React.ElementType, color: string, bgColor: string } } = {
  'Vaccination': { icon: Syringe, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/50' },
  'Deworming': { icon: Pill, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/50' },
  'Treatment': { icon: Stethoscope, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/50' },
  'Check-up': { icon: Activity, color: 'text-indigo-500', bgColor: 'bg-indigo-100 dark:bg-indigo-900/50' },
};

export default function HealthPage({ params }: { params: { livestock: LivestockCategory } }) {
    const healthRecords = useMemo(() => {
        return mockHealthRecords.filter(r => r.livestockCategory === params.livestock);
    }, [params.livestock]);

    const upcomingEvents = useMemo(() => {
        return healthRecords
          .filter(r => r.nextDueDate && new Date(r.nextDueDate) >= new Date())
          .sort((a,b) => new Date(a.nextDueDate!).getTime() - new Date(b.nextDueDate!).getTime());
    }, [healthRecords]);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-headline text-foreground">Health Management</h1>
        <p className="text-muted-foreground">Log health events and track upcoming treatments for your {params.livestock}.</p>
      </div>

      {upcomingEvents.length > 0 && (
        <Card className="mb-8 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900">
            <CardHeader>
                 <CardTitle className="font-headline text-amber-800 dark:text-amber-300 flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Upcoming Events
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {upcomingEvents.map(event => (
                        <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                            <div>
                                <p className="font-semibold">{event.event} for <Badge variant="secondary">{event.animalId}</Badge></p>
                                <p className="text-sm text-muted-foreground">Due on: {event.nextDueDate}</p>
                            </div>
                            <Button size="sm">Mark as Done</Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search health records..." className="pl-10" />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter by Date
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
              {healthRecords.map((record) => {
                const IconConfig = eventIconMap[record.event] || { icon: Activity, color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-800' };
                const Icon = IconConfig.icon;
                return (
                    <div key={record.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50">
                       <div className={cn("p-3 rounded-full", IconConfig.bgColor)}>
                         <Icon className={cn("h-6 w-6", IconConfig.color)} />
                       </div>
                       <div className="flex-1 grid grid-cols-3 items-center">
                           <div className="font-medium">{record.event}</div>
                           <div><Badge variant="secondary">{record.animalId}</Badge></div>
                           <div className="text-sm text-muted-foreground">{record.notes}</div>
                       </div>
                       <div className="text-right">
                            <p className="text-sm text-muted-foreground">{record.date}</p>
                       </div>
                       <div>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4"/> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4"/> Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                       </div>
                    </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
