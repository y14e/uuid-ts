/**
 * uuid.ts
 *
 * @version 1.0.7
 * @author Yusuke Kamiyamane
 * @license MIT
 * @copyright Copyright (c) Yusuke Kamiyamane
 * @see {@link https://github.com/y14e/uuid-ts}
 */

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const UUID_TEMPLATE = '10000000-1000-4000-8000-100000000000';
const UUID_RE = /[018]/g;

// -----------------------------------------------------------------------------
// APIs
// -----------------------------------------------------------------------------

export function generateUUID(): string {
  const { getRandomValues, randomUUID } = crypto;

  if (typeof randomUUID === 'function') {
    return randomUUID();
  }

  function replacer(match: string): string {
    const random =
      getRandomValues(new Uint8Array(1))[0] ?? Math.floor(Math.random() * 256);
    return (match === '8' ? (random & 0x03) | 0x08 : random & 0x0f).toString(
      16,
    );
  }

  return UUID_TEMPLATE.replace(UUID_RE, replacer);
}
