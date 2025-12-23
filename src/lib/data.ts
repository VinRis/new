import type { Kpi, Transaction, HealthRecord, HistoryRecord } from './types';

export const livestockDisplayNames: Record<string, string> = {
  'dairy': 'Dairy',
  'poultry': 'Poultry',
  'pigs': 'Pigs',
  'goats-sheep': 'Goats & Sheep'
};

export const kpis: Record<string, Kpi[]> = {
  dairy: [
    { label: 'Milk Production', value: 4500, unit: 'L', change: 5.2 },
    { label: 'Avg. Herd Age', value: 4.2, unit: 'yrs', change: -0.1 },
    { label: 'Feed Cost/Liter', value: 0.25, unit: '$', change: 2.1 },
    { label: 'Revenue', value: 11250, unit: '$', change: 15.3 },
  ],
  poultry: [
    { label: 'Egg Production', value: 12000, unit: 'eggs', change: 8.1 },
    { label: 'Feed Conversion', value: 2.1, unit: 'ratio', change: -0.05 },
    { label: 'Mortality Rate', value: 2.5, unit: '%', change: -0.5 },
    { label: 'Revenue', value: 4800, unit: '$', change: 12.0 },
  ],
  pigs: [
    { label: 'Avg. Weight Gain', value: 0.8, unit: 'kg/day', change: 0.05 },
    { label: 'Litter Size', value: 11, unit: 'avg', change: 0.5 },
    { label: 'Market Price', value: 1.5, unit: '$/kg', change: -3.2 },
    { label: 'Revenue', value: 25000, unit: '$', change: 8.7 },
  ],
  'goats-sheep': [
    { label: 'Wool Production', value: 350, unit: 'kg', change: 4.0 },
    { label: 'Milk Yield (Goat)', value: 800, unit: 'L', change: 2.5 },
    { label: 'Lambing Rate', value: 1.8, unit: 'avg', change: 0.2 },
    { label: 'Revenue', value: 9500, unit: '$', change: 9.1 },
  ],
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
    { id: plumage: '4', date: '2023-10-23', type: 'Production', description: 'Daily Milk Collection', details: '150 Liters' },
    { id: '5', date: '2023-10-22', type: 'Financial', description: 'Sale of a Calf', details: '$300.00 Income' },
];
