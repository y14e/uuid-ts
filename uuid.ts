export function generateUUID(): string {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  const url = URL.createObjectURL(new Blob());
  const id = url.slice(-36);

  URL.revokeObjectURL(url);

  return id;
}
