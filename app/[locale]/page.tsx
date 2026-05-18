import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { tools, getAllCategories, getCategoryCount } from '@/lib/tools';
import type { Locale } from '@/lib/types';
import ToolListClient from '@/components/ToolListClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: t('title'),
    description: t('subtitle', { count: tools.length }),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const categories = getAllCategories();
  const counts = getCategoryCount();

  return (
    <ToolListClient
      tools={tools}
      locale={locale as Locale}
      categories={categories}
      counts={counts as Record<string, number>}
    />
  );
}
