"use client";

/* eslint-disable @next/next/no-img-element */

/**
 * TEST hero — Nexora / Instrument-Serif SaaS landing, per spec. Standalone route
 * (/hero-test) so the live homepage Hero is untouched. Light-only, own fonts
 * and tokens scoped here. Fade-up entrance is CSS (reliable across SSR); the
 * dashboard preview shows a REAL Empire project (Motor Lux CRM) instead of the
 * template's fintech sample.
 */

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
      <path d={d} />
    </svg>
  );
}

export default function HeroTest() {
  return (
    <div className="nex flex h-screen flex-col overflow-hidden" style={{ background: "#fff", color: "hsl(210 14% 17%)" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap');
          .nex{--fg:210 14% 17%;--muted:184 5% 55%;--accent:239 84% 67%;--border:0 0% 90%;
            --font-display:'Instrument Serif',serif;--font-body:'Inter',sans-serif;
            --shadow-dash:0 25px 80px -12px rgba(0,0,0,.08),0 0 0 1px rgba(0,0,0,.06);
            font-family:var(--font-body);-webkit-font-smoothing:antialiased}
          .nex .disp{font-family:var(--font-display)}
          .nex .u{opacity:0;transform:translateY(16px);animation:nexUp .7s cubic-bezier(.22,1,.36,1) forwards}
          @keyframes nexUp{to{opacity:1;transform:none}}
          .nex .bg{position:absolute;inset:0;z-index:0;overflow:hidden;background:linear-gradient(180deg,#eaf2f8 0%,#f4f8fb 42%,#ffffff 100%)}
          .nex .bg span{position:absolute;border-radius:50%;filter:blur(80px)}
          .nex .b1{top:-12%;left:2%;width:48%;height:62%;background:radial-gradient(circle,rgba(180,214,247,.75),transparent 70%);animation:nexFloat 20s ease-in-out infinite}
          .nex .b2{top:-6%;right:-4%;width:44%;height:58%;background:radial-gradient(circle,rgba(214,204,241,.7),transparent 70%);animation:nexFloat 26s ease-in-out infinite reverse}
          .nex .b3{top:24%;left:34%;width:40%;height:50%;background:radial-gradient(circle,rgba(190,238,214,.55),transparent 70%);animation:nexFloat 30s ease-in-out infinite}
          @keyframes nexFloat{50%{transform:translateY(34px) scale(1.08)}}
          @media(prefers-reduced-motion:reduce){.nex .u{opacity:1;transform:none;animation:none}.nex .bg span{animation:none}}`,
        }}
      />

      {/* NAVBAR */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12 lg:px-20">
        <div className="text-xl font-semibold tracking-tight">✦ Nexora</div>
        <div className="hidden items-center gap-8 md:flex">
          {["Home", "Pricing", "About", "Contact"].map((l) => (
            <a key={l} href="#" className="text-sm transition-colors hover:opacity-100" style={{ color: "hsl(var(--muted))" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(var(--fg))")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(var(--muted))")}>
              {l}
            </a>
          ))}
        </div>
        <button className="rounded-full px-5 py-2 text-sm font-medium" style={{ background: "hsl(var(--fg))", color: "#fff" }}>Book a demo</button>
      </nav>

      {/* HERO */}
      <section className="relative flex-1 overflow-hidden">
        <div className="bg" aria-hidden>
          <span className="b1" /><span className="b2" /><span className="b3" />
        </div>

        <div className="relative z-10 flex w-full flex-col items-center px-6 pt-8">
          <div className="u mb-6 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm"
            style={{ borderColor: "hsl(var(--border))", background: "#fff", color: "hsl(var(--muted))", animationDelay: "0s" }}>
            Now with GPT-5 support ✨
          </div>

          <h1 className="disp u max-w-xl text-center text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-[5rem]" style={{ animationDelay: ".1s" }}>
            The Future of <span style={{ fontStyle: "italic" }}>Smarter</span> Automation
          </h1>

          <p className="u mt-4 max-w-[650px] text-center text-base leading-relaxed md:text-lg" style={{ color: "hsl(var(--muted))", animationDelay: ".22s" }}>
            Automate your busywork with intelligent agents that learn, adapt, and execute—so your team can focus on what matters most.
          </p>

          <div className="u mt-5 flex items-center gap-3" style={{ animationDelay: ".34s" }}>
            <button className="rounded-full px-6 py-3 text-sm font-medium" style={{ background: "hsl(var(--fg))", color: "#fff" }}>Book a demo</button>
            <button aria-label="Play" className="grid h-11 w-11 place-items-center rounded-full border-0" style={{ background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,.08)" }}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="hsl(var(--fg))"><path d="M8 5v14l11-7z" /></svg>
            </button>
          </div>

          <div className="u mt-8 w-full max-w-5xl" style={{ animationDelay: ".5s" }}>
            <div className="overflow-hidden rounded-2xl p-3 md:p-4"
              style={{ background: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "var(--shadow-dash)" }}>
              <Dashboard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Motor Lux dashboard (coded, real Empire project) ---------- */
function Dashboard() {
  return (
    <div className="pointer-events-none select-none overflow-hidden rounded-xl bg-white text-[11px]" style={{ color: "hsl(210 14% 17%)", border: "1px solid hsl(0 0% 92%)" }}>
      <div className="flex items-center gap-3 border-b px-3 py-2.5" style={{ borderColor: "hsl(0 0% 92%)" }}>
        <div className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-[6px] text-[10px] font-bold text-white" style={{ background: "hsl(210 14% 17%)" }}>M</span>
          <span className="font-semibold">Motor Lux</span><span style={{ color: "hsl(184 5% 60%)" }}>⌄</span>
        </div>
        <div className="mx-auto flex w-1/2 items-center justify-between rounded-md px-2 py-1" style={{ background: "hsl(0 0% 96%)", color: "hsl(184 5% 55%)" }}>
          <span>Qidirish...</span><span className="rounded bg-white px-1 text-[9px]">⌘K</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full px-2.5 py-1 text-[10px] font-medium text-white" style={{ background: "hsl(239 84% 67%)" }}>Yangi buyurtma</span>
          <span className="h-3.5 w-3.5" style={{ color: "hsl(184 5% 55%)" }}><Icon d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /></span>
          <span className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-semibold text-white" style={{ background: "hsl(239 84% 67%)" }}>AK</span>
        </div>
      </div>

      <div className="flex">
        <aside className="w-40 shrink-0 border-r p-2" style={{ borderColor: "hsl(0 0% 92%)" }}>
          {[["Boshqaruv paneli", true], ["Buyurtmalar", false, "10"], ["Mijozlar", false], ["Ombor", false, ">"], ["To'lovlar", false], ["Hisobotlar", false], ["Sozlamalar", false, ">"]].map(([label, active, badge], i) => (
            <div key={i} className="flex items-center justify-between rounded-md px-2 py-1.5" style={active ? { background: "hsl(0 0% 96%)", fontWeight: 600 } : { color: "hsl(184 5% 50%)" }}>
              <span>{label as string}</span>
              {badge === "10" && <span className="rounded-full px-1.5 text-[9px] text-white" style={{ background: "hsl(239 84% 67%)" }}>10</span>}
              {badge === ">" && <span style={{ color: "hsl(184 5% 65%)" }}>›</span>}
            </div>
          ))}
          <div className="mt-3 px-2 text-[9px] uppercase tracking-wider" style={{ color: "hsl(184 5% 65%)" }}>Ish oqimi</div>
          {["Savdo bosqichlari", "To'lovlar", "Bildirishnomalar"].map((l) => (<div key={l} className="rounded-md px-2 py-1.5" style={{ color: "hsl(184 5% 50%)" }}>{l}</div>))}
        </aside>

        <main className="flex-1 p-3" style={{ background: "hsl(0 0% 98%)" }}>
          <div className="text-sm font-semibold">Xush kelibsiz, Akmal</div>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full px-2.5 py-1 text-[10px] font-medium text-white" style={{ background: "hsl(239 84% 67%)" }}>Sotish</span>
            {["So'rov", "O'tkazma", "Kirim", "To'lov", "Hisob-faktura"].map((b) => (<span key={b} className="rounded-full border bg-white px-2.5 py-1 text-[10px]" style={{ borderColor: "hsl(0 0% 90%)" }}>{b}</span>))}
            <span className="text-[10px]" style={{ color: "hsl(184 5% 55%)" }}>Sozlash</span>
          </div>

          <div className="mt-3 flex gap-3">
            <div className="flex flex-1 basis-0 flex-col rounded-lg border bg-white p-3" style={{ borderColor: "hsl(0 0% 92%)" }}>
              <div className="flex items-center gap-1 font-medium">Oylik tushum <span style={{ color: "hsl(142 71% 45%)" }}>✓</span></div>
              <div className="mt-1 text-lg font-semibold">$284,738<span className="text-xs" style={{ color: "hsl(184 5% 55%)" }}>.00</span></div>
              <div className="mt-1 flex gap-3 text-[10px]" style={{ color: "hsl(184 5% 55%)" }}><span>So'nggi 30 kun</span><span style={{ color: "hsl(142 71% 45%)" }}>+$42K</span><span style={{ color: "hsl(0 72% 55%)" }}>−$9K</span></div>
              <svg viewBox="0 0 320 80" className="mt-2 h-20 w-full" preserveAspectRatio="none">
                <defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="hsl(239 84% 67%)" stopOpacity="0.15" /><stop offset="1" stopColor="hsl(239 84% 67%)" stopOpacity="0" /></linearGradient></defs>
                <path d="M0,62 C40,58 60,40 100,44 C150,49 175,20 220,28 C270,37 300,16 320,12 L320,80 L0,80 Z" fill="url(#ar)" />
                <path d="M0,62 C40,58 60,40 100,44 C150,49 175,20 220,28 C270,37 300,16 320,12" fill="none" stroke="hsl(239 84% 67%)" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex flex-1 basis-0 flex-col rounded-lg border bg-white p-3" style={{ borderColor: "hsl(0 0% 92%)" }}>
              <div className="flex items-center justify-between font-medium">Hisoblar <span style={{ color: "hsl(184 5% 55%)" }}>＋ ⋮</span></div>
              {[["Savdo", "$98,125.50"], ["Ombor", "$6,750,200.00"], ["Xizmat", "$1,592,864.82"]].map(([n, v]) => (<div key={n} className="flex justify-between py-3 text-xs"><span>{n}</span><span className="font-medium">{v}</span></div>))}
            </div>
          </div>

          <div className="mt-3 rounded-lg border bg-white p-3" style={{ borderColor: "hsl(0 0% 92%)" }}>
            <div className="mb-2 font-semibold">So'nggi buyurtmalar</div>
            <table className="w-full text-[10px]">
              <thead style={{ color: "hsl(184 5% 55%)" }}><tr className="text-left"><th className="pb-1 font-medium">Sana</th><th className="pb-1 font-medium">Avtomobil</th><th className="pb-1 font-medium">Mijoz</th><th className="pb-1 text-right font-medium">Summa</th><th className="pb-1 text-right font-medium">Holat</th></tr></thead>
              <tbody>
                {[["25 iyul", "Chevrolet Malibu", "Sardor Aliyev", "+$28,500", "Kutilmoqda", "amber"], ["24 iyul", "Chevrolet Tracker", "Dilnoza Y.", "+$21,900", "Yakunlandi", "green"], ["24 iyul", "Chevrolet Nexia 3", "Bekzod R.", "+$14,900", "Yakunlandi", "green"], ["23 iyul", "Chevrolet Cobalt", "Jasur K.", "+$16,400", "Yakunlandi", "green"]].map((r, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "hsl(0 0% 95%)" }}>
                    <td className="py-1.5" style={{ color: "hsl(184 5% 55%)" }}>{r[0]}</td>
                    <td className="py-1.5 font-medium">{r[1]}</td>
                    <td className="py-1.5" style={{ color: "hsl(184 5% 55%)" }}>{r[2]}</td>
                    <td className="py-1.5 text-right font-medium" style={{ color: "hsl(142 71% 40%)" }}>{r[3]}</td>
                    <td className="py-1.5 text-right font-medium" style={{ color: r[5] === "amber" ? "hsl(38 92% 45%)" : "hsl(142 71% 40%)" }}>{r[4]}</td>
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
