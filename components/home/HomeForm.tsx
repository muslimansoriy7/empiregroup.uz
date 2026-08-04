"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

/**
 * The lead form in v3's own language.
 *
 * It posts to the same `/api/leads` endpoint the main site uses — Supabase
 * `leads` plus a Telegram ping — so nothing about lead capture changes; only
 * the presentation does. Rebuilding the transport here would have meant two
 * places to keep working.
 */

type Status = "idle" | "sending" | "success";

export function HomeForm({
  compact = false,
  ns = "vx",
}: {
  compact?: boolean;
  /** Class-name namespace so the same form can wear either page skin. */
  ns?: "vx" | "nx";
}) {
  const { t } = useI18n();
  const c = t.consult;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot: a real person never sees this, so anything in it is a bot.
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const next: { name?: string; phone?: string } = {};
    if (!name.trim()) next.name = c.errorRequired;
    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) next.phone = c.errorRequired;
    else if (digits.length < 7) next.phone = c.errorPhone;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;
    setSubmitError(null);
    setStatus("sending");
    try {
      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          service: service.trim(),
          budget: budget.trim(),
          message: message.trim(),
          company_website: companyWebsite,
          source_page:
            typeof window !== "undefined" ? window.location.pathname : "/",
          utm_source: params.get("utm_source") || undefined,
          utm_medium: params.get("utm_medium") || undefined,
          utm_campaign: params.get("utm_campaign") || undefined,
        }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) throw new Error("request_failed");
      setName("");
      setPhone("");
      setService("");
      setBudget("");
      setMessage("");
      setStatus("success");
    } catch {
      setStatus("idle");
      setSubmitError(c.errorSubmit);
    }
  };

  if (status === "success") {
    return (
      <div className={`${ns}-form ${ns}-form-done`} role="status">
        <span className={`${ns}-form-check`} aria-hidden="true">
          ✓
        </span>
        <h3 className={`${ns}-card-title`}>{c.successTitle}</h3>
        <p className={`${ns}-card-desc`}>{c.successBody}</p>
      </div>
    );
  }

  return (
    <form className={`${ns}-form`} onSubmit={onSubmit} noValidate>
      <div className={`${ns}-form-row`}>
        <label className={`${ns}-field`}>
          <span className={`${ns}-mono-label`}>{c.nameLabel}</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={c.namePlaceholder}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span className={`${ns}-field-err`}>{errors.name}</span>}
        </label>

        <label className={`${ns}-field`}>
          <span className={`${ns}-mono-label`}>{c.phoneLabel}</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={c.phonePlaceholder}
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && <span className={`${ns}-field-err`}>{errors.phone}</span>}
        </label>
      </div>

      <div className={`${ns}-form-row`}>
        <label className={`${ns}-field`}>
          <span className={`${ns}-mono-label`}>{c.fieldLabel}</span>
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">{c.fieldPlaceholder}</option>
            {c.fieldOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>

        <label className={`${ns}-field`}>
          <span className={`${ns}-mono-label`}>{c.budgetLabel}</span>
          <select value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">{c.budgetPlaceholder}</option>
            {c.budgetOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!compact && (
        <label className={`${ns}-field`}>
          <span className={`${ns}-mono-label`}>{c.messageLabel}</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={c.messagePlaceholder}
            rows={4}
          />
        </label>
      )}

      {/* Honeypot — off-screen, never announced, never focusable by tab. */}
      <input
        className={`${ns}-hp`}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={companyWebsite}
        onChange={(e) => setCompanyWebsite(e.target.value)}
      />

      {submitError && (
        <p className={`${ns}-field-err ${ns}-form-error`} role="alert">
          {submitError}
        </p>
      )}

      <button
        className={
          ns === "nx"
            ? "nx-btn nx-btn-solid nx-btn-lg nx-btn-block"
            : "vx-btn vx-btn-filled vx-btn-lg vx-btn-block"
        }
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? c.sending : c.submit}
      </button>

      <p className={`${ns}-mono-label ${ns}-form-note`}>{c.privacy}</p>
    </form>
  );
}
