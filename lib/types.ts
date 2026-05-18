export type Locale = 'en' | 'zh';

export type Category =
  | 'file-management'
  | 'network'
  | 'git'
  | 'dev-tools'
  | 'productivity'
  | 'database'
  | 'media'
  | 'system'
  | 'fun'
  | 'cloud';

export interface Tool {
  slug: string;
  name: string;
  tagline: { en: string; zh: string };
  description: { en: string; zh: string };
  homepage: string;
  repo: string;
  license: string;
  category: Category;
  tags: string[];
  install: Partial<Record<string, string>>;
  github: {
    stars: number;
    language: string;
    last_updated: string;
  };
  examples: Array<{
    command: string;
    description: { en: string; zh: string };
  }>;
  ai_env: {
    claude_code: boolean;
    codex: boolean;
    happycapy: boolean;
    notes: { en: string; zh: string };
  };
}
