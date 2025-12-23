'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockHealthRecords } from "@/lib/data";
import { Bell, Download, Edit, Filter, MoreVertical, Search, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMemo } from "react";
import type { LivestockCategory } from "@/lib/types";

export default function HealthPage({ params }: { params: { livestock: LivestockCategory } }) {
    const healthRecords = useMemo(() => {
        return mockHealthRecords.filter(r => r.livestockCategory === params.livestock);
    }, [params.livestock]);

    const upcomingEvents = useMemo(() => {
        return healthRecords.filter(r => r.nextDueDate && new Date(r.nextDueDate) >= new Date());
    }, [healthRecords]);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-headline text-foreground">Health Management</h1>
        <p className="text-muted-foreground">Log health events and track upcoming treatments for your {params.livestock}.</p>
      </div>

      {upcomingEvents.length > 0 && (
        <Alert className="mb-8 bg-amber-50 border-amber-200">
            <Bell className="h-4 w-4 text-amber-600" />
            <AlertTitle className="font-headline text-amber-800">Upcoming Events</AlertTitle>
            <AlertDescription className="text-amber-700">
                You have {upcomingEvents.length} upcoming health event{upcomingEvents.length > 1 ? 's' : ''}.
                <ul className="list-disc pl-5 mt-2">
                    {upcomingEvents.map(event => (
                        <li key={event.id}><strong>{event.animalId}:</strong> {event.event} due on {event.nextDueDate}</li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Animal ID</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {healthRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell><Badge variant="secondary">{record.animalId}</Badge></TableCell>
                  <TableCell className="font-medium">{record.event}</TableCell>
                  <TableCell>{record.notes}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
