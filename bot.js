'use strict';

var token = '330844015:AAHwmV2429xiAd95EmpaVWecEz3AYERb02Q';

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

var interval;

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

bot.onText(/^\/subscribe$/, function (msg, match) {
    console.log('bot on subscribe');
    bot.sendMessage(msg.chat.id, 'OK!').then(function () {
        interval = setInterval(()=>{
                bot.sendMessage(msg.chat.id, 'Current time: '+ new Date().toDateString())
        }, 5000);
    });

});

bot.onText(/^\/cancel$/, function (msg, match) {
    console.log('bot on cancel');
    bot.sendMessage(msg.chat.id, 'OK!').then(function () {
        clearInterval(interval);
    });

});
