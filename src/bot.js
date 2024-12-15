const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token
const token = 'YOUR_BOT_TOKEN';

// Create a bot that uses polling
const bot = new TelegramBot(token, { polling: true });

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