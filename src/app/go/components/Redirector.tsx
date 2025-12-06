// src/app/go/components/Redirector.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Redirector() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const ref = searchParams.get('ref');
    const utm = searchParams.get('utm');
    const utmSource = searchParams.get('utm_source');
    const utmMedium = searchParams.get('utm_medium');
    const utmCampaign = searchParams.get('utm_campaign');
    const utmTerm = searchParams.get('utm_term');
    const utmContent = searchParams.get('utm_content');

    const parts: string[] = [];
    if (utm) parts.push(`utm=${utm}`);
    if (utmSource) parts.push(`source=${utmSource}`);
    if (utmMedium) parts.push(`medium=${utmMedium}`);
    if (utmCampaign) parts.push(`campaign=${utmCampaign}`);
    if (utmTerm) parts.push(`term=${utmTerm}`);
    if (utmContent) parts.push(`content=${utmContent}`);
    const combinedUtm = parts.length ? parts.join('|') : null;

    if (ref) {
      localStorage.setItem('referral_ref', ref);
      const payload = JSON.stringify({ ref, utm: combinedUtm });
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/track', blob);
      } else {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        });
      }
    }

    router.push('/');
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="h-10 w-10 rounded-full border-4 border-gray-700 border-t-accent animate-spin"></div>
        <div className="mt-4 text-gray-300">Loading...</div>
      </div>
    </div>
  );
}
