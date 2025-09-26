# Email Notification Setup Guide

## Overview
This system sends email notifications when:
1. **Payment Confirmations** - When customers submit payment details
2. **VPS Interest** - When customers request VPS notifications

## Setup Instructions

### 1. Gmail Setup (Recommended)
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

### 2. Environment Variables
Add these to your `.env.local` file:

```bash
# Your Gmail address
EMAIL_USER=your-email@gmail.com

# Gmail App Password (16 characters, no spaces)
EMAIL_APP_PASSWORD=abcdefghijklmnop

# Admin email (where notifications go)
ADMIN_EMAIL=admin@yourdomain.com

# Additional email (optional - for multiple recipients)
ADDITIONAL_EMAIL=kethavathrahul466@gmail.com
```

### 3. Alternative Email Services

#### Using SendGrid:
```bash
EMAIL_SERVICE=sendgrid
EMAIL_USER=apikey
EMAIL_APP_PASSWORD=your-sendgrid-api-key
```

#### Using Mailgun:
```bash
EMAIL_SERVICE=mailgun
EMAIL_USER=your-mailgun-domain
EMAIL_APP_PASSWORD=your-mailgun-api-key
```

## Email Templates

### Payment Notification Email Includes:
- Customer email
- Plan name
- Amount paid
- UTR number
- Timestamp
- Professional HTML formatting
- **Sent to**: Both ADMIN_EMAIL and ADDITIONAL_EMAIL (if configured)

### VPS Interest Email Includes:
- Customer email
- Timestamp
- Action required notice
- **Sent to**: Both ADMIN_EMAIL and ADDITIONAL_EMAIL (if configured)

## Multiple Recipients

The system now supports sending notifications to multiple email addresses:

- **ADMIN_EMAIL**: Primary recipient (required)
- **ADDITIONAL_EMAIL**: Secondary recipient (optional)

Both emails will receive identical notifications for:
- Payment confirmations
- VPS interest requests

Example configuration:
```bash
ADMIN_EMAIL=your-main-email@gmail.com
ADDITIONAL_EMAIL=kethavathrahul466@gmail.com
```

## Testing

1. **Test Payment Notification**:
   - Submit a payment through the checkout form
   - Check your admin email for notification

2. **Test VPS Notification**:
   - Enter email in VPS notification form
   - Check your admin email for notification

## Troubleshooting

### Common Issues:
1. **"Invalid login"** - Check your app password
2. **"Less secure app access"** - Use app passwords, not regular password
3. **Emails not sending** - Check console logs for errors

### Debug Mode:
Check server console for email sending status:
- ✅ Email sent successfully
- ❌ Failed to send email

## Security Notes
- Never commit `.env.local` to version control
- Use app passwords, not regular passwords
- Consider using dedicated email services for production
