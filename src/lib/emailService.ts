import nodemailer from 'nodemailer';

interface EmailData {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

interface PaymentNotificationData {
    customerEmail: string;
    utr: string;
    amount: string;
    planName: string;
    timestamp: string;
}

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Create transporter using Gmail SMTP
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password
            },
        });
    }

    async sendEmail(emailData: EmailData): Promise<boolean> {
        try {
            const mailOptions = {
                from: `"VecraHost" <${process.env.EMAIL_USER}>`,
                to: emailData.to,
                subject: emailData.subject,
                html: emailData.html,
                text: emailData.text || emailData.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
            };

            const result = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', result.messageId);
            return true;
        } catch (error) {
            console.error('Email sending failed:', error);
            return false;
        }
    }

    async sendPaymentNotification(paymentData: PaymentNotificationData): Promise<boolean> {
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
        const additionalEmails = process.env.ADDITIONAL_EMAIL?.split(',') || [];

        if (!adminEmail) {
            console.error('No admin email configured');
            return false;
        }

        // Prepare recipient list
        const recipients = [adminEmail, ...additionalEmails];

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #0076fe; margin: 0;">🎉 New Payment Received!</h1>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #333; margin-top: 0;">Payment Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Customer Email:</td>
                                <td style="padding: 8px 0; color: #333;">${paymentData.customerEmail}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Plan:</td>
                                <td style="padding: 8px 0; color: #333;">${paymentData.planName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Amount:</td>
                                <td style="padding: 8px 0; color: #28a745; font-weight: bold;">₹${paymentData.amount}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">UTR Number:</td>
                                <td style="padding: 8px 0; color: #333; font-family: monospace;">${paymentData.utr}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Timestamp:</td>
                                <td style="padding: 8px 0; color: #333;">${new Date(paymentData.timestamp).toLocaleString('en-IN', {
                                    timeZone: 'Asia/Kolkata',
                                    dateStyle: 'full',
                                    timeStyle: 'medium'
                                })}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #0076fe;">
                        <p style="margin: 0; color: #1976d2;">
                            <strong>Next Steps:</strong> Please verify the payment and activate the customer's service.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            This notification was sent from VecraHost Payment System
                        </p>
                    </div>
                </div>
            </div>
        `;

        return await this.sendEmail({
            to: recipients.join(', '),
            subject: `💰 New Payment: ${paymentData.planName} - ₹${paymentData.amount}`,
            html: html,
        });
    }

    async sendVpsNotification(customerEmail: string): Promise<boolean> {
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
        const additionalEmails = process.env.ADDITIONAL_EMAIL?.split(',') || [];

        if (!adminEmail) {
            console.error('No admin email configured');
            return false;
        }

        // Prepare recipient list
        const recipients = [adminEmail, ...additionalEmails];

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #0076fe; margin: 0;">📧 VPS Interest Notification</h1>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #333; margin-top: 0;">Customer Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                                <td style="padding: 8px 0; color: #333;">${customerEmail}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Timestamp:</td>
                                <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString('en-IN', {
                                    timeZone: 'Asia/Kolkata',
                                    dateStyle: 'full',
                                    timeStyle: 'medium'
                                })}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <p style="margin: 0; color: #856404;">
                            <strong>Action Required:</strong> Customer is interested in VPS hosting. Consider reaching out when VPS plans become available.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            This notification was sent from VecraHost VPS Interest System
                        </p>
                    </div>
                </div>
            </div>
        `;

        return await this.sendEmail({
            to: recipients.join(', '),
            subject: `📧 VPS Interest: ${customerEmail}`,
            html: html,
        });
    }
}

export const emailService = new EmailService();
