"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const GridIcon = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const WorkIcon = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);
const FlowIcon = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M7 6h8a2 2 0 0 1 2 2v8" />
    <path d="M5 8v6a2 2 0 0 0 2 2h6" opacity="0.5" />
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" {...stroke}>
    <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z" />
  </svg>
);

export function MobileDock() {
  const { t } = useI18n();
  const [active, setActive] = useState<string>("");

  const items = [
    { id: "xizmatlar", label: t.nav.links[0].label, Icon: GridIcon },
    { id: "loyihalar", label: t.nav.links[2].label, Icon: WorkIcon },
    { id: "jarayon", label: t.nav.links[1].label, Icon: FlowIcon },
    { id: "aloqa", label: "Aloqa", Icon: ChatIcon },
  ];

  // scroll-spy: the dock button whose section is centred in the viewport
  // becomes the active (dark) one.
  useEffect(() => {
    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden">
      <nav
        aria-label="Tezkor menyu"
        className="pointer-events-auto flex items-center gap-1 rounded-[22px] border border-hairline bg-elevated/85 p-1.5 shadow-[var(--shadow-float)] backdrop-blur-xl"
      >
        {items.map(({ id, label, Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
            onClick={() => setActive(id)}
            className={cn(
              "flex min-w-[62px] flex-col items-center gap-1 rounded-2xl px-2 py-1.5 text-[10px] font-medium transition-colors duration-300",
              active === id
                ? "bg-ink text-elevated"
                : "text-mute active:bg-canvas"
            )}
          >
            <span className="[&>svg]:size-[22px]">
              <Icon />
            </span>
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
