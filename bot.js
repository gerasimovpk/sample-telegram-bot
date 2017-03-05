'use strict';



require('./db');

var token = '330844015:AAHwmV2429xiAd95EmpaVWecEz3AYERb02Q';

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, { polling: true });

var interval;

console.log('bot server started...');

bot.onText(/^(.+)$/, function (msg, match) {
    addLog({
        name: msg.from.first_name,
        msg.from.id
    }, match[1]})
    bot.sendMessage(msg.chat.id, 'Logged successfully!')
});

bot.onText(/^\/say_hello$/, function (msg, match) {
    console.log('bot on say_hello$');
    bot.sendMessage(msg.chat.id, 'Hello dear friend!!!').then(function () {
        // reply sent!
    });
});
bot.onText(/^\/get_logs$/, function (msg, match) {
    getLogs((res) => {
        bot.sendMessage(msg.chat.id, JSON.stringify(res));
    });
});
/*
bot.onText(/^\/send_cake$/, function (msg, match) {
    console.log('bot on send_cake$');
    bot.sendPhoto(msg.chat.id, 'https://pp.userapi.com/c837328/v837328893/12b0a/_Lp_Tt3-Zxk.jpg', {caption: 'Крутой торт, заказывай! /want_it'});
});
bot.onText(/^\/want_it/, function (msg, match) {
    //reply_markup = telegram.ReplyKeyboardMarkup([[telegram.KeyboardButton('Share contact', request_contact=True)]])
    //bot.sendMessage(CHAT_ID, 'Example', reply_markup=reply_markup)

    var option = {
        "parse_mode": "Markdown",
        "reply_markup": {  "keyboard": [[{
            text: "My phone number",
            request_contact: true
        }],[{
            text: "My location",
            request_location: true
        }],["Cancel"]]  }
    };
    bot.sendMessage(msg.chat.id, "Куда можно звонить?", option).then(function (reply) {
        //bot.getUpdates(msg.chat.id, JSON.stringify(reply));
    });


    bot.sendMessage(msg.chat.id, 'Супер,' + msg.from.first_name + ', я перезвоню тебе!').then(function () {
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
*/
});
