const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: "",
        port: 465,
        secure: true,
        auth: {
          user: "",
          pass: "",
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
