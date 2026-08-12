export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function publicAsset(path: string): string {
  if (!path || path.startsWith('data:') || path.startsWith('blob:') || /^https?:\/\//.test(path)) {
    return path;
  }
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}
