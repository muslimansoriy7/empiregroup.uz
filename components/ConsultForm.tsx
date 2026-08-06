"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { reportLeadConversion } from "@/lib/analytics";
import { Button } from "./Button";
import { Check, ArrowRight, Telegram } from "./Icons";

type Status = "idle" | "sending" | "success";

const TELEGRAM = "https://t.me/muslimansoriy";

/**
 * Shared consultation form. Used both inside the ConsultModal popup and
 * inline in the contact (Aloqa) section.
 */
export function ConsultForm({
  header,
  autoFocusFirst = false,
  onClose,
  geoCity,
  defaultField = "",
}: {
  /** optional heading rendered above the fields; hidden on success */
  header?: React.ReactNode;
  /** focus the first field on mount (used by the modal on open) */
  autoFocusFirst?: boolean;
  /** when provided, a "close" affordance is shown after success (modal) */
  onClose?: () => void;
  /** city slug recorded on the lead — set by the /xizmatlar landing pages */
  geoCity?: string;
  /** preselects the service dropdown (landing pages know what was clicked) */
  defaultField?: string;
}) {
  const { t } = useI18n();
  const c = t.consult;
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [field, setField] = useState(defaultField);
  // When the visitor picks "Boshqa/Other" they type their own direction here.
  const [fieldOther, setFieldOther] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot: invisible to people, irresistible to bots. The API treats a
  // filled value as spam and silently drops the submission.
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  // "Boshqa" selected → the typed value is what we actually record/send.
  const isOtherField = field === c.fieldOtherLabel;
  const resolvedField = isOtherField ? fieldOther.trim() : field.trim();

  useEffect(() => {
    if (!autoFocusFirst) return;
    const id = requestAnimationFrame(() => firstFieldRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [autoFocusFirst]);

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
      // Empire CMS lead endpoint — writes to Supabase `leads` and pings Telegram.
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
          service: resolvedField,
          budget: budget.trim(),
          message: message.trim(),
          company_website: companyWebsite,
          source_page:
            typeof window !== "undefined" ? window.location.pathname : "/",
          geo_city: geoCity || undefined,
          utm_source: params.get("utm_source") || undefined,
          utm_medium: params.get("utm_medium") || undefined,
          utm_campaign: params.get("utm_campaign") || undefined,
        }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) throw new Error("request_failed");
      setName("");
      setPhone("");
      setField(defaultField);
      setFieldOther("");
      setBudget("");
      setMessage("");
      setStatus("success");
      reportLeadConversion(payload?.leadId, "consult_form");
    } catch {
      setStatus("idle");
      setSubmitError(c.errorSubmit);
    }
  };

  // Telegram deep-link — carries whatever the visitor has already typed.
  const tgHref = `${TELEGRAM}?text=${encodeURIComponent(
    [
      c.telegramPrefill,
      name.trim() && `${c.nameLabel}: ${name}`,
      phone.trim() && `${c.phoneLabel}: ${phone}`,
      resolvedField && `${c.fieldLabel}: ${resolvedField}`,
      message.trim() && `${c.messageLabel}: ${message}`,
    ]
      .filter(Boolean)
      .join("\n")
  )}`;

  if (status === "success") {
    return (
      <div className="py-6 text-center">
        <div
          className="mx-auto grid size-14 place-items-center rounded-full text-white"
          style={{ background: "linear-gradient(135deg,#007cf0,#00dfd8)" }}
        >
          <Check className="size-7" />
        </div>
        <h3 className="mt-5 text-h3 text-ink">{c.successTitle}</h3>
        <p className="mx-auto mt-2 max-w-xs text-sm text-body">{c.successBody}</p>
        <div className="mt-6 flex flex-col gap-2">
          <a
            href={tgHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-ink px-5 text-sm font-medium text-elevated transition-colors hover:bg-ink-hover"
          >
            <Telegram className="size-4" /> Telegram
          </a>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="h-10 text-sm text-mute transition-colors hover:text-ink"
            >
              {c.close}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {header}
      <form
        onSubmit={onSubmit}
        noValidate
        className={header ? "mt-6 flex flex-col gap-4" : "flex flex-col gap-4"}
      >
      {/* urgency: live-response + scarcity */}
      <div className="flex items-center gap-2.5 rounded-[var(--radius-card)] border border-hairline bg-canvas px-3.5 py-2.5">
        <span className="relative flex size-2.5 shrink-0" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-[#22c55e]" />
        </span>
        <span className="text-[12.5px] leading-snug text-body">
          <span className="font-medium text-ink">{c.responseBadge}</span>
          {" · "}
          {c.urgency}
        </span>
      </div>

      <Field label={c.nameLabel} error={errors.name}>
        <input
          ref={firstFieldRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={c.namePlaceholder}
          className="consult-input"
          aria-invalid={!!errors.name}
        />
      </Field>

      <Field label={c.phoneLabel} error={errors.phone}>
        <input
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={c.phonePlaceholder}
          className="consult-input"
          aria-invalid={!!errors.phone}
        />
      </Field>

      <Field label={c.fieldLabel}>
        <Select
          value={field}
          onChange={setField}
          placeholder={c.fieldPlaceholder}
          options={[...c.fieldOptions, c.fieldOtherLabel]}
        />
        {isOtherField && (
          <input
            type="text"
            value={fieldOther}
            onChange={(e) => setFieldOther(e.target.value)}
            placeholder={c.fieldOtherPlaceholder}
            className="consult-input mt-2"
            autoFocus
            aria-label={c.fieldOtherPlaceholder}
          />
        )}
      </Field>

      <Field label={c.budgetLabel}>
        <Select
          value={budget}
          onChange={setBudget}
          placeholder={c.budgetPlaceholder}
          options={c.budgetOptions}
        />
      </Field>

      <Field label={c.messageLabel}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={c.messagePlaceholder}
          rows={3}
          className="consult-input !h-auto resize-none py-2.5"
        />
      </Field>

      {/* honeypot — off-screen, not focusable, not announced */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label>
          Company website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
          />
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mt-1 w-full"
        disabled={status === "sending"}
      >
        {status === "sending" ? c.sending : c.submit}
        {status !== "sending" && <ArrowRight className="size-4" />}
      </Button>

      {submitError && (
        <p
          role="alert"
          className="rounded-[var(--radius-card)] border border-[#ee0000]/20 bg-[#ee0000]/5 px-3.5 py-2.5 text-center text-[12.5px] leading-snug text-[#c00]"
        >
          {submitError}
        </p>
      )}

      {/* Telegram — the channel most Uzbek visitors prefer over a form */}
      <div className="flex items-center gap-3 text-[12px] text-faint">
        <span className="h-px flex-1 bg-hairline" />
        {c.orLabel}
        <span className="h-px flex-1 bg-hairline" />
      </div>
      <a
        href={tgHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-hairline bg-elevated text-sm font-medium text-ink transition-colors hover:border-ink/30 hover:bg-canvas"
      >
        <Telegram className="size-[18px] text-[#229ED9]" />
        {c.telegramCta}
      </a>

        <p className="text-center text-[12px] text-faint">{c.privacy}</p>
      </form>
    </>
  );
}

function Select({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="consult-input appearance-none pr-9"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-faint"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-ink">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-[12px] text-[#ee0000]">{error}</span>
      )}
    </label>
  );
}
