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
  const topInstall = Object.keys(tool.install).slice(0, 2);

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

        {topInstall.map(pm => (
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
