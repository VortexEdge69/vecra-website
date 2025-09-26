import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/emailService'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email } = body

        // Validate required fields
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            )
        }

        // Log the VPS interest
        console.log('VPS Interest Notification:', {
            email,
            timestamp: new Date().toISOString()
        })

        // Send email notification to admin
        try {
            const emailSent = await emailService.sendVpsNotification(email)

            if (emailSent) {
                console.log('✅ VPS interest notification email sent successfully')
            } else {
                console.log('❌ Failed to send VPS interest notification email')
            }
        } catch (emailError) {
            console.error('Email sending error:', emailError)
            // Don't fail the entire request if email fails
        }

        return NextResponse.json(
            { 
                message: 'VPS interest notification processed successfully',
                emailSent: true
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('VPS notification error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
