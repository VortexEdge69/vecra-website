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
        const body = await request.json()
        const { email, firstName } = body

        // 1. Honeypot check (firstName is hidden from users, only bots fill it)
        if (firstName) {
            console.warn(`[Newsletter] Honeypot triggered from IP: ${getClientIp(request)}`)
            return NextResponse.json(
                {
                    message: 'Successfully subscribed! Check your email for confirmation.',
                    success: true
                },
                { status: 200 }
            )
        }

        // 2. Enhanced Email validation
        if (!email || !/^[a-zA-Z0-9._%+-]+@(?!(?:[a-zA-Z0-9-]+\.)*internal)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,15}$/.test(email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address' },
                { status: 400 }
            )
        }

        // 3. Block common spam/fake patterns (e.g. very long prefixes)
        const [localPart] = email.split('@')
        if (localPart.length > 64) {
            return NextResponse.json(
                { error: 'Email address is too long' },
                { status: 400 }
            )
        }
        
        const ip = getClientIp(request)
        const userAgent = getUserAgent(request)

        // --- RATE LIMITING ---
        // 1. IP-based rate limit: Max 5 attempts per 10 minutes from same IP
        const TEN_MINUTES_AGO = new Date(Date.now() - 10 * 60 * 1000).toISOString()
        const { count: ipCount, error: ipCountError } = await supabase
            .from('newsletter_subscriptions')
            .select('*', { count: 'exact', head: true })
            .eq('ip_address', ip)
            .gte('subscribed_at', TEN_MINUTES_AGO)

        if (!ipCountError && ipCount !== null && ipCount >= 5) {
            console.warn(`[Newsletter] Rate limit triggered for IP: ${ip}`)
            return NextResponse.json(
                { error: 'Too many subscription attempts. Please try again in 10 minutes.' },
                { status: 429 }
            )
        }

        // 2. Global rate limit: Max 50 attempts per hour across all IPs
        // This protects the email service from being used for mass spam
        const ONE_HOUR_AGO = new Date(Date.now() - 60 * 60 * 1000).toISOString()
        const { count: globalCount, error: globalError } = await supabase
            .from('newsletter_subscriptions')
            .select('*', { count: 'exact', head: true })
            .gte('subscribed_at', ONE_HOUR_AGO)

        if (!globalError && globalCount !== null && globalCount >= 50) {
            console.error('[Newsletter] Global rate limit reached!')
            return NextResponse.json(
                { error: 'Newsletter system is temporarily under heavy load. Please try again later.' },
                { status: 429 }
            )
        }
        // --- END RATE LIMITING ---

        // Check if email already exists
        const { data: existing } = await supabase
            .from('newsletter_subscriptions')
            .select('email, status')
            .eq('email', email)
            .single()

        if (existing) {
            if (existing.status === 'active') {
                return NextResponse.json(
                    { error: 'This email is already subscribed to our newsletter' },
                    { status: 409 }
                )
            } else {
                // Reactivate subscription
                const { error: updateError } = await supabase
                    .from('newsletter_subscriptions')
                    .update({ status: 'active', subscribed_at: new Date().toISOString() })
                    .eq('email', email)

                if (updateError) {
                    console.error('Supabase update error:', updateError)
                    return NextResponse.json(
                        { error: 'Failed to reactivate subscription' },
                        { status: 500 }
                    )
                }
            }
        } else {
            // Insert new subscription
            const { error: insertError } = await supabase
                .from('newsletter_subscriptions')
                .insert([
                    {
                        email,
                        ip_address: ip,
                        user_agent: userAgent,
                        status: 'active'
                    }
                ])

            if (insertError) {
                console.error('Supabase insert error:', insertError)
                return NextResponse.json(
                    { error: 'Failed to subscribe. Please try again.' },
                    { status: 500 }
                )
            }
        }

        // Send confirmation email
        try {
            const emailSent = await emailService.sendNewsletterConfirmation(email)
            if (emailSent) {
                console.log('✅ Newsletter confirmation email sent to:', email)
            } else {
                console.warn('⚠️ Subscription saved but confirmation email failed for:', email)
            }
        } catch (emailError) {
            console.error('Unexpected email error:', emailError)
        }

        return NextResponse.json(
            {
                message: 'Successfully subscribed! Check your email for confirmation.',
                success: true
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Newsletter subscription error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
