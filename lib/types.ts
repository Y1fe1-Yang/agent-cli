export type Locale = 'en' | 'zh' | 'ja';

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

type L10n = { en: string; zh: string; ja?: string };

export interface Tool {
  slug: string;
  name: string;
  tagline: L10n;
  description: L10n;
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
    description: L10n;
  }>;
  ai_env: {
    claude_code: boolean;
    codex: boolean;
    happycapy: boolean;
    notes: L10n;
  };
  agent_prompts?: Array<L10n>;
}
