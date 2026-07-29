import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import './oj.css';

export const metadata = {
  // Written in Uzbek only — every locale points at the same document.
  alternates: { canonical: '/blog/odoo-joriy-qilish-bosqichlari' },
  title: { absolute: "Odoo ERP joriy qilishning 5 fazasi — Empire Group" },
  description:
    "Discovery, Design, Build, Deploy va Support — Odoo ERP joriy qilishning beshta fazasi. Har biri uchun maqsad, faoliyat, natija va xavflar. Amaliy metodologiya qo'llanma.",
  keywords:
    "Odoo, ERP, joriy etish, implementation, GAP tahlili, Go-Live, Empire Group, Toshkent",
  openGraph: {
    title: "Odoo ERP joriy qilishning 5 fazasi",
    description:
      "Discovery → Design → Build → Deploy → Support. Odoo joriy etishning to'liq amaliy metodologiyasi.",
    type: "article",
  },
};

export default function OdooJoriyQilishPage() {
  return (
    <>
      <Nav />
      <div className="hpg" style={{ background: 'var(--color-canvas)' }}>
        <article className="oj">
          <div className="oj-glow" />
          <div className="oj-main">

{/* ============ HERO ============ */}
<header className="oj-hero">
  <div className="oj-wrap">
    <div className="oj-kicker">EMPIRE GROUP &middot; ODOO ERP &amp; AI <b>&middot; METODOLOGIYA</b></div>
    <h1 className="oj-h1">Odoo ERP joriy qilishning <em>5 fazasi</em></h1>
    <p className="oj-lead">Discovery, Design, Build, Deploy va Support — ERP joriy etishning <b>beshta fazasi</b> amaliy yordam beradi: har faza uchun maqsad, asosiy faoliyat, natijalar (deliverables) va xavflar. Bu — nazariya emas, <b>amaliy yo&rsquo;l xaritasi</b>.</p>
    <div className="oj-meta">
      <span><i />&sim;20 daqiqa &middot; chuqur o&rsquo;qish</span>
      <span><i />Empire Group &middot; Odoo joriy etish metodologiyasi</span>
    </div>

    <div className="oj-figure" style={{marginTop:36}}>
      <svg viewBox="0 0 1000 152" role="img" aria-label="Odoo joriy etish — besh fazali zanjir">
        <g fontFamily="var(--font-geist-sans),sans-serif">
          <line x1="100" y1="62" x2="900" y2="62" stroke="var(--color-hairline)" strokeWidth="2.5" />
          <g>
            <circle cx="100" cy="62" r="26" fill="var(--color-elevated)" stroke="var(--color-link)" strokeWidth="2" />
            <text x="100" y="68" textAnchor="middle" fill="var(--color-link)" fontSize="17" fontWeight="700">01</text>
            <text x="100" y="112" textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600">Discovery</text>
            <text x="100" y="130" textAnchor="middle" fill="var(--color-mute)" fontSize="11">Biznes-analiz</text>
          </g>
          <g>
            <circle cx="310" cy="62" r="26" fill="var(--color-elevated)" stroke="var(--color-link)" strokeWidth="2" />
            <text x="310" y="68" textAnchor="middle" fill="var(--color-link)" fontSize="17" fontWeight="700">02</text>
            <text x="310" y="112" textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600">Design</text>
            <text x="310" y="130" textAnchor="middle" fill="var(--color-mute)" fontSize="11">Loyiha dizayni</text>
          </g>
          <g>
            <circle cx="510" cy="62" r="30" fill="var(--color-link-deep)" stroke="var(--color-link)" strokeWidth="2.5" />
            <text x="510" y="68" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="700">03</text>
            <text x="510" y="112" textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="700">Build</text>
            <text x="510" y="130" textAnchor="middle" fill="var(--color-link)" fontSize="11">Eng asosiy faza</text>
          </g>
          <g>
            <circle cx="720" cy="62" r="26" fill="var(--color-elevated)" stroke="var(--color-body)" strokeWidth="2" />
            <text x="720" y="68" textAnchor="middle" fill="var(--color-mute)" fontSize="17" fontWeight="700">04</text>
            <text x="720" y="112" textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600">Deploy</text>
            <text x="720" y="130" textAnchor="middle" fill="var(--color-mute)" fontSize="11">Ishga tushirish</text>
          </g>
          <g>
            <circle cx="930" cy="62" r="26" fill="var(--color-elevated)" stroke="var(--color-body)" strokeWidth="2" />
            <text x="930" y="68" textAnchor="middle" fill="var(--color-mute)" fontSize="17" fontWeight="700">05</text>
            <text x="930" y="112" textAnchor="middle" fill="var(--color-ink)" fontSize="15" fontWeight="600">Support</text>
            <text x="930" y="130" textAnchor="middle" fill="var(--color-mute)" fontSize="11">Barqarorlik</text>
          </g>
          <text x="500" y="20" textAnchor="middle" fill="var(--color-mute)" fontFamily="var(--font-geist-sans),sans-serif" fontSize="11" letterSpacing="3">ZANJIR &middot; HAR DARVOZA YOPILGACH KEYINGISIGA O&rsquo;TILADI &rarr;</text>
        </g>
      </svg>
      <div className="oj-figcap"><b>1-rasm.</b> Odoo joriy etishning besh fazasi. Texnik ishlarning katta qismi — server, modullar, custom kod — Build fazasiga to&rsquo;g&rsquo;ri keladi.</div>
    </div>
  </div>
</header>

{/* ============ OVERVIEW ============ */}
<section className="oj-sec reveal">
  <div className="oj-wrap">
    <div className="oj-sec-head">
      <div className="oj-eyebrow">Umumiy manzara</div>
      <h2 className="oj-h2">Faza emas — bu <em>boshqariladigan yo&rsquo;l</em></h2>
      <p>Har faza bitta aniq savolga javob beradi va bitta aniq natija qoldiradi. Faza tugagach, keyingisiga o&rsquo;tishdan oldin natija tekshiriladi (phase gate) — bu &ldquo;shoshib qurib, keyin buzilib qolish&rdquo;ning oldini oladi.</p>
    </div>

    <div className="oj-grid oj-g5">
      <div className="oj-ocard"><div className="oj-n">01</div><h4>Discovery</h4><div className="oj-en">Biznes-analiz</div>
        <div className="oj-q">&ldquo;Nimani quramiz?&rdquo; — jarayonlarni tushunish va talablarni aniqlash.</div>
        <div className="oj-r">Natija: <b>Talablar hujjati</b></div></div>
      <div className="oj-ocard"><div className="oj-n">02</div><h4>Design</h4><div className="oj-en">Loyiha dizayni</div>
        <div className="oj-q">&ldquo;Qanday quramiz?&rdquo; — talablarni texnik yechimga aylantirish.</div>
        <div className="oj-r">Natija: <b>Texnik dizayn</b></div></div>
      <div className="oj-ocard"><div className="oj-n">03</div><h4>Build</h4><div className="oj-en">Konfiguratsiya &middot; kod</div>
        <div className="oj-q">&ldquo;Quramiz&rdquo; — server, modullar, custom kod, ma&rsquo;lumot.</div>
        <div className="oj-r">Natija: <b>Ishlaydigan tizim (test)</b></div></div>
      <div className="oj-ocard"><div className="oj-n">04</div><h4>Deploy</h4><div className="oj-en">Ishga tushirish</div>
        <div className="oj-q">&ldquo;Ishga tushiramiz&rdquo; — UAT, real ma&rsquo;lumot, Go-Live.</div>
        <div className="oj-r">Natija: <b>Production tizim</b></div></div>
      <div className="oj-ocard"><div className="oj-n">05</div><h4>Support</h4><div className="oj-en">Yordam &middot; optimizatsiya</div>
        <div className="oj-q">&ldquo;Barqaror ushlaymiz&rdquo; — xato tuzatish, kengaytirish.</div>
        <div className="oj-r">Natija: <b>Ishonchli tizim</b></div></div>
    </div>
  </div>
</section>

{/* ============ EFFORT DISTRIBUTION ============ */}
<section className="oj-sec reveal">
  <div className="oj-wrap">
    <div className="oj-sec-head">
      <div className="oj-eyebrow">Kuch taqsimoti</div>
      <h2 className="oj-h2">Loyihaning <em>80 foizi</em> — bir joyda</h2>
      <p>Klassik loyiha yo&rsquo;li beshta bosqichdan iborat, ammo ularning og&rsquo;irligi teng emas. Vaqt va kuchning aksariyati — Build/Joriy etish bosqichida. Bu yerda tizim haftadan-haftaga, qisqa sikllarda shakllanadi.</p>
    </div>

    <div className="oj-tblwrap" style={{marginBottom:26}}>
      <table>
        <thead><tr><th>Bosqich</th><th>Vaqt</th><th>Maqsadlar</th></tr></thead>
        <tbody>
          <tr><td style={{color:'var(--oj-gold)',fontWeight:600}}>ROI tahlili</td><td className="oj-td-odoo">10%</td><td className="oj-td-odoo">ROI tahlili, bosqichlarga bo&rsquo;lish va byudjet.</td></tr>
          <tr><td style={{color:'var(--oj-gold)',fontWeight:600}}>Kick-Off</td><td className="oj-td-odoo">5%</td><td className="oj-td-odoo">Manfaatdor tomonlarni metodologiya bo&rsquo;yicha moslashtirish + standart o&rsquo;qitish.</td></tr>
          <tr><td style={{color:'var(--oj-gold)',fontWeight:600}}>Joriy etish</td><td className="oj-td-odoo"><b>80%</b></td><td className="oj-td-odoo">Sikllar ketma-ketligi: tahlil, ishlanma, tasdiqlash, kalit foydalanuvchilarni o&rsquo;qitish.</td></tr>
          <tr><td style={{color:'var(--oj-gold)',fontWeight:600}}>Go-Live</td><td className="oj-td-odoo">5%</td><td className="oj-td-odoo">Yakuniy foydalanuvchilarni o&rsquo;qitish, xatolarni tuzatish.</td></tr>
          <tr><td style={{color:'var(--oj-accent2-l)',fontWeight:600}}>Ikkinchi joylashtirish</td><td className="oj-td-odoo">o&rsquo;zgaruvchan</td><td className="oj-td-odoo">Qamrovni kengaytirish yoki maxsus funksiyalarni qo&rsquo;shish.</td></tr>
        </tbody>
      </table>
    </div>

    <div className="oj-figure">
      {/* CHEVRON: Klassik loyiha yo'li */}
      <svg viewBox="0 0 1000 168" role="img" aria-label="Klassik loyiha yo'li — chevron bosqichlar">
        <g fontFamily="var(--font-geist-sans),sans-serif">
          <text x="0" y="20" fill="var(--color-mute)" fontSize="12" letterSpacing="2">KLASSIK LOYIHA YO&rsquo;LI</text>
          <path d="M20,42 L206,42 L236,82 L206,122 L20,122 Z" fill="var(--color-body)" opacity=".42" />
          <path d="M206,42 L392,42 L422,82 L392,122 L206,122 L236,82 Z" fill="var(--color-body)" opacity=".62" />
          <path d="M392,42 L578,42 L608,82 L578,122 L392,122 L422,82 Z" fill="var(--color-body)" />
          <path d="M578,42 L764,42 L794,82 L764,122 L578,122 L608,82 Z" fill="var(--color-link)" />
          <path d="M764,42 L950,42 L980,82 L950,122 L764,122 L794,82 Z" fill="var(--color-hairline-soft)" stroke="var(--color-hairline)" strokeWidth="1.5" />
          <g textAnchor="middle" fill="var(--color-ink)" fontWeight="700">
            <text x="132" y="90" fontSize="20">10%</text>
            <text x="318" y="90" fontSize="20">5%</text>
            <text x="504" y="92" fontSize="26">80%</text>
            <text x="690" y="90" fontSize="20" fill="#ffffff">5%</text>
            <text x="876" y="92" fontSize="22" fill="var(--color-mute)">—</text>
          </g>
          <g textAnchor="middle" fontSize="12.5" fill="var(--color-ink)">
            <text x="128" y="150">ROI tahlili</text>
            <text x="314" y="150">Kick-Off</text>
            <text x="500" y="150" fontWeight="600" fill="var(--color-ink)">Joriy etish</text>
            <text x="686" y="150" fill="var(--color-link)">Go-Live</text>
            <text x="872" y="150" fill="var(--color-mute)">Ikkinchi joylashtirish</text>
          </g>
        </g>
      </svg>

      {/* PROPORTIONAL BAR */}
      <svg viewBox="0 0 1000 210" role="img" aria-label="Umumiy kuch taqsimoti bari" style={{marginTop:8}}>
        <g fontFamily="var(--font-geist-sans),sans-serif">
          <text x="0" y="24" fill="var(--color-mute)" fontSize="12" letterSpacing="2">UMUMIY KUCH TAQSIMOTI — nisbiy og&rsquo;irlik</text>
          <rect x="0" y="56" width="94" height="56" rx="4" fill="var(--color-link)" opacity=".45" />
          <rect x="98" y="56" width="42" height="56" rx="4" fill="var(--color-link)" opacity=".62" />
          <rect x="144" y="56" width="700" height="56" rx="4" fill="var(--color-link-deep)" />
          <rect x="848" y="56" width="42" height="56" rx="4" fill="var(--color-body)" opacity=".85" />
          <rect x="894" y="56" width="106" height="56" rx="4" fill="var(--color-body)" opacity=".38" />
          <text x="47" y="90" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">10%</text>
          <text x="494" y="92" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700">80%</text>
          <text x="869" y="90" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="700">5%</text>
          <g fill="var(--color-ink)" fontSize="12.5" textAnchor="middle">
            <text x="47" y="140">ROI tahlili</text>
            <text x="119" y="140" fill="var(--color-mute)">Kick-Off</text>
            <text x="494" y="140" fontWeight="600" fill="var(--color-ink)">Joriy etish (Build)</text>
            <text x="869" y="140" fill="var(--color-mute)">Go-Live</text>
            <text x="947" y="140" fill="var(--color-mute)" fontSize="11">Ikkinchi<tspan x="947" dy="14">joylashtirish</tspan></text>
          </g>
          <text x="494" y="184" textAnchor="middle" fill="var(--color-mute)" fontSize="12.5">Har hafta demo — metodologiyaning yuragi. Demo bo&rsquo;lmagan hafta — yo&rsquo;qotilgan hafta.</text>
        </g>
      </svg>
      <div className="oj-figcap"><b>2-rasm.</b> Yuqorida — klassik loyiha yo&rsquo;lining beshta bosqichi (chevron), pastda esa ularning nisbiy og&rsquo;irligi (bar). Kichik va o&rsquo;rta biznesda ROI tahlili ko&rsquo;pincha Kick-Off ichiga qo&rsquo;shiladi; yirik loyihalarda Go-Live 10–15% vaqt olishi mumkin.</div>
    </div>
  </div>
</section>

{/* ============ PHASES DETAIL ============ */}
<section className="oj-sec reveal">
  <div className="oj-wrap">
    <div className="oj-sec-head">
      <div className="oj-eyebrow">Batafsil</div>
      <h2 className="oj-h2">Beshta faza — <em>ichkaridan</em></h2>
      <p>Har bir faza uchun: maqsad, asosiy faoliyat, natijalar (deliverables) va e&rsquo;tibor talab qiladigan xavflar. Amaliy misollar ishlab chiqarish korxonasi joriy etish tajribasidan olingan.</p>
    </div>

    {/* ===== PHASE 1 ===== */}
    <div className="oj-phase" id="discovery">
      <div className="oj-phase-head">
        <div className="oj-phase-num">01</div>
        <div className="oj-phase-title">
          <h3>Discovery — Biznes-analiz</h3>
          <div className="oj-sub">&ldquo;Nimani quramiz?&rdquo; <span>&middot; ~1 hafta &middot; loyihaning fundamenti (~10% vaqt)</span></div>
        </div>
      </div>
      <div className="oj-phase-body">
        <p>Bu bosqichda siz shifokor kabi ishlaysiz: mijozning og&rsquo;riqli nuqtalarini aniqlaysiz va to&rsquo;g&rsquo;ri &ldquo;dori&rdquo; — Odoo modullari va jarayonlarini yozib berasiz. Maqsad — korxonaning hozirgi jarayonlarini to&rsquo;liq tushunish va Odooda nima qilinishi kerakligini aniq hujjatlashtirish.</p>

        <div className="oj-lbl">Asosiy faoliyat</div>
        <ul className="oj-clean">
          <li><b>As-is xaritalash:</b> har bir jarayon hozir qanday ishlashini yozib chiqish, skrinshot va hujjat namunalarini yig&rsquo;ish.</li>
          <li><b>Deep-dive intervyular:</b> har bo&rsquo;lim rahbari (Savdo, Xarid, Ombor, Moliya, Ishlab chiqarish) bilan 2–4 soatlik yakkama-yakka suhbat va &ldquo;shadowing&rdquo;.</li>
          <li><b>Foydalanuvchi rollari matritsasi:</b> kim nimani ko&rsquo;radi, kiritadi va o&rsquo;zgartiradi.</li>
          <li><b>To-Be va GAP:</b> ehtiyojlarni Odoo standarti bilan solishtirish — <b>Fit</b> (standartda bor) yoki <b>GAP</b> (yo&rsquo;q).</li>
          <li><b>Ustuvorlashtirish (MoSCoW):</b> Must / Should / Could / Won&rsquo;t.</li>
        </ul>

        <div className="oj-figure">
          <svg viewBox="0 0 1000 300" role="img" aria-label="GAP tahlili va MoSCoW matritsasi">
            <g fontFamily="var(--font-geist-sans),sans-serif">
              <text x="0" y="22" fill="var(--color-mute)" fontSize="12" letterSpacing="2">GAP = EHTIYOJ − STANDART</text>
              <rect x="0" y="42" width="250" height="40" rx="6" fill="var(--color-link)" opacity=".9" />
              <text x="125" y="67" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">Odoo standart (Fit)</text>
              <rect x="0" y="94" width="360" height="40" rx="6" fill="var(--color-elevated)" stroke="var(--color-body)" strokeWidth="1.5" />
              <rect x="250" y="94" width="110" height="40" rx="6" fill="var(--color-body)" opacity=".55" />
              <text x="125" y="119" textAnchor="middle" fill="var(--color-ink)" fontSize="13">Mijoz ehtiyoji</text>
              <text x="305" y="119" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="700">GAP</text>
              <text x="0" y="160" fill="var(--color-mute)" fontSize="12">GAP — standart qoplamagan qism. Uni MoSCoW bo&rsquo;yicha saralaymiz →</text>
            </g>
            <g fontFamily="var(--font-geist-sans),sans-serif" transform="translate(430,30)">
              <rect x="0" y="0" width="270" height="115" rx="10" fill="rgba(0,112,243,.14)" stroke="var(--color-link-deep)" strokeWidth="1.5" />
              <text x="16" y="30" fill="var(--color-link)" fontSize="15" fontWeight="700">MUST &middot; Majburiy</text>
              <text x="16" y="54" fill="var(--color-ink)" fontSize="12.5" fontFamily="var(--font-geist-sans),sans-serif">Usiz biznes yurmaydi.</text>
              <text x="16" y="76" fill="var(--color-mute)" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">&rarr; Tasdiqlanadi, ishlab chiqiladi</text>
              <rect x="290" y="0" width="270" height="115" rx="10" fill="rgba(0,112,243,.08)" stroke="rgba(0,112,243,.4)" strokeWidth="1.5" />
              <text x="306" y="30" fill="var(--color-link)" fontSize="15" fontWeight="700">SHOULD &middot; Muhim</text>
              <text x="306" y="54" fill="var(--color-ink)" fontSize="12.5" fontFamily="var(--font-geist-sans),sans-serif">Vaqtincha workaround mumkin.</text>
              <text x="306" y="76" fill="var(--color-mute)" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">&rarr; 2-bosqichga suriladi</text>
              <rect x="0" y="130" width="270" height="115" rx="10" fill="rgba(128,128,128,.10)" stroke="rgba(128,128,128,.4)" strokeWidth="1.5" />
              <text x="16" y="160" fill="var(--color-mute)" fontSize="15" fontWeight="700">COULD &middot; Yaxshi bo&rsquo;lardi</text>
              <text x="16" y="184" fill="var(--color-ink)" fontSize="12.5" fontFamily="var(--font-geist-sans),sans-serif">Qulaylik, ta&rsquo;siri kam.</text>
              <text x="16" y="206" fill="var(--color-mute)" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">&rarr; Rad etiladi</text>
              <rect x="290" y="130" width="270" height="115" rx="10" fill="rgba(128,128,128,.16)" stroke="var(--color-body)" strokeWidth="1.5" />
              <text x="306" y="160" fill="var(--color-mute)" fontSize="15" fontWeight="700">WON&rsquo;T &middot; Qilinmaydi</text>
              <text x="306" y="184" fill="var(--color-ink)" fontSize="12.5" fontFamily="var(--font-geist-sans),sans-serif">Byudjet/muddatga sig&rsquo;maydi.</text>
              <text x="306" y="206" fill="var(--color-mute)" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">&rarr; Qat&rsquo;iy rad</text>
            </g>
          </svg>
          <div className="oj-figcap"><b>3-rasm.</b> GAP tahlili standart va ehtiyoj orasidagi farqni ko&rsquo;rsatadi; MoSCoW esa har bir GAP bo&rsquo;yicha aniq qaror beradi. Funksiya &ldquo;zarur&rdquo;mi yoki &ldquo;ixtiyoriy&rdquo;mi — buni mijoz emas, Loyiha yetakchisi hal qiladi.</div>
        </div>

        <div className="oj-lbl">Natijalar (deliverables)</div>
        <ul className="oj-deliv">
          <li>Jarayon xaritasi (as-is) — hozirgi holat</li>
          <li>Foydalanuvchi rollari matritsasi</li>
          <li>Prioritetlangan talablar hujjati (MoSCoW)</li>
          <li>Ma&#x2BB;lumot manbalari ro&rsquo;yxati (Excel, 1C, daftar)</li>
          <li>Scope hujjati — nima qilinadi va nima QILINMAYDI (Out of Scope)</li>
        </ul>

        <div className="oj-callout oj-warn"><div className="oj-ic">!</div><div>
          <span className="oj-t">XAVF &middot; &ldquo;Hammasini xohlaymiz&rdquo;</span>
          Ustuvorliksiz ro&rsquo;yxat loyihani cho&rsquo;zadi. MoSCoW shart. Eng muhimi — Sign-off hujjatida <b>&ldquo;Nimalar qilinmasligi&rdquo;</b> ham aniq yozilishi kerak; bu keyinchalik nizolarni oldini oladi.</div></div>
      </div>
    </div>

    {/* ===== PHASE 2 ===== */}
    <div className="oj-phase reveal" id="design">
      <div className="oj-phase-head">
        <div className="oj-phase-num">02</div>
        <div className="oj-phase-title">
          <h3>Design — Loyiha dizayni</h3>
          <div className="oj-sub">&ldquo;Qanday quramiz?&rdquo; <span>&middot; ~2–3 hafta &middot; Kick-Off shu yerda (~5% vaqt)</span></div>
        </div>
      </div>
      <div className="oj-phase-body">
        <p>Discovery&rsquo;dagi talablarni aniq texnik yechimga aylantirasiz: arxitektura, modullar konfiguratsiyasi, ma&#x2BB;lumotlar modeli, integratsiya va custom kod rejasi. Parallel ravishda loyiha <b>Kick-Off</b> qilinadi — jamoalarni muvofiqlashtirish va loyiha ruhini o&rsquo;rnatish.</p>

        <div className="oj-lbl">Asosiy faoliyat</div>
        <div className="oj-pillrow">
          <span className="oj-pill oj-on">Tizim arxitekturasi</span>
          <span className="oj-pill">Modul konfiguratsiya rejasi</span>
          <span className="oj-pill">Ma&#x2BB;lumotlar modeli / BOM</span>
          <span className="oj-pill">To-be jarayon dizayni</span>
          <span className="oj-pill">Custom development spetsifikatsiyasi</span>
          <span className="oj-pill">Integratsiya dizayni</span>
          <span className="oj-pill">Access rights</span>
          <span className="oj-pill">Backup strategiyasi</span>
        </div>

        <div className="oj-lbl">Kick-Off — psixologik va strategik start</div>
        <ul className="oj-clean">
          <li><b>Maqsadni eslatish:</b> rahbar loyiha nega kerakligini va &ldquo;orqaga yo&rsquo;l yo&rsquo;q&rdquo;ligini aytadi.</li>
          <li><b>Metodologiyani tushuntirish:</b> &ldquo;Nega biz standartga yopishamiz?&rdquo;, &ldquo;Nega tez-tez o&rsquo;zgarish yomon?&rdquo;</li>
          <li><b>SPoC (yagona aloqa nuqtasi):</b> mijoz tomonidagi asosiy odam, UAT&rsquo;ni boshqaradi, Odoo eLearning&rsquo;da o&rsquo;qiydi.</li>
          <li><b>Change Management:</b> qarshilik ko&rsquo;rsatuvchilar bilan individual ish rejasi.</li>
        </ul>

        <div className="oj-quote">&ldquo;Bir marta menga to&rsquo;liq ERP&rsquo;ni 12 kalendar kunda ishga tushirish topshirilgan edi. Buni faqat bitta narsa mumkin qildi — Kick-Off&rsquo;da to&rsquo;g&rsquo;ri belgilangan kutilmalar.&rdquo;
          <cite>— Odoo Loyiha yetakchisi</cite></div>

        <div className="oj-callout oj-warn"><div className="oj-ic">!</div><div>
          <span className="oj-t">XAVF &middot; Over-engineering</span>
          Haddan tashqari murakkab dizayndan qoching. Soddaroq, ishlaydigan yechimdan boshlang, keyin kengaytiring. Custom kod hajmini <b>realistik</b> baholang. Dizaynni rahbar tasdiqlamasdan Build&rsquo;ga o&rsquo;tmang.</div></div>
      </div>
    </div>

    {/* ===== PHASE 3 ===== */}
    <div className="oj-phase reveal" id="build">
      <div className="oj-phase-head">
        <div className="oj-phase-num">03</div>
        <div className="oj-phase-title">
          <h3>Build — Konfiguratsiya va ishlab chiqish</h3>
          <div className="oj-sub">&ldquo;Quramiz&rdquo; <span>&middot; ~3–4 oy &middot; eng uzun va texnik faza (~80% vaqt)</span></div>
        </div>
      </div>
      <div className="oj-phase-body">
        <p>Bu ERP joriy etishning eng uzun bosqichi. Ish <b>sprint</b> uslubida — har bir sprint 1–2 hafta davom etadi. Yechim bosqichma-bosqich shakllanadi va har hafta demo orqali tasdiqlanadi.</p>

        <div className="oj-figure">
          <svg viewBox="0 0 1000 300" role="img" aria-label="Bir haftalik sprint sikli">
            <g fontFamily="var(--font-geist-sans),sans-serif">
              <text x="500" y="24" textAnchor="middle" fill="var(--color-mute)" fontSize="12" letterSpacing="3">BIR HAFTALIK SPRINT SIKLI</text>
              <circle cx="500" cy="165" r="96" fill="none" stroke="var(--color-link-deep)" strokeWidth="1.5" strokeDasharray="4 6" opacity=".6" />
              <text x="500" y="160" textAnchor="middle" fill="var(--color-ink)" fontSize="16" fontWeight="700">1 HAFTA</text>
              <text x="500" y="182" textAnchor="middle" fill="var(--color-mute)" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">sprint</text>
              {/* top: Qo'ng'iroq */}
              <rect x="410" y="42" width="180" height="52" rx="10" fill="var(--color-elevated)" stroke="var(--color-link)" strokeWidth="1.5" />
              <text x="500" y="66" textAnchor="middle" fill="var(--color-link)" fontSize="14" fontWeight="700">Qo&rsquo;ng&rsquo;iroq</text>
              <text x="500" y="84" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">SPoC bilan haftalik</text>
              {/* right: Sozlash */}
              <rect x="720" y="139" width="180" height="52" rx="10" fill="var(--color-elevated)" stroke="var(--color-link)" strokeWidth="1.5" />
              <text x="810" y="163" textAnchor="middle" fill="var(--color-link)" fontSize="14" fontWeight="700">Sozlash</text>
              <text x="810" y="181" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">jonli tizimda birga</text>
              {/* bottom: Uyga vazifa */}
              <rect x="410" y="236" width="180" height="52" rx="10" fill="var(--color-elevated)" stroke="var(--color-body)" strokeWidth="1.5" />
              <text x="500" y="260" textAnchor="middle" fill="var(--color-mute)" fontSize="14" fontWeight="700">Uyga vazifa</text>
              <text x="500" y="278" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">SPoC mustaqil bajaradi</text>
              {/* left: Tekshirish */}
              <rect x="100" y="139" width="180" height="52" rx="10" fill="var(--color-elevated)" stroke="var(--color-body)" strokeWidth="1.5" />
              <text x="190" y="163" textAnchor="middle" fill="var(--color-mute)" fontSize="14" fontWeight="700">Tekshirish</text>
              <text x="190" y="181" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">SPoC o&rsquo;zi ko&rsquo;rsatadi</text>
              {/* arrows */}
              <g fill="var(--color-link-deep)">
                <path d="M604,86 q70,20 108,60 l-6,-14 14,4 -2,14 -6,-14 q-38,-38 -108,-56z" />
                <path d="M812,197 q-20,60 -212,54 l14,6 -12,8 -8,-12 12,-2 q186,4 202,-58z" opacity=".9" />
                <path d="M396,262 q-90,-14 -108,-64 l-6,14 -8,-12 14,-2 4,12 q22,44 112,52z" opacity=".9" />
                <path d="M188,133 q18,-58 210,-56 l-14,-6 12,-8 8,12 -12,2 q-182,-2 -198,58z" />
              </g>
            </g>
          </svg>
          <div className="oj-figcap"><b>4-rasm.</b> Har hafta: qo&rsquo;ng&rsquo;iroq → sozlash → uyga vazifa → tekshirish. SPoC sichqonchani <b>o&rsquo;zi</b> boshqaradi — &ldquo;learning by doing&rdquo;. Bu o&rsquo;qitish samaradorligi va ishtirok uchun hamma narsani o&rsquo;zgartiradi.</div>
        </div>

        <div className="oj-lbl">Bosqichlar</div>
        <ul className="oj-clean">
          <li><b>3.1 Konfiguratsiya:</b> hisoblar rejasi, soliqlar, omborlar, marshrutlar, access rights.</li>
          <li><b>3.2 No-code (Studio):</b> PDF hisobotlarni brendlash, maxsus maydonlar, avtomatik harakatlar.</li>
          <li><b>3.3 Custom development:</b> faqat MoSCoW&rsquo;da tasdiqlangan ishlar — toza texnik topshiriq bilan.</li>
          <li><b>3.4 Data ETL:</b> Extract → Transform (tozalash) → Load. Avval test bazasiga.</li>
          <li><b>3.5 O&rsquo;qitish:</b> SPoC va key user&rsquo;lar real biznes ssenariylari orqali.</li>
          <li><b>3.6 UAT:</b> foydalanuvchilar tizimni &ldquo;buzishga&rdquo; urinadi; xatolar tuzatiladi; mijoz imzo chekadi.</li>
        </ul>

        <div className="oj-callout oj-warn"><div className="oj-ic">&#x2691;</div><div>
          <span className="oj-t">OLTIN QOIDA &middot; Data ETL</span>
          Ma&#x2BB;lumot <b>tarixini</b> (o&rsquo;tgan yilgi savdolar) import QILMANG — u ko&rsquo;p vaqt va pul talab qiladi, ROI esa juda past. Faqat asosiy ma&#x2BB;lumot (master data) va <b>ochiq qoldiqlar</b> (open balances) kiritiladi.</div></div>

        <div className="oj-callout oj-tip"><div className="oj-ic">&#x2726;</div><div>
          <span className="oj-t">MASLAHAT &middot; Tez g&rsquo;alabalar</span>
          Loyiha rejasini tez g&rsquo;alabalar ketma-ketligiga aylantiring. Foydalanuvchilar tizimdan foydalana boshlasa — hatto kichik qamrovda ham — bilimlari tez o&rsquo;sadi. Davom etayotgan siklda muddat/byudjetga ta&rsquo;sir qiluvchi o&rsquo;zgarishlarni qabul qilmang; ular keyingi siklga o&rsquo;tadi.</div></div>
      </div>
    </div>

    {/* ===== PHASE 4 ===== */}
    <div className="oj-phase reveal" id="deploy">
      <div className="oj-phase-head">
        <div className="oj-phase-num">04</div>
        <div className="oj-phase-title">
          <h3>Deploy — Test va ishga tushirish</h3>
          <div className="oj-sub">&ldquo;Ishga tushiramiz&rdquo; <span>&middot; ~3–4 hafta &middot; Go-Live (~5% vaqt)</span></div>
        </div>
      </div>
      <div className="oj-phase-body">
        <p>Tizimni sinash, xodimlarni rol bo&rsquo;yicha o&rsquo;qitish, real ma&#x2BB;lumotni ko&rsquo;chirish va production rejimiga o&rsquo;tkazish. Go-Live odatda juma kechqurun yoki dam olish kunlari amalga oshiriladi — xato chiqsa biznes to&rsquo;xtab qolmaydi.</p>

        <div className="oj-figure">
          <svg viewBox="0 0 1000 210" role="img" aria-label="Go-Live cutover jadvali">
            <g fontFamily="var(--font-geist-sans),sans-serif">
              <text x="0" y="22" fill="var(--color-mute)" fontSize="12" letterSpacing="2">CUTOVER — ESKI TIZIMDAN YANGISIGA O&rsquo;TISH</text>
              <line x1="60" y1="90" x2="940" y2="90" stroke="var(--color-hairline)" strokeWidth="2" />
              <g>
                <circle cx="120" cy="90" r="9" fill="var(--color-body)" />
                <text x="120" y="60" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600">Blackout</text>
                <text x="120" y="118" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">Juma 18:00 —</text>
                <text x="120" y="132" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">eski tizim yopiladi</text>

                <circle cx="330" cy="90" r="9" fill="var(--color-link)" />
                <text x="330" y="60" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600">Yakuniy qoldiq</text>
                <text x="330" y="118" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">Ombor + bank/kassa</text>
                <text x="330" y="132" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">Excelga olinadi</text>

                <circle cx="540" cy="90" r="9" fill="var(--color-link)" />
                <text x="540" y="60" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600">Load</text>
                <text x="540" y="118" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">Qoldiqlar Live</text>
                <text x="540" y="132" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">bazaga import</text>

                <circle cx="720" cy="90" r="9" fill="var(--color-link-deep)" />
                <text x="720" y="60" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontWeight="600">Smoke test</text>
                <text x="720" y="118" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">1 sotuv &middot; 1 xarid</text>
                <text x="720" y="132" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">&middot; 1 to&rsquo;lov</text>

                <circle cx="900" cy="90" r="12" fill="var(--color-link)" stroke="var(--color-canvas)" strokeWidth="3" />
                <text x="900" y="58" textAnchor="middle" fill="var(--color-link)" fontSize="13" fontWeight="700">Hypercare</text>
                <text x="900" y="118" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">Dush. — 1–2 hafta</text>
                <text x="900" y="132" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">yonida turish</text>
              </g>
              <text x="500" y="180" textAnchor="middle" fill="var(--color-ink)" fontSize="12.5" fontFamily="var(--font-geist-sans),sans-serif">Xato bo&rsquo;lishi — 100% normal. Asosiysi xatoning o&rsquo;zi emas, unga qanchalik <tspan fill="var(--color-link)" fontWeight="600">tez reaksiya</tspan> bildirishdir.</text>
            </g>
          </svg>
          <div className="oj-figcap"><b>5-rasm.</b> Cutover — aniq marshrut bo&rsquo;yicha o&rsquo;tish. Dushanba ertalab xodimlar birinchi marta real rejimda ishlay boshlaydi; shu davrda Loyiha yetakchisi va texnik jamoa yonida (yoki 24/7 onlayn) bo&rsquo;ladi.</div>
        </div>

        <div className="oj-lbl">Go-Live chek-listi (qisqartirilgan)</div>
        <ul className="oj-deliv">
          <li>Barcha biznes oqimlari SPoC tomonidan uchdan-uchgacha test qilingan va yozma tasdiqlangan</li>
          <li>Asosiy ma&#x2BB;lumot (mijoz, ta&#x2BB;minotchi, mahsulot, hisoblar rejasi) yuklangan va tekshirilgan</li>
          <li>Foydalanuvchi huquqlari va kirish darajalari sozlangan</li>
          <li>Yakuniy foydalanuvchilar Go-Live&rsquo;dan 1–2 hafta oldin o&rsquo;qitilgan (oylar oldin emas)</li>
          <li>Zaxira nusxa va orqaga qaytish (rollback) rejasi mavjud</li>
          <li>Eski tizim qachon o&rsquo;chirilishi aniq belgilangan</li>
        </ul>

        <div className="oj-callout oj-warn"><div className="oj-ic">!</div><div>
          <span className="oj-t">XAVF &middot; Go-Live&rsquo;ni surish</span>
          Sanani surish yaxshi tanlovdek tuyulsa ham, 2 oyda ko&rsquo;p narsa o&rsquo;zgaradi: odamlar motivatsiyani yo&rsquo;qotadi, yangi so&rsquo;rovlar paydo bo&rsquo;ladi, import qayta bajarilishi kerak bo&rsquo;ladi. Odatda <b>tez ishga tushirish</b> yaxshiroq — hatto hamma narsa mukammal bo&rsquo;lmasa ham.</div></div>
      </div>
    </div>

    {/* ===== PHASE 5 ===== */}
    <div className="oj-phase reveal" id="support">
      <div className="oj-phase-head">
        <div className="oj-phase-num">05</div>
        <div className="oj-phase-title">
          <h3>Support — Yordam va optimizatsiya</h3>
          <div className="oj-sub">&ldquo;Barqaror ushlaymiz&rdquo; <span>&middot; doimiy &middot; kamida 3 oy faol</span></div>
        </div>
      </div>
      <div className="oj-phase-body">
        <p>Ishga tushgan tizimni barqaror ushlab turish, xatolarni tuzatish, optimallashtirish va rivojlantirish. Bir oy o&rsquo;tgach — Go-Live&rsquo;dan keyingi audit va <b>ikkinchi bosqich</b>ni rejalashtirish.</p>

        <div className="oj-lbl">Asosiy faoliyat</div>
        <div className="oj-pillrow">
          <span className="oj-pill oj-on">Bugfix</span>
          <span className="oj-pill">Ichki hotline</span>
          <span className="oj-pill">Optimizatsiya</span>
          <span className="oj-pill">Backup tekshiruvi</span>
          <span className="oj-pill">Xavfsizlik yangilanishlari</span>
          <span className="oj-pill">Yangi modul / stanok</span>
          <span className="oj-pill">Versiya yangilanishi</span>
        </div>

        <div className="oj-callout oj-tip"><div className="oj-ic">&#x2726;</div><div>
          <span className="oj-t">Kutilmagan haqiqat</span>
          Backlog grooming&rsquo;da ma&rsquo;lum bo&rsquo;ladi: mijozlar boshida &ldquo;o&rsquo;ta muhim&rdquo; degan qimmat dasturlash ishlarining <b>50% dan ortig&rsquo;i endi keraksiz</b>. Chunki Odoo standart jarayonlari ularning ongini o&rsquo;zgartiradi. Bu — custom kodni Go-Live&rsquo;dan keyinga surishning eng kuchli argumenti.</div></div>

        <div className="oj-callout oj-warn"><div className="oj-ic">!</div><div>
          <span className="oj-t">XAVF &middot; Tekshirilmagan backup</span>
          Backup tekshirilmasa — buzilganda ma&#x2BB;lumot yo&rsquo;qoladi. Muntazam <b>tiklash testi</b> qiling. Custom kod versiya yangilanishida buzilishi mumkin — avval test muhitida yangilang.</div></div>
      </div>
    </div>
  </div>
</section>

{/* ============ FINAL 4 STEPS ============ */}
<section className="oj-sec reveal" id="final4">
  <div className="oj-wrap">
    <div className="oj-sec-head">
      <div className="oj-eyebrow">Amaliy &middot; odamlar bosqichi</div>
      <h2 className="oj-h2">Yakuniy <em>4 bosqich</em></h2>
      <p>Trening → Test (UAT) → Go-Live → Support. Bular — texnik emas, <b style={{color:'var(--oj-white)'}}>odamlar</b> bosqichlari. Xalqaro statistikaga ko&rsquo;ra, ERP loyihalarining <b style={{color:'var(--oj-white)'}}>~70–75 foizi</b> aynan shu yerda muvaffaqiyatsizlikka uchraydi — texnika sabab emas, joriy etish sabab.</p>
    </div>

    <div className="oj-figure">
      <svg viewBox="0 0 1000 138" role="img" aria-label="Yakuniy to'rt bosqich davomiyligi">
        <g fontFamily="var(--font-geist-sans),sans-serif">
          <text x="0" y="18" fill="var(--color-mute)" fontSize="12" letterSpacing="1.5">ERP LOYIHALARINING ~70–75% i AYNAN SHU BOSQICHLARDA QULAYDI</text>
          <rect x="20" y="34" width="90" height="60" rx="7" fill="var(--color-link)" />
          <rect x="116" y="34" width="360" height="60" rx="7" fill="var(--color-body)" />
          <rect x="482" y="34" width="70" height="60" rx="7" fill="var(--color-body)" />
          <rect x="558" y="34" width="422" height="60" rx="7" fill="var(--color-link-deep)" />
          <text x="65" y="70" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" transform="rotate(-90 65 64)">TRENING</text>
          <g textAnchor="middle" fill="var(--color-ink)">
            <text x="296" y="62" fontSize="15" fontWeight="700">2. TEST (UAT)</text>
            <text x="296" y="82" fontSize="12" opacity=".85" fontFamily="var(--font-geist-sans),sans-serif">2–4 hafta</text>
          </g>
          <text x="517" y="70" textAnchor="middle" fill="var(--color-ink)" fontSize="11.5" fontWeight="700" transform="rotate(-90 517 64)">GO-LIVE</text>
          <g textAnchor="middle" fill="#ffffff">
            <text x="769" y="62" fontSize="15" fontWeight="700">4. SUPPORT</text>
            <text x="769" y="82" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">doimiy &middot; 3 oy zich</text>
          </g>
          <text x="65" y="112" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">3–5 kun</text>
          <text x="517" y="112" textAnchor="middle" fill="var(--color-mute)" fontSize="11" fontFamily="var(--font-geist-sans),sans-serif">1 kun</text>
          <text x="500" y="132" textAnchor="middle" fill="var(--color-mute)" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">Ma&#x2BB;lumot kiritish → Trening → Parallel test → Go-Live → Support</text>
        </g>
      </svg>
      <div className="oj-figcap"><b>6-rasm.</b> To&rsquo;rt bosqichning nisbiy davomiyligi va ketma-ketligi. Ketma-ketlikni buzmang — har bosqich oldingisining natijasiga tayanadi.</div>
    </div>

    <div className="oj-tblwrap" style={{marginBottom:8}}>
      <table>
        <thead><tr><th>#</th><th>Bosqich</th><th>Maqsad</th><th>Vaqt</th></tr></thead>
        <tbody>
          <tr><td style={{width:'6%',color:'var(--oj-gold)',fontWeight:700}}>1</td><td className="oj-td-odoo" style={{width:'20%'}}><b>Trening</b></td><td className="oj-td-odoo">Xodimlar tizimni ishlata olsin</td><td className="oj-td-odoo">3–5 kun</td></tr>
          <tr><td style={{color:'var(--oj-gold)',fontWeight:700}}>2</td><td className="oj-td-odoo"><b>Test (UAT)</b></td><td className="oj-td-odoo">Yashirin muammolarni topamiz, ma&#x2BB;lumot yo&rsquo;qolmaydi</td><td className="oj-td-odoo">2–4 hafta</td></tr>
          <tr><td style={{color:'var(--oj-gold)',fontWeight:700}}>3</td><td className="oj-td-odoo"><b>Go-Live</b></td><td className="oj-td-odoo">Rasmiy start — endi butun biznes faqat Odooda ishlaydi</td><td className="oj-td-odoo">1 kun (+ tayyorgarlik)</td></tr>
          <tr><td style={{color:'var(--oj-accent2-l)',fontWeight:700}}>4</td><td className="oj-td-odoo"><b>Support</b></td><td className="oj-td-odoo">Barqarorlashtirish, yaxshilash, kengaytirish</td><td className="oj-td-odoo">Doimiy (3 oy — eng zich)</td></tr>
        </tbody>
      </table>
    </div>

    <div className="oj-grid oj-g2" style={{marginTop:22}}>
      <div className="oj-ocard"><div className="oj-n">1-BOSQICH &middot; 3–5 KUN</div><h4>Trening</h4><div className="oj-en">Xodimlarni o&rsquo;qitish</div>
        <div className="oj-q">Tizim asosiy ma&#x2BB;lumot bilan to&rsquo;lgach, uni haqiqatda ishlatadigan odamlarni o&rsquo;rgatamiz. Har xodim faqat o&rsquo;z ish qismini o&rsquo;rganadi. Bu bosqich texnik emas — psixologik: qarshilikni yumshatish va ishonch berish.</div>
        <div className="oj-r">Yopiladi, agar: <b>har rol bo&rsquo;yicha</b> kamida bitta xodim o&rsquo;z vazifasini yordamsiz, boshdan-oxir Odooda bajarib bera olsa.</div></div>

      <div className="oj-ocard"><div className="oj-n">2-BOSQICH &middot; 2–4 HAFTA</div><h4>Test (UAT)</h4><div className="oj-en">Parallel ishlash</div>
        <div className="oj-q">Go-Live&rsquo;dan oldin tizimni eski usul (1C, Excel) bilan <b>yonma-yon</b> ishlatib sinaymiz. Tizimni dasturchi emas, real xodimlar real ishda sinaydi. Har kuni raqamlar solishtiriladi.</div>
        <div className="oj-r">Yopiladi, agar: kamida <b>3–5 kun ketma-ket</b> ikkala tizim raqamlari to&rsquo;liq mos kelsa va har ssenariy xatosiz o&rsquo;tsa.</div></div>

      <div className="oj-ocard"><div className="oj-n">3-BOSQICH &middot; 1 KUN</div><h4>Go-Live</h4><div className="oj-en">Rasmiy ishga tushirish</div>
        <div className="oj-q">Eski tizim o&rsquo;chadi (yoki &ldquo;faqat o&rsquo;qish&rdquo;ga o&rsquo;tadi), butun biznes to&rsquo;liq Odooga ko&rsquo;chadi. Bu texnik emas, <b>tashkiliy hodisa</b> — psixologik &ldquo;yangi sahifa&rdquo; ochish kuni.</div>
        <div className="oj-r">Muvaffaqiyatli, agar: kun oxirida barcha real hujjatlar Odooda, ish to&rsquo;xtamagan, <b>kritik xato — 0</b>.</div></div>

      <div className="oj-ocard"><div className="oj-n">4-BOSQICH &middot; DOIMIY</div><h4>Support</h4><div className="oj-en">Yordam va kengaytirish</div>
        <div className="oj-q">Go-Live&rsquo;dan keyingi davr — real ishda chiqadigan narsalarni sozlash, yaxshilash va kengaytirish. Bu &ldquo;loyihaning oxiri&rdquo; emas, &ldquo;tizim hayotining boshi&rdquo;.</div>
        <div className="oj-r">Belgi: 3 oydan keyin xodimlar Odooni <b>&ldquo;bizning tizim&rdquo;</b> deb aytsa; yordam so&rsquo;rovlari oyda 1–2 martaga tushsa.</div></div>
    </div>

    <div className="oj-callout oj-tip"><div className="oj-ic">&#x2726;</div><div>
      <span className="oj-t">NEGA PARALLEL — &ldquo;xavfsizlik yostig&rsquo;i&rdquo;</span>
      Agar biror kun Odooda xato bo&rsquo;lsa — eski tizim ishlab turibdi, hisobot va yuk berish to&rsquo;xtamaydi, <b>ma&#x2BB;lumot yo&rsquo;qolmaydi</b>. Odooni birdaniga yoqib, eskini o&rsquo;chirsak — xato chiqqan zahoti butun biznes to&rsquo;xtaydi.</div></div>

    <div className="oj-callout oj-warn"><div className="oj-ic">!</div><div>
      <span className="oj-t">PERFEKTSIONIZM — DUSHMAN</span>
      &ldquo;Hamma modul 100% tayyor bo&rsquo;lguncha kutamiz&rdquo; — loyihalar aynan shu yerda oylab tiqilib qoladi. Go-Live&rsquo;ni <b>asosiy 5 modul</b> bilan boshlang (buxgalteriya, mahsulot+BOM, ombor, ishlab chiqarish, xodim); qolganini — payroll, e-hujjat, maxsus hisobotlar — ishlab turgan holda, Support bosqichida bosqichma-bosqich qo&rsquo;shing.</div></div>

    <div className="oj-lbl" style={{marginTop:30}}>Go-Live kuni — soatlik reja</div>
    <div className="oj-tblwrap">
      <table>
        <thead><tr><th>Vaqt</th><th>Amal</th><th>Kim</th></tr></thead>
        <tbody>
          <tr><td className="oj-td-odoo" style={{width:'14%'}}>06:00</td><td className="oj-td-odoo">Server, backup, integratsiyalar oxirgi tekshiruv</td><td style={{width:'26%'}}>IT</td></tr>
          <tr><td className="oj-td-odoo">07:00</td><td className="oj-td-odoo">Eski tizim &ldquo;faqat o&rsquo;qish&rdquo; rejimiga o&rsquo;tkaziladi (arxiv)</td><td>IT + Buxgalter</td></tr>
          <tr><td className="oj-td-odoo">08:00</td><td className="oj-td-odoo">Smena boshi — barcha xodimlar Odooda tizimga kiradi</td><td>Barcha</td></tr>
          <tr><td className="oj-td-odoo">08:00–12:00</td><td className="oj-td-odoo">Real ish boshlanadi; IT navbatchi — muammo chiqsa 10 daqiqada javob</td><td>IT</td></tr>
          <tr><td className="oj-td-odoo">12:00</td><td className="oj-td-odoo">Yarim kunlik tekshiruv: hamma ishlayaptimi, qayerda qiynalish</td><td>IT + Direktor</td></tr>
          <tr><td className="oj-td-odoo">17:00</td><td className="oj-td-odoo">Qisqa yig&rsquo;ilish: &ldquo;Ertaga nima yaxshilash kerak?&rdquo;</td><td>Direktor + IT</td></tr>
        </tbody>
      </table>
    </div>

    <div className="oj-lbl" style={{marginTop:30}}>Muammoga javob vaqti (SLA)</div>
    <div className="oj-tblwrap">
      <table>
        <thead><tr><th>Darajasi</th><th>Misol</th><th>Javob vaqti</th></tr></thead>
        <tbody>
          <tr><td style={{color:'#52aeff',fontWeight:600,width:'16%'}}>Kritik</td><td className="oj-td-odoo">Biznes ishlolmayapti, hisob-faktura chiqmayapti</td><td className="oj-td-odoo" style={{width:'28%'}}>1 soat ko&rsquo;rish &middot; 4 soat yechim</td></tr>
          <tr><td style={{color:'var(--oj-accent2-l)',fontWeight:600}}>Yuqori</td><td className="oj-td-odoo">Bir bo&rsquo;lim ishlolmayapti, hisobot noto&rsquo;g&rsquo;ri</td><td className="oj-td-odoo">Shu kun ichida</td></tr>
          <tr><td style={{color:'var(--oj-gold)',fontWeight:600}}>O&rsquo;rta</td><td className="oj-td-odoo">Noqulaylik, lekin ishlash mumkin</td><td className="oj-td-odoo">2–3 ish kuni</td></tr>
          <tr><td style={{color:'var(--oj-ink-dim)',fontWeight:600}}>Past</td><td className="oj-td-odoo">&ldquo;Yaxshi bo&rsquo;lardi&rdquo; so&rsquo;rov, yangi funksiya</td><td className="oj-td-odoo">Haftalik reja bo&rsquo;yicha</td></tr>
        </tbody>
      </table>
    </div>

    <div className="oj-quote" style={{marginTop:34}}>ERP joriy etish — bu marafon, sprint emas. Texnika 30%, odamlar 70%. Bu 4 bosqich tartib bilan, sabr bilan o&rsquo;tkazilsa — jamoa tizimni &ldquo;o&rsquo;zining&rdquo; deb qabul qiladi.
      <cite>— Odoo joriy etish metodologiyasi</cite></div>
  </div>
</section>

{/* ============ SATISFACTION CURVE ============ */}
<section className="oj-sec reveal" id="valley">
  <div className="oj-wrap">
    <div className="oj-sec-head">
      <div className="oj-eyebrow">Odamlar omili</div>
      <h2 className="oj-h2">&ldquo;Tushkunlik vodiysi&rdquo; — <em>normal holat</em></h2>
      <p>Mijoz qoniqishi loyiha muvaffaqiyatining yaxshi o&rsquo;lchovi emas: u tabiiy ravishda qiyin qarorlar bosqichida pasayadi va Go-Live&rsquo;dan keyin ko&rsquo;tariladi. Bu grafik shakli — xavf signali emas.</p>
    </div>

    <div className="oj-figure">
      <svg viewBox="0 0 1000 340" role="img" aria-label="Mijoz qoniqishi egri chizig'i">
        <g fontFamily="var(--font-geist-sans),sans-serif">
          <line x1="80" y1="40" x2="80" y2="270" stroke="var(--color-hairline)" strokeWidth="1.5" />
          <line x1="80" y1="270" x2="950" y2="270" stroke="var(--color-hairline)" strokeWidth="1.5" />
          <text x="80" y="26" textAnchor="middle" fill="var(--color-mute)" fontSize="11">QONIQISH ↑</text>
          <text x="950" y="298" textAnchor="end" fill="var(--color-mute)" fontSize="11">LOYIHA BOSQICHLARI →</text>
          <path d="M110,90 C 220,80 260,150 360,175 C 460,200 520,230 610,210 C 660,198 700,150 760,120 C 820,92 880,80 930,72"
                fill="none" stroke="var(--color-link)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M360,175 C 460,200 520,230 610,210 L610,270 L360,270 Z" fill="rgba(128,128,128,.14)" />
          <g>
            <circle cx="110" cy="90" r="6" fill="var(--color-link)" />
            <text x="110" y="322" textAnchor="middle" fill="var(--color-ink)" fontSize="12">Sotuv</text>
            <circle cx="485" cy="205" r="7" fill="var(--color-body)" />
            <text x="485" y="322" textAnchor="middle" fill="var(--color-mute)" fontSize="12" fontWeight="600">Qiyin qarorlar</text>
            <circle cx="700" cy="150" r="8" fill="var(--color-link-deep)" stroke="var(--color-canvas)" strokeWidth="2" />
            <text x="700" y="322" textAnchor="middle" fill="var(--color-ink)" fontSize="12" fontWeight="600">Go-Live</text>
            <circle cx="930" cy="72" r="6" fill="var(--color-link)" />
            <text x="930" y="322" textAnchor="middle" fill="var(--color-ink)" fontSize="12">Natija</text>
          </g>
          <text x="485" y="252" textAnchor="middle" fill="var(--color-mute)" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">vaqtinchalik norozilik</text>
        </g>
      </svg>
      <div className="oj-figcap"><b>7-rasm.</b> Biz mijozning vaqtinchalik norozi bo&rsquo;lishini (chunki murakkab qaror yuzasidan qattiq muhokama bo&rsquo;ldi) joriy etish muddatini o&rsquo;tkazib yuborishdan afzal ko&rsquo;ramiz. Qisqa muddatli qoniqishdan ko&rsquo;ra loyiha muvaffaqiyatini ustun qo&rsquo;yish uzoq muddatda mijozni haqiqatan baxtli qiladi.</div>
    </div>
  </div>
</section>

{/* ============ DIGITAL OPPORTUNITIES MATRIX ============ */}
<section className="oj-sec reveal">
  <div className="oj-wrap">
    <div className="oj-sec-head">
      <div className="oj-eyebrow">Progress hisoboti</div>
      <h2 className="oj-h2">Raqamli imkoniyatlar <em>matritsasi</em></h2>
      <p>Go-Live oxir emas. Yangi imkoniyatlarni ta&rsquo;sir va amalga oshirish osonligi bo&rsquo;yicha baholab, to&rsquo;rt kvadrantga ajratamiz. Doira kattaligi = ta&rsquo;sir ko&rsquo;radigan xodimlar soni.</p>
    </div>

    <div className="oj-figure">
      <svg viewBox="0 0 1000 420" role="img" aria-label="Raqamli imkoniyatlar matritsasi">
        <g fontFamily="var(--font-geist-sans),sans-serif">
          <text x="40" y="210" fill="var(--color-mute)" fontSize="12" transform="rotate(-90 40 210)" textAnchor="middle">POTENSIAL TA&rsquo;SIR ↑</text>
          <text x="530" y="410" fill="var(--color-mute)" fontSize="12" textAnchor="middle">O&rsquo;ZGARTIRISH OSONLIGI →</text>
          <rect x="80" y="40" width="440" height="160" rx="12" fill="rgba(128,128,128,.10)" stroke="rgba(128,128,128,.35)" />
          <rect x="530" y="40" width="440" height="160" rx="12" fill="rgba(0,112,243,.14)" stroke="var(--color-link-deep)" />
          <rect x="80" y="210" width="440" height="160" rx="12" fill="rgba(128,128,128,.06)" stroke="rgba(128,128,128,.25)" />
          <rect x="530" y="210" width="440" height="160" rx="12" fill="rgba(0,112,243,.08)" stroke="rgba(0,112,243,.35)" />
          <text x="100" y="72" fill="var(--color-mute)" fontSize="15" fontWeight="700">Game changers</text>
          <text x="100" y="92" fill="var(--color-mute)" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">Yuqori ta&rsquo;sir &middot; yuqori murakkablik → rejalashtiring</text>
          <text x="550" y="72" fill="var(--color-link)" fontSize="15" fontWeight="700">Quick wins &middot; 1-ustuvorlik</text>
          <text x="550" y="92" fill="var(--color-mute)" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">Yuqori ta&rsquo;sir &middot; past murakkablik → darhol qiling</text>
          <text x="100" y="242" fill="var(--color-mute)" fontSize="15" fontWeight="700">To avoid</text>
          <text x="100" y="262" fill="var(--color-mute)" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">Past ta&rsquo;sir &middot; yuqori murakkablik → rad eting</text>
          <text x="550" y="242" fill="var(--color-link)" fontSize="15" fontWeight="700">Fine tuning</text>
          <text x="550" y="262" fill="var(--color-mute)" fontSize="12" fontFamily="var(--font-geist-sans),sans-serif">Past ta&rsquo;sir &middot; past murakkablik → vaqt topilsa</text>
          <g opacity=".92">
            <circle cx="640" cy="140" r="34" fill="var(--color-link)" opacity=".85" /><text x="640" y="146" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">1</text>
            <circle cx="760" cy="120" r="22" fill="var(--color-link)" opacity=".7" /><text x="760" y="125" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">2</text>
            <circle cx="300" cy="110" r="28" fill="var(--color-body)" opacity=".8" /><text x="300" y="116" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">3</text>
            <circle cx="820" cy="300" r="18" fill="var(--color-link)" opacity=".5" /><text x="820" y="305" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700">4</text>
            <circle cx="240" cy="300" r="16" fill="var(--color-body)" opacity=".45" /><text x="240" y="305" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">5</text>
          </g>
        </g>
      </svg>
      <div className="oj-figcap"><b>8-rasm.</b> Odatda quick wins&rsquo;dan boshlaysiz, keyin strategiyaga qarab boshqa kvadrantlarga o&rsquo;tasiz. &ldquo;Shunchaki yaxshi&rdquo; 10 tadan ko&rsquo;ra eng ta&rsquo;sirchan <b>3 tasiga</b> e&rsquo;tibor qarating. Bitta savol yo&rsquo;l ko&rsquo;rsatadi: &ldquo;Xodimlarga kamroq vaqtda ko&rsquo;proq ish qilishga qanday yordam bera olaman?&rdquo;</div>
    </div>
  </div>
</section>

{/* ============ PHASE GATES ============ */}
<section className="oj-sec reveal">
  <div className="oj-wrap">
    <div className="oj-sec-head">
      <div className="oj-eyebrow">Oltin qoida</div>
      <h2 className="oj-h2">Faza darvozalari — <em>o&rsquo;tib bo&rsquo;lmaydi</em></h2>
      <p>Har bir fazani tugatmasdan keyingisiga o&rsquo;tmang. Faza oxirida &ldquo;muvaffaqiyat mezoni&rdquo; bajarilganini tekshiring. Bu loyihani nazoratda ushlab, keyinroq katta qayta ishlashning oldini oladi.</p>
    </div>

    <div className="oj-figure">
      <svg viewBox="0 0 1000 170" role="img" aria-label="Faza darvozalari">
        <g fontFamily="var(--font-geist-sans),sans-serif">
          <g>
            <rect x="20" y="55" width="150" height="60" rx="10" fill="var(--color-elevated)" stroke="var(--color-link)" strokeWidth="1.5" />
            <text x="95" y="80" textAnchor="middle" fill="var(--color-ink)" fontSize="14" fontWeight="600">Discovery</text>
            <text x="95" y="100" textAnchor="middle" fill="var(--color-mute)" fontSize="10.5" fontFamily="var(--font-geist-sans),sans-serif">Talablar tasdiq</text>

            <rect x="228" y="55" width="150" height="60" rx="10" fill="var(--color-elevated)" stroke="var(--color-link)" strokeWidth="1.5" />
            <text x="303" y="80" textAnchor="middle" fill="var(--color-ink)" fontSize="14" fontWeight="600">Design</text>
            <text x="303" y="100" textAnchor="middle" fill="var(--color-mute)" fontSize="10.5" fontFamily="var(--font-geist-sans),sans-serif">Dizayn + hajm</text>

            <rect x="436" y="55" width="150" height="60" rx="10" fill="var(--color-elevated)" stroke="var(--color-link-deep)" strokeWidth="2" />
            <text x="511" y="80" textAnchor="middle" fill="var(--color-ink)" fontSize="14" fontWeight="600">Build</text>
            <text x="511" y="100" textAnchor="middle" fill="var(--color-mute)" fontSize="10.5" fontFamily="var(--font-geist-sans),sans-serif">Test sikl ishlaydi</text>

            <rect x="644" y="55" width="150" height="60" rx="10" fill="var(--color-elevated)" stroke="var(--color-body)" strokeWidth="1.5" />
            <text x="719" y="80" textAnchor="middle" fill="var(--color-ink)" fontSize="14" fontWeight="600">Deploy</text>
            <text x="719" y="100" textAnchor="middle" fill="var(--color-mute)" fontSize="10.5" fontFamily="var(--font-geist-sans),sans-serif">UAT + Go-Live</text>

            <rect x="852" y="55" width="150" height="60" rx="10" fill="var(--color-elevated)" stroke="var(--color-body)" strokeWidth="1.5" />
            <text x="927" y="80" textAnchor="middle" fill="var(--color-ink)" fontSize="14" fontWeight="600">Support</text>
            <text x="927" y="100" textAnchor="middle" fill="var(--color-mute)" fontSize="10.5" fontFamily="var(--font-geist-sans),sans-serif">Barqarorlik</text>
          </g>
          <g fill="var(--color-canvas)" stroke="var(--color-link)" strokeWidth="1.5">
            <path d="M203,85 l12,-12 12,12 -12,12 z" />
            <path d="M411,85 l12,-12 12,12 -12,12 z" />
            <path d="M619,85 l12,-12 12,12 -12,12 z" stroke="var(--color-body)" />
            <path d="M827,85 l12,-12 12,12 -12,12 z" stroke="var(--color-body)" />
          </g>
          <text x="500" y="150" textAnchor="middle" fill="var(--color-mute)" fontSize="12" letterSpacing="1">&#x25C6; = DARVOZA &middot; shart bajarilmasa keyingi fazaga o&rsquo;tilmaydi</text>
        </g>
      </svg>
      <div className="oj-figcap"><b>9-rasm.</b> Har o&rsquo;tish nuqtasidagi majburiy shart — masalan, &ldquo;Test muhitida to&rsquo;liq sikl ishlaydi&rdquo; gate&rsquo;i bajarilmasa, Deploy&rsquo;ga o&rsquo;tilmaydi.</div>
    </div>
  </div>
</section>

{/* ============ 7 GOLDEN RULES ============ */}
<section className="oj-sec reveal">
  <div className="oj-wrap">
    <div className="oj-sec-head">
      <div className="oj-eyebrow">Falsafa</div>
      <h2 className="oj-h2">Yetti oltin qoida</h2>
      <p>Agar butun metodologiyani unutib qo&rsquo;ysangiz ham, shu yettitani eslab qolsangiz — loyihalaringizning aksariyati muvaffaqiyatli yakunlanadi. Bular shior emas, kundalik qarorlar uchun filtr.</p>
    </div>

    <div className="oj-rules">
      <div className="oj-rule"><p><b>Vaqt va byudjet — muqaddas.</b> Qolgan hamma narsa ikkinchi darajali.</p></div>
      <div className="oj-rule"><p><b>Standart — birinchi tanlov.</b> Maxsus ishlanma — oxirgi chora.</p></div>
      <div className="oj-rule"><p><b>Bitta qaror qabul qiluvchi.</b> Sizda — Loyiha yetakchisi, mijozda — SPoC.</p></div>
      <div className="oj-rule"><p><b>Siz qaror qilasiz, mijoz sinaydi.</b> Variantlar taklif qilmang — eng yaxshisini taklif qiling.</p></div>
      <div className="oj-rule"><p><b>Kutilmalarni boshqaring.</b> Kamroq va&rsquo;da bering — ko&rsquo;proq yetkazing.</p></div>
      <div className="oj-rule"><p><b>Tezlikni saqlang.</b> Har hafta yetkazib bering; to&rsquo;xtash — o&rsquo;lim.</p></div>
      <div className="oj-rule"><p><b>Yechimni izlang.</b> Muammo bo&rsquo;lsa — kim aybdorligini emas.</p></div>
    </div>
  </div>
</section>

{/* ============ COMPARISON ============ */}
<section className="oj-sec reveal">
  <div className="oj-wrap">
    <div className="oj-sec-head">
      <div className="oj-eyebrow">Yondashuv</div>
      <h2 className="oj-h2">An&rsquo;anaviy ERP <em>vs</em> Odoo</h2>
      <p>An&rsquo;anaviy yetkazib beruvchilar murakkablikni jarayon bilan yengishga urinadi: ko&rsquo;proq tahlil, hujjat, rol, tasdiqlash sikli. Odoo esa murakkablikni qaror bilan yengadi.</p>
    </div>
    <div className="oj-tblwrap">
      <table>
        <thead><tr><th>Jihat</th><th>An&rsquo;anaviy yondashuv</th><th>Odoo yondashuvi</th></tr></thead>
        <tbody>
          <tr><td>Tahlil</td><td>Uzoq, yuzlab sahifali texnik topshiriq</td><td className="oj-td-odoo">Qisqa va aniq; <b>hozirgi holatni</b> tushunishga qaratilgan</td></tr>
          <tr><td>Rollar</td><td>Menejer, tahlilchi, tester, trener — alohida odamlar</td><td className="oj-td-odoo">Bitta <b>Loyiha yetakchisi</b> bir necha rolni bajaradi</td></tr>
          <tr><td>Qaror</td><td>Qo&rsquo;mita orqali, tasdiqlash sikllari bilan</td><td className="oj-td-odoo">SPoC bilan <b>bevosita</b>, tezkor</td></tr>
          <tr><td>Moslashtirish</td><td>Mijoz nima so&rsquo;rasa, shu ishlab chiqiladi</td><td className="oj-td-odoo">Har talab so&rsquo;roq ostiga olinadi; <b>standart</b> ustuvor</td></tr>
          <tr><td>Muvaffaqiyat</td><td>Talablar ro&rsquo;yxati bajarildimi?</td><td className="oj-td-odoo">Foydalanuvchilar tizimda <b>o&rsquo;z vaqtida va byudjetda</b> ishlayaptimi?</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

{/* ============ RISKS ============ */}
<section className="oj-sec reveal">
  <div className="oj-wrap">
    <div className="oj-sec-head">
      <div className="oj-eyebrow">Qizil bayroqlar</div>
      <h2 className="oj-h2">Eng ko&rsquo;p uchraydigan <em>xatolar</em></h2>
      <p>ERP loyihalarining yarmidan ko&rsquo;pi muvaffaqiyatsizlikka uchraydi — deyarli har doim juda ko&rsquo;p vaqt olgani yoki juda qimmatga tushgani uchun. Quyida ularning oldini olish.</p>
    </div>
    <div className="oj-grid oj-g3">
      <div className="oj-risk"><div className="oj-flag"><span>&#x2691;</span>Xodimlar qarshiligi</div>
        <p>ERP&rsquo;larni qulatadigan <b>#1 sabab</b>. Yechim: erta o&rsquo;qitish, motivatsiya, tizimni sodda saqlash va Go-Live kunlarida yonida turish.</p></div>
      <div className="oj-risk"><div className="oj-flag"><span>&#x2691;</span>Ortiqcha custom kod</div>
        <p>Murakkablik moslashtirishlar soni bilan <b>eksponensial</b> o&rsquo;sadi va texnik qarz yaratadi. Har talabni so&rsquo;roq ostiga oling.</p></div>
      <div className="oj-risk"><div className="oj-flag"><span>&#x2691;</span>Sifatsiz ma&#x2BB;lumot</div>
        <p>Sifatsiz ma&#x2BB;lumot tizimni o&rsquo;ldiradi. Transform bosqichini jiddiy oling; tarixni emas, faqat qoldiqlarni ko&rsquo;chiring.</p></div>
      <div className="oj-risk"><div className="oj-flag"><span>&#x2691;</span>Scope creep</div>
        <p>&ldquo;Bittagina qo&rsquo;shimcha&rdquo; — loyihani cho&rsquo;zadi. Davom etayotgan siklda muddat/byudjetga ta&rsquo;sir qiluvchi o&rsquo;zgarishni qabul qilmang.</p></div>
      <div className="oj-risk"><div className="oj-flag"><span>&#x2691;</span>Go-Live&rsquo;ni surish</div>
        <p>Surish loyihani qo&rsquo;shimcha xavf va xarajatga duchor qiladi. Tez ishga tushirish odatda yaxshiroq.</p></div>
      <div className="oj-risk"><div className="oj-flag"><span>&#x2691;</span>Tekshirilmagan backup</div>
        <p>Backup tekshirilmasa — buzilganda ma&#x2BB;lumot yo&rsquo;qoladi. Muntazam tiklash testi qiling.</p></div>
    </div>
  </div>
</section>

{/* ============ CTA ============ */}
<section className="oj-sec reveal">
  <div className="oj-wrap">
    <div className="oj-cta">
      <div className="oj-eyebrow" style={{justifyContent:'center'}}>Empire Group &middot; Odoo ERP &amp; AI</div>
      <h2 className="oj-h2">Loyihangizni <em>to&rsquo;g&rsquo;ri fazadan</em> boshlaymiz</h2>
      <p>G&rsquo;oyadan Go-Live&rsquo;gacha — Discovery&rsquo;dan Support&rsquo;gacha. Odoo ERP joriy etish, custom modullar, integratsiya va AI qatlami. Toshkentda, sizning biznesingiz uchun.</p>
      <a href="https://empiregroup.uz/#contact" className="oj-btn">Bepul konsultatsiya olish →</a>
      <a href="https://empiregroup.uz/blog" className="oj-btn oj-ghost">Boshqa maqolalar</a>
    </div>
  </div>
</section>

          </div>{/* end oj-main */}
        </article>
        <Footer />
        <ScrollReveal />
      </div>
    </>
  );
}
