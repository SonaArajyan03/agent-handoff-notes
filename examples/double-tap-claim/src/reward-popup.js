// Daily reward popup: tapping Claim asks the server to grant today's reward.
export function createRewardPopup(api) {
  const popup = { claimed: 0, button: { disabled: false } };
  let pending = null;
  popup.onClaimTap = async () => {
    if (popup.button.disabled) return pending;
    popup.button.disabled = true; // lock before the request, not after it returns
    pending = api.grantDailyReward().then((reward) => { popup.claimed += reward.amount; });
    return pending;
  };
  return popup;
}
