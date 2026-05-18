# CLI Resource Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (zh/en) static CLI tools resource site with search, category filtering, install command copy, and AI environment compatibility badges.

**Architecture:** Next.js 15 App Router with SSG, `[locale]` dynamic segment handled by next-intl middleware, all tool data from `data/tools.json` read at build time. Client-side Fuse.js search and category filter state managed in a single `ToolListClient` component.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v3, next-intl v3, Fuse.js v7, Vercel deployment.

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Minimal root layout (required by Next.js, delegates html/body to locale layout) |
| `app/[locale]/layout.tsx` | Sets `<html lang>`, wraps with `NextIntlClientProvider` |
| `app/[locale]/page.tsx` | Home page server component — loads tools, renders `ToolListClient` |
| `app/[locale]/tools/[slug]/page.tsx` | Tool detail page server component |
| `components/ToolListClient.tsx` | `'use client'` — owns search query + category filter state |
| `components/ToolCard.tsx` | Presentational card for tool list (no client state) |
| `components/CategoryFilter.tsx` | `'use client'` — clickable category sidebar |
| `components/SearchBar.tsx` | `'use client'` — controlled search input |
| `components/InstallCommand.tsx` | `'use client'` — tab selector + clipboard copy |
| `components/ToolDetail.tsx` | Presentational full detail layout (no client state) |
| `lib/types.ts` | TypeScript interfaces: `Tool`, `Category`, `Locale` |
| `lib/tools.ts` | `getToolBySlug`, `getAllSlugs`, `getAllCategories`, `getToolsByCategory` |
| `lib/fuse.ts` | `createFuse(tools, locale)` factory |
| `i18n/routing.ts` | next-intl `defineRouting({ locales, defaultLocale })` |
| `i18n/request.ts` | next-intl `getRequestConfig` — loads messages per request |
| `middleware.ts` | next-intl middleware for locale-based URL routing |
| `messages/zh.json` | Chinese UI strings |
| `messages/en.json` | English UI strings |
| `next.config.ts` | next-intl plugin wrapper |

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json`

- [ ] **Step 1: Scaffold Next.js app**

Run in `D:/cli`:
```bash
npx create-next-app@15 . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```
Expected: project files created. If prompted about existing files, confirm overwrite for `data/` and `docs/` being untouched.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install next-intl fuse.js
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```
Expected: server starts on `http://localhost:3000`, no errors.

- [ ] **Step 4: Clean out the boilerplate**

Delete `app/page.tsx`, `app/globals.css` default content, remove any sample components. Keep the folder structure.

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 15 project with Tailwind and next-intl"
```

---

## Task 2: TypeScript Types + Data Layer

**Files:**
- Create: `lib/types.ts`
- Create: `lib/tools.ts`
- Create: `lib/tools.test.ts`

- [ ] **Step 1: Write failing tests**

Create `lib/tools.test.ts`:
```typescript
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
```

- [ ] **Step 2: Install vitest and run to confirm failure**

```bash
npm install -D vitest @vitest/node
```

Add to `package.json` scripts:
```json
"test": "vitest run"
```

```bash
npm test
```
Expected: FAIL — `Cannot find module './tools'`

- [ ] **Step 3: Create `lib/types.ts`**

```typescript
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
  | 'fun';

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
    notes: { en: string; zh: string };
  };
}
```

- [ ] **Step 4: Create `lib/tools.ts`**

```typescript
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
```

- [ ] **Step 5: Run tests**

```bash
npm test
```
Expected: 5 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/ data/
git commit -m "feat: add TypeScript types and data access layer"
```

---

## Task 3: Fuse.js Search

**Files:**
- Create: `lib/fuse.ts`
- Create: `lib/fuse.test.ts`

- [ ] **Step 1: Write failing test**

Create `lib/fuse.test.ts`:
```typescript
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
```

- [ ] **Step 2: Run to confirm failure**

```bash
npm test
```
Expected: FAIL — `Cannot find module './fuse'`

