import nodemailer from "nodemailer";
import { htmlTemplate } from "./htmlTemplate.js";

export const sendEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ahmedshoura279@gmail.com",
            pass: "esuhrvyildbyoudx",
        },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"dina system" <ahmedshoura279@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        html: htmlTemplate(token), // html body
    });

    console.log("Message sent: %s", info.messageId);
}