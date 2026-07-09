import express from 'express';
import { config } from '../config.js';
import { verifyState } from './state.js';
import { exchangeCodeForToken, fetchIdentity, evaluateProfile } from './reddit.js';
import { saveVerification } from './store.js';
import { renderResultPage } from './resultPage.js';

async function assignVerifiedRole(client, guildId, discordId) {
  const guild = await client.guilds.fetch(guildId);
  const member = await guild.members.fetch(discordId);
  await member.roles.add(config.verifiedRoleId);
}

export function createVerificationServer(client) {
  const app = express();

  app.get('/reddit/callback', async (req, res) => {
    const { code, state, error } = req.query;

    if (error) {
      res.status(400).send(renderResultPage({ success: false, message: `Reddit denied the authorization request: ${error}` }));
      return;
    }

    const statePayload = verifyState(state);
    if (!statePayload || !code) {
      res
        .status(400)
        .send(renderResultPage({ success: false, message: 'This verification link is invalid or has expired. Run /verify again in Discord.' }));
      return;
    }

    try {
      const tokenData = await exchangeCodeForToken(code);
      const profile = await fetchIdentity(tokenData.access_token);
      const evalResult = evaluateProfile(profile);

      saveVerification({ discordId: statePayload.discordId, ...evalResult });

      if (evalResult.passed) {
        await assignVerifiedRole(client, statePayload.guildId, statePayload.discordId);
      }

      res.send(
        renderResultPage({
          success: evalResult.passed,
          evalResult: {
            ...evalResult,
            minTotalKarma: config.minTotalKarma,
            minCommentKarma: config.minCommentKarma,
            minAccountAgeDays: config.minAccountAgeDays,
          },
        }),
      );
    } catch (err) {
      console.error('Reddit verification failed:', err);
      res.status(500).send(renderResultPage({ success: false, message: 'Something went wrong verifying your Reddit account. Please try again from Discord.' }));
    }
  });

  return app;
}
