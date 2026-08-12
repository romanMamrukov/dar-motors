import type { NextConfig } from 'next';
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction ? '/dar-motors' : '';
const config: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default config;
