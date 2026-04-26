const UUID_TEMPLATE = '10000000-1000-4000-8000-100000000000';
const UUID_PATTERN = /[018]/g;

export function generateUUID(): string {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return UUID_TEMPLATE.replace(UUID_PATTERN, fallback);
}

const seed = new Uint32Array(1);

function fallback(char: string) {
  crypto.getRandomValues(seed);
  const number = char.charCodeAt(0) - 48;
  const random = seed[0];

  if (random === undefined) {
    throw new Error('Unreachable');
  }

  return (number ^ (random & (15 >> (number / 4)))).toString(16);
}
