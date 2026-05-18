'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function LocaleSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  const getLocalePath = (targetLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    return segments.join('/') || '/';
  };

  return (
    <div className="flex gap-4 text-sm">
      <Link
        href={getLocalePath('zh')}
        className={`hover:text-blue-600 ${locale === 'zh' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
      >
        中文
      </Link>
      <Link
        href={getLocalePath('en')}
        className={`hover:text-blue-600 ${locale === 'en' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
      >
        EN
      </Link>
    </div>
  );
}
