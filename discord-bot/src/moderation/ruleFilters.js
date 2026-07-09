const BANNED_WORDS = [
  // Add slurs / banned terms here. Kept empty by default — fill in per your community's rules.
];

const INVITE_LINK_PATTERN = /(discord\.gg|discord(?:app)?\.com\/invite)\/\S+/i;
const MASS_MENTION_THRESHOLD = 5;

const recentMessagesByUser = new Map();
const SPAM_WINDOW_MS = 7000;
const SPAM_MESSAGE_THRESHOLD = 5;

function containsBannedWord(content) {
  const lower = content.toLowerCase();
  return BANNED_WORDS.some((word) => lower.includes(word));
}

function isInviteLinkSpam(content) {
  return INVITE_LINK_PATTERN.test(content);
}

function isMassMention(message) {
  return message.mentions.users.size + message.mentions.roles.size >= MASS_MENTION_THRESHOLD;
}

function isRapidSpam(userId) {
  const now = Date.now();
  const timestamps = (recentMessagesByUser.get(userId) || []).filter(
    (ts) => now - ts < SPAM_WINDOW_MS,
  );
  timestamps.push(now);
  recentMessagesByUser.set(userId, timestamps);
  return timestamps.length >= SPAM_MESSAGE_THRESHOLD;
}

/**
 * Fast, deterministic checks that don't require an API call. Returns a verdict
 * object right away for clear-cut violations, or null when the message needs
 * the slower AI review for a nuanced judgment call.
 */
export function runRuleFilters(message) {
  const content = message.content || '';

  if (containsBannedWord(content)) {
    return { action: 'delete', reason: 'Banned word detected', source: 'rules' };
  }

  if (isInviteLinkSpam(content)) {
    return { action: 'delete', reason: 'Unsolicited Discord invite link', source: 'rules' };
  }

  if (isMassMention(message)) {
    return { action: 'delete', reason: 'Mass mention spam', source: 'rules' };
  }

  if (isRapidSpam(message.author.id)) {
    return { action: 'timeout', reason: 'Message rate limit exceeded', source: 'rules' };
  }

  return null;
}
