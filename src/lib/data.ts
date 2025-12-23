import type { Kpi, Transaction, HealthRecord, HistoryRecord, MonthlyProduction, LivestockCategory, Insight } from './types';

export const livestockDisplayNames: Record<string, string> = {
  'dairy': 'Dairy',
  'poultry': 'Poultry',
  'pigs': 'Pigs',
  'goats-sheep': 'Goats & Sheep'
};

export const kpis: Record<string, Kpi[]> = {
  dairy: [
    { label: 'Milk Production', value: 4500, unit: 'L/day', change: 5.2 },
    { label: 'Total Herd', value: 145, unit: 'cows', change: 1.4 },
    { label: 'Feed Stock', value: 250, unit: 'kg', change: -10 },
    { label: 'Feed Cost/Liter', value: 0.25, unit: '$', change: 2.1 },
  ],
  poultry: [
    { label: 'Egg Production', value: 12000, unit: 'eggs/day', change: 8.1 },
    { label: 'Flock Size', value: 2500, unit: 'birds', change: 0 },
    { label: 'Feed Stock', value: 500, unit: 'kg', change: -5 },
    { label: 'Mortality Rate', value: 2.5, unit: '%', change: -0.5 },
  ],
  pigs: [
    { label: 'Avg. Weight Gain', value: 0.8, unit: 'kg/day', change: 0.05 },
    { label: 'Total Herd', value: 500, unit: 'pigs', change: 5 },
    { label: 'Feed Stock', value: 800, unit: 'kg', change: -8 },
    { label: 'Market Price', value: 1.5, unit: '$/kg', change: -3.2 },
  ],
  'goats-sheep': [
    { label: 'Milk Yield (Goat)', value: 800, unit: 'L/day', change: 2.5 },
    { label: 'Total Herd', value: 300, unit: 'head', change: 2 },
    { label: 'Feed Stock', value: 400, unit: 'kg', change: -12 },
    { label: 'Lambing Rate', value: 1.8, unit: 'avg', change: 0.2 },
  ],
};

export const monthlyProduction: Record<string, MonthlyProduction[]> = {
  dairy: [
    { month: 'Jan', production: 120000 },
    { month: 'Feb', production: 110000 },
    { month: 'Mar', production: 135000 },
    { month: 'Apr', production: 140000 },
    { month: 'May', production: 155000 },
    { month: 'Jun', production: 150000 },
  ],
  poultry: [
    { month: 'Jan', production: 360000 },
    { month: 'Feb', production: 330000 },
    { month: 'Mar', production: 370000 },
    { month: 'Apr', production: 380000 },
    { month: 'May', production: 400000 },
    { month: 'Jun', production: 390000 },
  ],
}

export const feedInventory = [
    { name: "Dairy Concentrate", quantity: 250, unit: "kg" },
    { name: "Poultry Layers Mash", quantity: 500, unit: "kg" },
    { name: "Pig Finisher", quantity: 800, unit: "kg" },
    { name: "Goat Pellets", quantity: 400, unit: "kg" },
    { name: "Hay Bales", quantity: 50, unit: "bales" },
];

export const getInsight = (livestock: LivestockCategory, kpis: Kpi[]): Insight | null => {
    const production = kpis.find(k => k.label.includes('Production') || k.label.includes('Yield'));
    const feed = kpis.find(k => k.label.includes('Feed Stock'));

    if (production && typeof production.change === 'number' && production.change < 0) {
        return {
            title: 'Production Dip Alert',
            description: `${production.label} has decreased by ${Math.abs(production.change)}% this month. Review feeding and health records for potential causes.`,
        };
    }

    if (feed && typeof feed.change === 'number' && feed.change < -15) {
         return {
            title: 'Low Feed Stock',
            description: `${feed.label} is running low. Time to reorder to avoid shortages.`,
        };
    }
    
    if (livestock === 'pigs' ) {
         return {
            title: 'Vaccination Due',
            description: '15 piglets are scheduled for iron shots tomorrow morning.',
        };
    }

    return {
        title: 'All Systems Normal',
        description: 'Your farm is performing well based on the latest data. Keep up the great work!',
    };
};

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-26', category: 'Expense', item: 'Cattle Feed', amount: 500.00 },
  { id: '2', date: '2023-10-25', category: 'Income', item: 'Milk Sale', amount: 1200.00 },
  { id: '3', date: '2023-10-24', category: 'Expense', item: 'Veterinary Services', amount: 150.00 },
  { id: '4', date: '2023-10-23', category: 'Income', item: 'Sale of a Calf', amount: 300.00 },
  { id: '5', date: '2023-09-15', category: 'Expense', item: 'Equipment Repair', amount: 75.50 },
];

export const mockHealthRecords: HealthRecord[] = [
  { id: '1', date: '2023-10-20', animalId: 'Cow-012', event: 'Vaccination', notes: 'Bovine Viral Diarrhea vaccine', nextDueDate: '2024-10-20' },
  { id: '2', date: '2023-10-15', animalId: 'Cow-007', event: 'Deworming', notes: 'Oral drench administered' },
  { id: '3', date: '2023-10-10', animalId: 'Cow-012', event: 'Check-up', notes: 'Routine check, good condition' },
  { id: '4', date: '2023-10-05', animalId: 'Calf-034', event: 'Treatment', notes: 'Treated for scours', nextDueDate: '2023-10-12' },
];

export const mockHistory: HistoryRecord[] = [
    { id: '1', date: '2023-10-26', type: 'Financial', description: 'Cattle Feed Purchase', details: '$500.00 Expense' },
    { id: '2', date: '2023-10-25', type: 'Financial', description: 'Milk Sale', details: '$1200.00 Income' },
    { id: '3', date: '2023-10-24', type: 'Health', description: 'Vet Visit for Cow-012', details: 'Vaccination for BVD' },
    { id: '4', date: '2023-10-23', type: 'Production', description: 'Daily Milk Collection', details: '150 Liters' },
    { id: '5', date: '2023-10-22', type: 'Financial', description: 'Sale of a Calf', details: '$300.00 Income' },
];
