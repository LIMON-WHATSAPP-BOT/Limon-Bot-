const os = require('os');

module.exports = {
  config: {
    name: 'info',
    aliases: ['about', 'admininfo', 'serverinfo'],
    permission: 0,
    prefix: 'both',
    categorie: 'Utilities',
    credit: 'Developed by Limon Bbz'',
    usages: [`${global.config.PREFIX}info - Show admin and server information.`],
  },
  start: async ({ event, api, message }) => {
    try {
      const uptimeSeconds = process.uptime();
      const uptime = new Date(uptimeSeconds * 1000).toISOString().substr(11, 8);

      const adminListText =
        global.config.admin.length > 0
          ? global.config.admin
              .map((id, i) => `${i + 1}. @${id.split('@')[0]}`)
              .join('\n')
          : 'No admins found.';

      const infoMessage = `
--------------------------------------------
𝐍𝐚𝐦𝐞           : 𝐋𝐢𝐦𝐨𝐧
𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤       : 𝐋𝐢𝐦𝐨𝐧 𝐁𝐛𝐳 
𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧       : 𝐒𝐡𝐞𝐢𝐤𝐡
𝐏𝐞𝐫𝐦𝐚𝐧𝐞𝐧𝐭 𝐀𝐝𝐝𝐫𝐞𝐬𝐬: 𝐓𝐚𝐧𝐠𝐚𝐢𝐥, 𝐃𝐡𝐚𝐤𝐚
𝐂𝐮𝐫𝐫𝐞𝐧𝐭 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 : 𝐑𝐚𝐦𝐚𝐢𝐥 , 𝐃𝐡𝐚𝐤𝐚 
𝐆𝐞𝐧𝐝𝐞𝐫       : 𝐌𝐚𝐥𝐞
𝐀𝐠𝐞           : 𝟏𝟓+
𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 : 𝐒𝐢𝐧𝐠𝐥𝐞
𝐖𝐨𝐫𝐤         : 𝐍𝐨 𝐖𝐨𝐫𝐤 
𝐆𝐦𝐚𝐢𝐥       : 𝐦𝐥𝐬𝐥𝐢𝐦𝐨𝐧𝟗𝟒𝟕@𝐠𝐦𝐚𝐢𝐥.𝐜𝐨𝐦
𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩   : 𝐰𝐚.𝐦𝐞/+𝟖𝟖𝟎𝟏𝟔𝟐𝟑𝟒𝟒𝟐𝟕𝟑𝟎
𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦     : 𝐭.𝐦𝐞/@𝐥𝐢𝐦𝐨𝐧_𝐛𝐛𝐳
𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤: 𝐡𝐭𝐭𝐩𝐬://𝐰𝐰𝐰.𝐟𝐚𝐜𝐞𝐛𝐨𝐨𝐤.𝐜𝐨𝐦/𝐰𝐰𝐰.𝐱𝐧𝐱𝐱.𝐜𝐨𝐦𝟏𝟔𝟗
𝐓𝐢𝐤𝐓𝐨𝐤.       : 𝐥𝐢𝐦𝐨𝐧_𝐛𝐛𝐳
--------------------------------------------
\`\`\`
🖥️ Server Info:
• Platform       : ${os.platform()}
• CPU            : ${os.cpus()[0].model}
• Node.js Version: ${process.version}
• Uptime         : ${uptime}
• Total Memory   : ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB
• Free Memory    : ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB
• Bot Name.          :Limon Bot 
\`\`\``;

      await api.sendMessage(
            event.threadId,
            { image: { url: "https://i.postimg.cc/2y9bTqv6/retouch-175833312474.jpg" }, caption: infoMessage || '' },
            { quoted: event.message }
          );;
    } catch (error) {
      console.error(error);
      await api.sendMessage(event.threadId, '❌ An error occurred while fetching info.', { quoted: event.message });
    }
  },
};
