import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { emailService } from '@/lib/emailService'

function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    return forwarded?.split(',')[0] || realIp || 'unknown'
}

function getUserAgent(request: NextRequest): string {
    return request.headers.get('user-agent') || 'unknown'
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email } = body

        // Validate email
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            )
        }

        const ip = getClientIp(request)
        const userAgent = getUserAgent(request)

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
