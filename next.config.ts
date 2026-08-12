import type { NextConfig } from 'next';

const isGitHubPages =
  process.env.GITHUB_ACTIONS === 'true' ||
  process.env.DAR_GITHUB_PAGES === 'true';

const repositoryName =
  process.env.DAR_REPO_NAME ||
  process.env.GITHUB_REPOSITORY?.split('/')[1] ||
  'dar-motors';

const basePath = isGitHubPages ? `/${repositoryName}` : '';

const config: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default config;
