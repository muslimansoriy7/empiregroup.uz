"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { ConsultForm } from "./ConsultForm";
import { Close } from "./Icons";

type ConsultValue = { open: () => void; close: () => void; isOpen: boolean };
const ConsultContext = createContext<ConsultValue | null>(null);

export function useConsult(): ConsultValue {
  const ctx = useContext(ConsultContext);
  if (!ctx) throw new Error("useConsult must be used within <ConsultProvider>");
  return ctx;
}

// once the visitor is engaged, don't auto-pop again this browser session
const AUTO_KEY = "sd_consult_autoshown";
const AUTO_DELAY = 60_000; // 60s

/**
 * The homepage carries its own lead form and its own prompt. Letting the shared
 * modal fire there would put two dialogs on screen at once, in two different
 * visual languages. Matches `/`, `/ru` and `/en`.
 */
const HAS_OWN_FORM = /^\/(?:ru|en)?\/?$/;

export function ConsultProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();
  const hasOwnForm = HAS_OWN_FORM.test(pathname || "/");
  const open = useCallback(() => {
    // any manual open counts as "shown" so the timer won't pop it again
    try {
      sessionStorage.setItem(AUTO_KEY, "1");
    } catch {}
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  // auto-open the consultation form once, ~60s into the visit
  useEffect(() => {
    if (hasOwnForm) return;
    try {
      if (sessionStorage.getItem(AUTO_KEY)) return;
    } catch {}
    const id = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(AUTO_KEY)) return; // opened meanwhile
        sessionStorage.setItem(AUTO_KEY, "1");
      } catch {}
      setOpen(true);
    }, AUTO_DELAY);
    return () => window.clearTimeout(id);
  }, [hasOwnForm]);

  return (
    <ConsultContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ConsultModal isOpen={isOpen} onClose={close} />
    </ConsultContext.Provider>
  );
}

function ConsultModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const c = t.consult;
  const ref = useRef<HTMLDialogElement>(null);

  // sync native dialog open state
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (isOpen && !dlg.open) {
      dlg.showModal();
    } else if (!isOpen && dlg.open) {
      dlg.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      className="consult-dialog"
      aria-labelledby="consult-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // click on backdrop
      }}
    >
      <div className="relative w-full">
        <button
          type="button"
          onClick={onClose}
          aria-label={c.close}
          className="absolute right-0 top-0 z-10 grid size-9 place-items-center rounded-[var(--radius-btn)] text-mute transition-colors hover:bg-canvas hover:text-ink"
        >
          <Close className="size-[18px]" />
        </button>

        {/* remount on each open → fresh fields + autofocus */}
        <ConsultForm
          key={isOpen ? "open" : "closed"}
          autoFocusFirst
          onClose={onClose}
          header={
            <div className="pr-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-mute">
                <span className="size-1.5 rounded-full bg-link" />
                Empire Group
              </span>
              <h2 id="consult-title" className="mt-4 text-h3 text-ink">
                {c.title}
              </h2>
              <p className="mt-2 text-sm text-body">{c.subtitle}</p>
            </div>
          }
        />
      </div>
    </dialog>
  );
}
