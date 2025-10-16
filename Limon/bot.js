const axios = require("axios");

module.exports = {
  config: {
    name: "bot",
    aliases: ["sim"],
    permission: 0,
    prefix: "both",
    categorie: "AI Chat",
    cooldowns: 5,
    credit: "Developed by Limon Bbz",
    usages: [
      `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,
      `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,
    ],
    description: "Engage in conversations with an AI-powered bot!",
  },

  start: async function ({ api, event, args }) {
    const { threadId, message, senderId } = event;
    const usermsg = args.join(" ");

    
    if (!usermsg) {
      const greetings = [
  "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇",
  "প্রপোজ করতে পারো, আমিও তোমাকে পছন্দ করি! 😒  ",
  "Ami পড়ে গেছি Tomar প্রেমে Babu😘",
  "I Love You 😻🙈Ummmmma😘😘 ৬ তানি করলাম 🐸🤣  ",
  "তোরে আমার ভাল্লাগছে 😘",
  "যদি propos করি 😁
তাহলে কি Accept করবা?🙈",
  "আমাকে এতো না ডেকে বস লিমনকে একটা গফ দে 🙄",
  "প্রেমে পড়ে গেলে পাশে থাকুন মনে জায়গা নেই 😁",
  "___একটা মন দাও, ছিনি’মি’নি খে’লবো🥺🐸",
  "মানুষ মুগ্ধ হয় Face দেখে 🙈 আমি,,, মুগ্ধ হয়েছি Tor মায়াই __//😅",
  "আমি ডিম You আন্ডা..🥚🐸⇀ইনবক্সে Aso বাহিরে অনেক ঠান্ডা…!🐸🥶",
  "ডাকতে ডাকতে যদি প্রেমে পড়ে যান, দায় আমি নেব না ❤️",
  "ইয়ে মানে একটা কথা কইতাম🙂 Whatsapp থেকে আপনাদের বাড়ি কত দূর.....😁",
  "জান আমার Limon Boss তোমাকে অনেক ভালোবাসে 😌",
  "🙄চায়া থাকোস কেন Ki কবি ক 🥴Tui কইলেই তো আমি কমূ হ 😐😂🥱",
  "যদি Karo সাথে খারাপ আচরণ করে থাকি তাহলে🙂i Love You 😘",
  "তুমি কি আমার লিমন বসকে ভালোবাসো"
];

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

      const greetingMessage = await api.sendMessage(threadId, {
        text: `@${senderId.split('@')[0]}, ${randomGreeting}`,
        mentions: [senderId],
      }, { quoted: message });

      
      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: greetingMessage.key.id,
        type: "chat"
      });

      return;
    }

    
    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Limon/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}`
      );

      const replyText = response.data.data?.msg || "🤖 I'm not sure how to respond to that.";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ Bot command error:", err);
      return api.sendMessage(threadId, { text: "❌ Something went wrong while talking with bot." }, { quoted: message });
    }
  },


  handleReply: async function ({ api, event, handleReply }) {
    
    const { threadId, message, body, senderId } = event;

    try {
      const apis = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Limon/main/api.json");
      const apiss = apis.data.api;

      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}`
      );

      const replyText = response.data.data?.msg || "🤖 I'm not sure how to respond to that.";

      const sent = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      global.client.handleReply.push({
        name: this.config.name,
        author: senderId,
        messageID: sent.key.id,
        type: "chat"
      });

    } catch (err) {
      console.error("❌ Error in bot handleReply:", err);
      return api.sendMessage(threadId, { text: "❌ Failed to continue conversation." }, { quoted: message });
    }
  }
};
