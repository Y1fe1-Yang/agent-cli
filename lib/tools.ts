import toolsData from '@/data/tools.json';
import type { Tool, Category } from './types';

export type { Tool, Category };
export type { Locale } from './types';

export const tools: Tool[] = toolsData as Tool[];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return tools.map(t => t.slug);
}

export function getAllCategories(): Category[] {
  return [...new Set(tools.map(t => t.category))].sort() as Category[];
}

export function getToolsByCategory(category: Category): Tool[] {
  return tools.filter(t => t.category === category);
}

export function getCategoryCount(): Record<Category, number> {
  return tools.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {} as Record<Category, number>);
}
