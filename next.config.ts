import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl({
  output: 'export',
  basePath: '/agent-cli',
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/agent-cli',
  },
});
