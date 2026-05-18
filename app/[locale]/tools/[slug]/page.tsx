import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getToolBySlug, getAllSlugs } from '@/lib/tools';
import type { Locale } from '@/lib/types';
import ToolDetail from '@/components/ToolDetail';

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

  return <ToolDetail tool={tool} locale={locale as Locale} />;
}