- [ ] **Step 3: Create `lib/fuse.ts`**

```typescript
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
  });
}
```

- [ ] **Step 4: Run tests**

```bash
npm test
```
Expected: all 8 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/fuse.ts lib/fuse.test.ts
git commit -m "feat: add Fuse.js search factory with locale-aware keys"
```

---

## Task 4: i18n Infrastructure

**Files:**
- Create: `i18n/routing.ts`
- Create: `i18n/request.ts`
- Create: `middleware.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Create `i18n/routing.ts`**

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
});
```

- [ ] **Step 2: Create `i18n/request.ts`**

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create `middleware.ts`**

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
```

- [ ] **Step 4: Update `next.config.ts`**

Replace the entire file with:
```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl({});
```

- [ ] **Step 5: Verify middleware compiles**

```bash
npm run build 2>&1 | head -30
```
Expected: no import errors related to next-intl. Build may fail due to missing pages — that's OK at this stage.

- [ ] **Step 6: Commit**

```bash
git add i18n/ middleware.ts next.config.ts
git commit -m "feat: add next-intl routing, middleware, and plugin config"
```

---

## Task 5: Message Files

**Files:**
- Create: `messages/zh.json`
- Create: `messages/en.json`

- [ ] **Step 1: Create `messages/zh.json`**

```json
{
  "nav": {
    "home": "首页",
    "allTools": "全部工具"
  },
  "hero": {
    "title": "发现优质 CLI 工具",
    "subtitle": "精选 {count} 款命令行工具，带中英双语介绍和 AI 环境兼容性标注"
  },
  "search": {
    "placeholder": "搜索 CLI 工具...",
    "noResults": "没有找到相关工具",
    "resultsCount": "{count} 个工具"
  },
  "filter": {
    "allCategories": "全部分类"
  },
  "tool": {
    "install": "安装方式",
    "examples": "使用示例",
    "copyCommand": "复制",
    "copied": "已复制！",
    "aiEnv": "AI 环境兼容性",
    "stars": "Stars",
    "license": "开源协议",
    "language": "主语言",
    "lastUpdated": "最后更新",
    "viewRepo": "查看仓库",
    "viewHomepage": "官网",
    "claudeCode": "Claude Code",
    "codex": "GitHub Codex",
    "compatible": "兼容",
    "notCompatible": "不兼容",
    "backToList": "← 返回列表"
  },
  "categories": {
    "file-management": "文件管理",
    "network": "网络",
    "git": "Git 工具",
    "dev-tools": "开发工具",
    "productivity": "效率",
    "database": "数据库",
    "media": "媒体",
    "system": "系统",
    "fun": "娱乐"
  },
  "footer": {
    "credit": "数据来源：awesome-cli-apps 及各工具官方页面"
  }
}
```

- [ ] **Step 2: Create `messages/en.json`**

```json
{
  "nav": {
    "home": "Home",
    "allTools": "All Tools"
  },
  "hero": {
    "title": "Discover Great CLI Tools",
    "subtitle": "{count} command-line tools with bilingual descriptions and AI environment compatibility"
  },
  "search": {
    "placeholder": "Search CLI tools...",
    "noResults": "No tools found",
    "resultsCount": "{count} tools"
  },
  "filter": {
    "allCategories": "All Categories"
  },
  "tool": {
    "install": "Install",
    "examples": "Examples",
    "copyCommand": "Copy",
    "copied": "Copied!",
    "aiEnv": "AI Environment",
    "stars": "Stars",
    "license": "License",
    "language": "Language",
    "lastUpdated": "Last Updated",
    "viewRepo": "View Repo",
    "viewHomepage": "Homepage",
    "claudeCode": "Claude Code",
    "codex": "GitHub Codex",
    "compatible": "Compatible",
    "notCompatible": "Not compatible",
    "backToList": "← Back to list"
  },
  "categories": {
    "file-management": "File Management",
    "network": "Network",
    "git": "Git",
    "dev-tools": "Dev Tools",
    "productivity": "Productivity",
    "database": "Database",
    "media": "Media",
    "system": "System",
    "fun": "Fun"
  },
  "footer": {
    "credit": "Data sourced from awesome-cli-apps and official tool pages"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add messages/
git commit -m "feat: add zh and en message files for i18n"
```

