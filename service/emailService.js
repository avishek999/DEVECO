import nodemailer from "nodemailer";
import { SMTP } from "../config/config.js";


export async function sendEMail(subject, body) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465
    auth: {
      user: "apavishek780@gmail.com",
      pass: "ypbdozbgzzzrfvwc",
    },
  });

  const mailOptions = {
    from: `"Avishek" <${SMTP.email}>`,
    to: SMTP.to,
    subject,
   text: body, 
    html: "<b>Hello!</b> This is a test email sent from Node.js.",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.log("❌ Error sending email:", error);
  }
}
