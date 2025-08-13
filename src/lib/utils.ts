import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// NIM Masking Utility (WAJIB)
export const maskNIM = (nim: string): string => {
  if (!nim || nim.length <= 4) {
    return '••••';
  }
  const start = nim.slice(0, 4);
  const end = nim.slice(-3);
  const middle = '•'.repeat(Math.max(0, nim.length - 7));
  return `${start}${middle}${end}`;
};

// Utility functions for SIAKAD
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
};

export const getStatusBadgeClass = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'LUNAS':
      return 'status-badge-lunas';
    case 'BELUM':
    case 'BELUM LUNAS':
      return 'status-badge-belum';
    default:
      return 'bg-muted text-muted-foreground border-muted font-medium px-3 py-1 rounded-full text-sm';
  }
};

export const calculateGPA = (grades: Array<{ bobot: number; sks: number }>): number => {
  const totalBobot = grades.reduce((acc, grade) => acc + (grade.bobot * grade.sks), 0);
  const totalSKS = grades.reduce((acc, grade) => acc + grade.sks, 0);
  return totalSKS > 0 ? totalBobot / totalSKS : 0;
};

export const gradeToPoint = (grade: string): number => {
  const gradeMap: Record<string, number> = {
    'A': 4.0,
    'AB': 3.5,
    'B': 3.0,
    'BC': 2.5,
    'C': 2.0,
    'D': 1.0,
    'E': 0.0,
  };
  return gradeMap[grade.toUpperCase()] ?? 0;
};