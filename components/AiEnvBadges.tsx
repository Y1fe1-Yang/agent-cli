import Image from 'next/image';
import type { Tool } from '@/lib/types';

const ENVS = [
  { key: 'claude_code' as const, logo: '/logos/claude-code.svg',  name: 'Claude Code'   },
  { key: 'codex'       as const, logo: '/logos/openai-codex.svg', name: 'OpenAI Codex'  },
  { key: 'happycapy'   as const, logo: '/logos/happycapy.png',    name: 'Happycapy'     },
];

export default function AiEnvBadges({
  aiEnv,
  size = 'sm',
}: {
  aiEnv: Tool['ai_env'];
  size?: 'sm' | 'md';
}) {
  const compatible = ENVS.filter(e => aiEnv[e.key]);
  if (compatible.length === 0) return null;

  const dim = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  return (
    <div className="flex items-center gap-1.5">
      {compatible.map(e => (
        <Image
          key={e.key}
          src={e.logo}
          alt={e.name}
          title={e.name}
          width={16}
          height={16}
          className={`${dim} object-contain opacity-75`}
        />
      ))}
    </div>
  );
}
