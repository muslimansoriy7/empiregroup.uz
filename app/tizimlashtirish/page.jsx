import Navbar from '@/components/home/Navbar'
import HomeFooter from '@/components/home/HomeFooter'

export const metadata = {
  title: 'Raqamli Transformatsiya — Tizimlashtirish | Empire Group',
  description: "Empire Group — korxonalarni tizimlashtirish va AI yordamida aqlli avtomatlashtirish. ERP joriy etish, AI avtomatlashtirish, maxsus dasturiy yechimlar.",
  openGraph: {
    title: 'Raqamli Transformatsiya — Empire Group',
    description: "Tizimlashtirish + AI avtomatlashtirish. Tarqoq jarayonlarni yagona tizimga birlashtiramiz.",
  },
}

const gold = '#D4B85F'
const cream = '#F0EDE1'
const bg = '#0C1929'

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '0 40px' }}>
      <div style={{ flex: 1, height: '0.5px', background: `rgba(240,237,225,0.15)` }} />
      <div style={{ color: gold, fontSize: 10 }}>◆</div>
      <div style={{ flex: 1, height: '0.5px', background: `rgba(240,237,225,0.15)` }} />
    </div>
  )
}

export default function TizimlashtrishPage() {
  return (
    <>
      <Navbar />
      <div className="hpg" style={{ background: bg }}>
        <div style={{
          color: cream,
          fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)",
          position: 'relative',
        }}>
      {/* Grid overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `linear-gradient(rgba(240,237,225,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,225,0.035) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}>

        {/* Hero */}
        <div style={{ padding: '140px 40px 40px' }}>
          <div style={{ fontFamily: "var(--mono, 'JetBrains Mono',monospace)", fontSize: 11, color: gold, letterSpacing: '0.18em', marginBottom: 30 }}>
            — AI & Custom IT solutions for businesses
          </div>

          <h1 style={{
            fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)",
            fontSize: 'clamp(42px, 8vw, 62px)', fontWeight: 500, lineHeight: 0.98,
            letterSpacing: '-0.04em', color: cream, margin: '0 0 24px',
          }}>
            Raqamli<br /><span style={{ color: gold }}>Transformatsiya.</span>
          </h1>

          <p style={{
            fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)",
            fontSize: 22, fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.015em',
            color: `rgba(240,237,225,0.88)`, margin: '0 0 34px', maxWidth: 500,
          }}>
            Tizimlashtirish &nbsp;+&nbsp; AI avtomatlashtirish.
          </p>

          <p style={{ fontSize: 14.5, lineHeight: 1.75, color: `rgba(240,237,225,0.72)`, maxWidth: 540, margin: 0 }}>
            Empire Group – bu Raqamli Transformatsiya (korxonalarni tizimlashtirish va AI yordamida aqlli avtomatlashtirish) orqali murakkab operatsion muammolarni hal etish va insonlar mehnatini yengillashtirishni o'zining asosiy missiyasi deb biladigan IT-agentlik.
          </p>

          <div style={{ borderLeft: `2px solid ${gold}`, padding: '4px 0 4px 22px', margin: '32px 0 0' }}>
            <p style={{
              fontFamily: "var(--display, 'Fraunces',Georgia,serif)",
              fontSize: 17, lineHeight: 1.5, color: cream, fontStyle: 'italic', margin: 0,
            }}>
              Maqsadimiz — tashkilotlardagi tartibsizlik va chalg'ituvchi to'siqlarni bartaraf etib, tarqoq jarayonlarni yagona, sog'lom vujudga keltirishdir.
            </p>
          </div>
        </div>

        {/* System diagram */}
        <div style={{ padding: '8px 40px 48px' }}>
          <svg viewBox="0 0 600 220" role="img" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <title>Yagona tizim / System</title>
            <desc>Empire Group ERP arxitekturasi</desc>
            <g stroke="rgba(212,184,95,0.35)" strokeWidth="0.7" fill="none">
              <line x1="70" y1="60" x2="300" y2="110" />
              <line x1="200" y1="36" x2="300" y2="110" />
              <line x1="380" y1="30" x2="300" y2="110" />
              <line x1="524" y1="58" x2="300" y2="110" />
              <line x1="52" y1="162" x2="300" y2="110" />
              <line x1="210" y1="186" x2="300" y2="110" />
              <line x1="400" y1="188" x2="300" y2="110" />
              <line x1="540" y1="168" x2="300" y2="110" />
            </g>
            <circle cx="300" cy="110" r="26" fill="none" stroke="rgba(212,184,95,0.4)" strokeWidth="0.5" />
            <circle cx="300" cy="110" r="9" fill={gold} />
            <text x="300" y="150" textAnchor="middle" fontFamily="var(--mono, 'JetBrains Mono',monospace)" fontSize="9" fill="rgba(240,237,225,0.75)" letterSpacing="0.14em">Tizim / System</text>

            {[
              [70, 60, 46, 'Moliya'],
              [200, 36, 22, 'Sotuv'],
              [380, 30, 16, 'HR'],
              [524, 58, 44, 'Marketing'],
            ].map(([cx, cy, ty, label]) => (
              <g key={label}>
                <circle cx={cx} cy={cy} r="3.5" fill={cream} />
                <text x={cx} y={ty} textAnchor="middle" fontFamily="var(--mono, 'JetBrains Mono',monospace)" fontSize="8" fill="rgba(240,237,225,0.65)" letterSpacing="0.1em">{label}</text>
              </g>
            ))}
            {[
              [52, 162, 182, 'Mijozlar'],
              [210, 186, 206, 'Ombor'],
              [400, 188, 208, 'Ishlab chiqarish'],
              [540, 168, 188, 'Yetkazib berish'],
            ].map(([cx, cy, ty, label]) => (
              <g key={label}>
                <circle cx={cx} cy={cy} r="3.5" fill={cream} />
                <text x={cx} y={ty} textAnchor="middle" fontFamily="var(--mono, 'JetBrains Mono',monospace)" fontSize="8" fill="rgba(240,237,225,0.65)" letterSpacing="0.1em">{label}</text>
              </g>
            ))}

            <circle r="2.5" fill="#E5C567"><animateMotion dur="3s" repeatCount="indefinite" path="M 70 60 L 300 110" /></circle>
            <circle r="2.5" fill="#E5C567"><animateMotion dur="4s" repeatCount="indefinite" path="M 380 30 L 300 110" /></circle>
            <circle r="2.5" fill="#E5C567"><animateMotion dur="3.5s" repeatCount="indefinite" path="M 400 188 L 300 110" /></circle>
            <circle r="2.5" fill="#E5C567"><animateMotion dur="4.5s" repeatCount="indefinite" path="M 540 168 L 300 110" /></circle>
          </svg>
        </div>

        <Divider />

        {/* Missiya — Uch ustun */}
        <div style={{ padding: '48px 40px 40px' }}>
          <div style={{ fontFamily: "var(--mono, 'JetBrains Mono',monospace)", fontSize: 11, color: gold, letterSpacing: '0.18em', marginBottom: 22 }}>
            {'// Missiya  ·  Uch ustun'}
          </div>
          <h2 style={{
            fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)",
            fontSize: 'clamp(24px, 4vw, 30px)', fontWeight: 500, lineHeight: 1.2,
            letterSpacing: '-0.02em', color: cream, margin: '0 0 40px', maxWidth: 520,
          }}>
            Biz ushbu missiya doirasida tashkilotingizda qanday amaliy ishlarni bajaramiz?
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {[
              {
                num: 'I',
                title: 'Tarqoqlikni yo\'qotish',
                tag: 'ERP · Yagona asab tizimi',
                text: "Alohida ishlayotgan bo'limlar, ma'lumotlar va jarayonlarni bitta markazlashgan raqamli tizimga birlashtiramiz. Biz qurgan ERP arxitekturasi muassasaning barcha a'zolari va bo'g'inlarini xuddi yagona \"asab tizimi\" kabi mukammal bog'lab, axborot yo'qolishi, uzilishlar, tushunmovchiliklar va mavhumlikka butunlay chek qo'yadi.",
              },
              {
                num: 'II',
                title: 'Mehnatni yengillashtirish',
                tag: 'AI · Avtomatlashtirish',
                text: "Jamoangizni qog'ozbozlik, takrorlanuvchi va charchatuvchi mexanik ishlardan qutqaramiz. Tizim o'zini-o'zi boshqargani sari xodimlar muhimroq vazifalarga e'tibor qaratadi va eng asosiysi — takrorlanuvchi mexanik stresslardan himoya qilinadi.",
              },
              {
                num: 'III',
                title: 'Shaffoflik va mukammal tartib o\'rnatish',
                tag: 'Ekotizim · Yaxlitlik',
                text: "Tashkilotda har bir jarayon kim tomonidan va qanday bajarilayotganini aniq ko'rsatib beruvchi barqaror ekotizim qurib beramiz. Yaratilgan bu shaffof raqamli muhit har bir bo'lakni bir-birini to'ldiruvchi yaxlit ekotizimga aylantiradi.",
              },
            ].map(p => (
              <div key={p.num} style={{ borderTop: '0.5px solid rgba(240,237,225,0.22)', paddingTop: 22 }}>
                <div style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
                  <div style={{ fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)", fontSize: 34, fontWeight: 500, color: gold, lineHeight: 1, letterSpacing: '-0.02em', minWidth: 44 }}>{p.num}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)", fontSize: 20, fontWeight: 500, color: cream, margin: '0 0 6px', letterSpacing: '-0.01em' }}>{p.title}</h3>
                    <div style={{ fontFamily: "var(--mono, 'JetBrains Mono',monospace)", fontSize: 11, color: 'rgba(212,184,95,0.95)', letterSpacing: '0.14em', marginBottom: 12 }}>{p.tag}</div>
                    <p style={{ fontSize: 13.5, lineHeight: 1.75, color: 'rgba(240,237,225,0.75)', margin: 0 }}>{p.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote card */}
          <div style={{
            marginTop: 40, background: 'rgba(212,184,95,0.08)', border: '0.5px solid rgba(212,184,95,0.3)',
            borderRadius: 12, padding: '24px 28px',
          }}>
            <div style={{ fontFamily: "var(--display, 'Fraunces',Georgia,serif)", fontSize: 36, color: gold, fontStyle: 'italic', lineHeight: 0.6, opacity: 0.85 }}>&ldquo;</div>
            <p style={{
              fontFamily: "var(--display, 'Fraunces',Georgia,serif)",
              fontSize: 16, lineHeight: 1.6, color: cream, fontStyle: 'italic', margin: '4px 0 0',
            }}>
              Aynan shu mukammal tartib va yaxlitlik orqali biz xodimlarga mutlaqo xotirjam, barqaror hamda o'z imkoniyatlarini to'liq namoyon eta oladigan faoliyat yuritish imkonini yaratib beramiz.
            </p>
          </div>
        </div>

        <Divider />

        {/* Xizmatlar */}
        <div style={{ padding: '52px 40px 56px' }}>
          <div style={{ fontFamily: "var(--mono, 'JetBrains Mono',monospace)", fontSize: 11, color: gold, letterSpacing: '0.18em', marginBottom: 14 }}>
            {'// Yo\'nalishlar'}
          </div>
          <h2 style={{
            fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)",
            fontSize: 'clamp(34px, 6vw, 44px)', fontWeight: 500, lineHeight: 1,
            letterSpacing: '-0.035em', color: cream, margin: '0 0 48px',
          }}>
            Xizmatlarimiz.
          </h2>

          {/* Service I */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18, gap: 20 }}>
              <div style={{ fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)", fontSize: 26, fontWeight: 500, color: gold, letterSpacing: '-0.02em' }}>I</div>
              <div style={{ flex: 1, height: '0.5px', background: 'rgba(240,237,225,0.2)' }} />
              <div style={{ fontFamily: "var(--mono, 'JetBrains Mono',monospace)", fontSize: 11, color: 'rgba(240,237,225,0.55)', letterSpacing: '0.16em' }}>Custom software development</div>
            </div>
            <h3 style={{ fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)", fontSize: 28, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', color: cream, margin: '0 0 16px' }}>
              Maxsus dasturiy yechimlar
            </h3>
            <p style={{ fontSize: 13.5, lineHeight: 1.75, color: 'rgba(240,237,225,0.75)', margin: '0 0 24px', maxWidth: 540 }}>
              Raqamli transformatsiya jarayonida kundalik operatsion mashaqqatlarni yengillashtirishga va qolipga tushmaydigan murakkab vazifalarga aniq yechim topishga qaratilgan xizmat.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                "Jamoaga o'z ishlarini ortiqcha ovoragarchiliksiz, qulay va tez bajarish imkonini beruvchi maxsus veb hamda mobil ilovalar ishlab chiqish.",
                "Mavjud tashkiliy tizimlarda yopilmay qolgan bo'shliqlarni to'ldiruvchi, muassasaning o'ziga xos talablarini qondirish uchun maxsus yozilgan dasturiy vositalar yaratish.",
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: "var(--mono, 'JetBrains Mono',monospace)", fontSize: 11, color: gold, marginTop: 4, minWidth: 24, letterSpacing: '0.08em' }}>0{i + 1}</div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'rgba(240,237,225,0.88)', margin: 0 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Service II */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18, gap: 20 }}>
              <div style={{ fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)", fontSize: 26, fontWeight: 500, color: gold, letterSpacing: '-0.02em' }}>II</div>
              <div style={{ flex: 1, height: '0.5px', background: 'rgba(240,237,225,0.2)' }} />
              <div style={{ fontFamily: "var(--mono, 'JetBrains Mono',monospace)", fontSize: 11, color: 'rgba(240,237,225,0.55)', letterSpacing: '0.16em' }}>ERP · AI implementation</div>
            </div>
            <h3 style={{ fontFamily: "var(--body, 'Outfit',system-ui,sans-serif)", fontSize: 28, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', color: cream, margin: '0 0 16px' }}>
              Aqlli tizimlashtirish
            </h3>
            <p style={{ fontSize: 13.5, lineHeight: 1.75, color: 'rgba(240,237,225,0.75)', margin: '0 0 24px', maxWidth: 540 }}>
              Tarqoq jarayonlarni yagona, sog'lom markazlashtirilgan vujudga (ERP) aylantirish va bu tizimni mustaqil fikrlaydigan aql (AI) bilan ta'minlash xizmati.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                "Tashkilot ichidagi uzilgan bo'limlarni xuddi asab tizimi kabi yagona markazga bog'lab, xodimlarni chalg'ituvchi tartibsizlikka barham berish va xotirjam ishlash muhitini yaratish.",
                "Tizimga kognitiv (fikrlaydigan) algoritmlarni joriy qilish orqali jamoani og'ir, takrorlanuvchi va mexanik mehnatdan butunlay xalos etish.",
                "Ehtimoliy uzilishlar va uskunalar nosozligini ular sodir bo'lishidan avval ko'ra oladigan, tashkilot uzluksizligini xavf-xatardan himoya qiluvchi aqlli mexanizmlarni o'rnatish.",
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: "var(--mono, 'JetBrains Mono',monospace)", fontSize: 11, color: gold, marginTop: 4, minWidth: 24, letterSpacing: '0.08em' }}>0{i + 1}</div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'rgba(240,237,225,0.88)', margin: 0 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        </div>
      </div>
      <HomeFooter />
    </div>
    </>
  )
}
