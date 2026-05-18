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
      result = result.filter(tool => tool.category === selectedCat);
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
