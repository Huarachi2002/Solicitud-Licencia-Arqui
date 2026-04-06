import nodemailer from "nodemailer"
import { Transporter } from "nodemailer"

class NNotificacion {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendEmail(to: string, subject: string, html: string) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: html
        }
        return await this.transporter.sendMail(mailOptions);
    }
}

export default new NNotificacion();