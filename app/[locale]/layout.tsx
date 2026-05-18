import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
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

  return (
    <html lang={locale} className="h-full">
      <body className="h-full bg-gray-50 text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-full flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                <a href={`/${locale}`} className="font-bold text-lg tracking-tight">
                  CLI Tools
                </a>
                <div className="flex gap-4 text-sm">
                  <a href="/zh" className={`hover:text-blue-600 ${locale === 'zh' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>中文</a>
                  <a href="/en" className={`hover:text-blue-600 ${locale === 'en' ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>EN</a>
                </div>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
              Data sourced from awesome-cli-apps and official tool pages
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
