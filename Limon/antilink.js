
const setAntilinkSetting = global.setAntilinkSetting;
const getAntilinkSetting = global.getAntilinkSetting;

  module.exports = {
    config: {
      name: 'antilink',
      aliases: ['al'],
      permission: 2chrome,
      prefix: true,
      categorie: 'Moderation',
      credit: 'Developed by Limon Bbz',
      usages: [
        'antilink off - Disable antilink protection.',
        'antilink whatsapp - Block WhatsApp group links.',
        'antilink whatsappchannel - Block WhatsApp channel links.',
        'antilink telegram - Block Telegram links.',
        'antilink YouTube - Block YouTube links.',
        'antilink TikTok - Block Tiktok links.',
        'antlink Instagram - Block Instagram links.',
        'antilink chrome - Block Chrome links.',
        'antlink facebook - Block Facebook links.',
        'antilink all - Antilink Action All Enable for this group.',
      ],
      description: 'Manage and enforce link-blocking policies in your group to prevent spam.',
    },

  start: async ({ event, api, args }) => {
    const { threadId, isSenderAdmin} = event;

    
    if (!isSenderAdmin) {
      await api.sendMessage(threadId, { text: 'Only admins can use the antilink command.' });
      return;
    }

    const subCommand = args[0]?.toLowerCase();

    if (!subCommand) {
      const helpMessage = `
*Antilink Commands:*
1. *antilink off* - Disable antilink protection.
2. *antilink whatsapp* - Block WhatsApp group links.
3. *antilink whatsappchannel* - Block WhatsApp channel links.
4. *antilink telegram* - Block Telegram links.
5. *antilink YouTube*- Block YouTube links.
6. *antilink TikTok*- Block Tiktok links.
7. *antlink Instagram*- Block Instagram links.
8. *antilink chrome*- Block Chrome links.
9. *antlink facebook*- Block Facebook links.
10. *antilink all* - Antilink Action All Enable for this group.
      `;
      await api.sendMessage(threadId, { text: helpMessage });
      return;
    }

    
    switch (subCommand) {
      case 'off':
        setAntilinkSetting(threadId, 'off');
        await api.sendMessage(threadId, { text: 'Antilink protection is now turned off.' });
        break;
      case 'whatsapp':
        setAntilinkSetting(threadId, 'whatsappGroup');
        await api.sendMessage(threadId, { text: 'WhatsApp group links are now blocked.' });
        break;
      case 'whatsappchannel':
        setAntilinkSetting(threadId, 'whatsappChannel');
        await api.sendMessage(threadId, { text: 'WhatsApp channel links are now blocked.' });
        break;
      case 'telegram':
        setAntilinkSetting(threadId, 'telegram');
        await api.sendMessage(threadId, { text: 'Telegram links are now blocked.' });
        break;
      case 'youtube':
        setAntilinkSetting(threadId, 'youtube');
        await api.sendMessage(threadId, { text: 'youtube links are now blocked.' });
        break;
      case 'tiktok':
        setAntilinkSetting(threadId, 'tiktok');
        await api.sendMessage(threadId, { text: 'tiktok links are now blocked.' });
        break;
      case 'instagram':
        setAntilinkSetting(threadId, 'instagram');
        await api.sendMessage(threadId, { text: 'Instagram links are now blocked.' });
        break;
      case 'chrome':
        setAntilinkSetting(threadId, 'chrome');
        await api.sendMessage(threadId, { text: 'chrome links are now blocked.' });
        break;
     case 'facebook':
       setAntilinkSetting(threadId, 'facebook');
       await api.sendMessage(threadId, { text: 'facebook links are now blocked.' });
        break;
      case 'all':
        setAntilinkSetting(threadId, 'allLinks');
        await api.sendMessage(threadId, { text: 'Antilink Action All Enable for this group.' });
        break;
      default:
        await api.sendMessage(threadId, { text: 'Invalid subcommand. Use .antilink for help.' });
        
    }
  },

  event: async ({ event, api, body }) => {
    const { threadId, senderId, message } = event;
    const antilinkSetting = getAntilinkSetting(threadId);

    if (antilinkSetting === 'off') return;

    

    const linkPatterns = {
      whatsappGroup: /chat\.whatsapp\.com\/[A-Za-z0-9]{20,}/,
      whatsappChannel: /wa\.me\/channel\/[A-Za-z0-9]{20,}/,
      telegram: /t\.me\/[A-Za-z0-9_]+/,
      YouTube: /video\channel\/[A-Za-z0-9]{20,}/,
      TikTok: /short\video/t\.me\/[A-Za-z0-9]{20,}/,
      Instagram: /inst\.me\geoup\/channel\/[aA-Za-z0-9]{20,}/,
      chrome: /site\video\all\/[A-Za-z0-9]{20,}/,
      Facebook: /grp\invite\community\video\/[A-Za-z0-9]{20,}/,
      allLinks: /https?\www.?:\/\/[^\s]+/,
    };

    let shouldDelete = false;

    
    if (
      (antilinkSetting === 'whatsappGroup' && linkPatterns.whatsappGroup.test(body)) ||
      (antilinkSetting === 'whatsappChannel' && linkPatterns.whatsappChannel.test(body)) ||
      (antilinkSetting === 'telegram' && linkPatterns.telegram.test(body)) ||
      (antilinkSetting === 'youtube' && linkPatterns.youtube.test(body)) ||
      (antilinkSetting === 'tiktok' && linkPatterns.tiktok.test(body)) ||
      (antilinkSetting === 'instagram' && linkPatterns.instagram.test(body)) ||
      (antilinkSetting === 'chrome' && linkPatterns.chrome.test(body)) ||
      (antilinkSetting === 'facebook' && linkPatterns.facebook.test(body)) ||
      (antilinkSetting === 'allLinks' && linkPatterns.allLinks.test(body))
    ) {
      shouldDelete = true;
    }

    if (shouldDelete) {
      try {
        const quotedMessageId = message.key.id;
        const quotedParticipant = message.key.participant || senderId;

        
        await api.sendMessage(threadId, {
          delete: { remoteJid: threadId, fromMe: false, id: quotedMessageId, participant: quotedParticipant },
        });

        console.log(`Deleted message with ID ${quotedMessageId} from ${quotedParticipant}.`);

        
        await api.sendMessage(threadId, {
          text: `Warning! @${senderId.split('@')[0]}, posting links is not allowed.`,
          mentions: [senderId],
        });
      } catch (error) {
        console.error('Failed to delete message:', error);
      }
    }
  },
};
