
// src/app/api/track/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';
import { getClientIp, getUserAgent } from '@/lib/requestUtils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get('ref');
  const utm = searchParams.get('utm');

  if (!ref) {
    return NextResponse.json({ message: 'ref parameter is required' }, { status: 400 });
  }

  const ip = getClientIp(request);
  const userAgent = getUserAgent(request);

  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      'INSERT INTO referral_clicks (ref, utm, ip, user_agent) VALUES (?, ?, ?, ?)',
      [ref, utm, ip, userAgent]
    );
    return NextResponse.json({ message: 'Click tracked successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ref: string | null = body?.ref ?? null;
    const utm: string | null = body?.utm ?? null;
    if (!ref) {
      return NextResponse.json({ message: 'ref parameter is required' }, { status: 400 });
    }

    const ip = getClientIp(request);
    const userAgent = getUserAgent(request);

    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        'INSERT INTO referral_clicks (ref, utm, ip, user_agent) VALUES (?, ?, ?, ?)',
        [ref, utm, ip, userAgent]
      );
      return NextResponse.json({ message: 'Click tracked successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error tracking click (POST):', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    } finally {
      if (connection) connection.release();
    }
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }
}
