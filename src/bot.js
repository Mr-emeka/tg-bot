const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token
const token = 'YOUR_BOT_TOKEN';

const WEB_HOOK_URL = 'Your webhook url';

// Create a bot that uses polling
const bot = new TelegramBot(token, { webHook: {
    port: 88 // 443, 80, 88, 8443 allowed ports for telegram webhook
} });


const initWebHook = async () => {
    const webhookInfo = await bot.getWebHookInfo();
    if (webhookInfo.url !== WEB_HOOK_URL) {
      await bot.setWebHook(WEB_HOOK_URL, {
        max_connections: 100,
      });
    }
  };
  
  initWebHook();

// Listen for any message
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Simple command handling
    if (msg.text.toLowerCase() === '/start') {
        bot.sendMessage(chatId, 'Welcome! How can I assist you today?', {reply_markup: {
            keyboard: [['/start', '/help']]
        }});
    } else if (msg.text.toLowerCase() === 'hello') {
        bot.sendMessage(chatId, `Hello, ${msg.from.first_name}!`);
    } else {
        bot.sendMessage(chatId, "I'm not sure how to respond to that.");
    }
});