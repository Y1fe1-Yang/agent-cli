import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'CLI Tools',
  description: 'Discover great command-line tools',
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'footer' });

  return (
    <html lang={locale} className="h-full">
      <body className="h-full bg-gray-50 text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-full flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                <Link href={`/${locale}`} className="font-bold text-lg tracking-tight">
                  CLI Tools
                </Link>
                <LocaleSwitcher locale={locale} />
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
              {t('credit')}
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
