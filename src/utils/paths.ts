export default function resolveAsset(path: string) {
  if (!path) return '';

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL.replace(/^\/+|\/+$/g, '');
  const cleanPath = path.replace(/^\/+/, '');

  if (!cleanPath) {
    return base ? `/${base}/` : '/';
  }

  // Avoid accidentally adding the base twice.
  if (base && (cleanPath === base || cleanPath.startsWith(`${base}/`))) {
    return `/${cleanPath}`;
  }

  return base
    ? `/${base}/${cleanPath}`
    : `/${cleanPath}`;
}