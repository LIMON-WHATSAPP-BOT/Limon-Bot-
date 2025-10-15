module.exports = {
  event: 'demote',
  handle: async ({ api, event }) => {
    const demotedMembers = event.participants;
    console.log(event);
    for (const member of demotedMembers) {
      await api.sendMessage(event.id, {
        text: `🥹 @${member.split('@')[0]} তুমি এখন আর এডমিন নয় 🥲 has been demoted. Better luck next time!`,
        mentions: [member]
      });
    }
  }
};
