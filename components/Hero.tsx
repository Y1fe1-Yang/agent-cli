import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { asset } from '@/lib/assetPath';

const TERMINAL_LINES = [
  { cmd: 'gh pr create --title "feat: add stripe payments"', out: '✓  Pull request #47 created' },
  { cmd: 'vercel deploy --prod', out: '✓  Deployed → https://myapp.vercel.app' },
  { cmd: 'stripe trigger payment_intent.succeeded', out: '✓  Webhook delivered to localhost' },
  { cmd: 'supabase db push', out: '✓  3 migrations applied successfully' },
];

export default async function Hero({ locale, count }: { locale: Locale; count: number }) {
  const t = await getTranslations({ locale, namespace: 'hero' });

  const titleLines = t('title').split('\n');

  return (
    <section className="bg-canvas border-b border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <div>
            {/* Agent-Ready badge */}
            <div className="inline-flex items-center gap-2 text-xs font-medium text-muted bg-surface-card border border-hairline px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal inline-block" />
              {t('badge')}
            </div>

            {/* Serif headline */}
            <h1 className="font-serif text-5xl lg:text-[56px] text-ink leading-[1.08] tracking-[-1px] mb-6">
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p className="text-body text-lg leading-relaxed mb-10 max-w-md">
              {t('subtitle', { count })}
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2">
              {[t('feature1'), t('feature2'), t('feature3')].map(f => (
                <span
                  key={f}
                  className="text-sm text-muted bg-surface-card border border-hairline px-3 py-1.5 rounded-full"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Works with */}
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-soft mr-1">Works with</span>
              {[
                { name: 'Claude Code', logo: asset('/logos/claude-code.svg')  },
                { name: 'Codex',       logo: asset('/logos/openai-codex.svg') },
              ].map(({ name, logo }) => (
                <span key={name} className="inline-flex items-center gap-1.5 text-xs font-medium text-muted bg-surface-card border border-hairline px-2.5 py-1 rounded-lg">
                  <img src={logo} alt="" width={12} height={12} className="w-3 h-3 object-contain opacity-75" />
                  {name}
                </span>
              ))}
            </div>

            {/* Happycapy spotlight */}
            <a
              href="http://happycapy.ai/?via=yves"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-3 bg-surface-card border border-hairline rounded-xl px-4 py-3 hover:border-primary hover:shadow-sm transition-all duration-150 group"
            >
              <img src={asset('/logos/happycapy.png')} alt="Happycapy" width={28} height={28} className="w-7 h-7 object-contain shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-ink">Happycapy</span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-accent-teal/15 text-accent-teal">
                    {t('happycapyRecLabel')}
                  </span>
                </div>
                <p className="text-xs text-muted leading-snug">{t('happycapyRecTagline')}</p>
              </div>
              <span className="ml-auto text-xs font-medium text-primary group-hover:translate-x-0.5 transition-transform shrink-0">
                {t('happycapyRecCta')}
              </span>
            </a>
          </div>

          {/* Right — terminal mockup */}
          <div className="bg-surface-dark rounded-xl overflow-hidden shadow-lg">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-surface-dark-elevated border-b border-surface-dark-soft">
              <span className="w-3 h-3 rounded-full bg-red-500/50" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-3 text-on-dark-soft text-xs font-mono">
                {t('terminalComment')}
              </span>
            </div>
            {/* Terminal content */}
            <div className="p-6 font-mono text-sm leading-loose space-y-4">
              {TERMINAL_LINES.map(({ cmd, out }) => (
                <div key={cmd}>
                  <div className="flex gap-2 items-start">
                    <span className="text-primary select-none mt-0.5">$</span>
                    <span className="text-on-dark break-all">{cmd}</span>
                  </div>
                  <div className="text-accent-teal ml-4">{out}</div>
                </div>
              ))}
              {/* Cursor */}
              <div className="flex gap-2 items-center">
                <span className="text-primary select-none">$</span>
                <span className="inline-block w-2 h-4 bg-primary/70 animate-pulse" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
