export function generateUUID() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const uuid = URL.createObjectURL(new Blob()).slice(-36);
  URL.revokeObjectURL(uuid);
  return uuid;
}
