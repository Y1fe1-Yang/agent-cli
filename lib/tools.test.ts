import { describe, it, expect } from 'vitest';
import { getToolBySlug, getAllSlugs, getAllCategories, getToolsByCategory } from './tools';

describe('getToolBySlug', () => {
  it('returns a tool for a valid slug', () => {
    const tool = getToolBySlug('bat');
    expect(tool).toBeDefined();
    expect(tool?.slug).toBe('bat');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getToolBySlug('not-a-real-tool')).toBeUndefined();
  });
});

describe('getAllSlugs', () => {
  it('returns an array of strings', () => {
    const slugs = getAllSlugs();
    expect(Array.isArray(slugs)).toBe(true);
    expect(slugs.length).toBeGreaterThan(0);
    expect(typeof slugs[0]).toBe('string');
  });
});

describe('getAllCategories', () => {
  it('returns unique categories', () => {
    const cats = getAllCategories();
    expect(new Set(cats).size).toBe(cats.length);
  });
});

describe('getToolsByCategory', () => {
  it('returns only tools matching the given category', () => {
    const tools = getToolsByCategory('git');
    expect(tools.every(t => t.category === 'git')).toBe(true);
    expect(tools.length).toBeGreaterThan(0);
  });
});
