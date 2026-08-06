/**
 * Every measurement call the site makes, in one place.
 *
 * There are two lead forms (`HomeForm` on the homepage, `ConsultForm` in the
 * modal and on the service pages) and several ways to reach us that bypass a
 * form entirely — the phone number in the header, the Telegram button, the
 * mobile dock. Each of those used to be its own decision about what, if
 * anything, to report; the homepage form reported nothing at all, so the
 * conversions that matter most were invisible to both GA4 and Ads.
 *
 * Both destinations are optional. Nothing here throws or logs when gtag or
 * Metrica is missing, so the wiring can ship before the measurement IDs do.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  }
}

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;
const GADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;

/** A visitor who submits twice in one session is still one lead. */
function firstTimeThisSession(key: string) {
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, "1");
  } catch {
    // Private mode blocks storage. Reporting once more beats not reporting.
  }
  return true;
}

/**
 * A lead reached the database. `source` names the form so GA4 can tell the
 * homepage apart from the service pages; `leadId` is the row id, which Ads
 * uses to deduplicate if the same conversion arrives twice.
 */
export function reportLeadConversion(leadId?: string, source = "lead_form") {
  if (typeof window === "undefined") return;

  const id = leadId || "anon";
  if (!firstTimeThisSession(`conv_${id}`)) return;

  window.gtag?.("event", "generate_lead", {
    event_category: "engagement",
    event_label: source,
    value: 1,
  });

  if (GADS_CONVERSION_ID) {
    window.gtag?.("event", "conversion", {
      send_to: GADS_CONVERSION_ID,
      transaction_id: id,
      value: 1.0,
      currency: "USD",
    });
  }

  if (YM_ID) window.ym?.(Number(YM_ID), "reachGoal", "lead");
}

export type ContactChannel = "phone" | "telegram" | "email";

/**
 * Someone chose to contact us directly instead of filling in the form.
 *
 * In B2B here that is a large share of real enquiries — a decision-maker
 * reads the page and calls. Left unmeasured, a campaign that produces
 * plenty of calls looks like it produces nothing, and gets switched off.
 *
 * `place` is where on the page the link was (header, dock, footer), so a
 * button that nobody uses can be told apart from one that carries the page.
 */
export function trackContact(channel: ContactChannel, place: string) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "contact", {
    event_category: "engagement",
    event_label: `${channel}:${place}`,
    method: channel,
    value: 1,
  });

  if (YM_ID) window.ym?.(Number(YM_ID), "reachGoal", `contact_${channel}`);
}
