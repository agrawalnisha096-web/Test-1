import crypto from 'node:crypto';
import { config } from '../config.js';

const STATE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function sign(payloadB64) {
  return crypto.createHmac('sha256', config.sessionSecret).update(payloadB64).digest('base64url');
}

/**
 * Signs a stateless CSRF token embedding who's verifying and where, so the
 * callback doesn't need a server-side session store and scales across
 * multiple concurrent verifications (or instances) without shared state.
 */
export function signState({ discordId, guildId }) {
  const payload = { d: discordId, g: guildId, t: Date.now(), n: crypto.randomBytes(8).toString('hex') };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(payloadB64);
  return `${payloadB64}.${signature}`;
}

export function verifyState(state) {
  if (!state || typeof state !== 'string' || !state.includes('.')) return null;

  const [payloadB64, signature] = state.split('.');
  const expected = sign(payloadB64);

  const sigBuffer = Buffer.from(signature || '');
  const expectedBuffer = Buffer.from(expected);
  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return null;
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
  } catch {
    return null;
  }

  if (Date.now() - payload.t > STATE_TTL_MS) return null;

  return { discordId: payload.d, guildId: payload.g };
}
