import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
})

export const sendMessage = async ({ email, massage, subject },res) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.GMAIL_ACCOUNT,
            to: email,
            subject: subject,
            text: massage
        });
        res.status(200).send("massage sent");
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}