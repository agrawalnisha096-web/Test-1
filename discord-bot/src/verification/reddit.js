import { config } from '../config.js';

const TOKEN_URL = 'https://www.reddit.com/api/v1/access_token';
const IDENTITY_URL = 'https://oauth.reddit.com/api/v1/me';

export function buildAuthUrl(state) {
  const params = new URLSearchParams({
    client_id: config.redditClientId,
    response_type: 'code',
    state,
    redirect_uri: config.redditRedirectUri,
    duration: 'temporary', // one-time read, no refresh token issued or stored
    scope: 'identity',
  });
  return `https://www.reddit.com/api/v1/authorize?${params.toString()}`;
}

export async function exchangeCodeForToken(code) {
  const basicAuth = Buffer.from(`${config.redditClientId}:${config.redditClientSecret}`).toString('base64');

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': config.redditUserAgent,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.redditRedirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error(`Reddit token exchange failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

export async function fetchIdentity(accessToken) {
  const response = await fetch(IDENTITY_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': config.redditUserAgent,
    },
  });

  if (!response.ok) {
    throw new Error(`Reddit identity fetch failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

export function evaluateProfile(profile) {
  const accountAgeDays = (Date.now() / 1000 - profile.created_utc) / 86400;
  const totalKarma = profile.total_karma ?? (profile.link_karma || 0) + (profile.comment_karma || 0);
  const commentKarma = profile.comment_karma || 0;

  const meetsKarma = totalKarma >= config.minTotalKarma;
  const meetsCommentKarma = commentKarma >= config.minCommentKarma;
  const meetsAge = accountAgeDays >= config.minAccountAgeDays;

  return {
    redditUsername: profile.name,
    totalKarma,
    commentKarma,
    accountAgeDays: Math.floor(accountAgeDays),
    meetsKarma,
    meetsCommentKarma,
    meetsAge,
    passed: meetsKarma && meetsCommentKarma && meetsAge,
  };
}
