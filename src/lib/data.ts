import type { Kpi, Transaction, HealthRecord, HistoryRecord, MonthlyProduction, LivestockCategory, Insight } from './types';

export const livestockDisplayNames: Record<string, string> = {
  'dairy': 'Dairy',
  'poultry': 'Poultry',
  'pigs': 'Pigs',
  'goats-sheep': 'Goats & Sheep'
};

export const kpis: Record<string, Kpi[]> = {
  dairy: [
    { label: 'Daily Yield', value: '2,450', unit: 'L', change: 2.1 },
    { label: 'Total Herd', value: 145, change: 0 },
    { label: 'Conception Rate', value: '45', unit: '%', change: -2 },
    { label: 'Health Incidents', value: 2, unit: 'cases', change: 1 },
  ],
  poultry: [
    { label: 'Egg Production', value: '12,000', unit: 'eggs/day', change: 8.1 },
    { label: 'Flock Size', value: 2500, unit: 'birds', change: 0 },
    { label: 'Feed Conversion', value: 2.1, unit: 'kg/dozen', change: -0.1 },
    { label: 'Avg. Egg Weight', value: 60, unit: 'g', change: 0.5 },
  ],
  pigs: [
    { label: 'Avg. Weight Gain', value: 0.8, unit: 'kg/day', change: 0.05 },
    { label: 'Total Herd', value: 500, unit: 'pigs', change: 5 },
    { label: 'Farrowing Rate', value: 88, unit: '%', change: 2 },
    { label: 'Pigs per Litter', value: 12, unit: 'avg', change: 1 },
  ],
  'goats-sheep': [
    { label: 'Milk Yield (Goat)', value: '800', unit: 'L/day', change: 2.5 },
    { label: 'Total Herd', value: 300, unit: 'head', change: 2 },
    { label: 'Wool Yield (Sheep)', value: '5.2', unit: 'kg/head', change: 0.3 },
    { label: 'Kidding/Lambing Rate', value: 1.8, unit: 'avg', change: 0.2 },
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
    if (livestock === 'poultry') {
        const feedConsumption = kpis.find(k => k.label.includes('Feed Conversion'));
        if (feedConsumption && typeof feedConsumption.change === 'number' && feedConsumption.change > 0) {
            return {
                title: 'Feed Efficiency Alert',
                description: 'Poultry feed consumption is higher than average. Check for wastage.',
                icon: 'TrendingDown'
            }
        }
    }
    
    if (livestock === 'dairy' ) {
         const conceptionRate = kpis.find(k => k.label.includes('Conception Rate'));
         if(conceptionRate && typeof conceptionRate.change === 'number' && conceptionRate.change < 0) {
            return {
                title: 'Breeding Alert',
                description: 'Conception rate has dropped. Review breeding protocol.',
                icon: 'TrendingDown'
            };
         }
    }

    return {
        title: 'All Systems Normal',
        description: 'Your farm is performing well based on the latest data. Keep up the great work!',
        icon: 'CheckCircle'
    };
};

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-10-26', category: 'Expense', item: 'Cattle Feed', amount: 500.00, livestockCategory: 'dairy' },
  { id: '2', date: '2023-10-25', category: 'Income', item: 'Milk Sale', amount: 1200.00, livestockCategory: 'dairy' },
  { id: '3', date: '2023-10-24', category: 'Expense', item: 'Veterinary Services', amount: 150.00, livestockCategory: 'pigs' },
  { id: '4', date: '2023-10-23', category: 'Income', item: 'Sale of a Calf', amount: 300.00, livestockCategory: 'dairy' },
  { id: '5', date: '2023-09-15', category: 'Expense', item: 'Equipment Repair', amount: 75.50, livestockCategory: 'general' },
  { id: '6', date: '2023-10-26', category: 'Income', item: 'Egg Sale', amount: 800.00, livestockCategory: 'poultry' },
  { id: '7', date: '2023-10-25', category: 'Expense', item: 'Poultry Feed', amount: 400.00, livestockCategory: 'poultry' },
];

export const mockHealthRecords: HealthRecord[] = [
  { id: '1', date: '2023-10-20', animalId: 'Cow-012', event: 'Vaccination', notes: 'Bovine Viral Diarrhea vaccine', nextDueDate: '2024-10-20', livestockCategory: 'dairy' },
  { id: '2', date: '2023-10-15', animalId: 'Cow-007', event: 'Deworming', notes: 'Oral drench administered', livestockCategory: 'dairy' },
  { id: '3', date: '2023-10-10', animalId: 'Chicken-A12', event: 'Check-up', notes: 'Routine check, good condition', livestockCategory: 'poultry' },
  { id: '4', date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0], animalId: 'Calf-034', event: 'Treatment', notes: 'Follow-up for scours', nextDueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0], livestockCategory: 'dairy' },
  { id: '5', date: '2023-10-22', animalId: 'Pig-P28', event: 'Vaccination', notes: 'Swine flu vaccine', nextDueDate: '2024-04-22', livestockCategory: 'pigs' },
];

export const mockHistory: HistoryRecord[] = [
    { id: 'h1', date: new Date().toISOString(), type: 'Production', description: 'Milk Yield - Cow #402', details: 'Dairy Barn • Shift A', value: '24 L', livestockCategory: 'dairy' },
    { id: 'h2', date: new Date().toISOString(), type: 'Feeding', description: 'Feeding - Pig Pen 03', details: 'Grain Mix • Auto-feeder', value: '45 kg', livestockCategory: 'pigs' },
    { id: 'h3', date: new Date(Date.now() - 86400000).toISOString(), type: 'Health', description: 'Vaccination - Flock A', details: 'Dr. Smith • Poultry Unit', value: 'Done', livestockCategory: 'poultry' },
    { id: 'h4', date: new Date(Date.now() - 90000000).toISOString(), type: 'Health', description: 'Weight Check - Goat #22', details: 'Weekly Monitoring', value: '38 kg', livestockCategory: 'goats-sheep' },
    { id: 'h5', date: new Date(Date.now() - 98000000).toISOString(), type: 'Health', description: 'New Born - Sheep #09', details: 'Maternity Pen 1', value: 'Healthy', livestockCategory: 'goats-sheep' },
    { id: 'h6', date: new Date(Date.now() - 186400000).toISOString(), type: 'Financial', description: 'Feed Purchase', details: 'Bulk Grain Order', value: '$1,250', livestockCategory: 'dairy' },
    { id: 'h7', date: new Date(Date.now() - 186400000).toISOString(), type: 'Inventory', description: 'Added Corn Silage', details: '500kg to Silo 2', value: '+500 kg', livestockCategory: 'dairy' },

];
