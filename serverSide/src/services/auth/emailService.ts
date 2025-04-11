// src/services/emailService.ts
import nodemailer from 'nodemailer';
import logger from '../../utils/logger';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Create a transporter object using SMTP transport
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER || 'your-email@gmail.com',
                pass: process.env.EMAIL_PASSWORD || 'your-app-password', // Use app password for Gmail
            },
        });
    }

    async sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
        try {
            const mailOptions = {
                from: `"${process.env.EMAIL_FROM_NAME || 'Your App'}" <${process.env.EMAIL_USER || 'your-email@gmail.com'}>`,
                to,
                subject,
                html,
            };

            const info = await this.transporter.sendMail(mailOptions);
            logger.info(`✅ Email sent: ${info.messageId}`);
            return true;
        } catch (error) {
            logger.error('❌ Error sending email:', error);
            return false;
        }
    }

    async sendPasswordResetEmail(to: string, resetToken: string): Promise<boolean> {
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

        const subject = 'Password Reset Request';
        const html = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset for your account.</p>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `;

        return this.sendEmail({ to, subject, html });
    }
}

export default new EmailService();