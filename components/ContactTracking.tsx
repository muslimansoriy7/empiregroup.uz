"use client";

import { useEffect } from "react";
import { trackContact, type ContactChannel } from "@/lib/analytics";

/**
 * Reports every click that reaches us outside a form — the phone number in
 * the header, the Telegram button, the mail address in the footer.
 *
 * A large share of B2B enquiries here never touch the form: the buyer reads
 * the page and calls. Unmeasured, a campaign that produces plenty of calls
 * looks like it produces nothing, and gets switched off.
 *
 * One delegated listener rather than an onClick on each link: those links are
 * spread over the header, two footers, the floating button and the drawer,
 * and a new one added later would silently go unmeasured. This catches
 * anything matching, wherever it appears.
 */

function channelOf(href: string): ContactChannel | null {
  if (href.startsWith("tel:")) return "phone";
  if (href.startsWith("mailto:")) return "email";
  try {
    const { hostname } = new URL(href, window.location.origin);
    if (hostname === "t.me" || hostname === "telegram.me") return "telegram";
  } catch {
    // Not a URL we can parse — not a contact link either.
  }
  return null;
}

/**
 * Where on the page the link sat. The nearest identified section is the most
 * useful answer ("aloqa", "hero"); failing that, the landmark it lives in.
 */
function placeOf(el: Element): string {
  const marked = el.closest("[data-track-place]");
  if (marked) return marked.getAttribute("data-track-place") || "unknown";

  const section = el.closest("section[id], div[id]");
  if (section?.id) return section.id;

  if (el.closest("footer")) return "footer";
  if (el.closest("header")) return "header";
  if (el.closest("nav")) return "nav";
  return "page";
}

export function ContactTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      const href = link?.getAttribute("href");
      if (!link || !href) return;

      const channel = channelOf(href);
      if (channel) trackContact(channel, placeOf(link));
    };

    // Capture phase: a link may stop propagation, and the click still counts.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
