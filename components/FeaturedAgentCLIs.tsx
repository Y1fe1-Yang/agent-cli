import Link from 'next/link';
import { asset } from '@/lib/assetPath';
import { getTranslations } from 'next-intl/server';
import { tools, localise } from '@/lib/tools';
import type { Locale } from '@/lib/types';
import AiEnvBadges from './AiEnvBadges';

type FeaturedItem = {
  slug: string;
  logo?: string;
  letter?: string;
  letterColor?: string;
  service: string;
};

const WORKSPACE: FeaturedItem[] = [
  { slug: 'gwcli',     logo: 'googleworkspace', service: 'Google Workspace' },
  { slug: 'lark-cli',  logo: 'lark',            service: '飞书 / Lark' },
  { slug: 'ntn',       logo: 'notion',           service: 'Notion' },
  { slug: 'gh',        logo: 'github',           service: 'GitHub' },
  { slug: 'agentmail', letter: 'A', letterColor: '#5db8a6', service: 'Agentmail' },
  { slug: 'opencli',   letter: 'O', letterColor: '#cc785c', service: 'Any Website' },
];

const CLOUD: FeaturedItem[] = [
  { slug: 'vercel',        logo: 'vercel',     service: 'Vercel' },
  { slug: 'supabase',      logo: 'supabase',   service: 'Supabase' },
  { slug: 'railway',       logo: 'railway',    service: 'Railway' },
  { slug: 'wrangler',      logo: 'cloudflare', service: 'Cloudflare' },
  { slug: 'flyctl',        logo: 'flydotio',   service: 'Fly.io' },
  { slug: 'netlify',       logo: 'netlify',    service: 'Netlify' },
];

const DEV: FeaturedItem[] = [
  { slug: 'android-cli',  logo: 'android',   service: 'Android' },
  { slug: 'firecrawl',    letter: 'F', letterColor: '#f97316', service: 'Firecrawl' },
  { slug: 'stripe',       logo: 'stripe',    service: 'Stripe' },
  { slug: 'shopify-cli',  logo: 'shopify',   service: 'Shopify' },
  { slug: 'sentry-cli',   logo: 'sentry',    service: 'Sentry' },
  { slug: 'posthog',      logo: 'posthog',   service: 'PostHog' },
];

function ToolLogo({ item }: { item: FeaturedItem }) {
  if (item.logo) {
    return (
      <img
        src={asset(`/logos/${item.logo}.svg`)}
        alt={item.service}
        width={28}
        height={28}
        className="w-7 h-7 object-contain"
      />
    );
  }
  return (
    <span
      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold text-white"
      style={{ backgroundColor: item.letterColor ?? '#888' }}
    >
      {item.letter}
    </span>
  );
}

function ToolTile({ item, locale }: { item: FeaturedItem; locale: Locale }) {
  const tool = tools.find(t => t.slug === item.slug);
  if (!tool) return null;

  return (
    <Link
      href={`/${locale}/tools/${tool.slug}`}
      className="group bg-canvas border border-hairline rounded-xl p-4 hover:border-primary hover:shadow-sm transition-all duration-150 flex flex-col gap-3"
    >
      <div className="flex items-start gap-2">
        <ToolLogo item={item} />
        <p className="text-xs text-muted-soft mt-0.5 leading-tight">{item.service}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-ink group-hover:text-primary transition-colors leading-snug">
          {tool.name}
        </p>
        <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
          {localise(tool.tagline, locale)}
        </p>
      </div>
      <div className="mt-auto">
        <AiEnvBadges aiEnv={tool.ai_env} locale={locale} />
      </div>
    </Link>
  );
}

export default async function FeaturedAgentCLIs({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'featured' });

  return (
    <section className="bg-surface-soft border-b border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">

        {/* Workspace & Collaboration */}
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              <span className="text-xs font-medium text-primary uppercase tracking-widest">
                {t('label')}
              </span>
            </div>
            <h2 className="font-serif text-3xl text-ink tracking-[-0.5px]">{t('title')}</h2>
            <p className="text-body text-sm mt-2 max-w-xl">{t('subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {WORKSPACE.map(item => (
              <ToolTile key={item.slug} item={item} locale={locale} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-hairline" />

        {/* Cloud & Deploy */}
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal inline-block" />
              <span className="text-xs font-medium text-accent-teal uppercase tracking-widest">
                {t('cloudLabel')}
              </span>
            </div>
            <h2 className="font-serif text-3xl text-ink tracking-[-0.5px]">{t('cloudTitle')}</h2>
            <p className="text-body text-sm mt-2 max-w-xl">{t('cloudSubtitle')}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CLOUD.map(item => (
              <ToolTile key={item.slug} item={item} locale={locale} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-hairline" />

        {/* Dev Platform CLIs */}
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-amber inline-block" />
              <span className="text-xs font-medium text-accent-amber uppercase tracking-widest">
                {t('devLabel')}
              </span>
            </div>
            <h2 className="font-serif text-3xl text-ink tracking-[-0.5px]">{t('devTitle')}</h2>
            <p className="text-body text-sm mt-2 max-w-xl">{t('devSubtitle')}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DEV.map(item => (
              <ToolTile key={item.slug} item={item} locale={locale} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
