'use strict';

var token = '330844015:AAHwmV2429xiAd95EmpaVWecEz3AYERb02Q';

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

console.log('bot server started...');

bot.onText(/^(.+)$/, function (msg, match) {
    console.log('bot on text');
    var name = match[1];
    bot.sendMessage(msg.chat.id, 'You said: ' + name + '!').then(function () {
        // reply sent!
    });
});

bot.onText(/^\/say_hello$/, function (msg, match) {
    console.log('bot on say_hello$');
    bot.sendMessage(msg.chat.id, 'Hello dear friend!!!').then(function () {
        // reply sent!
    });
});
