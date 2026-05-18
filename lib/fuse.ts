import Fuse from 'fuse.js';
import type { Tool, Locale } from './types';

export function createFuse(toolsList: Tool[], locale: Locale) {
  return new Fuse(toolsList, {
    keys: [
      { name: 'name', weight: 2 },
      { name: `tagline.${locale}`, weight: 1.5 },
      { name: 'tags', weight: 1 },
    ],
    threshold: 0.4,
    includeScore: true,
    ignoreLocation: true,
  });
}
