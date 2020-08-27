export const dir = (path: string): string => (path.endsWith('/') ? path.slice(0, -1) : path);
