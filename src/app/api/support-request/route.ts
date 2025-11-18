import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/lib/emailService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, category, description } = body

    if (!email || !category || !description) {
      return NextResponse.json(
        { error: 'Email, category, and description are required' },
        { status: 400 }
      )
    }

    console.log('Support Request:', {
      email,
      category,
      description,
      timestamp: new Date().toISOString(),
    })

    try {
      const emailSent = await emailService.sendSupportRequest(category, description, email)
      if (!emailSent) {
        console.warn('Failed to send support request email')
      }
    } catch (err) {
      console.error('Email sending error:', err)
      // Do not fail the entire request on email errors
    }

    return NextResponse.json({ message: 'Support request received', emailSent: true }, { status: 200 })
  } catch (error) {
    console.error('Support request error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}