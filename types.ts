export enum UserRole {
  GUEST = 'GUEST',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

export interface User {
  username: string;
  role: UserRole;
  name: string;
}

export interface ProjectFile {
  id: string;
  projectName: string;
  type: string;
  date: string;
  status: 'Planning' | 'Estimation' | 'Completed';
  downloadUrl: string;
}

export interface MonthlyProfit {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface EstimationRequest {
  areaSqFt: number;
  location: string;
  floors: number;
  quality: 'Standard' | 'Premium' | 'Luxury';
  projectType: 'Residential' | 'Commercial';
}

export interface CostBreakdownItem {
  category: string;
  cost: number;
  description: string;
}

export interface AIEstimateResponse {
  totalEstimatedCost: number;
  currency: string;
  timelineMonths: number;
  breakdown: CostBreakdownItem[];
  summary: string;
}
