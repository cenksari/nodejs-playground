const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    direct: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        "user": "test@test.com",
        "pass": "yourp@assword"
    },
    secure: true
});

transporter.verify(function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Server is ready to take our messages');
    }
});

const options = {
    "from": `"Cenk SARI" <cenk@cenksari.com>`,
    "to": "cenk@cenksari.com",
    "subject": "NodeJS email test",
    "text": "text part of email",
    "html": "<h1>Title</h1><p>html part of email</p>"
}

transporter.sendMail(options, (error, info) => {
    if (error) {
        console.log(error);
    }

    console.log(`Message ${info.messageId} sent: ${info.response}`);
});