const basePath = process.env.NODE_ENV === 'production' ? '/Personal-Portfolio' : '';

export function getAssetPath(path: string): string {
  return `${basePath}${path}`;
}

export default basePath;
