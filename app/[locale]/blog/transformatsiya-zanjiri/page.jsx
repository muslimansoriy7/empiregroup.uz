import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import './tz.css'

export const metadata = {
  // Written in Uzbek only — every locale points at the same document.
  alternates: { canonical: '/blog/transformatsiya-zanjiri' },
  title: { absolute: "Biznes transformatsiyasining 5 bosqichli zanjiri — Empire Group" },
  description: "Tizimlashtirish, Standartlashtirish, Raqamlashtirish, Integratsiya va Avtomatlashtirish — beshta bosqich, beshta mutlaqo boshqa daraja. ERP va AI joriy etish uchun qo'llanma.",
  openGraph: {
    title: "Biznes transformatsiyasining 5 bosqichli zanjiri",
    description: "Tizimlashtirish, Standartlashtirish, Raqamlashtirish, Integratsiya va Avtomatlashtirish — beshta bosqich, beshta mutlaqo boshqa daraja.",
    type: "article",
  },
}

export default function TransformatsiyaZanjiriPage() {
  return (
    <>
      <Nav />
      <div className="hpg" style={{ background: 'var(--color-canvas)' }}>
        <article className="tz">

          {/* ============ HERO ============ */}
          <header className="tz-hero">
            <div className="tz-wrap">
              <div className="brandline">
                <div className="brandmark">E</div>
                <div className="nm"><b>EMPIRE GROUP</b> &middot; TRANSFORMATSIYA METODOLOGIYASI</div>
              </div>

              <div className="tz-eyebrow" style={{ marginBottom: 18 }}>Qo&apos;llanma &middot; 5 bosqich</div>
              <h1 className="tz-title">Biznes transformatsiyasining <em>5 bosqichli zanjiri</em></h1>
              <p className="lede">Tizimlashtirish, Standartlashtirish, Raqamlashtirish, Integratsiya va Avtomatlashtirish — beshta atama, beshta <strong>mutlaqo boshqa-boshqa bosqich.</strong> Ularni sinonim sifatida ishlatish — eng ko&apos;p uchraydigan strategik xato.</p>

              <div className="chain">
                <div className="chain-head">
                  <span>ZANJIR &middot; KETMA-KETLIK MAJBURIY</span>
                  <span className="r">CHAP &rarr; O&apos;NG</span>
                </div>
                <div className="steps">
                  <div className="step"><div className="node">01</div><div className="nm">Tizimlashtirish</div><div className="en">Systemization</div></div>
                  <div className="step"><div className="node">02</div><div className="nm">Standartlashtirish</div><div className="en">Standardisation</div></div>
                  <div className="step"><div className="node">03</div><div className="nm">Raqamlashtirish</div><div className="en">Digitalization</div></div>
                  <div className="step"><div className="node">04</div><div className="nm">Integratsiya</div><div className="en">Integration</div></div>
                  <div className="step last"><div className="node">05</div><div className="nm">Avtomatlashtirish</div><div className="en">Automation</div></div>
                </div>
                <div className="chain-scale">
                  <span className="lo">&#9670; Boshi: <b>Tartibsizlik</b> — qoidasiz, qog&apos;ozda, odamga bog&apos;liq</span>
                  <span className="hi">Oxiri: <b>Avtomatika</b> — o&apos;zi qaror qiladi, odam kuzatadi &#9670;</span>
                </div>
              </div>
            </div>
          </header>

          {/* ============ MATURITY OVERVIEW ============ */}
          <section className="tz-sec tz-overview">
            <div className="tz-wrap">
              <div className="sec-eyebrow tz-eyebrow">Umumiy manzara</div>
              <h2 className="sec-title">Zanjir emas — bu yetuklik darajasi (maturity)</h2>
              <p className="sec-intro">Har bir bosqich o&apos;zidan oldingisining ustiga quriladi. Kompaniya qaysi darajada turganini bilmasdan turib, keyingi qadamni tashlash — vaqt va pulni yoqish demakdir. Quyida beshta darajaning qisqacha xaritasi.</p>

              <div className="mat-grid">
                <div className="mat reveal">
                  <div className="lvl">DARAJA 01</div>
                  <h4>Tartib</h4>
                  <div className="state">Chaos &rarr; Control</div>
                  <p>Qoidalar tug&apos;iladi. Kim, nimani, qanday tartibda qiladi — yozib chiqiladi.</p>
                </div>
                <div className="mat reveal">
                  <div className="lvl">DARAJA 02</div>
                  <h4>Yagona andoza</h4>
                  <div className="state">Control &rarr; Unified</div>
                  <p>Barcha filial va xodim bitta tasdiqlangan shablonda ishlaydi.</p>
                </div>
                <div className="mat reveal">
                  <div className="lvl">DARAJA 03</div>
                  <h4>Raqamli</h4>
                  <div className="state">Paper &rarr; Digital</div>
                  <p>Ma&apos;lumot daftardan va kalladan chiqib, ERP/CRM ichiga ko&apos;chadi.</p>
                </div>
                <div className="mat reveal">
                  <div className="lvl">DARAJA 04</div>
                  <h4>Bog&apos;langan</h4>
                  <div className="state">Silos &rarr; Connected</div>
                  <p>Tizimlar bir-biri bilan API orqali gaplashadi. Qayta kiritish yo&apos;qoladi.</p>
                </div>
                <div className="mat reveal">
                  <div className="lvl">DARAJA 05</div>
                  <h4>Avtonom</h4>
                  <div className="state">Connected &rarr; Autonomous</div>
                  <p>Tizim o&apos;zi qaror qabul qiladi va amalni bajaradi. Odam — nazoratchi.</p>
                </div>
              </div>

              {/* Staircase SVG */}
              <div className="diagram reveal" style={{ marginTop: 38, padding: '24px 20px' }}>
                <div className="diagram-cap">YETUKLIK ZINAPOYASI — har qadam qiymat va nazoratni oshiradi</div>
                <svg viewBox="0 0 660 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Beshta bosqichdan iborat ko'tarilib boruvchi zinapoya">
                  <defs>
                    <marker id="axU" markerWidth="9" markerHeight="9" refX="4" refY="7" orient="auto"><path d="M4,0 L8,7 L0,7 Z" fill="var(--color-mute)" /></marker>
                    <marker id="axR" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0,0 L7,4 L0,8 Z" fill="var(--color-mute)" /></marker>
                  </defs>
                  <line x1="18" y1="278" x2="18" y2="60" stroke="var(--color-mute)" strokeWidth="1.4" markerEnd="url(#axU)" />
                  <line x1="18" y1="278" x2="646" y2="278" stroke="var(--color-mute)" strokeWidth="1.4" markerEnd="url(#axR)" />
                  <text x="24" y="52" fill="var(--color-mute)" fontFamily="JetBrains Mono,monospace" fontSize="10.5" letterSpacing="1">QIYMAT · NAZORAT ↑</text>
                  <text x="646" y="296" textAnchor="end" fill="var(--color-mute)" fontFamily="JetBrains Mono,monospace" fontSize="10.5" letterSpacing="1">YETUKLIK · VAQT →</text>

                  <g>
                    <rect x="26" y="250" width="112" height="28" rx="4" fill="#101010" />
                    <rect x="146" y="212" width="112" height="66" rx="4" fill="#222222" />
                    <rect x="266" y="174" width="112" height="104" rx="4" fill="#2d5788" />
                    <rect x="386" y="136" width="112" height="142" rx="4" fill="#2f6fb0" />
                    <rect x="506" y="98" width="112" height="180" rx="4" fill="#52aeff" />
                  </g>

                  <polyline points="82,250 202,212 322,174 442,136 562,98" fill="none" stroke="var(--color-link)" strokeWidth="1.6" strokeDasharray="5 4" opacity="0.85" />
                  <g fill="var(--color-link)">
                    <circle cx="82" cy="250" r="3" /><circle cx="202" cy="212" r="3" /><circle cx="322" cy="174" r="3" /><circle cx="442" cy="136" r="3" /><circle cx="562" cy="98" r="3.5" />
                  </g>

                  <g fontFamily="Outfit,sans-serif" textAnchor="middle">
                    <g><text x="82" y="234" fill="#52aeff" fontFamily="JetBrains Mono,monospace" fontSize="13" fontWeight="700">01</text><text x="82" y="248" fill="#101010" fontSize="10.5" fontWeight="600">Tizim</text></g>
                    <g><text x="202" y="196" fill="#52aeff" fontFamily="JetBrains Mono,monospace" fontSize="13" fontWeight="700">02</text><text x="202" y="210" fill="#101010" fontSize="10.5" fontWeight="600">Standart</text></g>
                    <g><text x="322" y="158" fill="var(--color-link)" fontFamily="JetBrains Mono,monospace" fontSize="13" fontWeight="700">03</text><text x="322" y="172" fill="#101010" fontSize="10.5" fontWeight="600">Raqamli</text></g>
                    <g><text x="442" y="120" fill="var(--color-link)" fontFamily="JetBrains Mono,monospace" fontSize="13" fontWeight="700">04</text><text x="442" y="134" fill="#101010" fontSize="10.5" fontWeight="600">Integratsiya</text></g>
                    <g><text x="562" y="82" fill="var(--color-link)" fontFamily="JetBrains Mono,monospace" fontSize="13" fontWeight="700">05</text><text x="562" y="96" fill="#101010" fontSize="10.5" fontWeight="600">Avtomat</text></g>
                  </g>

                  <text x="30" y="272" fill="#a0a0a0" fontFamily="Outfit,sans-serif" fontSize="10" fontWeight="600">Tartibsizlik</text>
                  <text x="562" y="292" textAnchor="middle" fill="#1e4f86" fontFamily="Outfit,sans-serif" fontSize="10" fontWeight="700">Avtonom</text>
                </svg>
              </div>
            </div>
          </section>

          {/* ============ STAGES ============ */}
          <section className="tz-sec">
            <div className="tz-wrap">
              <div className="sec-eyebrow tz-eyebrow">Batafsil</div>
              <h2 className="sec-title">Beshta bosqich — misollar bilan</h2>
              <p className="sec-intro" style={{ marginBottom: 44 }}>Har bir bosqichda: ma&apos;nosi, sizning ERP misolingiz, hayotdan qo&apos;shimcha misollar (tekstil, savdo, bank) va bu bosqichda ekaningizni bildiruvchi belgi.</p>

              <div className="stages">

                {/* STAGE 1 */}
                <div className="stage reveal">
                  <div className="spine"></div>
                  <div className="marker"><span className="n">01</span></div>
                  <div className="tz-card">
                    <div className="card-top">
                      <h3>Tizimlashtirish</h3>
                      <span className="en">Systemization &middot; Qoidalar yaratish</span>
                    </div>
                    <p className="tagline">Mutlaqo g&apos;oya va qog&apos;ozdagi jarayon. Kompyutersiz ham amalga oshiriladi.</p>

                    <div className="block">
                      <div className="lab">Ma&apos;nosi</div>
                      <p>Tartibsiz ishlayotgan kompaniyaga <span className="k">tartib olib kirish</span>: vazifalar va mas&apos;ullarni aniq belgilash, xodimlarning majburiyatlari, ish tartibi va standartlarini (SOP) yozib chiqish.</p>
                    </div>

                    <div className="block erp">
                      <div className="lab">ERP misoli</div>
                      Tovar omborga kelganda birinchi <b>kim</b> qabul qiladi, hujjatni <b>kim</b> imzolaydi va pulni <b>kim</b> o&apos;tkazadi — mana shu zanjirni aniq qoida qilib belgilash.
                    </div>

                    <div className="diagram">
                      <div className="diagram-cap">SOP ZANJIRI — har qadamda aniq mas&apos;ul</div>
                      <svg viewBox="0 0 540 116" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tovar qabuli jarayoni: Qabul, Tekshiruv, Imzo va To'lov qadamlari">
                        <defs><marker id="a1" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--color-link)" /></marker></defs>
                        <g fontFamily="Outfit,sans-serif" textAnchor="middle">
                          <g><rect x="8" y="34" width="112" height="44" rx="9" fill="var(--color-ink)" /><text x="64" y="54" fill="#52aeff" fontSize="12" fontWeight="700">QABUL</text><text x="64" y="70" fill="var(--color-mute)" fontSize="9.5">Omborchi</text></g>
                          <line x1="122" y1="56" x2="152" y2="56" stroke="var(--color-link)" strokeWidth="1.8" markerEnd="url(#a1)" />
                          <g><rect x="154" y="34" width="112" height="44" rx="9" fill="#fff" stroke="var(--color-hairline)" /><text x="210" y="54" fill="#101010" fontSize="12" fontWeight="700">TEKSHIRUV</text><text x="210" y="70" fill="var(--color-body)" fontSize="9.5">Sifat</text></g>
                          <line x1="268" y1="56" x2="298" y2="56" stroke="var(--color-link)" strokeWidth="1.8" markerEnd="url(#a1)" />
                          <g><rect x="300" y="34" width="112" height="44" rx="9" fill="#fff" stroke="var(--color-hairline)" /><text x="356" y="54" fill="#101010" fontSize="12" fontWeight="700">IMZO</text><text x="356" y="70" fill="var(--color-body)" fontSize="9.5">Menejer</text></g>
                          <line x1="414" y1="56" x2="444" y2="56" stroke="var(--color-link)" strokeWidth="1.8" markerEnd="url(#a1)" />
                          <g><rect x="420" y="34" width="112" height="44" rx="9" fill="#fff" stroke="var(--color-hairline)" /><text x="476" y="54" fill="#101010" fontSize="12" fontWeight="700">TO&apos;LOV</text><text x="476" y="70" fill="var(--color-body)" fontSize="9.5">Buxgalter</text></g>
                        </g>
                      </svg>
                    </div>

                    <div className="block" style={{ marginTop: 18 }}>
                      <div className="lab">Qo&apos;shimcha misollar</div>
                      <ul className="ex-list">
                        <li><b>Tekstil:</b> Kalava (yarn) qabulida sifat kim tomonidan, qaysi mezon bo&apos;yicha tekshiriladi; braklangan partiya kimga qaytariladi.</li>
                        <li><b>Savdo:</b> Yangi lead kelganda kim, necha soat ichida javob beradi va keyingi qadam kimning zimmasida.</li>
                        <li><b>HR:</b> Yangi xodim ishga olinganda onboarding qadamlari — hujjat, kirish huquqi, mas&apos;ul mentor.</li>
                      </ul>
                    </div>

                    <div className="signal">
                      <div className="ic warn">!</div>
                      <div className="txt"><span className="tag">Bu bosqichda ekaningiz belgisi</span>Jarayon faqat <b>egasining kallasida</b> yashaydi. U yo&apos;q bo&apos;lsa — ish to&apos;xtaydi. Yozma qoida yo&apos;q.</div>
                    </div>
                  </div>
                </div>

                {/* STAGE 2 */}
                <div className="stage reveal">
                  <div className="spine"></div>
                  <div className="marker"><span className="n">02</span></div>
                  <div className="tz-card">
                    <div className="card-top">
                      <h3>Standartlashtirish</h3>
                      <span className="en">Standardisation &middot; Andoza yaratish</span>
                    </div>
                    <p className="tagline">Barcha tizimli qoidalarni hamma uchun yagona shaklga keltirish bosqichi.</p>

                    <div className="block">
                      <div className="lab">Ma&apos;nosi</div>
                      <p>Bir xil jarayonlarni turli filial yoki xodimlar turlicha emas, balki <span className="k">tasdiqlangan yagona andoza (shablon)</span> bo&apos;yicha bajarishini ta&apos;minlash.</p>
                    </div>

                    <div className="block erp">
                      <div className="lab">ERP misoli</div>
                      Toshkent va Samarqand filiallaridagi omborchilar xuddi <b>bir xil hujjat shablonidan</b> foydalanishi va tovar qabulida aynan <b>bir xil ketma-ketlikka</b> amal qilishi.
                    </div>

                    <div className="diagram">
                      <div className="diagram-cap">KONVERGENSIYA — har xil formatlar &rarr; yagona andoza</div>
                      <svg viewBox="0 0 540 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Uchta turli filial formati bitta yagona tasdiqlangan shablonga birlashadi">
                        <defs><marker id="a2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--color-link)" /></marker></defs>
                        <g fontFamily="Outfit,sans-serif">
                          <g><rect x="8" y="12" width="132" height="34" rx="7" fill="#fff" stroke="var(--color-hairline)" /><line x1="20" y1="24" x2="70" y2="24" stroke="#B4453C" strokeWidth="2" /><line x1="20" y1="33" x2="95" y2="33" stroke="var(--color-mute)" strokeWidth="2" /><text x="128" y="30" textAnchor="end" fill="var(--color-body)" fontSize="10" fontWeight="600">Filial A</text></g>
                          <g><rect x="8" y="58" width="132" height="34" rx="7" fill="#fff" stroke="var(--color-hairline)" /><rect x="20" y="66" width="30" height="18" fill="var(--color-hairline-soft)" /><line x1="56" y1="70" x2="100" y2="70" stroke="var(--color-mute)" strokeWidth="2" /><text x="128" y="80" textAnchor="end" fill="var(--color-body)" fontSize="10" fontWeight="600">Filial B</text></g>
                          <g><rect x="8" y="104" width="132" height="34" rx="7" fill="#fff" stroke="var(--color-hairline)" /><line x1="20" y1="115" x2="105" y2="115" stroke="var(--color-mute)" strokeWidth="2" /><line x1="20" y1="124" x2="60" y2="124" stroke="var(--color-mute)" strokeWidth="2" /><text x="128" y="122" textAnchor="end" fill="var(--color-body)" fontSize="10" fontWeight="600">Filial C</text></g>
                          <g stroke="var(--color-link)" strokeWidth="1.7" fill="none" markerEnd="url(#a2)">
                            <path d="M144 29 C 210 40, 250 60, 300 72" />
                            <path d="M144 75 L 300 75" />
                            <path d="M144 121 C 210 110, 250 90, 300 78" />
                          </g>
                          <rect x="308" y="46" width="150" height="58" rx="11" fill="var(--color-ink)" />
                          <text x="383" y="72" textAnchor="middle" fill="#52aeff" fontSize="13" fontWeight="700">YAGONA</text>
                          <text x="383" y="90" textAnchor="middle" fill="var(--color-mute)" fontSize="11">ANDOZA &middot; shablon</text>
                        </g>
                      </svg>
                    </div>

                    <div className="block" style={{ marginTop: 18 }}>
                      <div className="lab">Qo&apos;shimcha misollar</div>
                      <ul className="ex-list">
                        <li><b>Kodlash:</b> Mahsulot va material uchun yagona <b>SKU/artikul tizimi</b> — har bir filial o&apos;zicha nomlamaydi.</li>
                        <li><b>Hujjat:</b> Invoice, akt, priyomka bir xil formatda; imzo va tasdiq bosqichlari bir xil.</li>
                        <li><b>Sifat:</b> Tekstil mato sifati bir xil mezon va o&apos;lchov birligida baholanadi (masalan, GSM, defekt/metr).</li>
                      </ul>
                    </div>

                    <div className="signal">
                      <div className="ic warn">!</div>
                      <div className="txt"><span className="tag">Bu bosqichda ekaningiz belgisi</span>Har bo&apos;lim <b>o&apos;z Excelini</b> yuritadi, formatlar bir-biriga mos kelmaydi, hisobotni birlashtirish &quot;qo&apos;lda&quot; qilinadi.</div>
                    </div>
                  </div>
                </div>

                {/* STAGE 3 */}
                <div className="stage reveal">
                  <div className="spine"></div>
                  <div className="marker"><span className="n">03</span></div>
                  <div className="tz-card">
                    <div className="card-top">
                      <h3>Raqamlashtirish</h3>
                      <span className="en">Digitalization &middot; Qog&apos;ozdan xalos bo&apos;lish</span>
                    </div>
                    <p className="tagline">Jarayonlarni kompyuter va dasturlar tiliga o&apos;tkazish bosqichi.</p>

                    <div className="block">
                      <div className="lab">Ma&apos;nosi</div>
                      <p>Qog&apos;ozda yoki inson miyasida turgan ma&apos;lumotlarni <span className="k">raqamli formatga</span> (Excel, ERP, CRM) ko&apos;chirish. Ma&apos;lumot endi jismoniy emas, raqamli ko&apos;rinishda saqlanadi.</p>
                    </div>

                    <div className="block erp">
                      <div className="lab">ERP misoli</div>
                      Ombordagi tovarlar daftarga emas, <b>ERP dasturiga</b> kiritilishi; mijozlar ro&apos;yxati Excel yoki CRMga yozilishi.
                    </div>

                    <div className="diagram">
                      <div className="diagram-cap">JISMONIY &rarr; RAQAMLI — daftar va &quot;kalla&quot; o&apos;rniga baza</div>
                      <svg viewBox="0 0 540 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Qog'oz daftar va inson xotirasidagi ma'lumot raqamli ERP bazasiga ko'chadi">
                        <defs><marker id="a3" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--color-link)" /></marker></defs>
                        <g fontFamily="Outfit,sans-serif" textAnchor="middle">
                          <g>
                            <rect x="26" y="30" width="80" height="66" rx="5" fill="#fff" stroke="var(--color-mute)" transform="rotate(-4 66 63)" />
                            <g stroke="var(--color-hairline)" strokeWidth="2">
                              <line x1="42" y1="48" x2="92" y2="46" /><line x1="42" y1="60" x2="92" y2="58" /><line x1="42" y1="72" x2="80" y2="70" />
                            </g>
                            <text x="66" y="116" fill="var(--color-mute)" fontSize="10.5" fontWeight="600">Daftar &middot; kalla</text>
                          </g>
                          <g>
                            <line x1="150" y1="63" x2="240" y2="63" stroke="var(--color-link)" strokeWidth="2" markerEnd="url(#a3)" />
                            <text x="196" y="52" fill="var(--color-link)" fontFamily="JetBrains Mono,monospace" fontSize="9.5" letterSpacing="1">KO&apos;CHIRISH</text>
                          </g>
                          <g>
                            <rect x="270" y="24" width="150" height="86" rx="9" fill="var(--color-ink)" />
                            <rect x="284" y="38" width="122" height="12" rx="3" fill="#1c1c1c" />
                            <rect x="284" y="56" width="80" height="8" rx="2" fill="#52aeff" />
                            <rect x="284" y="70" width="122" height="8" rx="2" fill="var(--color-hairline)" />
                            <rect x="284" y="84" width="96" height="8" rx="2" fill="var(--color-hairline)" />
                            <text x="345" y="126" fill="#101010" fontSize="10.5" fontWeight="700">ERP &middot; CRM &middot; baza</text>
                          </g>
                          <text x="470" y="52" textAnchor="start" fill="var(--color-body)" fontFamily="JetBrains Mono,monospace" fontSize="9">real-time</text>
                          <text x="470" y="70" textAnchor="start" fill="var(--color-body)" fontFamily="JetBrains Mono,monospace" fontSize="9">qidiriladi</text>
                          <text x="470" y="88" textAnchor="start" fill="var(--color-body)" fontFamily="JetBrains Mono,monospace" fontSize="9">nusxalanmas</text>
                        </g>
                      </svg>
                    </div>

                    <div className="block" style={{ marginTop: 18 }}>
                      <div className="lab">Qo&apos;shimcha misollar</div>
                      <ul className="ex-list">
                        <li><b>Ombor:</b> Daftardagi qoldiq &rarr; ERPdagi real-time qoldiq. Inventarizatsiya raqamli.</li>
                        <li><b>Hujjat:</b> Qog&apos;oz akt &rarr; elektron hujjat + e-imzo (masalan, e-faktura).</li>
                        <li><b>Mijoz:</b> Qog&apos;oz vizitkalar va telefon eslatmalari &rarr; tarkibli CRM bazasi.</li>
                      </ul>
                    </div>

                    <div className="signal">
                      <div className="ic">i</div>
                      <div className="txt"><span className="tag">Nozik farq</span><b>Digitization</b> — ma&apos;lumotni raqamga aylantirish (skanerlash). <b>Digitalization</b> — jarayonning o&apos;zini raqamli qilish. ERP joriy etishda ikkalasi ham kerak, aks holda &quot;ikki marta ish&quot; kelib chiqadi (ham qog&apos;oz, ham dastur).</div>
                    </div>
                  </div>
                </div>

                {/* STAGE 4 */}
                <div className="stage reveal">
                  <div className="spine"></div>
                  <div className="marker"><span className="n">04</span></div>
                  <div className="tz-card">
                    <div className="card-top">
                      <h3>Integratsiya</h3>
                      <span className="en">Integration &middot; Tizimlarni bog&apos;lash</span>
                    </div>
                    <p className="tagline">Mustaqil dastur va platformalarni o&apos;zaro bog&apos;lash, ma&apos;lumot almashinuvini yo&apos;lga qo&apos;yish.</p>

                    <div className="block">
                      <div className="lab">Ma&apos;nosi</div>
                      <p>Har xil yo&apos;nalishdagi dasturlarni <span className="k">yagona tarmoqqa</span> birlashtirish; xodimlarning bir ma&apos;lumotni qayta-qayta turli joyga kiritishini yo&apos;qotish.</p>
                    </div>

                    <div className="block erp">
                      <div className="lab">ERP misoli</div>
                      ERP tizimining <b>bank ilovalari</b>, <b>davlat soliq tizimi</b>, <b>kassa apparatlari</b> va <b>Telegram botlari</b> bilan real vaqt rejimida (API orqali) ma&apos;lumot almashishi.
                    </div>

                    <div className="diagram">
                      <div className="diagram-cap">API HUB — ERP markazda, tizimlar atrofda</div>
                      <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ERP markazida turgan, bank, soliq, MES, kassa va Telegram bilan bog'langan tarmoq">
                        <defs>
                          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-link)" />
                          </marker>
                        </defs>
                        <g stroke="var(--color-link)" strokeWidth="1.6" fill="none" opacity="0.55" markerEnd="url(#arrow)">
                          <line x1="260" y1="110" x2="90" y2="45" />
                          <line x1="260" y1="110" x2="430" y2="45" />
                          <line x1="260" y1="110" x2="70" y2="150" />
                          <line x1="260" y1="110" x2="450" y2="150" />
                          <line x1="260" y1="110" x2="260" y2="195" />
                        </g>
                        <rect x="212" y="86" width="96" height="48" rx="11" fill="var(--color-ink)" />
                        <text x="260" y="115" textAnchor="middle" fill="#52aeff" fontFamily="JetBrains Mono,monospace" fontSize="17" fontWeight="700">ERP</text>
                        <g fontFamily="Outfit,sans-serif" fontSize="12" fontWeight="600" fill="#101010">
                          <g><rect x="34" y="26" width="96" height="34" rx="8" fill="#fff" stroke="var(--color-hairline)" /><text x="82" y="47" textAnchor="middle">Bank / To&apos;lov</text></g>
                          <g><rect x="390" y="26" width="96" height="34" rx="8" fill="#fff" stroke="var(--color-hairline)" /><text x="438" y="47" textAnchor="middle">Soliq &middot; e-faktura</text></g>
                          <g><rect x="18" y="132" width="96" height="34" rx="8" fill="#fff" stroke="var(--color-hairline)" /><text x="66" y="153" textAnchor="middle">MES / Stanok</text></g>
                          <g><rect x="402" y="132" width="100" height="34" rx="8" fill="#fff" stroke="var(--color-hairline)" /><text x="452" y="153" textAnchor="middle">Kassa / POS</text></g>
                          <g><rect x="212" y="184" width="96" height="34" rx="8" fill="#fff" stroke="var(--color-hairline)" /><text x="260" y="205" textAnchor="middle">Telegram bot</text></g>
                        </g>
                      </svg>
                    </div>

                    <div className="block" style={{ marginTop: 18 }}>
                      <div className="lab">Qo&apos;shimcha misollar</div>
                      <ul className="ex-list">
                        <li><b>MES &rarr; ERP:</b> Stanoklardan (masalan, Saurer Autocoro yoki Trützschler) ishlab chiqarish ma&apos;lumoti to&apos;g&apos;ridan-to&apos;g&apos;ri ERP MRP moduliga oqishi.</li>
                        <li><b>Bank &rarr; ERP:</b> Kirim to&apos;lovi bankdan avtomat tushib, tegishli invoice bilan solishtirilishi.</li>
                        <li><b>POS &rarr; ERP:</b> Kassadagi har bir sotuv ombordan qoldiqni real vaqtda kamaytirishi.</li>
                      </ul>
                    </div>

                    <div className="signal">
                      <div className="ic warn">!</div>
                      <div className="txt"><span className="tag">Bu bosqichda ekaningiz belgisi</span>Tizimlar bor, lekin xodim ma&apos;lumotni <b>bir dasturdan boshqasiga qo&apos;lda ko&apos;chiradi</b> (copy-paste). Bu — integratsiya emas, balki &quot;inson-API&quot;.</div>
                    </div>
                  </div>
                </div>

                {/* STAGE 5 */}
                <div className="stage reveal final">
                  <div className="spine"></div>
                  <div className="marker"><span className="n">05</span></div>
                  <div className="tz-card">
                    <div className="card-top">
                      <h3>Avtomatlashtirish</h3>
                      <span className="en">Automation &middot; Inson aralashuvini yo&apos;qotish</span>
                    </div>
                    <p className="tagline">Texnologiya yordamida ishni inson ishtirokisiz bajarish.</p>

                    <div className="block">
                      <div className="lab">Ma&apos;nosi</div>
                      <p>Raqamlashtirilgan va integratsiyalashgan ma&apos;lumotlar ustida <span className="k">dasturning o&apos;zi mustaqil qaror qabul qilishi</span> va amalni bajarishi.</p>
                    </div>

                    <div className="block erp">
                      <div className="lab">ERP misoli</div>
                      Omborda tovar kamayib qolganda, ERP buni o&apos;zi aniqlab, ta&apos;minotchiga avtomat ravishda <b>&quot;Sotib olish buyurtmasi&quot; (Purchase Order)</b> jo&apos;natishi. Inson faqat tasdiqlaydi yoki kuzatadi.
                    </div>

                    <div className="diagram">
                      <div className="diagram-cap">AVTOMATLASHTIRISH SIKLI — hodisa &rarr; qoida &rarr; amal</div>
                      <svg viewBox="0 0 540 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hodisa, qoida va amal bosqichlaridan iborat avtomatlashtirish sikli">
                        <defs>
                          <marker id="arrow2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-link)" />
                          </marker>
                        </defs>
                        <g fontFamily="Outfit,sans-serif">
                          <g><rect x="8" y="40" width="118" height="50" rx="10" fill="var(--color-ink)" />
                            <text x="67" y="62" textAnchor="middle" fill="#52aeff" fontSize="12" fontWeight="700">HODISA</text>
                            <text x="67" y="79" textAnchor="middle" fill="var(--color-mute)" fontSize="10">Qoldiq &lt; min</text></g>
                          <line x1="128" y1="65" x2="162" y2="65" stroke="var(--color-link)" strokeWidth="1.8" markerEnd="url(#arrow2)" />
                          <g><rect x="164" y="40" width="118" height="50" rx="10" fill="#fff" stroke="var(--color-hairline)" />
                            <text x="223" y="62" textAnchor="middle" fill="#101010" fontSize="12" fontWeight="700">QOIDA</text>
                            <text x="223" y="79" textAnchor="middle" fill="var(--color-body)" fontSize="10">Min-max mantiq</text></g>
                          <line x1="284" y1="65" x2="318" y2="65" stroke="var(--color-link)" strokeWidth="1.8" markerEnd="url(#arrow2)" />
                          <g><rect x="320" y="40" width="118" height="50" rx="10" fill="#fff" stroke="var(--color-hairline)" />
                            <text x="379" y="62" textAnchor="middle" fill="#101010" fontSize="12" fontWeight="700">AMAL</text>
                            <text x="379" y="79" textAnchor="middle" fill="var(--color-body)" fontSize="10">PO yaratiladi</text></g>
                          <line x1="440" y1="65" x2="474" y2="65" stroke="var(--color-link)" strokeWidth="1.8" markerEnd="url(#arrow2)" />
                          <g><rect x="454" y="34" width="78" height="62" rx="10" fill="var(--color-canvas)" stroke="var(--color-link)" strokeDasharray="4 3" />
                            <text x="493" y="60" textAnchor="middle" fill="var(--color-link)" fontSize="11" fontWeight="700">INSON</text>
                            <text x="493" y="76" textAnchor="middle" fill="var(--color-body)" fontSize="10">tasdiq</text></g>
                        </g>
                      </svg>
                    </div>

                    <div className="block" style={{ marginTop: 18 }}>
                      <div className="lab">Qo&apos;shimcha misollar</div>
                      <ul className="ex-list">
                        <li><b>To&apos;lov:</b> Kirim tushganda tizim invoicening yopilishi + mijozga avtomat Telegram/SMS bildirishnoma yuborishi.</li>
                        <li><b>Texnik xizmat:</b> Stanok ko&apos;rsatkichi chegaradan chiqsa, ERP avtomat <b>Maintenance</b> tiketi ochishi.</li>
                        <li><b>AI qatlami:</b> Sotuv tarixiga qarab talab bashorati (demand forecasting) va optimal buyurtma miqdorini taklif qilishi.</li>
                      </ul>
                    </div>

                    <div className="signal">
                      <div className="ic">i</div>
                      <div className="txt"><span className="tag">Muhim nuqta</span>Avtomatlashtirish ≠ to&apos;liq avtonomiya. Tizimga <b>tasdiqlash nuqtalari (approval gates)</b> qo&apos;yiladi — pul yoki muhim qaror joyida inson bir bosishda nazorat qiladi.</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ============ DECISION TABLE ============ */}
          <section className="tz-sec tz-decide">
            <div className="tz-wrap">
              <div className="sec-eyebrow tz-eyebrow">Amaliy tanlov</div>
              <h2 className="sec-title">Qaysi birini ishlatish to&apos;g&apos;ri?</h2>
              <p className="sec-intro">Gapingizning kontekstiga qarab atamani tanlang. Har bir qatorda: vaziyat, to&apos;g&apos;ri atama va o&apos;zingizga berishingiz kerak bo&apos;lgan kalit savol.</p>

              <div className="tz-table">
                <div className="trow head">
                  <div className="cell">Vaziyat</div>
                  <div className="cell">To&apos;g&apos;ri atama</div>
                  <div className="cell">Kalit savol</div>
                </div>
                <div className="trow">
                  <div className="cell">Tartibsiz biznesni tartibga solish</div>
                  <div className="cell"><span className="term">Tizimlashtirish</span></div>
                  <div className="cell"><span className="q">&quot;Kim, nimani, qanday tartibda qiladi — yozilganmi?&quot;</span></div>
                </div>
                <div className="trow">
                  <div className="cell">Ish tartibini bir xil andozaga keltirish</div>
                  <div className="cell"><span className="term">Standartlashtirish</span></div>
                  <div className="cell"><span className="q">&quot;Hamma bitta shablonda ishlayaptimi?&quot;</span></div>
                </div>
                <div className="trow">
                  <div className="cell">Dastur/ERP joriy etish, qog&apos;ozdan qutulish</div>
                  <div className="cell"><span className="term">Raqamlashtirish</span></div>
                  <div className="cell"><span className="q">&quot;Ma&apos;lumot daftarda emas, tizimdami?&quot;</span></div>
                </div>
                <div className="trow">
                  <div className="cell">Turli dastur va platformalarni gaplashtirish</div>
                  <div className="cell"><span className="term">Integratsiya</span></div>
                  <div className="cell"><span className="q">&quot;Tizimlar API orqali o&apos;zi almashadimi?&quot;</span></div>
                </div>
                <div className="trow">
                  <div className="cell">Ishni insonsiz, dasturning o&apos;zi bajarishi</div>
                  <div className="cell"><span className="term">Avtomatlashtirish</span></div>
                  <div className="cell"><span className="q">&quot;Qaror va amalni tizim o&apos;zi qilyaptimi?&quot;</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* ============ AI FORMULA ============ */}
          <section className="tz-sec tz-aif">
            <div className="tz-wrap">
              <div className="sec-eyebrow tz-eyebrow">AI qatlami &middot; Foyda formulasi</div>
              <h2>AI — sehr emas. U <em>tayyor tizim ustida</em> ishlaydi.</h2>
              <p className="sec-intro">AI zanjirning oxirida — avtomatlashtirishning aqlli qatlami sifatida turadi. U faqat toza data, tartibli jarayon va inson nazorati birga bo&apos;lganda haqiqiy foyda beradi. Mana shu formulaning har bir bo&apos;lagi yuqoridagi bosqichlardan keladi.</p>

              <div className="formula reveal">
                <div className="fterms">
                  <div className="fterm">
                    <div className="fn">01</div>
                    <div className="ft">Ma&apos;lumot</div>
                    <div className="fs">Toza, raqamli, ishonchli data. <b>03-bosqich</b></div>
                  </div>
                  <div className="op">+</div>
                  <div className="fterm">
                    <div className="fn">02</div>
                    <div className="ft">Jarayon</div>
                    <div className="fs">Tizimli va standart ish oqimi. <b>01–02</b></div>
                  </div>
                  <div className="op">+</div>
                  <div className="fterm">
                    <div className="fn">03</div>
                    <div className="ft">AI</div>
                    <div className="fs">Bashorat, tahlil, qaror modeli. <b>qatlam</b></div>
                  </div>
                  <div className="op">+</div>
                  <div className="fterm">
                    <div className="fn">04</div>
                    <div className="ft">Inson nazorati</div>
                    <div className="fs">Tasdiqlash nuqtasi (approval gate). <b>05-bosqich</b></div>
                  </div>
                </div>

                <div className="frule"></div>

                <div className="fresult">
                  <span className="eq">=</span>
                  <span className="foyda">Foyda</span>
                  <span className="fnote">Aniq qaror, tez harakat, kam xato — biznesga real qiymat.</span>
                </div>

                <div className="fkey">
                  <div className="kl">Asosiy xulosa</div>
                  <div className="kt">AI sehr emas. AI <b>tizimga ulanganida</b> kuch beradi. Tartibsiz data va jarayon ustiga qo&apos;yilgan AI — chiroyli, ammo ishonchsiz javob mashinasidir.</div>
                </div>
              </div>
            </div>
          </section>

          {/* ============ GOLDEN RULE ============ */}
          <section className="tz-sec tz-golden">
            <div className="tz-wrap">
              <div className="sec-eyebrow tz-eyebrow">Oltin qoida</div>
              <h2>Bosqichni tashlab ketib bo&apos;lmaydi — zanjir <em>ketma-ket</em> quriladi</h2>

              <div style={{ margin: '10px auto 34px', maxWidth: 560 }}>
                <svg viewBox="0 0 560 268" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Beshta qatlamli piramida: poydevorda tizimlashtirish, cho'qqida avtomatlashtirish">
                  <defs><marker id="gU" markerWidth="9" markerHeight="9" refX="4" refY="7" orient="auto"><path d="M4,0 L8,7 L0,7 Z" fill="#52aeff" /></marker></defs>
                  <g fontFamily="Outfit,sans-serif" textAnchor="middle">
                    <g>
                      <rect x="60" y="200" width="440" height="40" rx="5" fill="#161616" stroke="rgba(255,255,255,.14)" />
                      <text x="280" y="225" fill="#ededed" fontSize="13" fontWeight="600"><tspan fill="#52aeff" fontFamily="JetBrains Mono,monospace">01</tspan>  Tizimlashtirish</text>
                    </g>
                    <g>
                      <rect x="100" y="154" width="360" height="40" rx="5" fill="#2a2a2a" stroke="rgba(255,255,255,.14)" />
                      <text x="280" y="179" fill="#ededed" fontSize="13" fontWeight="600"><tspan fill="#52aeff" fontFamily="JetBrains Mono,monospace">02</tspan>  Standartlashtirish</text>
                    </g>
                    <g>
                      <rect x="140" y="108" width="280" height="40" rx="5" fill="#37619b" stroke="rgba(255,255,255,.14)" />
                      <text x="280" y="133" fill="#ededed" fontSize="13" fontWeight="600"><tspan fill="var(--color-hairline)" fontFamily="JetBrains Mono,monospace">03</tspan>  Raqamlashtirish</text>
                    </g>
                    <g>
                      <rect x="180" y="62" width="200" height="40" rx="5" fill="#3b82c9" stroke="rgba(255,255,255,.16)" />
                      <text x="280" y="87" fill="#04121f" fontSize="12.5" fontWeight="700"><tspan fontFamily="JetBrains Mono,monospace">04</tspan>  Integratsiya</text>
                    </g>
                    <g>
                      <rect x="212" y="16" width="136" height="40" rx="5" fill="#52aeff" stroke="rgba(255,255,255,.2)" />
                      <text x="280" y="41" fill="#04121f" fontSize="12" fontWeight="700"><tspan fontFamily="JetBrains Mono,monospace">05</tspan>  Avtomat</text>
                    </g>
                  </g>
                  <line x1="524" y1="240" x2="524" y2="26" stroke="#52aeff" strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#gU)" opacity="0.8" />
                  <text x="516" y="140" fill="#52aeff" fontFamily="JetBrains Mono,monospace" fontSize="10" letterSpacing="1" transform="rotate(90 516 140)" textAnchor="middle">QURILADI ↑</text>
                  <text x="36" y="264" fill="#8f8f8f" fontFamily="Outfit,sans-serif" fontSize="11">Poydevorsiz cho&apos;qqi qulaydi — yuqori qatlam faqat pastkilar ustida turadi.</text>
                </svg>
              </div>

              <div className="rule-row">
                <div className="rule">
                  <div className="k">Poydevor qoidasi</div>
                  <p>Biznesni avval <b>tizimlashtirmasdan va standartlashtirmasdan</b> turib, uni muvaffaqiyatli raqamlashtira olmaysiz. Tizimlar o&apos;rtasida <b>integratsiya</b> o&apos;rnatmasdan turib esa mukammal <b>avtomatlashtirishga</b> erishish mutlaqo imkonsizdir.</p>
                </div>
                <div className="rule warn">
                  <div className="k">Eng qimmat xato</div>
                  <p>Tartibsiz jarayonni avtomatlashtirish — bu <b>tartibsizlikni tezlashtirish</b> demakdir. 1–2 bosqichni tashlab, to&apos;g&apos;ridan-to&apos;g&apos;ri &quot;avtomatika&quot;ga sakragan kompaniya qimmat tizim sotib olib, baribir qo&apos;lda ishlashda davom etadi.</p>
                </div>
              </div>
            </div>
          </section>

        </article>
        <Footer />
        <ScrollReveal />
      </div>
    </>
  )
}
