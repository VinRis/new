'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockTransactions } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Download, Edit, Filter, MoreVertical, Search, Trash, TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { LivestockCategory } from "@/lib/types";
import { useMemo } from "react";
import Link from 'next/link';
import { useParams } from "next/navigation";

const iconMap: { [key: string]: { icon: React.ElementType, color: string, bgColor: string } } = {
  'Milk Sale': { icon: TrendingUp, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/50' },
  'Egg Sale': { icon: TrendingUp, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/50' },
  'Sale of a Calf': { icon: TrendingUp, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/50' },
  'Cattle Feed': { icon: TrendingDown, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/50' },
  'Poultry Feed': { icon: TrendingDown, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/50' },
  'Veterinary Services': { icon: TrendingDown, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/50' },
  'Equipment Repair': { icon: TrendingDown, color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/50' },
};


export default function FinancePage() {
  const params = useParams() as { livestock: LivestockCategory };
  const currency = '$'; // Placeholder
  const transactions = useMemo(() => {
    return mockTransactions.filter(tx => tx.livestockCategory === params.livestock || tx.livestockCategory === 'general');
  }, [params.livestock]);

  const { income, expense, netProfit } = useMemo(() => {
    const income = transactions
      .filter(tx => tx.category === 'Income')
      .reduce((acc, tx) => acc + tx.amount, 0);
    const expense = transactions
      .filter(tx => tx.category === 'Expense')
      .reduce((acc, tx) => acc + tx.amount, 0);
    const netProfit = income - expense;
    return { income, expense, netProfit };
  }, [transactions]);
  
  const recentTransactions = transactions.slice(0, 5);


  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-headline text-foreground">Financials</h1>
        <p className="text-muted-foreground">Track your farm's income and expenses.</p>
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-muted-foreground flex items-center gap-2">
              <Wallet className="h-6 w-6"/>
              Net Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={cn(
              "text-4xl font-bold font-headline",
              netProfit >= 0 ? "text-green-600 dark:text-green-400" : "text-destructive"
            )}>{netProfit >= 0 ? '+' : ''}{currency}{netProfit.toFixed(2)}</p>
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                 <CardHeader>
                    <CardTitle className="font-headline text-muted-foreground flex items-center gap-2">
                        <TrendingUp className="h-6 w-6"/>
                        Total Income
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold font-headline text-green-600 dark:text-green-400">
                        +{currency}{income.toFixed(2)}
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-muted-foreground flex items-center gap-2">
                        <TrendingDown className="h-6 w-6"/>
                        Total Expense
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold font-headline text-destructive">
                        -{currency}{expense.toFixed(2)}
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
             <h3 className="text-lg font-bold font-headline">Recent Transactions</h3>
            <div className="flex gap-2 w-full sm:w-auto">
               <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10" />
              </div>
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
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
            {recentTransactions.map((tx) => {
               const IconConfig = iconMap[tx.item as keyof typeof iconMap] || { icon: DollarSign, color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-800' };
               const Icon = IconConfig.icon;
               return (
                <div key={tx.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                    <div className={cn("p-3 rounded-full", IconConfig.bgColor)}>
                        <Icon className={cn("h-5 w-5", IconConfig.color)} />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">{tx.item}</p>
                        <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                    <div className={cn("text-right font-semibold", tx.category === 'Income' ? 'text-green-600 dark:text-green-500' : 'text-destructive')}>
                        {tx.category === 'Income' ? '+' : '-'}{currency}{tx.amount.toFixed(2)}
                    </div>
                </div>
            )})}
            </div>
            {transactions.length > recentTransactions.length && (
                 <div className="text-center mt-6">
                    <Button variant="link">View All Transactions</Button>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
