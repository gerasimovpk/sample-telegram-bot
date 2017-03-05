var mongoose = require("mongoose");

var uristring =
    process.env.MONGODB_URI;

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});

var messageSchema = new mongoose.Schema({
    user: {
        name: String,
        id: Number
    },
    message: String,
    timestamp: String
});

var Message = mongoose.model('Messages', messageSchema);
return module.exports = {

    getLogs(cb) {
        Message.find({}).exec(function (err, result) {
            cb(result);
        })
    },

    addLog(user, message) {
        dbmsg = new Message({
            user: user,
            message: message,
            timestamp: new Date().toISOString()
        }).save(function (err) {if (err) console.log ('Error on save!')});
    }
}