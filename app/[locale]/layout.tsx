import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { routing } from '@/i18n/routing';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import '@/app/globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CLI Tools for the Agent Era',
  description: 'Discover CLI tools your AI agents can actually use',
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
    <html
      lang={locale}
      className={`h-full ${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="h-full antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-full flex flex-col">
            {/* Nav */}
            <header className="sticky top-0 z-10 bg-canvas border-b border-hairline">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link
                  href={`/${locale}`}
                  className="font-serif text-xl text-ink tracking-tight hover:text-primary transition-colors"
                >
                  CLI Tools
                </Link>
                <LocaleSwitcher locale={locale} />
              </div>
            </header>

            <main className="flex-1">
              {children}
            </main>

            {/* Footer — dark navy */}
            <footer className="bg-surface-dark">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-serif text-lg text-on-dark tracking-tight">CLI Tools</span>
                <p className="text-on-dark-soft text-sm text-center">{t('credit')}</p>
                <LocaleSwitcher locale={locale} dark />
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
