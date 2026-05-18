import { describe, it, expect } from 'vitest';
import { createFuse } from './fuse';
import { tools } from './tools';

describe('createFuse', () => {
  it('finds bat when searching for "syntax highlight"', () => {
    const fuse = createFuse(tools, 'en');
    const results = fuse.search('syntax highlight');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.slug).toBe('bat');
  });

  it('returns empty array for nonsense query', () => {
    const fuse = createFuse(tools, 'zh');
    const results = fuse.search('zzzzzyyyxxxnothing12345');
    expect(results).toHaveLength(0);
  });

  it('finds git tools when searching for "git"', () => {
    const fuse = createFuse(tools, 'en');
    const results = fuse.search('git');
    expect(results.some(r => r.item.category === 'git')).toBe(true);
  });
});
