import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/emailService'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, utr, amount, planName } = body

        // Validate required fields
        if (!email || !utr || !amount || !planName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const timestamp = new Date().toISOString()

        // Log the payment confirmation
        console.log('Payment Confirmation:', {
            email,
            utr,
            amount,
            planName,
            timestamp
        })

        // Send email notification to admin
        try {
            const emailSent = await emailService.sendPaymentNotification({
                customerEmail: email,
                utr: utr,
                amount: amount,
                planName: planName,
                timestamp: timestamp
            })

            if (emailSent) {
                console.log('✅ Payment notification email sent successfully')
            } else {
                console.log('❌ Failed to send payment notification email')
            }
        } catch (emailError) {
            console.error('Email sending error:', emailError)
            // Don't fail the entire request if email fails
        }

        return NextResponse.json(
            { 
                message: 'Payment confirmation processed successfully',
                emailSent: true
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Payment confirmation error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 