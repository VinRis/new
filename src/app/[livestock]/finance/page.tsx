'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockTransactions } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Download, Edit, Filter, MoreVertical, Search, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { LivestockCategory } from "@/lib/types";
import { useMemo } from "react";

export default function FinancePage({ params }: { params: { livestock: LivestockCategory } }) {
  const currency = '$'; // Placeholder
  const transactions = useMemo(() => {
    return mockTransactions.filter(tx => tx.livestockCategory === params.livestock || tx.livestockCategory === 'general');
  }, [params.livestock]);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-headline text-foreground">Financials</h1>
        <p className="text-muted-foreground">Track your farm's income and expenses.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-10" />
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
                <TableHead>Category</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>
                    <Badge variant={tx.category === 'Income' ? 'default' : 'secondary'} className={cn(tx.category === 'Income' && 'bg-green-600')}>{tx.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{tx.item}</TableCell>
                  <TableCell className={cn("text-right", tx.category === 'Income' ? 'text-green-600' : 'text-destructive')}>
                    {tx.category === 'Income' ? '+' : '-'}{currency}{tx.amount.toFixed(2)}
                  </TableCell>
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
