/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const redirects = require('./redirects.json');
const withSvgr = require('next-svgr');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([[withBundleAnalyzer], withSvgr], {
  reactStrictMode: true,
  basePath: '/docs',
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: 'raw-loader',
          options: {},
        },
      ],
    });

    return config;
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async redirects() {
    return redirects;
  },
});
