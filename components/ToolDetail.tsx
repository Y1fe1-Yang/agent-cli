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
