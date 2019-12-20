const c = require("./config");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: c.email_host,
    port: c.email_port,
    auth: {
        user: c.email_user,
        pass: c.email_pass
    }
});

module.exports = { transport };
