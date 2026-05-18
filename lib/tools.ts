import toolsData from '@/data/tools.json';
import type { Tool, Category, Locale } from './types';

export function localise(field: { en: string; zh: string; ja?: string }, locale: Locale): string {
  return (field as Record<string, string>)[locale] ?? field.en;
}

export type { Tool, Category };
export type { Locale } from './types';

export const tools: Tool[] = toolsData as unknown as Tool[];

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
  const seed = Object.fromEntries(
    (['file-management', 'network', 'git', 'dev-tools', 'productivity',
      'database', 'media', 'system', 'fun', 'cloud'] as const).map(c => [c, 0])
  ) as Record<Category, number>;
  return tools.reduce((acc, t) => {
    acc[t.category]++;
    return acc;
  }, seed);
}
