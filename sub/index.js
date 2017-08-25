exports.helloPubSub = function (event, callback) {
    const pubsubMessage = event.data;
    const str = pubsubMessage.data ? Buffer.from(pubsubMessage.data, 'base64').toString() : 'World';
    data = JSON.parse(str)

    var dotenv = require('dotenv');
    dotenv.load();

    var api_key             = process.env.API_KEY;

    var from                = process.env.FROM;
    var tos                 = process.env.TOS.split(',');

    var sendgrid   = require('sendgrid')(api_key);
    var email      = new sendgrid.Email();

    console.log(data)
    var ejs = require('ejs'),
        html = ejs.render('<html><body><%= people %></body></html>', {people: data.name});

    email.setTos(tos);
    email.setFrom(from);
    email.fromname = '送信者名';
    email.setSubject('Hello Pub/Sub');
    email.setText('text');
    email.setHtml(html);
    email.addHeader('X-Sent-Using', 'SendGrid-API');
    email.addFile({path: './gif.gif', filename: 'owl.gif'});

    sendgrid.send(email, function(err, json) {
        if (err) { return console.error(err); }
        console.log(json);
    });

    callback();
};
