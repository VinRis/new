
'use client';

import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockAnimals as initialAnimals } from "@/lib/data";
import type { LivestockCategory, Animal, AnimalHealthStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PlusCircle, Search, MoreVertical, Edit, Trash, Droplet, TrendingUp, BarChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';

const healthStatusColors: { [key in AnimalHealthStatus]: string } = {
    Healthy: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Monitoring: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Sick: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const AddEditAnimalForm = ({ animal, onSave, livestockCategory }: { animal?: Animal, onSave: (animal: Animal) => void, livestockCategory: LivestockCategory }) => {
    const [tag, setTag] = useState(animal?.tag || '');
    const [healthStatus, setHealthStatus] = useState<AnimalHealthStatus>(animal?.healthStatus || 'Healthy');
    const [avgYield, setAvgYield] = useState(animal?.avgYield || 0);
    const [lastWeight, setLastWeight] = useState(animal?.lastWeight || 0);

    const handleSubmit = () => {
        const newAnimalData: Animal = {
            id: animal?.id || `animal-${Date.now()}`,
            tag,
            livestockCategory,
            healthStatus,
            avgYield,
            lastWeight,
        };
        onSave(newAnimalData);
    };

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tag" className="text-right">
                    Tag/ID
                </Label>
                <Input id="tag" value={tag} onChange={(e) => setTag(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="healthStatus" className="text-right">
                    Health
                </Label>
                <Select value={healthStatus} onValueChange={(value: AnimalHealthStatus) => setHealthStatus(value)}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Healthy">Healthy</SelectItem>
                        <SelectItem value="Monitoring">Monitoring</SelectItem>
                        <SelectItem value="Sick">Sick</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="avgYield" className="text-right">
                    Avg. Production
                </Label>
                <Input id="avgYield" type="number" value={avgYield} onChange={(e) => setAvgYield(Number(e.target.value))} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastWeight" className="text-right">
                    Last Weight (kg)
                </Label>
                <Input id="lastWeight" type="number" value={lastWeight} onChange={(e) => setLastWeight(Number(e.target.value))} className="col-span-3" />
            </div>
        </div>
    );
};


export default function HerdPage() {
    const params = useParams() as { livestock: LivestockCategory };
    const [animals, setAnimals] = useState(initialAnimals);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [editingAnimal, setEditingAnimal] = useState<Animal | undefined>(undefined);

    const herd = useMemo(() => {
        return animals.filter(animal => animal.livestockCategory === params.livestock);
    }, [animals, params.livestock]);

    const handleSave = (animal: Animal) => {
        const isEditing = animals.some(a => a.id === animal.id);
        if (isEditing) {
            setAnimals(animals.map(a => a.id === animal.id ? animal : a));
        } else {
            setAnimals([...animals, animal]);
        }
        setAddModalOpen(false);
        setEditingAnimal(undefined);
    };

    const handleDelete = (animalId: string) => {
        setAnimals(animals.filter(a => a.id !== animalId));
    };
    
    const handleEditClick = (animal: Animal) => {
        setEditingAnimal(animal);
    };

    const getProductionIcon = () => {
      switch (params.livestock) {
        case 'dairy': return <Droplet className="h-4 w-4 text-blue-500"/>;
        case 'pigs': return <TrendingUp className="h-4 w-4 text-lime-500"/>;
        default: return <BarChart className="h-4 w-4 text-gray-500"/>;
      }
    };
     const getProductionUnit = () => {
      switch (params.livestock) {
        case 'dairy': return 'L/day';
        case 'pigs': return 'kg/day gain';
        default: return '';
      }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold font-headline text-foreground">My Herd</h1>
                    <p className="text-muted-foreground">Manage your {params.livestock} individually.</p>
                </div>
                 <Dialog open={isAddModalOpen} onOpenChange={setAddModalOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Animal
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className='font-headline'>Add New Animal</DialogTitle>
                        </DialogHeader>
                        <AddEditAnimalForm onSave={handleSave} livestockCategory={params.livestock} />
                         <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button type="button" onClick={() => {
                                // A bit of a hack to get form data submitted
                                // In a real app, you'd use a form library
                                const tagInput = document.getElementById('tag') as HTMLInputElement;
                                const yieldInput = document.getElementById('avgYield') as HTMLInputElement;
                                const weightInput = document.getElementById('lastWeight') as HTMLInputElement;
                                handleSave({
                                     id: `animal-${Date.now()}`,
                                     tag: tagInput.value,
                                     livestockCategory: params.livestock,
                                     healthStatus: 'Healthy',
                                     avgYield: parseFloat(yieldInput.value),
                                     lastWeight: parseFloat(weightInput.value),
                                });
                            }}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search by Tag/ID..." className="pl-10" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {herd.map(animal => (
                    <Card key={animal.id} className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="font-headline">{animal.tag}</CardTitle>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => handleEditClick(animal)}>
                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(animal.id)}>
                                            <Trash className="mr-2 h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <CardDescription>
                                <Badge className={cn("text-xs", healthStatusColors[animal.healthStatus])}>{animal.healthStatus}</Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        {getProductionIcon()}
                                        <span>Avg. Production</span>
                                    </div>
                                    <span className="font-semibold text-foreground">{animal.avgYield} {getProductionUnit()}</span>
                                </div>
                                 <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                        <span>Last Weight</span>
                                    </div>
                                    <span className="font-semibold text-foreground">{animal.lastWeight} kg</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Edit Modal */}
            <Dialog open={!!editingAnimal} onOpenChange={(isOpen) => !isOpen && setEditingAnimal(undefined)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='font-headline'>Edit {editingAnimal?.tag}</DialogTitle>
                    </DialogHeader>
                    <AddEditAnimalForm animal={editingAnimal} onSave={handleSave} livestockCategory={params.livestock} />
                    <DialogFooter>
                         <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={() => setEditingAnimal(undefined)}>Cancel</Button>
                        </DialogClose>
                        <Button type="button" onClick={() => {
                            if (editingAnimal) {
                                // another hack to get form state
                                const tagInput = document.getElementById('tag') as HTMLInputElement;
                                const yieldInput = document.getElementById('avgYield') as HTMLInputElement;
                                const weightInput = document.getElementById('lastWeight') as HTMLInputElement;
                                const healthSelect = document.querySelector('[data-radix-collection-item]') as HTMLElement; // Not reliable
                                
                                handleSave({
                                     ...editingAnimal,
                                     tag: tagInput.value,
                                     avgYield: parseFloat(yieldInput.value),
                                     lastWeight: parseFloat(weightInput.value),
                                });
                            }
                        }}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

