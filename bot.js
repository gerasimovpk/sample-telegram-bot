'use strict';

var token = '330844015:AAHwmV2429xiAd95EmpaVWecEz3AYERb02Q';

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

var interval;

console.log('bot server started...');

// bot.onText(/^(.+)$/, function (msg, match) {
//     console.log('bot on text');
//     var name = match[1];
//     bot.sendMessage(msg.chat.id, 'You said: ' + name + '!').then(function () {
//         // reply sent!
//     });
// });

bot.onText(/^\/say_hello$/, function (msg, match) {
    console.log('bot on say_hello$');
    bot.sendMessage(msg.chat.id, 'Hello dear friend!!!').then(function () {
        // reply sent!
    });
});
bot.onText(/^\/send_cake$/, function (msg, match) {
    console.log('bot on send_cake$');
    bot.sendPhoto(msg.chat.id, 'https://pp.userapi.com/c837328/v837328893/12b0a/_Lp_Tt3-Zxk.jpg', {caption: 'Крутой торт, заказывай! /want_it'});
});
bot.onText(/^\/want_it/, function (msg, match) {
    bot.sendMessage(msg.chat.id, 'Супер,' + msg.user_id.first_name + ', я перезвоню тебе!').then(function () {
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
