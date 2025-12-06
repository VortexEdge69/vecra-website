
// src/lib/requestUtils.ts
import { NextRequest } from 'next/server';

/**
 * Extracts the client's IP address from the request.
 * It checks for common headers used by proxies and load balancers.
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // For local development
  return '127.0.0.1';
}

/**
 * Extracts the client's user-agent from the request.
 */
export function getUserAgent(request: NextRequest): string {
  return request.headers.get('user-agent') ?? '';
}
