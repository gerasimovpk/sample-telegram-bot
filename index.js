var express = require('express');
var app = express();

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '330844015:AAHwmV2429xiAd95EmpaVWecEz3AYERb02Q';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) = > {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
})
;

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) = > {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
    })
;


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
    response.render('pages/index');
});

app.get('/api/v1/sample', function (request, response) {
    response.json({message: 'hooray! welcome to our api!'});
});
app.get('/api/v1/sample2', function (request, response) {
    response.json({message: apiSample.getSampleHelloWorld()});
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


