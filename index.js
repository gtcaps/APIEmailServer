const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/send-email', (req, res) => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "1af417e91a89da",
            pass: "d69570a5bf52a2"
        }
    });

    var mailOptions = {
        from: '"FuBox Admin" <admin@fubox.com>',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        html: `
        <h3>FuBox Cloud</h3><br>
        ${req.body.text}
        `
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400).send(error);
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({
            message: 'Email sent successfully',
            type: 'success'
        });
    });
});

app.listen(3040, () => {
    console.log('Server is running on port 3040');
});