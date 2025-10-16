module.exports = {
  event: 'remove',
  handle: async ({ api, event }) => {
    const removedMembers = event.participants;
    for (const member of removedMembers) {
      await api.sendMessage(event.id, {
        text: `Goodbye @${member.split('@')[0]},🦋- কিছু মানুষ পেয়েও “হারিয়ে” ফেলে!😅
– আর কিছু মানুষ পাবে না জেনেও অপেক্ষা করে,,,, 😮‍💨😇 we'll miss you!`,
        mentions: [member]
      });
    }
  }
};
