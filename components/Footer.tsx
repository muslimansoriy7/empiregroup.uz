"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useSectionHref } from "@/lib/section-href";

/**
 * Footer — the "Kresna"-style video/watermark footer, adapted to Empire Group.
 * A self-contained light block (its own colours, so it reads the same in either
 * site theme). Primary type is Geist (--font-geist-sans); the handwritten
 * accents use Caveat (--font-caveat, self-hosted). The left card plays the
 * supplied video with a rich gradient fallback if the clip is unavailable; the
 * giant "Empire" watermark is fitted to the wrapper width via getBBox().
 */
const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4";

const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "Telegram",
    href: "https://t.me/muslimansoriy",
    path: "M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/empiregroup.uz",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13-.67-.66-1.34-1.07-2.13-1.38-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z",
  },
  {
    label: "Email",
    href: "mailto:muslimansoriy7@gmail.com",
    path: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 7.13 8-5.13H4l8 5.13zM4 8.24V18h16V8.24l-7.46 4.78a1 1 0 0 1-1.08 0L4 8.24z",
  },
  {
    label: "Telefon",
    href: "tel:+998991164658",
    path: "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z",
  },
];

export function Footer() {
  const { t } = useI18n();
  const sectionHref = useSectionHref();
  const cols = t.footer.columns.slice(0, 2);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  // Fit the watermark: measure the rendered glyphs and set the viewBox so the
  // visible edges sit flush against the wrapper width. Runs after fonts load.
  useEffect(() => {
    const fit = () => {
      const svg = svgRef.current;
      const text = textRef.current;
      if (!svg || !text) return;
      try {
        const b = text.getBBox();
        svg.setAttribute("viewBox", `${b.x} ${b.y} ${b.width} ${b.height}`);
      } catch {
        /* getBBox can throw if not yet laid out */
      }
    };
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(fit);
    }
    const id = requestAnimationFrame(fit);
    window.addEventListener("resize", fit);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", fit);
    };
  }, []);

  const onSubscribe = () => {
    if (/.+@.+\..+/.test(email.trim())) setSubscribed(true);
  };

  return (
    <section className="egf">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .egf{background:#ffffff;padding:48px 24px 40px;color:#2d3148;font-family:var(--font-geist-sans),sans-serif}
          .egf *{box-sizing:border-box}
          .egf .cav{font-family:var(--font-caveat),cursive}
          .egf .footer-wrapper{max-width:1150px;margin:0 auto;display:grid;grid-template-columns:350px 1fr;gap:16px;align-items:stretch}

          .egf .footer-left{position:relative;min-height:340px;border-radius:28px;padding:32px;overflow:hidden;box-shadow:0 12px 40px rgba(21,76,189,.25);background:linear-gradient(140deg,#1e4fc0 0%,#153a8f 55%,#0a1020 100%);display:flex;flex-direction:column;justify-content:space-between}
          .egf .footer-left-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;pointer-events:none}
          .egf .footer-logo{display:flex;gap:10px;align-items:center;position:relative;z-index:1}
          .egf .footer-logo-mark{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.85);display:grid;place-items:center;font-size:16px;font-weight:700;color:#fff;letter-spacing:-.02em}
          .egf .footer-logo-name{font-size:22px;font-weight:700;color:#fff;letter-spacing:-.02em}
          .egf .footer-tagline-container{margin-top:auto;margin-bottom:28px;position:relative;z-index:1}
          .egf .footer-tagline{font-size:19px;font-weight:400;color:#fff;line-height:1.45}
          .egf .footer-tagline span{color:rgba(255,255,255,.65)}
          .egf .footer-social-row{display:flex;justify-content:space-between;align-items:center;gap:12px;position:relative;z-index:1}
          .egf .footer-social-label{font-size:18px;font-weight:600;color:rgba(255,255,255,.9);letter-spacing:.3px}
          .egf .footer-social-icons{display:flex;gap:7px}
          .egf .social-icon{width:36px;height:36px;border-radius:9px;background:#0e1014;display:grid;place-items:center;box-shadow:0 6px 18px rgba(0,0,0,.35),0 2px 6px rgba(0,0,0,.2);transition:background .2s,transform .15s,box-shadow .2s}
          .egf .social-icon svg{width:15px;height:15px;fill:#fff}
          .egf .social-icon:hover{background:#000;transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,0,0,.45),0 3px 8px rgba(0,0,0,.3)}

          .egf .footer-right{background:#f0f1f5;border-radius:28px;padding:40px;overflow:visible;box-shadow:0 4px 20px rgba(0,0,0,.04);display:flex;flex-direction:column;justify-content:space-between;position:relative}
          .egf .footer-lucky-graphic{position:absolute;top:-36px;right:40px;z-index:10;display:flex;flex-direction:column;align-items:flex-start;gap:6px}
          .egf .lucky-cube{width:96px;height:96px;border-radius:22px;transform:rotate(-10deg);background:linear-gradient(135deg,#5b9ffb 0%,#1e5dd7 55%,#1448be 100%);box-shadow:inset 3px 3px 8px rgba(255,255,255,.35),inset -3px -3px 12px rgba(0,0,0,.18),8px 14px 28px rgba(20,72,200,.35);display:grid;place-items:center}
          .egf .lucky-cube-mark{font-size:42px;font-weight:700;color:#fff;letter-spacing:-.04em;transform:rotate(10deg);text-shadow:0 3px 6px rgba(0,0,0,.25);line-height:1}
          .egf .lucky-text-row{display:flex;gap:6px;align-items:center;transform:rotate(-4deg);margin-top:4px}
          .egf .lucky-arrow{width:22px;height:22px;color:#9ca3af}
          .egf .lucky-arrow svg{width:100%;height:100%}
          .egf .lucky-arrow path{stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
          .egf .lucky-text{font-size:21px;font-weight:600;color:#9ca3af;white-space:nowrap}

          .egf .footer-right-top{padding-top:8px}
          .egf .footer-nav-cols{display:flex;gap:72px}
          .egf .footer-col-title{font-size:24px;font-weight:600;font-style:italic;color:#9ca3af;margin-bottom:18px}
          .egf .footer-col a{display:block;font-size:14px;font-weight:600;color:#111827;margin-bottom:14px;text-decoration:none;transition:color .2s}
          .egf .footer-col a:hover{color:#1f65d6}

          .egf .footer-bottom{display:flex;align-items:flex-end;justify-content:space-between;margin-top:48px;gap:24px;flex-wrap:wrap}
          .egf .footer-copyright{font-size:12.5px;font-weight:500;color:#9ca3af}
          .egf .footer-cta-mini{display:flex;flex-direction:column;gap:14px}
          .egf .footer-cta-mini h4{font-size:15px;font-weight:400;color:#6b7280;line-height:1.45}
          .egf .footer-cta-mini h4 strong{display:block;font-size:19px;font-weight:700;color:#111827}
          .egf .footer-subscribe-row{display:flex;width:310px;max-width:100%;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:5px;box-shadow:0 2px 10px rgba(0,0,0,.04)}
          .egf .footer-subscribe-row input{flex:1;min-width:0;padding:11px 14px;background:transparent;border:0;outline:none;font-family:var(--font-geist-sans),sans-serif;font-size:13.5px;color:#111827}
          .egf .footer-subscribe-row input::placeholder{color:#9ca3af}
          .egf .footer-subscribe-row button{padding:11px 22px;background:#111214;color:#fff;font-family:var(--font-geist-sans),sans-serif;font-size:13.5px;font-weight:600;border:0;border-radius:8px;cursor:pointer;white-space:nowrap;box-shadow:0 6px 20px rgba(0,0,0,.28),0 2px 8px rgba(0,0,0,.15);transition:background .2s,box-shadow .2s,transform .15s}
          .egf .footer-subscribe-row button:hover{background:#000;transform:translateY(-1px);box-shadow:0 10px 26px rgba(0,0,0,.4),0 3px 10px rgba(0,0,0,.2)}
          .egf .footer-subscribed{font-size:13.5px;font-weight:600;color:#1f65d6;padding:6px 2px}

          .egf .footer-watermark{max-width:1150px;margin:-60px auto 0;pointer-events:none;user-select:none;position:relative;z-index:0;line-height:0}
          .egf .footer-watermark svg{display:block;width:100%;height:auto;overflow:visible}
          .egf .footer-watermark text{font-family:var(--font-geist-sans),sans-serif;font-weight:700;letter-spacing:-.03em;fill:rgba(0,0,0,.04)}

          @media(max-width:860px){
            .egf{padding-bottom:104px}
            .egf .footer-wrapper{grid-template-columns:1fr}
            .egf .footer-left{min-height:auto;gap:40px}
          }
          @media(max-width:560px){
            .egf .footer-right{padding:24px}
            .egf .footer-nav-cols{gap:40px}
            .egf .footer-bottom{flex-direction:column;align-items:flex-start;gap:24px}
            .egf .footer-subscribe-row{width:100%}
            .egf .footer-lucky-graphic{right:12px;top:-28px}
            .egf .lucky-cube{width:72px;height:72px}
            .egf .lucky-cube-mark{font-size:32px}
          }`,
        }}
      />

      <div className="footer-wrapper">
        {/* LEFT — video card */}
        <div className="footer-left">
          <video
            className="footer-left-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          <div className="footer-logo">
            <span className="footer-logo-mark">E</span>
            <span className="footer-logo-name">Empire Group</span>
          </div>

          <div className="footer-tagline-container">
            <p className="footer-tagline">
              Aqlli IT-yechimlar,
              <br />
              <span>AI bilan kuchaytirilgan.</span>
            </p>
          </div>

          <div className="footer-social-row">
            <span className="footer-social-label cav">Bog&apos;lanib turing!</span>
            <div className="footer-social-icons">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="social-icon"
                >
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — light card */}
        <div className="footer-right">
          {/* floating lucky badge */}
          <div className="footer-lucky-graphic" aria-hidden>
            <div className="lucky-cube">
              <span className="lucky-cube-mark">E</span>
            </div>
            <div className="lucky-text-row">
              <span className="lucky-arrow">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 20 C 6 14, 10 9, 18 5" />
                  <path d="M18 5 L 12 5" />
                  <path d="M18 5 L 18 11" />
                </svg>
              </span>
              <span className="lucky-text cav">Boshlaymizmi?</span>
            </div>
          </div>

          <div className="footer-right-top">
            <div className="footer-nav-cols">
              {cols.map((col) => (
                <div className="footer-col" key={col.title}>
                  <div className="footer-col-title cav">{col.title}</div>
                  {col.links.map((link) => (
                    <a key={link.label} href={sectionHref(link.href)}>
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">{t.footer.copyright}</div>
            <div className="footer-cta-mini">
              <h4>
                AI tez rivojlanadi.
                <strong>Empire bilan oldinda turing.</strong>
              </h4>
              {subscribed ? (
                <div className="footer-subscribed">Rahmat! Tez orada bog&apos;lanamiz. ✓</div>
              ) : (
                <div className="footer-subscribe-row">
                  <input
                    type="email"
                    placeholder="Email manzilingiz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubscribe()}
                    aria-label="Email manzilingiz"
                  />
                  <button type="button" onClick={onSubscribe}>
                    Obuna
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* watermark */}
      <div className="footer-watermark" aria-hidden>
        <svg
          ref={svgRef}
          viewBox="62 95 876 175"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text ref={textRef} x="500" y="240" textAnchor="middle" fontSize="320">
            Empire
          </text>
        </svg>
      </div>
    </section>
  );
}
