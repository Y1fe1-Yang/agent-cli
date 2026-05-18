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
