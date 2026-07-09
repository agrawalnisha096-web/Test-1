import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config.js';

const anthropic = config.anthropicApiKey ? new Anthropic({ apiKey: config.anthropicApiKey }) : null;

const SYSTEM_PROMPT = `You are a Discord community moderator assistant. You will be shown a single message
from a community channel. Decide whether it violates typical community guidelines
(harassment, hate speech, sexual content involving minors, threats, doxxing, scams/phishing,
severe spam, or targeted bullying). Minor rudeness, disagreement, or borderline jokes are
allowed and should not be actioned.

Respond with ONLY a JSON object, no other text, in this exact shape:
{"violates": boolean, "severity": "none" | "low" | "medium" | "high", "action": "ignore" | "delete" | "warn" | "timeout" | "ban", "reason": "short explanation"}`;

/**
 * Sends a message to Claude for a nuanced moderation judgment call.
 * Only invoked for messages that pass the fast rule-based filters, to keep
 * API usage limited to genuinely ambiguous cases.
 */
export async function classifyWithClaude(message) {
  if (!anthropic) {
    return null;
  }

  const content = message.content?.slice(0, 2000) || '';
  if (!content.trim()) {
    return null;
  }

  try {
    const response = await anthropic.messages.create({
      model: config.claudeModel,
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content }],
    });

    const text = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('');

    const parsed = JSON.parse(text);
    return {
      action: parsed.action || 'ignore',
      reason: parsed.reason || 'Claude moderation review',
      severity: parsed.severity || 'none',
      source: 'claude',
    };
  } catch (error) {
    console.error('Claude moderation call failed:', error.message);
    return null;
  }
}

export const isAiModerationEnabled = Boolean(anthropic);
