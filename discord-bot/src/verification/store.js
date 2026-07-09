import Database from 'better-sqlite3';
import { config } from '../config.js';

const db = new Database(config.databasePath);

db.exec(`
  CREATE TABLE IF NOT EXISTS verifications (
    discord_id TEXT PRIMARY KEY,
    reddit_username TEXT NOT NULL,
    total_karma INTEGER NOT NULL,
    comment_karma INTEGER NOT NULL,
    account_age_days INTEGER NOT NULL,
    passed INTEGER NOT NULL,
    verified_at TEXT NOT NULL
  )
`);

const upsertStmt = db.prepare(`
  INSERT INTO verifications (discord_id, reddit_username, total_karma, comment_karma, account_age_days, passed, verified_at)
  VALUES (@discordId, @redditUsername, @totalKarma, @commentKarma, @accountAgeDays, @passed, @verifiedAt)
  ON CONFLICT(discord_id) DO UPDATE SET
    reddit_username = excluded.reddit_username,
    total_karma = excluded.total_karma,
    comment_karma = excluded.comment_karma,
    account_age_days = excluded.account_age_days,
    passed = excluded.passed,
    verified_at = excluded.verified_at
`);

const getStmt = db.prepare('SELECT * FROM verifications WHERE discord_id = ?');

export function saveVerification({ discordId, redditUsername, totalKarma, commentKarma, accountAgeDays, passed }) {
  upsertStmt.run({
    discordId,
    redditUsername,
    totalKarma,
    commentKarma,
    accountAgeDays,
    passed: passed ? 1 : 0,
    verifiedAt: new Date().toISOString(),
  });
}

export function getVerification(discordId) {
  const row = getStmt.get(discordId);
  if (!row) return null;
  return { ...row, passed: Boolean(row.passed) };
}
