import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import logger from '@/lib/logger'
import { emailService } from '@/lib/emailService'

export async function POST(request: Request) {
  try {
    const { userId, email, phoneNumber } = await request.json()

    // Validate request
    if (!userId || !email || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already has a trial
    const { data: existingTrial, error: trialCheckError } = await supabase
      .from('free_trials')
      .select('id, trial_status')
      .eq('user_id', userId)
      .single()

    if (trialCheckError && trialCheckError.code !== 'PGRST116') {
      logger.error('Error checking existing trial:', trialCheckError)
      return NextResponse.json(
        { error: 'Failed to check trial eligibility' },
        { status: 500 }
      )
    }

    if (existingTrial) {
      return NextResponse.json(
        { error: 'Free trial already utilized', status: existingTrial.trial_status },
        { status: 400 }
      )
    }

    // Create server using ctrlpanel.gg API
    // This is a placeholder - you'll need to implement the actual API call
    const serverId = await createServerOnCtrlPanel()
    
    if (!serverId) {
      return NextResponse.json(
        { error: 'Failed to create server' },
        { status: 500 }
      )
    }

    // Create trial record in database
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24) // 24 hours from now

    const { error: trialError } = await supabase
      .from('free_trials')
      .insert({
        user_id: userId,
        email: email,
        phone_number: phoneNumber,
        trial_status: 'active',
        server_id: serverId,
        created_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString()
      })
      .select()

    if (trialError) {
      logger.error('Error creating trial:', trialError)
      return NextResponse.json(
        { error: 'Failed to create trial record' },
        { status: 500 }
      )
    }

    // Send admin notification email
    await sendAdminNotification(email, phoneNumber, serverId)

    return NextResponse.json({
      success: true,
      message: 'Free trial created successfully',
      serverId,
      expiresAt: expiresAt.toISOString()
    })
  } catch (error) {
    logger.error('Unexpected error in free trial API:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Function to create server on ctrlpanel.gg
// This is a placeholder - implement the actual API integration
async function createServerOnCtrlPanel(): Promise<string | null> {
  try {
    // TODO: Replace with actual API call to ctrlpanel.gg
    // Example implementation:
    /*
    const response = await fetch('https://api.ctrlpanel.gg/v1/servers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CTRLPANEL_API_KEY}`
      },
      body: JSON.stringify({
        email: email,
        plan: 'minecraft-default',
        // Other required parameters
      })
    })

    const data = await response.json()
    return data.server_id
    */

    // For now, return a mock server ID
    return `mock-server-${Date.now()}`
  } catch (error) {
    logger.error('Error creating server on ctrlpanel.gg:', error)
    return null
  }
}

// Function to send admin notification email
async function sendAdminNotification(email: string, phoneNumber: string, serverId: string) {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@vecrahost.in'
    
    await emailService.sendEmail({
      to: adminEmail,
      subject: 'New Free Trial Server Created',
      text: `
        A new free trial server has been created:
        
        User Email: ${email}
        Phone Number: ${phoneNumber}
        Server ID: ${serverId}
        Created At: ${new Date().toLocaleString()}
        Expires At: ${new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()}
      `,
      html: `
        <h2>New Free Trial Server Created</h2>
        <p>A new free trial server has been created with the following details:</p>
        <ul>
          <li><strong>User Email:</strong> ${email}</li>
          <li><strong>Phone Number:</strong> ${phoneNumber}</li>
          <li><strong>Server ID:</strong> ${serverId}</li>
          <li><strong>Created At:</strong> ${new Date().toLocaleString()}</li>
          <li><strong>Expires At:</strong> ${new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()}</li>
        </ul>
      `
    })
  } catch (error) {
    logger.error('Error sending admin notification email:', error)
  }
}