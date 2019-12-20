const { transport } = require("../config/emailConfig");

const emailSender = () => {
    const message = {
        from: "jake@email.com", // Sender address
        to: "lemiszewski@gmx.com", // List of recipients
        subject: "Welcome to my marketplace", // Subject line
        text: "Have fun coding!" // Plain text body
    };

    transport.sendMail(message, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};

module.exports = { emailSender };
