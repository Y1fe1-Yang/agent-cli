'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function LocaleSwitcher({ locale, dark }: { locale: string; dark?: boolean }) {
  const pathname = usePathname();

  const getLocalePath = (targetLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    return segments.join('/') || '/';
  };

  const activeClass = dark ? 'text-on-dark font-medium' : 'text-primary font-medium';
  const inactiveClass = dark ? 'text-on-dark-soft hover:text-on-dark' : 'text-muted hover:text-ink';

  return (
    <div className="flex gap-4 text-sm">
      <Link href={getLocalePath('zh')} className={`transition-colors ${locale === 'zh' ? activeClass : inactiveClass}`}>
        中文
      </Link>
      <Link href={getLocalePath('en')} className={`transition-colors ${locale === 'en' ? activeClass : inactiveClass}`}>
        EN
      </Link>
      <Link href={getLocalePath('ja')} className={`transition-colors ${locale === 'ja' ? activeClass : inactiveClass}`}>
        日本語
      </Link>
    </div>
  );
}
