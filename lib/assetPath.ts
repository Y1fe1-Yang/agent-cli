export const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const asset = (path: string) => `${bp}${path}`;
