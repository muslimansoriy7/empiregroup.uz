import { cn } from "@/lib/cn";

/* Accent gradient stops — used sparingly inside mockups (charts, chips). */
const ACCENTS = {
  develop: ["#007cf0", "#00dfd8"],
  preview: ["#7928ca", "#ff0080"],
  ship: ["#ff4d4d", "#f9cb28"],
} as const;

export type Accent = keyof typeof ACCENTS;

function accentCss(accent: Accent) {
  const [a, b] = ACCENTS[accent];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

/* ---- Reusable area chart (ink axes + accent fill) ---- */
function AreaChart({
  accent,
  className,
  points = "0,30 14,22 28,26 42,14 56,18 70,9 84,13 100,4",
}: {
  accent: Accent;
  className?: string;
  points?: string;
}) {
  const id = `area-${accent}`;
  const [a, b] = ACCENTS[accent];
  return (
    <svg
      viewBox="0 0 100 36"
      preserveAspectRatio="none"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a} stopOpacity="0.28" />
          <stop offset="100%" stopColor={b} stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      <polygon points={`0,36 ${points} 100,36`} fill={`url(#${id})`} />
      <polyline
        points={points}
        fill="none"
        stroke={`url(#${id}-line)`}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Bars({ accent }: { accent: Accent }) {
  const heights = [40, 64, 52, 78, 58, 88, 70];
  return (
    <div className="flex h-full items-end gap-1.5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${h}%`,
            background:
              i === 5 ? accentCss(accent) : "var(--color-hairline)",
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   CRM dashboard (browser)
   ============================================================ */
export function CrmMock() {
  const rows = [
    { name: "Akme Trade", stage: "Taklif", sum: "12.4M" },
    { name: "Orzu Klinika", stage: "Muzokara", sum: "8.1M" },
    { name: "Bek Logistics", stage: "Yopilgan", sum: "24.0M" },
    { name: "Sara Beauty", stage: "Yangi", sum: "3.6M" },
  ];
  return (
    <div className="flex min-h-[300px] text-ink sm:min-h-[420px]">
      {/* sidebar */}
      <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-hairline p-4 sm:flex">
        <div className="mb-3 flex items-center gap-2">
          <span className="size-5 rounded-md bg-ink" />
          <span className="font-mono text-[11px] font-medium">Shift CRM</span>
        </div>
        {["Boshqaruv", "Mijozlar", "Bitimlar", "To'lovlar", "Hisobot"].map(
          (item, i) => (
            <div
              key={item}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-[12px]",
                i === 2
                  ? "bg-canvas font-medium text-ink"
                  : "text-mute"
              )}
            >
              {item}
            </div>
          )
        )}
      </aside>

      {/* main */}
      <div className="flex-1 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[15px] font-semibold tracking-tight">
              Bitimlar
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-faint">
              Iyun 2026
            </div>
          </div>
          <div className="flex h-7 items-center rounded-[var(--radius-pill)] bg-ink px-3 text-[11px] font-medium text-elevated">
            Yangi bitim
          </div>
        </div>

        {/* stat cards */}
        <div className="mb-3 grid grid-cols-3 gap-2.5">
          {[
            { k: "Jami", v: "142", d: "+12%" },
            { k: "Bu oy", v: "₿48.1M", d: "+8%" },
            { k: "Konversiya", v: "32%", d: "+5%" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-[var(--radius-card)] border border-hairline p-2.5"
            >
              <div className="font-mono text-[10px] uppercase tracking-wide text-faint">
                {s.k}
              </div>
              <div className="mt-1 text-[15px] font-semibold tracking-tight">
                {s.v}
              </div>
              <div className="text-[10px] text-mute">{s.d}</div>
            </div>
          ))}
        </div>

        {/* chart */}
        <div className="mb-3 h-20 rounded-[var(--radius-card)] border border-hairline p-3">
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-faint">
            Savdo dinamikasi
          </div>
          <div className="h-10">
            <AreaChart accent="develop" />
          </div>
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-hairline">
          {rows.map((r, i) => (
            <div
              key={r.name}
              className={cn(
                "flex items-center justify-between px-3 py-2 text-[12px]",
                i !== rows.length - 1 && "border-b border-hairline"
              )}
            >
              <span className="font-medium">{r.name}</span>
              <span className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] text-mute">
                {r.stage}
              </span>
              <span className="font-mono text-[11px] text-ink">{r.sum}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ERP dashboard (browser)
   ============================================================ */
export function ErpMock() {
  return (
    <div className="min-h-[300px] p-4 text-ink sm:min-h-[420px] sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[15px] font-semibold tracking-tight">
            Ombor boshqaruvi
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-faint">
            Real vaqt · 3 ombor
          </div>
        </div>
        <div className="flex gap-1.5">
          {["Kun", "Hafta", "Oy"].map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px]",
                i === 1
                  ? "bg-ink text-elevated"
                  : "border border-hairline text-mute"
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-3 grid grid-cols-4 gap-2.5">
        {[
          { k: "SKU", v: "1 248" },
          { k: "Zaxira", v: "94%" },
          { k: "Yetkazish", v: "2.1k" },
          { k: "Kam qolgan", v: "37" },
        ].map((s) => (
          <div
            key={s.k}
            className="rounded-[var(--radius-card)] border border-hairline p-2.5"
          >
            <div className="font-mono text-[10px] uppercase tracking-wide text-faint">
              {s.k}
            </div>
            <div className="mt-1 text-[15px] font-semibold tracking-tight">
              {s.v}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <div className="col-span-2 h-28 rounded-[var(--radius-card)] border border-hairline p-3">
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-faint">
            Ta'minot oqimi
          </div>
          <div className="h-[72px]">
            <AreaChart accent="ship" points="0,30 16,18 32,24 48,10 64,16 80,6 100,11" />
          </div>
        </div>
        <div className="h-28 rounded-[var(--radius-card)] border border-hairline p-3">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-wide text-faint">
            Kategoriya
          </div>
          <div className="h-[60px]">
            <Bars accent="ship" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Mobile delivery app (phone)
   ============================================================ */
export function AppMock() {
  const orders = [
    { t: "Buyurtma #1042", s: "Yo'lda", v: "84 000" },
    { t: "Buyurtma #1041", s: "Yetkazildi", v: "126 000" },
    { t: "Buyurtma #1040", s: "Tayyorlanmoqda", v: "52 000" },
  ];
  return (
    <div className="flex min-h-[480px] flex-col bg-canvas text-ink">
      {/* status + header */}
      <div className="px-5 pb-3 pt-10">
        <div className="font-mono text-[10px] uppercase tracking-wider text-faint">
          Xush kelibsiz
        </div>
        <div className="text-[17px] font-semibold tracking-tight">Shift Go</div>
      </div>

      {/* balance card with accent */}
      <div className="px-5">
        <div
          className="rounded-[var(--radius-card-lg)] p-4 text-white"
          style={{ background: accentCss("preview") }}
        >
          <div className="text-[11px] opacity-80">Bugungi tushum</div>
          <div className="mt-1 text-[24px] font-semibold tracking-tight">
            ₿1.24M
          </div>
          <div className="mt-3 flex gap-2 text-[10px]">
            <span className="rounded-full bg-white/20 px-2 py-0.5">
              +18% kecha
            </span>
            <span className="rounded-full bg-white/20 px-2 py-0.5">
              42 buyurtma
            </span>
          </div>
        </div>
      </div>

      {/* orders */}
      <div className="mt-4 px-5">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-wide text-faint">
          So'nggi buyurtmalar
        </div>
        <div className="flex flex-col gap-2">
          {orders.map((o) => (
            <div
              key={o.t}
              className="flex items-center justify-between rounded-[var(--radius-card)] border border-hairline bg-elevated px-3 py-2.5"
            >
              <div>
                <div className="text-[12px] font-medium">{o.t}</div>
                <div className="text-[10px] text-mute">{o.s}</div>
              </div>
              <div className="font-mono text-[12px]">{o.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* bottom tab bar */}
      <div className="mt-auto flex items-center justify-around border-t border-hairline bg-elevated px-6 py-3 pb-5">
        {[true, false, false, false].map((active, i) => (
          <span
            key={i}
            className={cn(
              "size-5 rounded-md",
              active ? "bg-ink" : "bg-hairline"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Ecommerce store (browser)
   ============================================================ */
export function ShopMock() {
  const products = [
    { n: "Mahsulot", p: "189 000" },
    { n: "Mahsulot", p: "240 000" },
    { n: "Mahsulot", p: "75 000" },
    { n: "Mahsulot", p: "320 000" },
    { n: "Mahsulot", p: "112 000" },
    { n: "Mahsulot", p: "96 000" },
  ];
  return (
    <div className="min-h-[300px] p-4 text-ink sm:min-h-[420px] sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[15px] font-semibold tracking-tight">Katalog</div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-hairline px-3 py-1 text-[11px] text-mute">
            Filtr
          </span>
          <span className="flex h-7 items-center gap-1.5 rounded-full bg-ink px-3 text-[11px] text-elevated">
            Savat · 3
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {products.map((pr, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[var(--radius-card)] border border-hairline"
          >
            <div className="flex h-16 items-center justify-center bg-canvas">
              <span
                className="size-7 rounded-md"
                style={{
                  background:
                    i % 3 === 0 ? accentCss("develop") : "var(--color-hairline)",
                }}
              />
            </div>
            <div className="border-t border-hairline p-2">
              <div className="text-[11px] font-medium">{pr.n}</div>
              <div className="font-mono text-[10px] text-mute">{pr.p}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   MiniMock — compact thumbnail for portfolio cards
   ============================================================ */
export function MiniMock({
  type,
  accent,
}: {
  type: "browser" | "phone";
  accent: Accent;
}) {
  if (type === "phone") {
    return (
      <div className="flex h-full flex-col bg-canvas p-4 text-ink">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-hairline" />
        <div
          className="rounded-[var(--radius-card)] p-3 text-white"
          style={{ background: accentCss(accent) }}
        >
          <div className="text-[9px] opacity-80">Balans</div>
          <div className="text-[15px] font-semibold tracking-tight">₿2.4M</div>
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border border-hairline bg-elevated px-2 py-1.5"
            >
              <span className="h-1.5 w-12 rounded-full bg-hairline" />
              <span className="h-1.5 w-6 rounded-full bg-hairline" />
            </div>
          ))}
        </div>
        <div className="mt-auto flex justify-around pt-3">
          {[true, false, false].map((a, i) => (
            <span
              key={i}
              className={cn("size-3.5 rounded", a ? "bg-ink" : "bg-hairline")}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full text-ink">
      <div className="hidden w-16 shrink-0 flex-col gap-1.5 border-r border-hairline p-3 sm:flex">
        <span className="size-3 rounded bg-ink" />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-1.5 w-full rounded-full bg-hairline" />
        ))}
      </div>
      <div className="flex-1 p-3">
        <div className="mb-2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 rounded-md border border-hairline p-1.5"
            >
              <span className="block h-1 w-6 rounded-full bg-hairline" />
              <span className="mt-1 block h-2 w-8 rounded-full bg-ink/80" />
            </div>
          ))}
        </div>
        <div className="mb-2 h-12 rounded-md border border-hairline p-2">
          <AreaChart accent={accent} />
        </div>
        <div className="flex flex-col gap-1.5">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border border-hairline px-2 py-1.5"
            >
              <span className="h-1.5 w-16 rounded-full bg-hairline" />
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: accentCss(accent) }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
