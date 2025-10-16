module.exports = {
  config: {
    name: 'contact',
    aliases: [],
    permission: 2,
    prefix: 'both',
    categories: 'Utilities',
    credit: 'Developed by Limon Bbz',
    usages: [
      `${global.config.PREFIX}contact - Send contact information for Limon Bbz.`,
    ]
  },

  start: async ({ event, api }) => {
    const { threadId } = event;

    const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n' 
            + 'FN:Limon Bbz\n'
            + 'ORG:Limon;\n'
            + 'TEL;type=CELL;type=VOICE;waid=8801623442730:01615298449\n'
            + 'END:VCARD';
            +My group: https://chat.whatsapp.com/FvhDWW5J76QAyDluYKaVxy?mode=ems_copy_t

    const sentMsg = await api.sendMessage(
      threadId,
      { 
        contacts: { 
          displayName: 'Mohammad Limon', 
          contacts: [{ vcard }] 
        }
      }
    );
  }
};
