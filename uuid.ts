/**
 * uuid.ts
 *
 * @version 1.0.0
 * @author Yusuke Kamiyamane
 * @license MIT
 * @copyright Copyright (c) 2026 Yusuke Kamiyamane
 * @see {@link https://github.com/y14e/uuid-ts}
 */

// =============================================================================
// Constants
// =============================================================================

const UUID_TEMPLATE = '10000000-1000-4000-8000-100000000000';
const UUID_PATTERN = /[018]/g;

// =============================================================================
// APIs
// =============================================================================

const seed = new Uint32Array(1);

export function generateUUID(): string {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return UUID_TEMPLATE.replace(UUID_PATTERN, (char) => {
    crypto.getRandomValues(seed);
    const number = char.charCodeAt(0) - 48;
    const random = seed[0];

    if (random === undefined) {
      throw new Error('Unreachable');
    }

    return (number ^ (random & (15 >> (number / 4)))).toString(16);
  });
}
