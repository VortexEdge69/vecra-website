
// src/app/api/admin/referrals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function GET(request: NextRequest) {
  let connection;
  try {
    connection = await getConnection();
    const url = new URL(request.url);
    const daysParam = url.searchParams.get('days');
    const refFilter = url.searchParams.get('ref');
    const utmFilter = url.searchParams.get('utm');
    const days = daysParam && daysParam !== 'all' ? Number(daysParam) : null;

    const whereClicks: string[] = [];
    const whereConvs: string[] = [];
    const whereUtm: string[] = ['utm IS NOT NULL'];
    const paramsClicks: (string | number)[] = [];
    const paramsConvs: (string | number)[] = [];
    const paramsUtm: (string | number)[] = [];

    if (refFilter) {
      whereClicks.push('ref = ?');
      whereConvs.push('ref = ?');
      paramsClicks.push(refFilter);
      paramsConvs.push(refFilter);
    }
    if (days) {
      whereClicks.push('created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)');
      whereConvs.push('created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)');
      whereUtm.push('created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)');
      paramsClicks.push(days);
      paramsConvs.push(days);
      paramsUtm.push(days);
    }
    if (utmFilter) {
      whereUtm.push('utm LIKE ?');
      paramsUtm.push(`%${utmFilter}%`);
    }
    const wc = whereClicks.length ? `WHERE ${whereClicks.join(' AND ')}` : '';
    const wv = whereConvs.length ? `WHERE ${whereConvs.join(' AND ')}` : '';
    const wu = whereUtm.length ? `WHERE ${whereUtm.join(' AND ')}` : '';

    // Clicks and conversions per ref
    const [clicksPerRef] = await connection.execute(
      `SELECT ref, COUNT(*) as clicks FROM referral_clicks ${wc} GROUP BY ref`,
      paramsClicks
    );

    const [conversionsPerRef] = await connection.execute(
      `SELECT ref, COUNT(*) as conversions FROM referral_conversions ${wv} GROUP BY ref`,
      paramsConvs
    );

    // Clicks per UTM
    const [clicksPerUtm] = await connection.execute(
      `SELECT utm, COUNT(*) as clicks FROM referral_clicks ${wu} GROUP BY utm`,
      paramsUtm
    );

    // Latest clicks and conversions
    const [latestClicks] = await connection.execute(
      `SELECT * FROM referral_clicks ${wc} ORDER BY created_at DESC LIMIT 100`,
      paramsClicks
    );

    const [latestConversions] = await connection.execute(
      `SELECT * FROM referral_conversions ${wv} ORDER BY created_at DESC LIMIT 100`,
      paramsConvs
    );

    // Data for charts
    const [clicksOverTime] = await connection.execute(
      `SELECT DATE(created_at) as date, COUNT(*) as clicks FROM referral_clicks ${wc} GROUP BY DATE(created_at) ORDER BY date ASC`,
      paramsClicks
    );

    const [conversionsOverTime] = await connection.execute(
      `SELECT DATE(created_at) as date, COUNT(*) as conversions FROM referral_conversions ${wv} GROUP BY DATE(created_at) ORDER BY date ASC`,
      paramsConvs
    );

    return NextResponse.json({
      clicksPerRef,
      conversionsPerRef,
      clicksPerUtm,
      latestClicks,
      latestConversions,
      clicksOverTime,
      conversionsOverTime,
    });
  } catch (error) {
    console.error('Error fetching referral data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
