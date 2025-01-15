const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token
const token = '7398510838:AAEGIsugBsWjHPn-NaGys6-fdbd_ST4lWIs';// checkout my article on how to get bot token from @BotFather on Telegram

const WEB_HOOK_URL = 'https://localhost:3000/telegram-bot-webhook'; // we need ngrok cause telegram webhook won't work with localhost.

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

module.exports = bot;