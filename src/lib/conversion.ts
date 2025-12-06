
// src/lib/conversion.ts
'use client';

/**
 * Tracks a conversion event (e.g., signup, buy, contact).
 * It reads the referral code from localStorage and sends it to the backend.
 * @param action - The type of conversion action (e.g., 'signup', 'buy').
 */
export function trackConversion(action: string) {
  const ref = localStorage.getItem('referral_ref');
  if (ref) {
    const convertUrl = `/api/convert?ref=${encodeURIComponent(ref)}&action=${encodeURIComponent(action)}`;
    fetch(convertUrl);
  }
}
