'use client';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ConversionTracker() {
  const fired = useRef(false);
  const params = useSearchParams();

  useEffect(() => {
    if (fired.current) return;
    const lid = params.get('lid') || 'anon';
    const key = `conv_${lid}`;
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(key)) return;

    const gtag = window.gtag;
    if (typeof gtag !== 'function') return;

    const convId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;
    if (convId) {
      gtag('event', 'conversion', {
        send_to: convId,
        transaction_id: lid,
        value: 1.0,
        currency: 'USD',
      });
    }

    gtag('event', 'generate_lead', {
      event_category: 'engagement',
      event_label: 'lead_form_submit',
      value: 1,
    });

    sessionStorage.setItem(key, '1');
    fired.current = true;
  }, [params]);

  return null;
}
