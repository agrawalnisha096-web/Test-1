import { runRuleFilters } from './ruleFilters.js';
import { classifyWithClaude } from './aiModeration.js';
import { logModerationAction } from './modLog.js';

const TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

async function applyAction(message, verdict) {
  const { action, reason, source } = verdict;

  if (action === 'delete' || action === 'warn') {
    await message.delete().catch(() => {});
  }

  if (action === 'timeout') {
    await message.delete().catch(() => {});
    await message.member?.timeout(TIMEOUT_MS, reason).catch(() => {});
  }

  if (action === 'ban') {
    await message.member?.ban({ reason }).catch(() => {});
  }

  if (action !== 'ignore') {
    await logModerationAction(message.client, {
      user: message.author,
      action,
      reason,
      source,
      messageContent: message.content,
    });
  }
}

/**
 * Runs fast rule-based filters first; only calls out to Claude for messages
 * that pass the rules but might still need a nuanced judgment call.
 */
export async function moderateMessage(message) {
  if (message.author.bot) return;

  const ruleVerdict = runRuleFilters(message);
  if (ruleVerdict) {
    await applyAction(message, ruleVerdict);
    return;
  }

  const aiVerdict = await classifyWithClaude(message);
  if (aiVerdict && aiVerdict.action !== 'ignore') {
    await applyAction(message, aiVerdict);
  }
}
