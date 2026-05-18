import { getTranslations } from 'next-intl/server';
import type { Tool, Locale } from '@/lib/types';
import { localise } from '@/lib/tools';
import InstallCommand from './InstallCommand';
import CopyablePrompt from './CopyablePrompt';
import Link from 'next/link';
import { asset } from '@/lib/assetPath';

const AI_ENVS = [
  { key: 'claude_code' as const, logo: '/logos/claude-code.svg',  labelKey: 'claudeCode' as const, href: undefined },
  { key: 'codex'       as const, logo: '/logos/openai-codex.svg', labelKey: 'codex'      as const, href: undefined },
  { key: 'happycapy'   as const, logo: '/logos/happycapy.png',    labelKey: 'happycapy'  as const, href: 'http://happycapy.ai/?via=yves' },
];

export default async function ToolDetail({ tool, locale }: { tool: Tool; locale: Locale }) {
  const t = await getTranslations('tool');
  const catT = await getTranslations('categories');

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink mb-6 transition-colors"
      >
        {t('backToList')}
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-serif text-4xl text-ink tracking-[-0.5px]">{tool.name}</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-surface-card text-muted border border-hairline">
            {catT(tool.category)}
          </span>
        </div>
        <p className="text-lg text-body">{localise(tool.tagline, locale)}</p>
        <p className="mt-3 text-body leading-relaxed">{localise(tool.description, locale)}</p>
      </div>

      {/* GitHub meta */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8 text-sm text-muted pb-6 border-b border-hairline">
        {tool.github.stars > 0 && (
          <span>★ {tool.github.stars.toLocaleString()} {t('stars')}</span>
        )}
        <span>{t('language')}: <span className="text-ink">{tool.github.language}</span></span>
        <span>{t('lastUpdated')}: <span className="text-ink">{tool.github.last_updated}</span></span>
        <span>{tool.license}</span>
        <a href={tool.repo} target="_blank" rel="noopener noreferrer"
          className="text-primary hover:text-primary-active transition-colors">
          {t('viewRepo')} ↗
        </a>
        {tool.homepage !== tool.repo && (
          <a href={tool.homepage} target="_blank" rel="noopener noreferrer"
            className="text-primary hover:text-primary-active transition-colors">
            {t('viewHomepage')} ↗
          </a>
        )}
      </div>

      {/* Install */}
      <section className="mb-8">
        <h2 className="font-serif text-2xl text-ink mb-4">{t('install')}</h2>
        <InstallCommand install={tool.install} />
      </section>

      {/* Examples */}
      {tool.examples.length > 0 && (
        <section className="mb-8">
          <h2 className="font-serif text-2xl text-ink mb-4">{t('examples')}</h2>
          <div className="space-y-3">
            {tool.examples.map((ex, i) => (
              <div key={i} className="rounded-xl border border-hairline overflow-hidden">
                <div className="bg-surface-dark px-4 py-3">
                  <code className="text-sm text-accent-teal font-mono">{ex.command}</code>
                </div>
                <div className="px-4 py-2 text-sm text-body bg-surface-card">
                  {localise(ex.description, locale)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Agent prompts */}
      {tool.agent_prompts && tool.agent_prompts.length > 0 && (
        <section className="mb-8">
          <h2 className="font-serif text-2xl text-ink mb-1">{t('agentPrompts')}</h2>
          <p className="text-sm text-muted mb-4">{t('agentPromptsHint')}</p>
          <div className="flex flex-col gap-2">
            {tool.agent_prompts.map((p, i) => (
              <CopyablePrompt key={i} text={localise(p, locale)} />
            ))}
          </div>
        </section>
      )}

      {/* AI env */}
      <section className="mb-8">
        <h2 className="font-serif text-2xl text-ink mb-4">{t('aiEnv')}</h2>
        <div className="rounded-xl border border-hairline overflow-hidden">
          {AI_ENVS.map((env, i) => {
            const ok = tool.ai_env[env.key];
            const rowClass = `flex items-center justify-between px-4 py-3 ${i > 0 ? 'border-t border-hairline' : ''} bg-surface-card`;
            const inner = (
              <>
                <div className="flex items-center gap-2.5">
                  <img src={asset(env.logo)} alt={t(env.labelKey)} width={18} height={18}
                    className={`w-4.5 h-4.5 object-contain ${ok ? '' : 'opacity-30 grayscale'}`} />
                  <span className="text-sm font-medium text-ink">{t(env.labelKey)}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  ok
                    ? 'bg-accent-teal/15 text-accent-teal'
                    : 'bg-surface-cream-strong text-muted'
                }`}>
                  {ok ? t('compatible') : t('notCompatible')}
                </span>
              </>
            );
            return env.href ? (
              <a key={env.key} href={env.href} target="_blank" rel="noopener noreferrer"
                className={`${rowClass} hover:bg-canvas transition-colors group/hc`}>
                {inner}
              </a>
            ) : (
              <div key={env.key} className={rowClass}>{inner}</div>
            );
          })}
          {/* Happycapy recommendation */}
          <a href="http://happycapy.ai/?via=yves" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 border-t border-hairline bg-accent-teal/5 hover:bg-accent-teal/10 transition-colors">
            <span className="text-xs text-accent-teal font-medium leading-snug">{t('happycapyTagline')}</span>
            <span className="ml-auto text-xs text-accent-teal shrink-0">↗</span>
          </a>
          {localise(tool.ai_env.notes, locale) && (
            <div className="px-4 py-3 border-t border-hairline bg-canvas text-xs text-muted">
              {localise(tool.ai_env.notes, locale)}
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
