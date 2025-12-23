
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Droplets, DollarSign, HeartPulse, Package } from 'lucide-react';

export function AddRecordFAB() {
  return (
    <div className="fixed bottom-24 right-6 z-50">
        <Dialog>
        <DialogTrigger asChild>
            <Button
            size="icon"
            className="w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 focus:ring-primary active:scale-95 transition-transform duration-200"
            aria-label="Add New Record"
            >
            <Plus className="h-8 w-8" />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle className="font-headline">Add a new record</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <Button variant="outline" size="lg" className="justify-start text-base py-6">
                <Droplets className="mr-4 h-5 w-5 text-blue-500"/> Add Production Record
            </Button>
            <Button variant="outline" size="lg" className="justify-start text-base py-6">
                <DollarSign className="mr-4 h-5 w-5 text-green-500"/> Add Financial Transaction
            </Button>
            <Button variant="outline" size="lg" className="justify-start text-base py-6">
                <HeartPulse className="mr-4 h-5 w-5 text-red-500"/> Add Health Record
            </Button>
            <Button variant="outline" size="lg" className="justify-start text-base py-6">
                <Package className="mr-4 h-5 w-5 text-indigo-500"/> Add Feed Entry
            </Button>
            </div>
        </DialogContent>
        </Dialog>
    </div>
  );
}
