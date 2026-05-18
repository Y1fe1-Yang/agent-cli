import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { tools } from '@/lib/tools';
import type { Locale } from '@/lib/types';

const FEATURED = [
  { slug: 'gwcli',     icon: '🔵', service: 'Google Workspace' },
  { slug: 'lark-cli',  icon: '🟡', service: '飞书 / Lark' },
  { slug: 'ntn',       icon: '⬛', service: 'Notion' },
  { slug: 'gh',        icon: '🐙', service: 'GitHub' },
  { slug: 'agentmail', icon: '📬', service: 'Agentmail' },
  { slug: 'opencli',   icon: '🌐', service: 'Any Website' },
];

export default async function FeaturedAgentCLIs({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'featured' });

  const featuredTools = FEATURED.flatMap(({ slug, icon, service }) => {
    const tool = tools.find(t => t.slug === slug);
    if (!tool) return [];
    return [{ tool, icon, service }];
  });

  return (
    <section className="bg-surface-soft border-b border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Section header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            <span className="text-xs font-medium text-primary uppercase tracking-widest">
              {t('label')}
            </span>
          </div>
          <h2 className="font-serif text-3xl text-ink tracking-[-0.5px]">
            {t('title')}
          </h2>
          <p className="text-body text-sm mt-2 max-w-xl">{t('subtitle')}</p>
        </div>

        {/* Feature tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {featuredTools.map(({ tool, icon, service }) => (
            <Link
              key={tool.slug}
              href={`/${locale}/tools/${tool.slug}`}
              className="group bg-canvas border border-hairline rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all duration-150 flex flex-col gap-3"
            >
              {/* Icon + service */}
              <div>
                <span className="text-2xl">{icon}</span>
                <p className="text-xs text-muted-soft mt-1 leading-tight">{service}</p>
              </div>
              {/* Tool name */}
              <div>
                <p className="text-sm font-medium text-ink group-hover:text-primary transition-colors leading-snug">
                  {tool.name}
                </p>
                <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                  {tool.tagline[locale]}
                </p>
              </div>
              {/* AI env dots */}
              <div className="mt-auto flex gap-1">
                {tool.ai_env.claude_code && <span title="Claude Code" className="w-1.5 h-1.5 rounded-full bg-accent-teal" />}
                {tool.ai_env.codex      && <span title="Codex"        className="w-1.5 h-1.5 rounded-full bg-accent-amber" />}
                {tool.ai_env.happycapy  && <span title="Happycapy"    className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
