import type { Tool, Locale } from '@/lib/types';
import { asset } from '@/lib/assetPath';

const ENVS = [
  { key: 'claude_code' as const, name: 'Claude Code', logo: '/logos/claude-code.svg',  href: undefined },
  { key: 'codex'       as const, name: 'Codex',        logo: '/logos/openai-codex.svg', href: undefined },
  { key: 'happycapy'   as const, name: 'Happycapy',    logo: '/logos/happycapy.png',    href: 'http://happycapy.ai/?via=yves' },
];

const LABEL: Record<string, string> = {
  zh: '兼容',
  ja: '対応',
};

export default function AiEnvBadges({
  aiEnv,
  locale,
}: {
  aiEnv: Tool['ai_env'];
  locale?: Locale;
}) {
  const compatible = ENVS.filter(e => aiEnv[e.key]);
  if (compatible.length === 0) return null;

  const label = LABEL[locale ?? ''] ?? 'Works with';

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-xs text-muted-soft">{label}</span>
      {compatible.map(e => {
        const pill = (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg border border-hairline bg-canvas text-muted font-medium hover:border-primary hover:text-ink transition-colors">
            <img src={asset(e.logo)} alt="" width={11} height={11} className="w-2.5 h-2.5 object-contain opacity-70" />
            {e.name}
          </span>
        );
        return e.href ? (
          <a key={e.key} href={e.href} target="_blank" rel="noopener noreferrer">
            {pill}
          </a>
        ) : (
          <span key={e.key}>{pill}</span>
        );
      })}
    </div>
  );
}
