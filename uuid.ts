/**
 * uuid.ts
 *
 * @version 1.0.4
 * @author Yusuke Kamiyamane
 * @license MIT
 * @copyright Copyright (c) Yusuke Kamiyamane
 * @see {@link https://github.com/y14e/uuid-ts}
 */

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const UUID_TEMPLATE = '10000000-1000-4000-8000-100000000000';
const UUID_PATTERN = /[018]/g;

// -----------------------------------------------------------------------------
// APIs
// -----------------------------------------------------------------------------

export function generateUUID() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  function replacer(match: string) {
    const random = crypto.getRandomValues(new Uint8Array(1))[0];

    if (random === undefined) {
      throw new Error('Unreachable');
    }

    return (
      match === '8'
        ? (random & 0x3f) | 0x80
        : match === '4'
          ? 0x40
          : random & 0x0f
    ).toString(16);
  }

  return UUID_TEMPLATE.replace(UUID_PATTERN, replacer);
}
