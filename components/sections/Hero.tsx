"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "../Button";
import { ArrowRight } from "../Icons";
import { useI18n } from "@/lib/i18n";
import { useConsult } from "../ConsultModal";

/**
 * Hero — Questly design direction. A cool light ground with soft atmospheric
 * blooms, a clean Nimbus (grotesque) headline from the i18n dictionary, pill
 * CTAs, and a real Empire product preview (Motor Lux CRM) floating in a frosted
 * card that rises from a grass strip at the fold. Entrance is CSS fade-up
 * (reliable across SSR); all copy stays in the dictionary (uz/ru/en).
 */
const GRASS =
  "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781191264/grass_eam204.png";

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d={d} />
    </svg>
  );
}

export function Hero() {
  const { t } = useI18n();
  const { open: openConsult } = useConsult();
  const hero = t.hero;
  const [before, after = ""] = hero.title.split("{word}");
  const word = hero.rotatingWords?.[0] ?? "";

  return (
    <section id="top" className="hero-q relative overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `.hero-q .u{opacity:0;transform:translateY(20px);animation:qUp .8s cubic-bezier(.22,1,.36,1) forwards}
          @keyframes qUp{to{opacity:1;transform:none}}
          .hero-q .bg{position:absolute;inset:0;z-index:0;overflow:hidden;background:linear-gradient(180deg,#eef2f7 0%,#f4f7fa 46%,var(--color-canvas) 100%)}
          .hero-q .bg span{position:absolute;border-radius:50%;filter:blur(90px)}
          .hero-q .b1{top:-14%;left:-2%;width:50%;height:64%;background:radial-gradient(circle,rgba(174,205,244,.75),transparent 70%);animation:qFloat 22s ease-in-out infinite}
          .hero-q .b2{top:-8%;right:-6%;width:46%;height:60%;background:radial-gradient(circle,rgba(210,200,240,.68),transparent 70%);animation:qFloat 28s ease-in-out infinite reverse}
          .hero-q .b3{top:26%;left:36%;width:42%;height:52%;background:radial-gradient(circle,rgba(186,234,210,.5),transparent 70%);animation:qFloat 32s ease-in-out infinite}
          @keyframes qFloat{50%{transform:translateY(34px) scale(1.08)}}
          [data-theme="dark"] .hero-q .bg{background:linear-gradient(180deg,#10151d 0%,#0c0f14 50%,var(--color-canvas) 100%)}
          [data-theme="dark"] .hero-q .b1{background:radial-gradient(circle,rgba(60,110,180,.32),transparent 70%)}
          [data-theme="dark"] .hero-q .b2{background:radial-gradient(circle,rgba(110,90,170,.28),transparent 70%)}
          [data-theme="dark"] .hero-q .b3{background:radial-gradient(circle,rgba(60,150,110,.22),transparent 70%)}
          @media(prefers-reduced-motion:reduce){.hero-q .u{opacity:1;transform:none;animation:none}.hero-q .bg span{animation:none}}`,
        }}
      />

      {/* atmosphere */}
      <div className="bg" aria-hidden><span className="b1" /><span className="b2" /><span className="b3" /></div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-4 pt-20 text-center sm:pt-24">
        <div className="u mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-elevated/80 px-4 py-1.5 text-sm text-mute backdrop-blur-sm" style={{ animationDelay: "0s" }}>
          <span className="inline-block size-1.5 rounded-full bg-ink/70" />
          {hero.eyebrow}
        </div>

        <h1 className="u max-w-3xl text-balance text-4xl font-semibold leading-[1.03] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[64px]" style={{ animationDelay: ".1s" }}>
          {before}
          <span className="text-ink/55">{word}</span>
          {after}
        </h1>

        <p className="u mt-5 max-w-[620px] text-base leading-relaxed text-body md:text-lg" style={{ animationDelay: ".22s" }}>
          {hero.subtitle}
        </p>

        <div className="u mt-7 flex flex-col items-center gap-3 sm:flex-row" style={{ animationDelay: ".34s" }}>
          <Button onClick={openConsult} variant="primary" size="lg" className="w-full sm:w-auto">
            {hero.primaryCta.label}
            <ArrowRight className="size-4" />
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary" size="lg" className="w-full sm:w-auto">
            {hero.secondaryCta.label}
          </Button>
        </div>

        {/* product preview — Motor Lux CRM (real project), floating on grass */}
        <div className="u relative mt-12 w-full max-w-5xl sm:mt-16" style={{ animationDelay: ".5s" }}>
          <div className="relative z-10 overflow-hidden rounded-2xl p-2.5 md:p-3.5" style={{ background: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 30px 90px -18px rgba(15,20,35,0.18), 0 0 0 1px rgba(0,0,0,0.04)" }}>
            <Dashboard />
          </div>
          {/* grass strip — the Questly signature, tucked at the fold */}
          <img src={GRASS} alt="" className="pointer-events-none absolute -bottom-6 left-1/2 z-20 w-[130%] max-w-none -translate-x-1/2 select-none opacity-90 sm:-bottom-10" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Motor Lux dashboard (coded, real Empire project) ---------- */
function Dashboard() {
  return (
    <div className="pointer-events-none select-none overflow-hidden rounded-xl bg-white text-left text-[11px]" style={{ color: "#1b1f24", border: "1px solid #ececec" }}>
      <div className="flex items-center gap-3 border-b px-3 py-2.5" style={{ borderColor: "#ececec" }}>
        <div className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-[6px] text-[10px] font-bold text-white" style={{ background: "#1b1f24" }}>M</span>
          <span className="font-semibold">Motor Lux</span><span style={{ color: "#98a0a8" }}>⌄</span>
        </div>
        <div className="mx-auto flex w-1/2 items-center justify-between rounded-md px-2 py-1" style={{ background: "#f4f5f6", color: "#8a929b" }}>
          <span>Qidirish...</span><span className="rounded bg-white px-1 text-[9px]">⌘K</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full px-2.5 py-1 text-[10px] font-medium text-white" style={{ background: "#6366f1" }}>Yangi buyurtma</span>
          <span className="h-3.5 w-3.5" style={{ color: "#8a929b" }}><Icon d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /></span>
          <span className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-semibold text-white" style={{ background: "#6366f1" }}>AK</span>
        </div>
      </div>
      <div className="flex">
        <aside className="hidden w-40 shrink-0 border-r p-2 sm:block" style={{ borderColor: "#ececec" }}>
          {[["Boshqaruv paneli", true], ["Buyurtmalar", false, "10"], ["Mijozlar", false], ["Ombor", false, ">"], ["To'lovlar", false], ["Hisobotlar", false], ["Sozlamalar", false, ">"]].map(([label, active, badge], i) => (
            <div key={i} className="flex items-center justify-between rounded-md px-2 py-1.5" style={active ? { background: "#f4f5f6", fontWeight: 600 } : { color: "#7c848d" }}>
              <span>{label as string}</span>
              {badge === "10" && <span className="rounded-full px-1.5 text-[9px] text-white" style={{ background: "#6366f1" }}>10</span>}
              {badge === ">" && <span style={{ color: "#aab0b8" }}>›</span>}
            </div>
          ))}
          <div className="mt-3 px-2 text-[9px] uppercase tracking-wider" style={{ color: "#aab0b8" }}>Ish oqimi</div>
          {["Savdo bosqichlari", "To'lovlar", "Bildirishnomalar"].map((l) => (<div key={l} className="rounded-md px-2 py-1.5" style={{ color: "#7c848d" }}>{l}</div>))}
        </aside>
        <main className="flex-1 p-3" style={{ background: "#fafafa" }}>
          <div className="text-sm font-semibold">Xush kelibsiz, Akmal</div>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full px-2.5 py-1 text-[10px] font-medium text-white" style={{ background: "#6366f1" }}>Sotish</span>
            {["So'rov", "O'tkazma", "Kirim", "To'lov", "Hisob-faktura"].map((b) => (<span key={b} className="rounded-full border bg-white px-2.5 py-1 text-[10px]" style={{ borderColor: "#e6e6e6" }}>{b}</span>))}
            <span className="text-[10px]" style={{ color: "#8a929b" }}>Sozlash</span>
          </div>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 basis-0 flex-col rounded-lg border bg-white p-3" style={{ borderColor: "#ececec" }}>
              <div className="flex items-center gap-1 font-medium">Oylik tushum <span style={{ color: "#16a34a" }}>✓</span></div>
              <div className="mt-1 text-lg font-semibold">$284,738<span className="text-xs" style={{ color: "#8a929b" }}>.00</span></div>
              <div className="mt-1 flex gap-3 text-[10px]" style={{ color: "#8a929b" }}><span>So'nggi 30 kun</span><span style={{ color: "#16a34a" }}>+$42K</span><span style={{ color: "#e0524d" }}>−$9K</span></div>
              <svg viewBox="0 0 320 80" className="mt-2 h-20 w-full" preserveAspectRatio="none">
                <defs><linearGradient id="qar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6366f1" stopOpacity="0.15" /><stop offset="1" stopColor="#6366f1" stopOpacity="0" /></linearGradient></defs>
                <path d="M0,62 C40,58 60,40 100,44 C150,49 175,20 220,28 C270,37 300,16 320,12 L320,80 L0,80 Z" fill="url(#qar)" />
                <path d="M0,62 C40,58 60,40 100,44 C150,49 175,20 220,28 C270,37 300,16 320,12" fill="none" stroke="#6366f1" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex flex-1 basis-0 flex-col rounded-lg border bg-white p-3" style={{ borderColor: "#ececec" }}>
              <div className="flex items-center justify-between font-medium">Hisoblar <span style={{ color: "#8a929b" }}>＋ ⋮</span></div>
              {[["Savdo", "$98,125.50"], ["Ombor", "$6,750,200.00"], ["Xizmat", "$1,592,864.82"]].map(([n, v]) => (<div key={n} className="flex justify-between py-3 text-xs"><span>{n}</span><span className="font-medium">{v}</span></div>))}
            </div>
          </div>
          <div className="mt-3 rounded-lg border bg-white p-3" style={{ borderColor: "#ececec" }}>
            <div className="mb-2 font-semibold">So'nggi buyurtmalar</div>
            <table className="w-full text-[10px]">
              <thead style={{ color: "#8a929b" }}><tr className="text-left"><th className="pb-1 font-medium">Sana</th><th className="pb-1 font-medium">Avtomobil</th><th className="pb-1 font-medium">Mijoz</th><th className="pb-1 text-right font-medium">Summa</th><th className="pb-1 text-right font-medium">Holat</th></tr></thead>
              <tbody>
                {[["25 iyul", "Chevrolet Malibu", "Sardor Aliyev", "+$28,500", "Kutilmoqda", "amber"], ["24 iyul", "Chevrolet Tracker", "Dilnoza Y.", "+$21,900", "Yakunlandi", "green"], ["24 iyul", "Chevrolet Nexia 3", "Bekzod R.", "+$14,900", "Yakunlandi", "green"], ["23 iyul", "Chevrolet Cobalt", "Jasur K.", "+$16,400", "Yakunlandi", "green"]].map((r, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "#f0f0f0" }}>
                    <td className="py-1.5" style={{ color: "#8a929b" }}>{r[0]}</td>
                    <td className="py-1.5 font-medium">{r[1]}</td>
                    <td className="py-1.5" style={{ color: "#8a929b" }}>{r[2]}</td>
                    <td className="py-1.5 text-right font-medium" style={{ color: "#15a34a" }}>{r[3]}</td>
                    <td className="py-1.5 text-right font-medium" style={{ color: r[5] === "amber" ? "#c98a12" : "#15a34a" }}>{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
