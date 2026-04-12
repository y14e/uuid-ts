const seed = new Uint32Array(1);

export function generateUUID(): string {
  return (
    crypto.randomUUID?.() ??
    '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (char) => {
      crypto.getRandomValues(seed);

      const number = parseInt(char, 10);

      return (number ^ (seed[0] & (15 >> (number / 4)))).toString(16);
    })
  );
}
