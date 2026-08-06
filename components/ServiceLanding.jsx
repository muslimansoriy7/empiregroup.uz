import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MobileDock } from '@/components/MobileDock';
import { TelegramFab } from '@/components/TelegramFab';
import { Container } from '@/components/Container';
import { ConsultForm } from '@/components/ConsultForm';
import { getServiceEntry } from '@/lib/services';
import { localePath } from '@/lib/locale-path';

/**
 * A service landing page — "Odoo ERP joriy qilish", not "veb-sayt Toshkentda".
 *
 * The city pages answer where; these answer what, and they are what someone
 * types once they know the work they need. The order below follows the
 * questions a buyer asks in the order they ask them: is this for me, what
 * does it fix, what do I actually get, how long, how much, who has done it,
 * and finally the objections — which is where the FAQ earns its place.
 *
 * The form sits alongside the copy from the top on wide screens rather than
 * waiting at the bottom: a reader convinced by the third section should not
 * have to scroll past four more to act.
 */
export function ServiceLanding({ entry, lang }) {
  const related = (entry.related || [])
    .map((slug) => getServiceEntry(slug))
    .filter(Boolean);

  return (
    <>
      <Nav />
      <main>
        {/* ---------------------------------------------------- hero */}
        <section className="relative overflow-hidden border-b border-hairline">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden />
          <Container className="relative py-14 md:py-20">
            <Link
              href={localePath(lang, '/')}
              className="inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-ink"
            >
              ← Bosh sahifa
            </Link>
            <div className="eyebrow mt-6">{entry.eyebrow}</div>
            <h1 className="mt-3 max-w-3xl text-h2 font-semibold">{entry.h1}</h1>
            <p className="mt-4 max-w-2xl text-lead-lg text-body">{entry.intro}</p>
            {entry.lede && (
              <p className="mt-3 max-w-2xl text-sm text-mute">{entry.lede}</p>
            )}
          </Container>
        </section>

        <Container className="py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div className="flex flex-col gap-5">

              {/* ------------------------------------------ kimga mos */}
              <section className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6">
                <h2 className="text-h3 font-semibold text-ink">Kimga mos</h2>
                <ul className="mt-3 grid gap-2">
                  {entry.forWho.map((w) => (
                    <li key={w} className="flex items-start gap-2.5 text-sm text-body">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink" />
                      {w}
                    </li>
                  ))}
                </ul>
              </section>

              {/* -------------------------------- muammo → yechim */}
              <section className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6">
                <h2 className="text-h3 font-semibold text-ink">Nimani hal qiladi</h2>
                <div className="mt-4 flex flex-col">
                  {entry.problems.map(({ p, s }) => (
                    <div
                      key={p}
                      className="grid gap-1 border-t border-hairline py-3.5 first:border-t-0 first:pt-0 sm:grid-cols-2 sm:gap-5"
                    >
                      <p className="text-sm text-mute">{p}</p>
                      <p className="text-sm font-medium text-ink">{s}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ------------------------------------ nima olasiz */}
              <section className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6">
                <h2 className="text-h3 font-semibold text-ink">Nima olasiz</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {entry.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-body">
                      <span className="mt-0.5 shrink-0 font-mono text-xs text-ink">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </section>

              {/* ------------------------------------------ narxlar */}
              <section className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6">
                <h2 className="text-h3 font-semibold text-ink">Narx va muddat</h2>
                <p className="mt-1.5 text-sm text-mute">
                  Fixed-scope: TZ tasdiqlangach summa shartnomada qotiriladi va o&apos;zgarmaydi.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {entry.tiers.map((t) => (
                    <div
                      key={t.tier}
                      className={`flex flex-col gap-2 rounded-[var(--radius-card)] border p-4 ${
                        t.featured
                          ? 'border-ink bg-hairline-soft'
                          : 'border-hairline bg-canvas'
                      }`}
                    >
                      <span className="font-mono text-[11px] tracking-[0.12em] text-mute">
                        {t.tier}
                      </span>
                      <span className="text-base font-semibold text-ink">{t.price}</span>
                      <span className="font-mono text-xs text-mute">{t.period}</span>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-body">{t.desc}</p>
                      <ul className="mt-1 flex flex-col gap-1">
                        {t.items.map((i) => (
                          <li key={i} className="text-[13px] text-mute">
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[13px] text-mute">
                  Har paketda 4 hafta bepul qo&apos;llab-quvvatlash · bosqichma-bosqich to&apos;lov ·
                  kod va intellektual mulk sizga o&apos;tadi.{' '}
                  <Link href={localePath(lang, '/narxlar')} className="text-link underline-offset-2 hover:underline">
                    Barcha narxlar
                  </Link>
                </p>
              </section>

              {/* --------------------------------------- real keys */}
              {entry.caseRef && (
                <section className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6">
                  <h2 className="text-h3 font-semibold text-ink">
                    Real loyiha — {entry.caseRef.client}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-body">
                    {entry.caseRef.body}
                  </p>
                  {entry.caseRef.metrics?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                      {entry.caseRef.metrics.map((m) => (
                        <div key={m.label} className="flex flex-col">
                          <span className="text-h3 font-semibold tabular-nums text-ink">
                            {m.value}
                          </span>
                          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* ------------------------------------------- stack */}
              <section className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6">
                <h2 className="text-h3 font-semibold text-ink">Texnologiyalar</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {entry.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-[var(--radius-pill)] border border-hairline px-3 py-1 font-mono text-xs text-body"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </section>

              {/* --------------------------------------------- FAQ */}
              <section className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6">
                <h2 className="text-h3 font-semibold text-ink">Ko&apos;p beriladigan savollar</h2>
                <div className="mt-4 flex flex-col">
                  {entry.faq.map(({ q, a }) => (
                    <details
                      key={q}
                      className="group border-t border-hairline py-3.5 first:border-t-0 first:pt-0"
                    >
                      <summary className="cursor-pointer list-none text-sm font-medium text-ink marker:hidden">
                        <span className="flex items-start justify-between gap-4">
                          {q}
                          <span
                            className="mt-0.5 shrink-0 font-mono text-mute transition-transform group-open:rotate-45"
                            aria-hidden="true"
                          >
                            +
                          </span>
                        </span>
                      </summary>
                      <p className="mt-2.5 text-sm leading-relaxed text-body">{a}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* ------------------------------------- related links */}
              {related.length > 0 && (
                <nav className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6">
                  <h2 className="text-h3 font-semibold text-ink">Boshqa xizmatlar</h2>
                  <ul className="mt-3 flex flex-col gap-2">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={localePath(lang, `/xizmatlar/${r.slug}`)}
                          className="text-sm text-link underline-offset-2 hover:underline"
                        >
                          {r.h1} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            {/* ------------------------------------------------ form */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-[var(--radius-card-lg)] border border-hairline bg-elevated p-6 shadow-[var(--shadow-whisper)]">
                <ConsultForm
                  header={
                    <div className="mb-5">
                      <h2 className="text-h3 font-semibold text-ink">Bepul konsultatsiya</h2>
                      <p className="mt-1.5 text-sm text-body">
                        Loyihangiz haqida ayting — 1 ish kunida javob beramiz.
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
      <MobileDock />
      <TelegramFab />
    </>
  );
}
