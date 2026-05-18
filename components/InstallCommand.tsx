'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const PM_ORDER = ['brew', 'apt', 'npm', 'cargo', 'pip', 'winget', 'scoop', 'go', 'dnf', 'pacman', 'macos', 'linux', 'windows'];

export default function InstallCommand({
  install,
}: {
  install: Partial<Record<string, string>>;
}) {
  const t = useTranslations('tool');
  const entries = PM_ORDER.map(pm => [pm, install[pm]] as [string, string | undefined])
    .filter((e): e is [string, string] => !!e[1]);

  const firstPm = entries[0]?.[0] ?? '';
  const [active, setActive] = useState(firstPm);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActive(firstPm);
  }, [firstPm]);

  if (entries.length === 0) return null;

  const currentCmd = entries.find(([pm]) => pm === active)?.[1] ?? '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // clipboard API unavailable (HTTP or permission denied)
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
        {entries.map(([pm]) => (
          <button
            key={pm}
            onClick={() => setActive(pm)}
            className={`px-4 py-2 text-sm font-mono shrink-0 transition-colors ${
              active === pm
                ? 'bg-white border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {pm}
          </button>
        ))}
      </div>

      {/* Command */}
      <div className="flex items-center gap-2 bg-gray-900 px-4 py-3">
        <code className="flex-1 text-sm text-green-400 font-mono overflow-x-auto whitespace-nowrap">
          {currentCmd}
        </code>
        <button
          onClick={handleCopy}
          className="shrink-0 text-xs text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 px-2 py-1 rounded transition-colors"
        >
          {copied ? t('copied') : t('copyCommand')}
        </button>
      </div>
    </div>
  );
}
