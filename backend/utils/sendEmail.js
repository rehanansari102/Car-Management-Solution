const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: "email-smtp.us-east-2.amazonaws.com",
        port: 465,
        secure: true,
        auth: {
          user: "AKIA354M5YKOHLVTRG7K",
          pass: "BGJSDkwq1EQBDplWH+XHqSNdcvdcRxSn4R45z3FPot2v",
        },
      });

    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error('Error sending email', err);
    }
};

module.exports = sendEmail