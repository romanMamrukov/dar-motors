import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const basePath = isDev ? '' : '/dar-motors';

const config: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,

  basePath,
  assetPrefix: basePath,

  images: {
    unoptimized: true,
  },

  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default config;