import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import logger from '@/lib/logger'

export async function POST(request: Request) {
  try {
    const { userId, phoneNumber, otp } = await request.json()

    // Validate request
    if (!userId || !phoneNumber || !otp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In a real implementation, you would verify the OTP with Supabase or your SMS provider
    // This is a placeholder for the OTP verification logic
    const isOtpValid = await verifyOtp(phoneNumber, otp)

    if (!isOtpValid) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    // Mark the phone as verified in the user's metadata
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        phone_verified: true
      }
    })

    if (updateError) {
      logger.error('Error updating user metadata:', updateError)
      return NextResponse.json(
        { error: 'Failed to update verification status' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Phone number verified successfully'
    })
  } catch (error) {
    logger.error('Unexpected error in OTP verification API:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Function to verify OTP
// This is a placeholder - implement the actual verification logic
async function verifyOtp(phoneNumber: string, otp: string): Promise<boolean> {
  try {
    // TODO: Replace with actual OTP verification
    // For development/testing, accept any 6-digit OTP
    return otp.length === 6 && /^\d+$/.test(otp)
  } catch (error) {
    logger.error('Error verifying OTP:', error)
    return false
  }
}