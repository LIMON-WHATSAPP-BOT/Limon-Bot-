module.exports = {
    config: {
        name: 'tagall',
        aliases: ['all', 'mentionall'],
        permission: 3,
        prefix: false,
        description: 'Mentions all members of a group with stylish greetings.',
        categories: 'group',
        usages: [`${global.config.PREFIX}tagall [optional message]`],
        credit: 'Developed by Limon Bbz',
    },

    start: async ({ event, api, args }) => {
        const { threadId, senderI, message } = event;

        const groupMetadata = await api.groupMetadata(threadId);
        const participants = groupMetadata.participants || [];

        if (participants.length === 0) {
            return await api.sendMessage(threadId, { text: '⚠️ No participants found in this group.' });
        }

        
        const greetings = [
            "👋 Hey তোমরা সবাই কই আমার লিমন বস তোমাদেরকে ডাকে😘",
            "🌟 Hello আমার বউ গুলা কই গো তাড়াতাড়ি আসো🥴",
            "😎 Yo সবাই চিপা থেকে বের হয়ে আসো🙆 ",
            "🎉 Hi কইরে চিপা খোরেরা বাইরে আয় জলদি😑",
            "💖 Jan তুমার জামাই তোমারে ডাকতাছে গো😍",
            "🔥 Koi গেলি রে তোরা গ্রুপ ছাইড়া😓",
            "🥳 all তোমরা আমাকে একা রেখে কোথায় চলে যাও🥺",
            "😇 smiling যে কথা বলবি না তার বিয়ে হইবো না দেখিস😌",
            "⚡ Attention everyone!",
            "🌈 Limon বস তোমাদেরকে অনেক ভালোবাসে তাই বার বার ডাকে বুজছো"
        ];

        let customMsg = args.join(' ');
        if (!customMsg) {
            
            customMsg = greetings[Math.floor(Math.random() * greetings.length)];
        }

        
        let mentionText = `✨ *${customMsg}* ✨\n\n`;
        let mentions = [];

        participants.forEach((participant, index) => {
            mentionText += `🔹",✨",🌀",♻️",🎭 ${index + 1}. @${participant.id.split('@')[0]}\n`;
            mentions.push(participant.id);
        });

        mentionText += `\n💌 Have a great day, everyone!`;

        
        await api.sendMessage(threadId, {
            text: mentionText,
            mentions: mentions
        }, { quoted: message });
    }
};
