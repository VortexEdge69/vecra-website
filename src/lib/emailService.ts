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
    private createTransporter() {
        const emailUser = process.env.EMAIL_USER;
        const emailPassword = process.env.EMAIL_APP_PASSWORD;

        if (!emailUser || !emailPassword) {
            throw new Error('Email credentials not configured in environment variables');
        }

        return nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 587,
            secure: false,
            auth: {
                user: emailUser,
                pass: emailPassword,
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            }
        });
    }

    async sendEmail(emailData: EmailData): Promise<boolean> {
        try {
            const transporter = this.createTransporter();

            const mailOptions = {
                from: `"VecraHost" <${process.env.EMAIL_USER}>`,
                to: emailData.to,
                subject: emailData.subject,
                html: emailData.html,
                text: emailData.text || emailData.html.replace(/<[^>]*>/g, ''),
            };

            const result = await transporter.sendMail(mailOptions);
            console.log('✅ Email sent successfully:', result.messageId);
            return true;
        } catch (error) {
            console.error('❌ Email sending failed:', error);
            return false;
        }
    }

    async sendPaymentNotification(data: PaymentNotificationData): Promise<boolean> {
        const recipients = [
            process.env.ADMIN_EMAIL,
            process.env.ADDITIONAL_EMAIL
        ].filter(Boolean);

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <!-- Header -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #0076fe 0%, #005ac1 100%); padding: 40px 30px; text-align: center;">
                                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">💰 New Payment Received</h1>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <h2 style="color: #1a1a1a; font-size: 20px; margin: 0 0 24px 0; font-weight: 600;">Payment Details</h2>
                                        
                                        <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #f8fafc; border-radius: 6px;">
                                            <tr>
                                                <td style="color: #64748b; font-weight: 600; width: 40%;">Customer Email:</td>
                                                <td style="color: #1e293b;">${data.customerEmail}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #64748b; font-weight: 600;">UTR Number:</td>
                                                <td style="color: #1e293b; font-family: 'Courier New', monospace; background: #e2e8f0; padding: 8px; border-radius: 4px;">${data.utr}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #64748b; font-weight: 600;">Amount:</td>
                                                <td style="color: #059669; font-weight: 700; font-size: 20px;">₹${data.amount}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #64748b; font-weight: 600;">Plan:</td>
                                                <td style="color: #1e293b; font-weight: 600;">${data.planName}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #64748b; font-weight: 600;">Timestamp:</td>
                                                <td style="color: #64748b;">${data.timestamp}</td>
                                            </tr>
                                        </table>
                                        
                                        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-top: 24px; border-radius: 4px;">
                                            <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 14px;">⚠️ Action Required</p>
                                            <p style="margin: 8px 0 0 0; color: #78350f; font-size: 14px;">Please verify this payment and activate the customer's plan accordingly.</p>
                                        </div>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="padding: 24px 30px; border-top: 1px solid #e2e8f0; text-align: center;">
                                        <p style="color: #94a3b8; font-size: 13px; margin: 0;">VecraHost Payment System</p>
                                        <p style="color: #cbd5e1; font-size: 12px; margin: 8px 0 0 0;">© ${new Date().getFullYear()} VecraHost. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `;

        return await this.sendEmail({
            to: recipients.join(', '),
            subject: `💰 New Payment: ₹${data.amount} - ${data.planName}`,
            html,
        });
    }

    async sendSupportRequest(customerEmail: string, category: string, description: string): Promise<boolean> {
        const recipients = [
            process.env.ADMIN_EMAIL,
            process.env.ADDITIONAL_EMAIL
        ].filter(Boolean);

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <!-- Header -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); padding: 40px 30px; text-align: center;">
                                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">🛠️ New Support Request</h1>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #f8fafc; border-radius: 6px; margin-bottom: 24px;">
                                            <tr>
                                                <td style="color: #64748b; font-weight: 600; width: 30%;">From:</td>
                                                <td style="color: #1e293b;">${customerEmail}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #64748b; font-weight: 600;">Category:</td>
                                                <td>
                                                    <span style="background: #ddd6fe; color: #5b21b6; padding: 6px 14px; border-radius: 16px; font-size: 13px; font-weight: 600; display: inline-block;">
                                                        ${category}
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 6px; border-left: 4px solid #7c3aed;">
                                            <h3 style="color: #475569; margin: 0 0 12px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
                                            <p style="color: #1e293b; line-height: 1.6; white-space: pre-wrap; margin: 0; font-size: 15px;">${description}</p>
                                        </div>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="padding: 24px 30px; border-top: 1px solid #e2e8f0; text-align: center;">
                                        <p style="color: #94a3b8; font-size: 13px; margin: 0;">VecraHost Support System</p>
                                        <p style="color: #cbd5e1; font-size: 12px; margin: 8px 0 0 0;">© ${new Date().getFullYear()} VecraHost. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `;

        return await this.sendEmail({
            to: recipients.join(', '),
            subject: `🛠️ Support Request: ${category} - ${customerEmail}`,
            html,
        });
    }

    async sendNewsletterConfirmation(subscriberEmail: string): Promise<boolean> {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <!-- Header -->
                                <tr>
                                    <td style="background: linear-gradient(135deg, #0076fe 0%, #005ac1 100%); padding: 50px 30px; text-align: center;">
                                        <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Welcome to VecraHost</h1>
                                        <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 16px;">High-Performance Cloud Infrastructure</p>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 48px 40px;">
                                        <h2 style="color: #0b1219; font-size: 24px; margin: 0 0 16px 0; font-weight: 600;">You're Successfully Subscribed! 🎉</h2>
                                        
                                        <p style="color: #475569; font-size: 16px; line-height: 1.7; margin: 0 0 28px 0;">
                                            Thank you for subscribing to VecraHost updates. You'll now receive exclusive insights and updates directly to your inbox.
                                        </p>
                                        
                                        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #0076fe; padding: 24px; margin: 28px 0; border-radius: 6px;">
                                            <h3 style="color: #1e293b; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">What You'll Receive:</h3>
                                            <table width="100%" cellpadding="8" cellspacing="0">
                                                <tr>
                                                    <td width="24" valign="top" style="color: #0076fe; font-size: 18px;">✓</td>
                                                    <td style="color: #334155; font-size: 15px; line-height: 1.6;">Product updates and new features</td>
                                                </tr>
                                                <tr>
                                                    <td width="24" valign="top" style="color: #0076fe; font-size: 18px;">✓</td>
                                                    <td style="color: #334155; font-size: 15px; line-height: 1.6;">Infrastructure announcements and maintenance schedules</td>
                                                </tr>
                                                <tr>
                                                    <td width="24" valign="top" style="color: #0076fe; font-size: 18px;">✓</td>
                                                    <td style="color: #334155; font-size: 15px; line-height: 1.6;">Exclusive offers and promotional discounts</td>
                                                </tr>
                                                <tr>
                                                    <td width="24" valign="top" style="color: #0076fe; font-size: 18px;">✓</td>
                                                    <td style="color: #334155; font-size: 15px; line-height: 1.6;">Technical insights and best practices</td>
                                                </tr>
                                            </table>
                                        </div>
                                        
                                        <p style="color: #475569; font-size: 15px; line-height: 1.7; margin: 28px 0 32px 0;">
                                            We're committed to delivering high-quality, relevant content. Stay tuned for our next update!
                                        </p>
                                        
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" style="padding: 8px 0;">
                                                    <a href="https://vecrahost.in" style="display: inline-block; background: linear-gradient(135deg, #0076fe 0%, #005ac1 100%); color: #ffffff; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0,118,254,0.3);">Visit VecraHost</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="padding: 32px 40px; border-top: 1px solid #e2e8f0; background-color: #f8fafc;">
                                        <p style="color: #94a3b8; font-size: 13px; margin: 0 0 8px 0; text-align: center; line-height: 1.6;">
                                            You received this email because you subscribed to VecraHost updates at <strong style="color: #64748b;">${subscriberEmail}</strong>
                                        </p>
                                        <p style="color: #cbd5e1; font-size: 12px; margin: 0; text-align: center;">
                                            © ${new Date().getFullYear()} VecraHost. All rights reserved.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `;

        return await this.sendEmail({
            to: subscriberEmail,
            subject: '✅ Welcome to VecraHost - Subscription Confirmed',
            html,
        });
    }
}

export const emailService = new EmailService();
