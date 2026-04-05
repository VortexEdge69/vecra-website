import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { emailService } from '@/lib/emailService'

function getClientIp(request: NextRequest): string {
    const headersToCheck = [
        'x-forwarded-for', // Standard proxy header
        'x-real-ip',      // Nginx/common reverse proxy
        'cf-connecting-ip', // Cloudflare
        'true-client-ip',   // Akamai/Cloudfront
        'client-ip',
        'x-client-ip',
        'x-cluster-client-ip',
        'fastly-client-ip'
    ];

    for (const header of headersToCheck) {
        const value = request.headers.get(header);
        if (value) {
            // Some headers can be a comma-separated list of IPs
            const address = value.split(',')[0].trim();
            if (address && address.toLowerCase() !== 'unknown') {
                return address;
            }
        }
    }

    // Try Next.js internal IP detection (Vercel)
    const nextIp = (request as { ip?: string }).ip;
    if (nextIp && nextIp.toLowerCase() !== 'unknown') return nextIp;

    return 'unknown';
}

function getUserAgent(request: NextRequest): string {
    return request.headers.get('user-agent') || 'unknown'
}

export async function POST(request: NextRequest) {
    try {
        // 1. Origin/Referer Validation (Prevent cross-site and external API calls)
        const origin = request.headers.get('origin')
        const referer = request.headers.get('referer')
        const host = request.headers.get('host')
        
        // Define allowed origins
        const isLocal = host?.includes('localhost') || host?.includes('127.0.0.1')
        const isAllowedOrigin = origin && (origin.includes('vecrahost.in') || (isLocal && origin.includes('localhost')))
        const isAllowedReferer = referer && (referer.includes('vecrahost.in') || (isLocal && referer.includes('localhost')))

        if (!isAllowedOrigin && !isAllowedReferer) {
            console.warn(`[Newsletter] unauthorized access attempt from Origin: ${origin}, Referer: ${referer}`)
            return NextResponse.json({ error: 'Unauthorized request source' }, { status: 403 })
        }

        // 2. Custom Security Header Check
        const securityHeader = request.headers.get('x-requested-with')
        if (securityHeader !== 'vecra-client') {
            return NextResponse.json({ error: 'Invalid client' }, { status: 403 })
        }

        // 3. Simple User-Agent Bot Check
        const ua = request.headers.get('user-agent')?.toLowerCase() || ''
        const botKeywords = ['bot', 'crawler', 'spider', 'headless', 'puppeteer', 'selenium', 'python-requests', 'curl', 'postman']
        if (botKeywords.some(kw => ua.includes(kw))) {
            return NextResponse.json({ error: 'Automated requests are not allowed' }, { status: 403 })
        }

        const body = await request.json()
        const { email, firstName, action, otp } = body

        // 4. Honeypot check (firstName is hidden from users, only bots fill it)
        if (firstName) {
            console.warn(`[Newsletter] Honeypot triggered from IP: ${getClientIp(request)}`)
            return NextResponse.json(
                {
                    message: 'Verification code sent! Please check your email.',
                    success: true
                },
                { status: 200 }
            )
        }

        // 5. Enhanced Email validation
        if (!email || !/^[a-zA-Z0-9._%+-]+@(?!(?:[a-zA-Z0-9-]+\.)*internal)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,15}$/.test(email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address' },
                { status: 400 }
            )
        }

        const ip = getClientIp(request)

        // --- PHASE 1: REQUEST OTP ---
        if (action === 'request-otp') {
            // Rate limit: Max 3 OTP requests per 10 seconds per IP
            const RECENT_LIMIT = new Date(Date.now() - 10 * 1000).toISOString()
            const { count: otpCount, error: otpLimitError } = await supabase
                .from('newsletter_otps')
                .select('*', { count: 'exact', head: true })
                .eq('ip_address', ip)
                .gte('created_at', RECENT_LIMIT)

            if (!otpLimitError && otpCount !== null && otpCount >= 3) {
                return NextResponse.json(
                    { error: 'Too many requests. Please try again later.' },
                    { status: 429 }
                )
            }

            // Generate 6-digit OTP
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes

            const { error: insertError } = await supabase
                .from('newsletter_otps')
                .insert([
                    {
                        email,
                        otp: generatedOtp,
                        expires_at: expiresAt,
                        ip_address: ip
                    }
                ])

            if (insertError) {
                console.error('OTP insert error:', insertError)
                return NextResponse.json({ error: 'Failed to generate verification code' }, { status: 500 })
            }

            // Send OTP email
            try {
                const emailSent = await emailService.sendNewsletterOTP(email, generatedOtp)
                if (emailSent) {
                    return NextResponse.json({ message: 'Verification code sent!', success: true }, { status: 200 })
                } else {
                    return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 })
                }
            } catch (err) {
                console.error('Email error:', err)
                return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 })
            }
        }

        // --- PHASE 2: VERIFY OTP ---
        if (action === 'verify-otp') {
            if (!otp) return NextResponse.json({ error: 'Verification code is required' }, { status: 400 })

            // Find the most recent unverified OTP for this email
            const { data: otpRecords, error: fetchError } = await supabase
                .from('newsletter_otps')
                .select('*')
                .eq('email', email)
                .eq('verified', false)
                .order('created_at', { ascending: false })
                .limit(1)

            if (fetchError || !otpRecords || otpRecords.length === 0) {
                return NextResponse.json({ error: 'No valid verification code found' }, { status: 400 })
            }

            const record = otpRecords[0]
            const now = new Date()
            const expiry = new Date(record.expires_at)

            if (now > expiry) {
                return NextResponse.json({ error: 'Verification code has expired' }, { status: 400 })
            }

            if (record.otp !== otp) {
                return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 })
            }

            // Mark OTP as verified
            await supabase
                .from('newsletter_otps')
                .update({ verified: true })
                .eq('id', record.id)

            // Now handle the actual subscription
            const userAgent = getUserAgent(request)
            
            // Check if email already exists in main table
            const { data: existing } = await supabase
                .from('newsletter_subscriptions')
                .select('email, status')
                .eq('email', email)
                .single()

            if (existing) {
                if (existing.status === 'active') {
                    return NextResponse.json({ message: 'You are already subscribed!', success: true }, { status: 200 })
                } else {
                    // Reactivate
                    await supabase
                        .from('newsletter_subscriptions')
                        .update({ status: 'active', subscribed_at: new Date().toISOString() })
                        .eq('email', email)
                }
            } else {
                // New subscription
                await supabase
                    .from('newsletter_subscriptions')
                    .insert([{ email, ip_address: ip, user_agent: userAgent, status: 'active' }])
            }

            // Send Final Confirmation Email
            try {
                await emailService.sendNewsletterConfirmation(email)
            } catch (err) {
                console.error('Final confirmation email error:', err)
            }

            return NextResponse.json({ message: 'Successfully subscribed!', success: true }, { status: 200 })
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

    } catch (error) {
        console.error('Newsletter error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
