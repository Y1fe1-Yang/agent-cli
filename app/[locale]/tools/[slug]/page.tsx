import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getToolBySlug, getAllSlugs } from '@/lib/tools';
import type { Locale } from '@/lib/types';
import ToolDetail from '@/components/ToolDetail';
import Link from 'next/link';

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — CLI Tools`,
    description: tool.tagline[locale as Locale] ?? tool.tagline.en,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const t = await getTranslations({ locale, namespace: 'tool' });

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link href={`/${locale}`} className="text-sm text-gray-500 hover:text-blue-600">
          {t('backToList')}
        </Link>
      </div>
      <ToolDetail tool={tool} locale={locale as Locale} />
    </>
  );
}
