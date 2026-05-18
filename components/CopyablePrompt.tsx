'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

export default function CopyablePrompt({ text }: { text: string }) {
  const t = useTranslations('tool');
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <button
      onClick={copy}
      className="group w-full flex items-center justify-between gap-3 bg-surface-card border border-hairline rounded-xl px-4 py-3 hover:border-primary hover:bg-canvas transition-all duration-150 text-left"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-base shrink-0">💬</span>
        <span className="text-sm text-ink leading-snug">{text}</span>
      </div>
      <span className={`shrink-0 text-xs px-2 py-0.5 rounded-md font-medium transition-colors ${
        copied
          ? 'bg-accent-teal/15 text-accent-teal'
          : 'text-muted-soft group-hover:text-primary group-hover:bg-primary/10'
      }`}>
        {copied ? t('copied') : t('copyCommand')}
      </span>
    </button>
  );
}