---

## Task 6: App Layouts

**Files:**
- Create: `app/layout.tsx`
- Create: `app/[locale]/layout.tsx`
- Create: `app/globals.css`

- [ ] **Step 1: Create `app/layout.tsx`** (minimal root layout)

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 2: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 3: Create `app/[locale]/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'CLI Tools',
  description: 'Discover great command-line tools',
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <body className="h-full bg-gray-50 text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-full flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                <a href={`/${locale}`} className="font-bold text-lg tracking-tight">
                  CLI Tools
                </a>
                <div className="flex gap-4 text-sm">
                  <a href="/zh" className={`hover:text-blue-600 ${locale === 'zh' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>中文</a>
                  <a href="/en" className={`hover:text-blue-600 ${locale === 'en' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>EN</a>
                </div>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
              Data sourced from awesome-cli-apps and official tool pages
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/
git commit -m "feat: add root and locale layouts with nav and footer"
```

---

## Task 7: ToolCard Component

**Files:**
- Create: `components/ToolCard.tsx`

- [ ] **Step 1: Create `components/ToolCard.tsx`**

```tsx
import Link from 'next/link';
import type { Tool, Locale } from '@/lib/types';

const CATEGORY_COLORS: Record<string, string> = {
  'file-management': 'bg-blue-100 text-blue-700',
  'network':         'bg-cyan-100 text-cyan-700',
  'git':             'bg-orange-100 text-orange-700',
  'dev-tools':       'bg-purple-100 text-purple-700',
  'productivity':    'bg-green-100 text-green-700',
  'database':        'bg-yellow-100 text-yellow-700',
  'media':           'bg-pink-100 text-pink-700',
  'system':          'bg-red-100 text-red-700',
  'fun':             'bg-indigo-100 text-indigo-700',
};

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function ToolCard({
  tool,
  locale,
  categoryLabel,
}: {
  tool: Tool;
  locale: Locale;
  categoryLabel: string;
}) {
  const topInstall = Object.entries(tool.install).slice(0, 2);

  return (
    <Link
      href={`/${locale}/tools/${tool.slug}`}
      className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="font-semibold text-gray-900 text-base">{tool.name}</h2>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${CATEGORY_COLORS[tool.category] ?? 'bg-gray-100 text-gray-600'}`}>
          {categoryLabel}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {tool.tagline[locale]}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-400">⭐ {formatStars(tool.github.stars)}</span>
        <span className="text-xs text-gray-300">·</span>
        <span className="text-xs text-gray-400">{tool.github.language}</span>

        {topInstall.map(([pm, cmd]) => (
          <span key={pm} className="text-xs font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
            {pm}
          </span>
        ))}
      </div>

      {tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {tool.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded border border-gray-100">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ToolCard.tsx
git commit -m "feat: add ToolCard component with stars, install badges, and tags"
```

---

## Task 8: CategoryFilter Component

**Files:**
- Create: `components/CategoryFilter.tsx`

- [ ] **Step 1: Create `components/CategoryFilter.tsx`**

```tsx
'use client';

import type { Category } from '@/lib/types';

export default function CategoryFilter({
  categories,
  counts,
  selected,
  allLabel,
  labels,
  onSelect,
}: {
  categories: Category[];
  counts: Record<string, number>;
  selected: Category | null;
  allLabel: string;
  labels: Record<string, string>;
  onSelect: (cat: Category | null) => void;
}) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const btnClass = (active: boolean) =>
    `w-full text-left px-3 py-2 rounded-lg text-sm flex justify-between items-center transition-colors ${
      active
        ? 'bg-blue-50 text-blue-700 font-medium'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="space-y-0.5">
      <button className={btnClass(selected === null)} onClick={() => onSelect(null)}>
        <span>{allLabel}</span>
        <span className="text-xs text-gray-400">{total}</span>
      </button>
      {categories.map(cat => (
        <button key={cat} className={btnClass(selected === cat)} onClick={() => onSelect(cat)}>
          <span>{labels[cat] ?? cat}</span>
          <span className="text-xs text-gray-400">{counts[cat] ?? 0}</span>
        </button>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/CategoryFilter.tsx
git commit -m "feat: add CategoryFilter sidebar component"
```

---

## Task 9: SearchBar Component

**Files:**
- Create: `components/SearchBar.tsx`

- [ ] **Step 1: Create `components/SearchBar.tsx`**

```tsx
'use client';

import { useCallback } from 'react';

export default function SearchBar({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange]
  );

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/SearchBar.tsx
git commit -m "feat: add SearchBar component"
```

---

## Task 10: ToolListClient Component

**Files:**
- Create: `components/ToolListClient.tsx`

- [ ] **Step 1: Create `components/ToolListClient.tsx`**

```tsx
'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { createFuse } from '@/lib/fuse';
import type { Tool, Category, Locale } from '@/lib/types';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ToolCard from './ToolCard';

export default function ToolListClient({
  tools,
  locale,
  categories,
  counts,
}: {
  tools: Tool[];
  locale: Locale;
  categories: Category[];
  counts: Record<string, number>;
}) {
  const t = useTranslations();
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);

  const fuse = useMemo(() => createFuse(tools, locale), [tools, locale]);

  const filtered = useMemo(() => {
    let result = query.trim()
      ? fuse.search(query).map(r => r.item)
      : tools;

    if (selectedCat) {
      result = result.filter(t => t.category === selectedCat);
    }

    return result;
  }, [query, selectedCat, fuse, tools]);

  const categoryLabels = Object.fromEntries(
    categories.map(cat => [cat, t(`categories.${cat}`)])
  ) as Record<string, string>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('hero.title')}
        </h1>
        <p className="text-gray-500 text-sm">
          {t('hero.subtitle', { count: tools.length })}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          value={query}
          placeholder={t('search.placeholder')}
          onChange={setQuery}
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-48 shrink-0">
          <CategoryFilter
            categories={categories}
            counts={counts}
            selected={selectedCat}
            allLabel={t('filter.allCategories')}
            labels={categoryLabels}
            onSelect={setSelectedCat}
          />
        </aside>

        {/* Grid */}
        <section className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 mb-4">
            {t('search.resultsCount', { count: filtered.length })}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              {t('search.noResults')}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(tool => (
                <ToolCard
                  key={tool.slug}
                  tool={tool}
                  locale={locale}
                  categoryLabel={categoryLabels[tool.category] ?? tool.category}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ToolListClient.tsx
git commit -m "feat: add ToolListClient with search and category filter state"
```

---

## Task 11: Home Page

**Files:**
- Create: `app/[locale]/page.tsx`

- [ ] **Step 1: Create `app/[locale]/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { tools, getAllCategories, getCategoryCount } from '@/lib/tools';
import type { Locale } from '@/lib/types';
import ToolListClient from '@/components/ToolListClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: t('title'),
    description: t('subtitle', { count: tools.length }),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const categories = getAllCategories();
  const counts = getCategoryCount();

  return (
    <ToolListClient
      tools={tools}
      locale={locale as Locale}
      categories={categories}
      counts={counts as Record<string, number>}
    />
  );
}
```

- [ ] **Step 2: Start dev server and verify home page loads**

```bash
npm run dev
```

Open `http://localhost:3000` — should redirect to `/zh` and show a grid of tool cards.
Open `http://localhost:3000/en` — should show same grid in English.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: add home page with tool grid and i18n metadata"
```

---

## Task 12: InstallCommand Component

**Files:**
- Create: `components/InstallCommand.tsx`

- [ ] **Step 1: Create `components/InstallCommand.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const PM_ORDER = ['brew', 'apt', 'npm', 'cargo', 'pip', 'winget', 'scoop', 'go', 'dnf', 'pacman'];

export default function InstallCommand({
  install,
}: {
  install: Partial<Record<string, string>>;
}) {
  const t = useTranslations('tool');
  const entries = PM_ORDER.map(pm => [pm, install[pm]] as [string, string | undefined])
    .filter((e): e is [string, string] => !!e[1]);

  const [active, setActive] = useState(entries[0]?.[0] ?? '');
  const [copied, setCopied] = useState(false);

  if (entries.length === 0) return null;

  const currentCmd = entries.find(([pm]) => pm === active)?.[1] ?? '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
        {entries.map(([pm]) => (
          <button
            key={pm}
            onClick={() => setActive(pm)}
            className={`px-4 py-2 text-sm font-mono shrink-0 transition-colors ${
              active === pm
                ? 'bg-white border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {pm}
          </button>
        ))}
      </div>

      {/* Command */}
      <div className="flex items-center gap-2 bg-gray-900 px-4 py-3">
        <code className="flex-1 text-sm text-green-400 font-mono overflow-x-auto whitespace-nowrap">
          {currentCmd}
        </code>
        <button
          onClick={handleCopy}
          className="shrink-0 text-xs text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 px-2 py-1 rounded transition-colors"
        >
          {copied ? t('copied') : t('copyCommand')}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/InstallCommand.tsx
git commit -m "feat: add InstallCommand with tab selector and clipboard copy"
```

---

## Task 13: ToolDetail Component + Detail Page

**Files:**
- Create: `components/ToolDetail.tsx`
- Create: `app/[locale]/tools/[slug]/page.tsx`

- [ ] **Step 1: Create `components/ToolDetail.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import type { Tool, Locale } from '@/lib/types';
import InstallCommand from './InstallCommand';

function Badge({ ok }: { ok: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
      ok ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
    }`}>
      {ok ? '✓' : '✗'}
    </span>
  );
}

export default function ToolDetail({ tool, locale }: { tool: Tool; locale: Locale }) {
  const t = useTranslations('tool');
  const catT = useTranslations('categories');

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
          <span className="text-sm text-gray-400">{catT(tool.category)}</span>
        </div>
        <p className="text-lg text-gray-600">{tool.tagline[locale]}</p>
        <p className="mt-3 text-gray-700 leading-relaxed">{tool.description[locale]}</p>
      </div>

      {/* GitHub meta */}
      <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-500">
        <span>⭐ {tool.github.stars.toLocaleString()} {t('stars')}</span>
        <span>🔤 {tool.github.language}</span>
        <span>📅 {t('lastUpdated')}: {tool.github.last_updated}</span>
        <span>📄 {tool.license}</span>
        <a href={tool.repo} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {t('viewRepo')} ↗
        </a>
        {tool.homepage !== tool.repo && (
          <a href={tool.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {t('viewHomepage')} ↗
          </a>
        )}
      </div>

      {/* Install */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('install')}</h2>
        <InstallCommand install={tool.install} />
      </section>

      {/* Examples */}
      {tool.examples.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('examples')}</h2>
          <div className="space-y-3">
            {tool.examples.map((ex, i) => (
              <div key={i} className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-900 px-4 py-3">
                  <code className="text-sm text-green-400 font-mono">{ex.command}</code>
                </div>
                <div className="px-4 py-2 text-sm text-gray-600 bg-white">
                  {ex.description[locale]}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AI env */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">{t('aiEnv')}</h2>
        <div className="rounded-lg border border-gray-200 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('claudeCode')}</span>
            <div className="flex items-center gap-2">
              <Badge ok={tool.ai_env.claude_code} />
              <span className="text-xs text-gray-500">
                {tool.ai_env.claude_code ? t('compatible') : t('notCompatible')}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('codex')}</span>
            <div className="flex items-center gap-2">
              <Badge ok={tool.ai_env.codex} />
              <span className="text-xs text-gray-500">
                {tool.ai_env.codex ? t('compatible') : t('notCompatible')}
              </span>
            </div>
          </div>
          {tool.ai_env.notes[locale] && (
            <p className="text-xs text-gray-500 pt-2 border-t border-gray-100 mt-2">
              {tool.ai_env.notes[locale]}
            </p>
          )}
        </div>
      </section>
    </article>
  );
}
```

- [ ] **Step 2: Create `app/[locale]/tools/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getToolBySlug, getAllSlugs } from '@/lib/tools';
import type { Locale } from '@/lib/types';
import ToolDetail from '@/components/ToolDetail';
import Link from 'next/link';

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — CLI Tools`,
    description: tool.tagline[locale as Locale] ?? tool.tagline.en,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const t = await getTranslations({ locale, namespace: 'tool' });

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link href={`/${locale}`} className="text-sm text-gray-500 hover:text-blue-600">
          {t('backToList')}
        </Link>
      </div>
      <ToolDetail tool={tool} locale={locale as Locale} />
    </>
  );
}
```

- [ ] **Step 3: Test detail page in browser**

Open `http://localhost:3000/zh/tools/bat` — should show full detail for bat with install tabs and examples.
Open `http://localhost:3000/en/tools/bat` — same page in English.
Click "复制" on an install tab — clipboard should get the command, button shows "已复制！".

- [ ] **Step 4: Commit**

```bash
git add components/ToolDetail.tsx app/[locale]/tools/
git commit -m "feat: add tool detail page with install tabs, examples, and AI env badges"
```

---

## Task 14: Production Build + Vercel Config

**Files:**
- Create: `vercel.json` (optional, only if defaults need overriding)

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: `Route (app)` table shows all 130+ static routes (`/zh`, `/en`, `/zh/tools/bat`, `/en/tools/bat`, etc.), no errors.

- [ ] **Step 2: Test production build locally**

```bash
npm run start
```
Open `http://localhost:3000` — verify redirect to `/zh`, search works, copy works, locale switch works.

- [ ] **Step 3: Fix any build errors**

Common issues:
- `params must be awaited` → ensure all `params` are `await`ed (Next.js 15 requirement)
- `useTranslations used in server component` → move to client component or use `getTranslations`
- Missing `'use client'` directive on components using hooks → add it

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete CLI resource site — 65 tools, zh/en i18n, search, install copy"
```

- [ ] **Step 5: Deploy to Vercel**

```bash
npx vercel --prod
```
Or push to GitHub and connect repo at vercel.com. Framework preset: Next.js. No env vars needed.

---

## Self-Review

**Spec coverage check:**
- ✅ Next.js 15 App Router SSG — Tasks 1, 6, 11, 13
- ✅ Tailwind CSS — Task 1 (scaffold), used throughout components
- ✅ Fuse.js search on name/tagline/tags — Tasks 3, 10
- ✅ Category filter sidebar — Tasks 8, 10
- ✅ Tool card with stars, install badges, tags — Task 7
- ✅ Detail page with full description — Task 13
- ✅ Install command tabs + 1-click copy — Task 12
- ✅ Examples list — Task 13 (ToolDetail)
- ✅ AI env compatibility badges — Task 13 (ToolDetail)
- ✅ next-intl zh/en routing — Tasks 4, 5, 6
- ✅ `/zh/...` and `/en/...` URLs — Task 4
- ✅ Inline bilingual data (tagline.en / tagline.zh) — Task 2 (types), used in components
- ✅ SEO metadata per page — Tasks 11, 13
- ✅ data/tools.json as single data source — already exists
- ✅ Vercel deployment — Task 14

**No placeholders found.**

**Type consistency:** `Tool`, `Locale`, `Category` all defined in `lib/types.ts` and re-exported from `lib/tools.ts`. Components import from `@/lib/types` consistently.
