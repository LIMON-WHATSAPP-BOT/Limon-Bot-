// dont change any line this file

module.exports = {
  config: {
    name: "allbots",
    aliases: ["bots", "mybots", "links"],
    permission: 0,
    prefix: true,
    description: "Send all my bot links and tutorials",
    categories: "Utility",
    usages: [".allbots"],
    credit: "Developed by Limon Bbz"
  },

  start: async ({ api, event }) => {
    const { threadId, message } = event;

    const myNumber = "8801623442730";
    const msg = `🌟 *LIMON BOT COLLECTION* 🌟

📱 *WhatsApp Bot*
Link: https://github.com/MOHAMMAD-NAYAN-07/NAYAN-WHATSAPP-BOT
Tutorial: https://youtu.be/hrO_v3z-Lq8

💬 *Messenger Bot*
Link: https://github.com/MOHAMMAD-NAYAN-07/Nayan-Bot
Tutorial: https://youtu.be/DrQw3j56Llk

🤖 *Telegram Bot*
Link: https://github.com/MOHAMMAD-NAYAN-07/NAYAN-TELEGRAM-BOT
Tutorial: https://youtu.be/FyjUL6MwaXs

🛠️ *Support Group*
Link: https://chat.whatsapp.com/FvhDWW5J76QAyDluYKaVxy?mode=ems_copy_t

📞 *Contact Me*: +${myNumber}`;

    await api.sendMessage(threadId, { text: msg }, { quoted: message });
  }
};
