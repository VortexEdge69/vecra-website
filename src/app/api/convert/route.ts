
// src/app/api/convert/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import { getClientIp, getUserAgent } from '@/lib/requestUtils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get('ref');
  const action = searchParams.get('action');

  if (!ref || !action) {
    return NextResponse.json({ message: 'ref and action parameters are required' }, { status: 400 });
  }

  const ip = getClientIp(request);
  const userAgent = getUserAgent(request);

  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      'INSERT INTO referral_conversions (ref, action, ip, user_agent) VALUES (?, ?, ?, ?)',
      [ref, action, ip, userAgent]
    );
    return NextResponse.json({ message: 'Conversion tracked successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking conversion:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
