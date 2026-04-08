import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getShortName = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);
};

export const getDeptColorClass = (name: string): string => {
 
  const colorPairs = [
    'bg-blue-600 dark:bg-blue-500/20 dark:text-blue-400 dark:border dark:border-blue-500/30',
    'bg-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30',
    'bg-violet-600 dark:bg-violet-500/20 dark:text-violet-400 dark:border dark:border-violet-500/30',
    'bg-amber-600 dark:bg-amber-500/20 dark:text-amber-400 dark:border dark:border-amber-500/30',
    'bg-rose-600 dark:bg-rose-500/20 dark:text-rose-400 dark:border dark:border-rose-500/30',
    'bg-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 dark:border dark:border-cyan-500/30',
    'bg-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 dark:border dark:border-indigo-500/30',
    'bg-orange-600 dark:bg-orange-500/20 dark:text-orange-400 dark:border dark:border-orange-500/30',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colorPairs.length;
  return colorPairs[index];
};

