import { spawnSync } from 'node:child_process';

const repoName = process.argv[2] || process.env.DAR_REPO_NAME || 'dar-motors';
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

console.log(`Building GitHub Pages export for repository: ${repoName}`);

const result = spawnSync(npmCommand, ['run', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    DAR_GITHUB_PAGES: 'true',
    DAR_REPO_NAME: repoName,
  },
});

process.exit(result.status ?? 1);
