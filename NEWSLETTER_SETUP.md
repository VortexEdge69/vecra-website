# Newsletter Subscription Feature

This document explains the newsletter subscription feature for VecraHost.

## Overview

The newsletter subscription system allows visitors to subscribe to VecraHost updates directly from the website footer. Subscriptions are stored in Supabase and subscribers receive a professional confirmation email via Zoho SMTP.

## Features

- ✅ **Email Storage**: All subscriptions stored securely in Supabase
- ✅ **Duplicate Prevention**: Automatic detection of existing subscriptions
- ✅ **Professional Emails**: Beautiful, responsive HTML email templates
- ✅ **Reactivation**: Automatically reactivates previously unsubscribed emails
- ✅ **Analytics**: IP address and user agent tracking for insights

## Setup Instructions

### 1. Database Setup (Supabase)

Run the SQL migration in your Supabase SQL Editor:

```bash
supabase/migrations/newsletter_subscriptions.sql
```

This creates the `newsletter_subscriptions` table with proper RLS policies.

### 2. Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Zoho SMTP Configuration
EMAIL_USER=support@vecrahost.in
EMAIL_APP_PASSWORD=your-zoho-app-password

# Admin Email Recipients
ADMIN_EMAIL=support@vecrahost.in
ADDITIONAL_EMAIL=admin@vecrahost.in
```

### 3. Generate Zoho App Password

1. Login to Zoho Mail
2. Go to **Settings → Security → App Passwords**
3. Click **Generate New Password**
4. Name it: `VecraHost Website`
5. Copy the password (remove any spaces)
6. Add to `EMAIL_APP_PASSWORD` in `.env.local`

## API Endpoint

**POST** `/api/newsletter`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Successfully subscribed! Check your email for confirmation.",
  "success": true
}
```

**Error Response (409):**
```json
{
  "error": "This email is already subscribed to our newsletter"
}
```

## Email Templates

All email templates use table-based HTML layouts for maximum compatibility across email clients:

### Newsletter Confirmation Email
- Professional gradient header
- Clear subscription benefits
- Call-to-action button
- Footer with unsubscribe info

### Payment Notification Email
- Payment details table
- Action required alert
- Professional formatting

### Support Request Email
- Request details
- Category badge
- Message display

## Database Schema

```sql
newsletter_subscriptions (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
)
```

## Testing

1. Navigate to your website footer
2. Enter an email address
3. Click "Subscribe"
4. Check Supabase for the new entry
5. Check the subscriber's inbox for confirmation email

## Troubleshooting

### Email Not Sending

1. **Check Zoho App Password**: Ensure it's correct and has no spaces
2. **Verify Environment Variables**: Run `npm run dev` and check console for errors
3. **Check Zoho Account**: Ensure account is active and verified
4. **Review Logs**: Check terminal for SMTP errors

### Subscription Not Saving

1. **Check Supabase Connection**: Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. **Review RLS Policies**: Ensure public insert/select policies are enabled
3. **Check Browser Console**: Look for API errors

## Security

- Environment variables are never exposed to the client (except `NEXT_PUBLIC_*`)
- Row Level Security (RLS) enabled on Supabase table
- Email validation on both client and server
- Rate limiting recommended for production

## Future Enhancements

- Unsubscribe functionality
- Email preferences management
- Newsletter campaign system
- Analytics dashboard
- A/B testing for email templates
