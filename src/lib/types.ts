import type { LucideIcon } from "lucide-react";

export type LivestockCategory = 'dairy' | 'poultry' | 'pigs' | 'goats-sheep';

export type Kpi = {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon?: LucideIcon;
};

export type Transaction = {
  id: string;
  date: string;
  category: 'Income' | 'Expense';
  item: string;
  amount: number;
  livestockCategory: LivestockCategory | 'general';
};

export type HealthRecord = {
  id: string;
  date: string;
  animalId: string;
  event: 'Vaccination' | 'Deworming' | 'Treatment' | 'Check-up';
  notes: string;
  nextDueDate?: string;
  livestockCategory: LivestockCategory;
};

export type ProductionRecord = {
  id: string;
  date: string;
  quantity: number;
  unit: 'liters' | 'eggs' | 'kg';
};

export type HistoryRecord = {
    id: string;
    date: string;
    type: 'Production' | 'Financial' | 'Health' | 'Feeding' | 'Inventory';
    description: string;
    details: string;
    value?: string;
    livestockCategory: LivestockCategory;
};

export type MonthlyProduction = {
  month: string;
  production: number;
};

export type Insight = {
    title: string;
    description: string;
    icon: 'TrendingDown' | 'Syringe' | 'CheckCircle';
};
