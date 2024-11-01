const jssConfig = require('./src/temp/config');
const { getPublicUrl } = require('@sitecore-jss/sitecore-jss-nextjs/utils');
const plugins = require('./src/temp/next-config-plugins') || {};

const publicUrl = getPublicUrl();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,
  // keepalive: true,

  //next image rendering host
  images: {
    domains: [
      'dev-ussc-sc-10-jss-single.azurewebsites.net',
      'uatapi-kroll.kroll.com',
      'prod-use-sitecore-10-jss-cm.azurewebsites.net',
      'qa-ussc-sitecore-10-jss-cm.azurewebsites.net',
      'qa-ussc-sitecore-10-jss-cd.azurewebsites.net',
      'qa-ussc-sc-10-jss-node.azurewebsites.net',
      'qa-kroll.kroll.com',
      'uat-kroll.kroll.com',
      'api-kroll.kroll.com',
    ],
  },

  async headers() {
    return [
      {
        source: '/sitecore/api/:path*',
        headers: [
          {
            key: 'x-custom-header',
            value: 'Kroll',
          },
        ],
      },
    ];
  },

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
    search_url: process.env.search_url,
    search_name: process.env.search_name,
    search_key: process.env.search_key,
    search_analytics_key: process.env.search_analytics_key,
    environment_name: process?.env?.environment_name,
    search_careers_key: process.env.search_careers_key,
    search_careers_url: process.env.search_careers_url,
    search_careers_name: process.env.search_careers_name, 
    search_careers_analytics_key: process?.env?.search_careers_analytics_key,
    SITES: process.env.SITES,
    KROLLSITEMAP: process.env.KROLLSITEMAP,
  },

  compiler: {
    // Enables the styled-components SWC transform
    removeConsole: true,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: [
      'en-US',
      'en',
      'es-MX',
      'en-CA',
      'en-IE',
      'en-GB',
      'zh-CN',
      'fr-FR',
      'it-IT',
      'de-DE',
      'es-ES',
      'ja-JP',
      'pt-BR',
      'en-SG',
    ],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: 'en-US',
  },

  serverRuntimeConfig: {
    // Add keep-alive configuration here
    keepAliveTimeout: 60000, // Example: 60 seconds
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // healthz check
      {
        source: '/healthz',
        destination: '/api/healthz',
      },
      // rewrite for Sitecore service pages
      {
        source: '/sitecore/service/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/service/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/api/:path*`,
      },
    ];
  },
};

module.exports = () => {
  // Run the base config through any configured plugins
  return Object.values(plugins).reduce((acc, plugin) => plugin(acc), nextConfig);
};
