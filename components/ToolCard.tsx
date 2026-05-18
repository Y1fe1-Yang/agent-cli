import Link from 'next/link';
import type { Tool, Locale } from '@/lib/types';

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
  const agentCount = [tool.ai_env.claude_code, tool.ai_env.codex, tool.ai_env.happycapy].filter(Boolean).length;

  return (
    <Link
      href={`/${locale}/tools/${tool.slug}`}
      className="group block bg-surface-card border border-hairline rounded-xl p-5 hover:border-primary hover:shadow-sm transition-all duration-150"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="font-medium text-ink text-base leading-snug group-hover:text-primary transition-colors">
          {tool.name}
        </h2>
        <span className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0 bg-canvas text-muted border border-hairline">
          {categoryLabel}
        </span>
      </div>

      {/* Tagline */}
      <p className="text-sm text-body leading-relaxed mb-4 line-clamp-2">
        {tool.tagline[locale]}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {tool.github.stars > 0 && (
          <span className="text-xs text-muted-soft">★ {formatStars(tool.github.stars)}</span>
        )}
        <span className="text-xs text-muted-soft">{tool.github.language}</span>

        {topInstall.map(([pm]) => (
          <span key={pm} className="text-xs font-mono bg-surface-dark text-on-dark-soft px-1.5 py-0.5 rounded">
            {pm}
          </span>
        ))}

        {/* Agent compatibility dots */}
        {agentCount > 0 && (
          <span className="ml-auto flex items-center gap-1">
            {tool.ai_env.claude_code && (
              <span title="Claude Code" className="w-1.5 h-1.5 rounded-full bg-accent-teal inline-block" />
            )}
            {tool.ai_env.codex && (
              <span title="GitHub Codex" className="w-1.5 h-1.5 rounded-full bg-accent-amber inline-block" />
            )}
            {tool.ai_env.happycapy && (
              <span title="Happycapy" className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            )}
          </span>
        )}
      </div>
    </Link>
  );
}
