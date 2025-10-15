module.exports = {
  event: 'add',
  handle: async ({ api, event }) => {
    const newMembers = event.participants;
    const groupInfo = await api.groupMetadata(event.id);
    const groupName = groupInfo.subject;
    const totalMembers = groupInfo.participants.length;

    for (const member of newMembers) {
      let profilePicUrl;
      try {
        profilePicUrl = await api.profilePictureUrl(member, 'image');
      } catch (error) {
        profilePicUrl = null;
      }

      const username = `@${member.split('@')[0]}`;
      const welcomeMessage = `🎉✨ *Hey ${username}, Welcome to ${groupName}!* ✨🎉\n\n` +
        `😌___তোমাকে আমি আমার বুকে বেঁধে রাখবো 

একদিন এই বাড়িতে নিজের করে আনবো-->>💝

⭐~~তারার মতো আমার আকাশে ভোরে আছো

কি করে বোঝায় তুমি আমার মনের কত গভীরে আছো__//☺️😅 

😇...Limon...✍️!\n` +
        `👥 *Total Members:* ${totalMembers}\n` +
        `📢 *Rules:* ${rules}\n` + Be respectful, stay active & enjoy!`;

      if (profilePicUrl) {
        await api.sendMessage(event.id, {
          image: { url: profilePicUrl },
          caption: welcomeMessage,
          mentions: [member]
        });
      } else {
        await api.sendMessage(event.id, {
          text: welcomeMessage,
          mentions: [member]
        });
      }
    }
  }
};
