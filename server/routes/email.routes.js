const express = require('express')
var router = express.Router()
var nodemailer = require('nodemailer');

router.post('/verify', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shinemaapplication@gmail.com',
            pass: 'pjhiouvifzydilug'
        }
    });

    var mailOptions = {
        from: 'shinemaapplication@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            res.send(error);
        } else {
            res.send(info.response);
        }
    });
});

module.exports = router