/**
 * uuid.ts
 *
 * @version 1.0.8
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

  const { floor, random } = Math;

  function replacer(match: string): string {
    const r = getRandomValues(new Uint8Array(1))[0] ?? floor(random() * 256);
    return (match === '8' ? (r & 0x03) | 0x08 : r & 0x0f).toString(16);
  }

  return UUID_TEMPLATE.replace(UUID_RE, replacer);
}
