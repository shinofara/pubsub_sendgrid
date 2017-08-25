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

    tmplFilePath = "template/" + data.template + "/" + data.type + ".ejs"
    var fs = require('fs');
    var templateString = fs.readFileSync(tmplFilePath, 'utf-8');
    
    console.log(data)
    var ejs = require('ejs'),
        html = ejs.render(templateString, data.data)

    email.setTos(data.to);
    email.setFrom(data.from);
    email.fromname = data.fromName;
    email.setSubject(data.subject);
    //email.setText('text');
    email.setHtml(html);
    email.addHeader('X-Sent-Using', 'SendGrid-API');
    //email.addFile({path: './gif.gif', filename: 'owl.gif'});

    sendgrid.send(email, function(err, json) {
        if (err) { return console.error(err); }
        console.log(json);
    });

    callback();
};
