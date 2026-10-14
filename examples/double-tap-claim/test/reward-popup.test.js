import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRewardPopup } from '../src/reward-popup.js';

test('a double tap on Claim grants the daily reward once', async () => {
  let grants = 0;
  const api = { grantDailyReward: async () => { grants++; await new Promise((r) => setTimeout(r, 50)); return { amount: 100 }; } };
  const popup = createRewardPopup(api);
  await Promise.all([popup.onClaimTap(), popup.onClaimTap()]); // second tap lands while the first request is pending
  assert.equal(grants, 1);
  assert.equal(popup.claimed, 100);
});
