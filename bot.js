'use strict';


var db = require('./db');

var token = '330844015:AAHwmV2429xiAd95EmpaVWecEz3AYERb02Q';

const util = require('util');

var Bot = require('node-telegram-bot-api'),
    bot = new Bot(token, {polling: true});

var interval;

console.log('bot server started...');

bot.onText(/^\/echo (.+)$/, (msg, match) => {
    bot.sendMessage(msg.chat.id, 'You said ' + match[1])
})
;

bot.onText(/^(.+)$/, function (msg, match) {
    if (match[1] == "/clear_logs")
        return
    db.addLog({
        name: msg.from.first_name,
        id: msg.from.id
    }, {
        chat_id: msg.chat.id,
        id: msg.message_id,
        text: match[1]
    })
    //bot.sendMessage(msg.chat.id, 'Logged successfully!')
});
bot.onText(/^\/get_logs$/, function (msg, match) {
    db.getLogs((res) => {
        res
        .sort((a, b) => new Date(a.timestamp).getTime() > new Date(b.timestamp).getTime()
    )
    .
    map((el, idx) => {
        //bot.sendMessage(msg.chat.id, 'Current element: ' + JSON.stringify(el))
        console.log(el.message.text);
    setTimeout(() => bot.forwardMessage(msg.chat.id, el.message.chat_id, el.message.id), idx * 100
    )
})
})
    ;
});
bot.onText(/^\/clear_logs$/, function (msg, match) {
    db.clearLogs((res) => {
        bot.sendMessage(msg.chat.id, 'Cleared successfully!')
})
    ;
});

bot.onText(/^\/share_contact/, function (msg, match) {
    //reply_markup = telegram.ReplyKeyboardMarkup([[telegram.KeyboardButton('Share contact', request_contact=True)]])
    //bot.sendMessage(CHAT_ID, 'Example', reply_markup=reply_markup)

    var option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "My phone number",
                request_contact: true
            }], ["Cancel"]]
        }
    };
    bot.sendMessage(msg.chat.id, "How can we contact you?", option).then(() => {
        bot.once("contact",(msg)=>{
            var option = {
                "parse_mode": "Markdown",
                "reply_markup": {
                    "one_time_keyboard": true,
                    "keyboard": [[{
                        text: "My location",
                        request_location: true
                    }], ["Cancel"]]
                }
            };
            bot.sendMessage(msg.chat.id,
                            util.format('Thank you %s with phone %s! And where are you?', msg.contact.first_name, msg.contact.phone_number),
                            option)
            .then(() => {
                bot.once("location",(msg)=>{
                    bot.sendMessage(msg.chat.id, "We will deliver you order to " + [msg.location.longitude,msg.location.latitude].join(";"));
                })
            })
        })
    })

});


/*


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
 //reply_markup = telegram.ReplyKeyboardMarkup([[telegram.KeyboardButton('Share contact', request_contact=True)]])
 //bot.sendMessage(CHAT_ID, 'Example', reply_markup=reply_markup)




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

 */