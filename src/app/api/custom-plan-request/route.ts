import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/emailService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, email, specs } = body

    if (!email || !type) {
      return NextResponse.json({ error: 'Email and type are required' }, { status: 400 })
    }

    if (type !== 'minecraft' && type !== 'vps') {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    // Log request
    console.log('Custom Plan Request:', {
      type,
      email,
      specs,
      timestamp: new Date().toISOString(),
    })

    // Send email to admin with specs
    try {
      const emailSent = await emailService.sendCustomPlanRequest(type, email, specs || {})
      if (!emailSent) {
        console.warn('Failed to send custom plan request email')
      }
    } catch (err) {
      console.error('Email sending error:', err)
      // Do not fail the entire request on email errors
    }

    return NextResponse.json({ message: 'Custom plan request received', emailSent: true }, { status: 200 })
  } catch (error) {
    console.error('Custom plan request error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}