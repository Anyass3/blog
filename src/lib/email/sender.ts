import nodemailer from "nodemailer";
import * as $PENV from "$env/static/private"


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: $PENV.YOUR_EMAIL,
        pass: $PENV.YOUR_EMAIL_PASSWORD,
    },
});

export const sendEmail = async (to: string, subject: string, html: string, text?: string) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `Abu's Blog <${$PENV.YOUR_EMAIL}>`,
        to,
        subject,
        html,
        text,
    });

    console.log("Message sent: %s", info.messageId);
};