/**
 * The service landing pages.
 *
 * The pages under /xizmatlar/ were all city pages — "veb-sayt yaratish
 * Toshkentda". Nothing answered the query a buyer actually types when they
 * know what they want but not who from: "Odoo ERP joriy qilish". Those
 * searches were landing on the homepage, which talks about everything and
 * therefore ranks strongly for nothing.
 *
 * Every figure here is taken from content/home.ts — the same prices, the same
 * process, the same case numbers. A visitor who arrives from Google and then
 * opens /narxlar must not be shown two different numbers for the same work.
 *
 * The FAQ blocks are load-bearing twice over: they answer the objection that
 * stops the enquiry, and they are what an AI assistant quotes when someone
 * asks it about ERP work in Uzbekistan.
 */

export const SERVICE_ENTRIES = {
  /* ------------------------------------------------------------------ */
  'odoo-erp-joriy-qilish': {
    slug: 'odoo-erp-joriy-qilish',
    eyebrow: 'ODOO ERP',
    title: "Odoo ERP Joriy Qilish O'zbekistonda — Narx va Muddat | Empire Group",
    description:
      "Odoo ERP joriy qilish: savdo, ombor, moliya, ishlab chiqarish va HR bitta tizimda. $8,800 dan, 2–3 oy. Odoo Learning Partner.",
    h1: "Odoo ERP Joriy Qilish",
    intro:
      "Bo'limlar alohida Excel yuritadi, ombor qoldig'i haqiqatga to'g'ri kelmaydi, hisobotni yig'ish uch kun oladi. Odoo ERP — savdo, ombor, moliya, ishlab chiqarish, xarid va HR ni bitta bazaga birlashtiradigan tayyor platforma. Biz uni biznesingizga moslab joriy qilamiz va xodimlaringizni o'qitamiz.",
    lede:
      "Empire Group — Odoo S.A. ning rasmiy Learning Partner'i. Ya'ni vendor metodologiyasi, mahsulot yangilanishlari va texnik ko'magiga to'g'ridan-to'g'ri kirishimiz bor.",

    forWho: [
      "Bo'limlari bir-birini ko'rmaydigan, ma'lumot Excel'da tarqoq korxonalar",
      "Ishlab chiqarish bilan shug'ullanadigan va tannarxni aniq bilmoqchi bo'lganlar",
      "Bir nechta filial yoki ombori bor savdo kompaniyalari",
      "1C yoki eski tizimdan zamonaviy platformaga o'tmoqchi bo'lganlar",
    ],

    problems: [
      { p: "Ombor qoldig'i qog'ozda bir xil, omborda boshqacha", s: "Har harakat tizimda qayd etiladi — kirim, chiqim, ko'chirish, brak" },
      { p: "Tannarx taxminan hisoblanadi", s: "Xomashyo, ish haqi va uskuna vaqti bo'yicha real tannarx" },
      { p: "Hisobot yig'ish uch kun oladi", s: "Boshqaruv paneli — istalgan payt, istalgan joydan" },
      { p: "Kim nima qilgani ko'rinmaydi", s: "Har amal foydalanuvchi va vaqt bilan yoziladi" },
    ],

    deliverables: [
      "Biznesingizga sozlangan Odoo tizimi (bulutda yoki o'z serveringizda)",
      "Mavjud ma'lumotlarni ko'chirish — mijozlar, tovarlar, qoldiqlar",
      "Rollar va ruxsatlar: kim nimani ko'radi va o'zgartira oladi",
      "Xodimlarni o'qitish va qo'llanma",
      "Kerak bo'lsa — maxsus modullar va tashqi tizimlar bilan integratsiya",
      "Ishga tushgandan keyin 4 hafta bepul kuzatuv",
    ],

    tiers: [
      { tier: 'STANDARD', price: '$8,800 dan', period: '2–3 oy', desc: "Odoo standart modullarini joriy qilish.", items: ["Asosiy modullar", "Ma'lumot migratsiyasi", "Xodimlarni o'qitish", "Standart hisobotlar"] },
      { tier: 'ADVANCED', price: '$25K – $35K', period: '4–6 oy', featured: true, desc: "Biznesga moslashtirilgan modullar va AI.", items: ["To'liq ERP joriy qilish", "Custom modullar", "AI avtomatlashtirish", "Tashqi integratsiya"] },
      { tier: 'MEGA', price: '$85,000+', period: '~1 yil', desc: "Korxonaning to'liq raqamli transformatsiyasi.", items: ["Korporativ ekotizim", "Ko'p filial / kompaniya", "Apparat integratsiyalari", "24/7 SLA"] },
    ],

    caseRef: {
      client: 'Shodlik Textile',
      body:
        "Paxta xomashyosidan ip, xom mato va tayyor kiyimgacha — to'rt bosqichli ishlab chiqarish, 337 xodim, uch smena. Hammasi Excel va qog'ozda edi. Butun klasterni Odoo 19 Enterprise'ga ko'chirdik va zavod uskunalarini to'g'ridan-to'g'ri ERP'ga uladik.",
      metrics: [
        { value: '337', label: 'xodim tizimda' },
        { value: '28', label: 'maxsus modul' },
        { value: '4', label: 'apparat integratsiyasi' },
      ],
    },

    stack: ['Odoo 17–19', 'Python', 'PostgreSQL', 'XML-RPC / REST', 'Docker', 'Odoo.sh'],

    faq: [
      {
        q: "Odoo ERP joriy qilish qancha turadi?",
        a: "Standart joriy qilish $8,800 dan boshlanadi va 2–3 oy oladi. Maxsus modullar va integratsiyalar kerak bo'lsa $25,000–$35,000 oralig'ida, 4–6 oy. Ko'p filialli korporativ ekotizim $85,000 dan. Aniq summa TZ tasdiqlangach shartnomada qotiriladi va keyin o'zgarmaydi.",
      },
      {
        q: "Odoo joriy qilish qancha vaqt oladi?",
        a: "Standart paket — 2–3 oy. Bu tahlil, sozlash, ma'lumot ko'chirish, o'qitish va ishga tushirishni o'z ichiga oladi. Custom modullar va apparat integratsiyalari bo'lsa 4–6 oy. Muddat ham narx kabi shartnomada belgilanadi.",
      },
      {
        q: "Odoo yoki 1C — qaysi biri yaxshiroq?",
        a: "1C buxgalteriya va soliq hisobotida kuchli. Odoo esa butun korxonani bitta bazada boshqaradi: savdo, ombor, ishlab chiqarish, HR, loyihalar. Ochiq kodli, ya'ni istalgan jarayonni o'zingizga moslash mumkin va vendorga bog'lanib qolmaysiz. Ko'p mijozlar ikkalasini birga ishlatadi — Odoo operatsion, 1C rasmiy hisobot uchun.",
      },
      {
        q: "Odoo litsenziyasi alohida to'lanadimi?",
        a: "Ha. Odoo Enterprise litsenziyasi foydalanuvchi soniga qarab Odoo S.A. ga to'lanadi va bizning joriy qilish narximizga kirmaydi. Odoo Community bepul, lekin ba'zi modullar yo'q. Qaysi variant sizga arzonroq tushishini tahlil bosqichida hisoblab beramiz.",
      },
      {
        q: "Xodimlarim tizimni o'rgana oladimi?",
        a: "O'qitish joriy qilishning bir qismi va narxga kiritilgan. Har rol uchun alohida mashg'ulot o'tkazamiz va o'zbek tilida qo'llanma qoldiramiz. Ishga tushgandan keyin 4 hafta davomida savollarga bepul javob beramiz.",
      },
      {
        q: "Ma'lumotlarimiz xavfsizmi?",
        a: "Shartnoma va NDA rasmiy tuziladi — \"EMPIRE GROUP CORP\" MCHJ sifatida. Tizimni o'z serveringizda joylashtirishni tanlashingiz mumkin, u holda ma'lumot butunlay sizda qoladi. Rollar va ruxsatlar orqali kim nimani ko'rishi aniq chegaralanadi.",
      },
    ],

    related: ['ai-avtomatlashtirish', 'maxsus-dasturiy-taminot'],
  },

  /* ------------------------------------------------------------------ */
  'maxsus-dasturiy-taminot': {
    slug: 'maxsus-dasturiy-taminot',
    eyebrow: 'MAXSUS ISHLAB CHIQISH',
    title: "Maxsus Dasturiy Ta'minot Ishlab Chiqish — Narx va Muddat | Empire Group",
    description:
      "Biznesingizga moslab noldan quriladigan veb va ichki tizimlar. $5,000 dan, MVP 2–3 oyda. Kod va intellektual mulk sizga o'tadi.",
    h1: "Maxsus Dasturiy Ta'minot Ishlab Chiqish",
    intro:
      "Tayyor dastur jarayoningizga to'g'ri kelmasa, ikki yo'l bor: jarayonni dasturga moslash yoki dasturni jarayonga. Ikkinchisi qimmatroq ko'rinadi, lekin har kuni qo'lda bajariladigan ish ham pul. Biz sizning ish uslubingizga aniq mos keladigan tizimni noldan quramiz.",
    lede:
      "Fixed-scope: TZ tasdiqlangach summa shartnomada qotiriladi. Soatbay hisob-kitob yo'q, oxirida kutilmagan raqam chiqmaydi.",

    forWho: [
      "Jarayoni o'ziga xos va tayyor dasturga sig'maydigan korxonalar",
      "Excel va Telegram'da yuritilayotgan ishni tizimga o'tkazmoqchi bo'lganlar",
      "Mavjud tizimlarini bir-biriga ulashi kerak bo'lgan kompaniyalar",
      "Mahsulot g'oyasi bor va MVP bilan bozorni sinab ko'rmoqchi bo'lganlar",
    ],

    problems: [
      { p: "Bir ishni uch joyga qayta kiritish", s: "Bitta manba — qolgani avtomatik to'ladi" },
      { p: "Tizimlar bir-biri bilan gaplashmaydi", s: "API va integratsiyalar orqali ulanadi" },
      { p: "Xatoni faqat oy oxirida bilib qolasiz", s: "Tekshiruv qoidalari kiritish paytida ishlaydi" },
      { p: "Hisobot qo'lda yig'iladi", s: "Boshqaruv paneli o'zi yangilanadi" },
    ],

    deliverables: [
      "Texnik topshiriq va arxitektura hujjati",
      "Dizayn — mobil va desktop uchun",
      "Ishlaydigan tizim: veb ilova, admin panel, rollar",
      "Tashqi xizmatlar bilan integratsiya (to'lov, SMS, Telegram, 1C, Odoo)",
      "Manba kodi va intellektual mulk — to'liq sizga o'tadi",
      "Ishga tushgandan keyin 4 hafta bepul qo'llab-quvvatlash",
    ],

    tiers: [
      { tier: 'STANDARD', price: '$5,000 dan', period: '2–3 oy', desc: "Bitta aniq vazifani hal qiluvchi MVP.", items: ["Landing yoki MVP", "Forma va integratsiya", "Asosiy admin panel", "Responsive dizayn"] },
      { tier: 'ADVANCED', price: '$15K – $40K', period: '4–6 oy', featured: true, desc: "Murakkab biznes mantig'iga ega to'liq ilova.", items: ["To'liq web yoki mobil ilova", "CRM integratsiya", "Admin panel va rollar", "API va avtomatlashtirish"] },
      { tier: 'MEGA', price: '$50,000+', period: '6–12 oy', desc: "Bir nechta ilovadan iborat ekotizim.", items: ["Yirik ekotizim", "Mikroxizmatlar", "Yuqori yuklama", "Uzoq muddatli SLA"] },
    ],

    caseRef: {
      client: 'Hilol Market',
      body:
        "Toshkentdagi do'konlar tarmog'i uchun kassirlarga mo'ljallangan PWA kassa ilovasi: kundalik savdo, xarajat kiritish, smena yopish va hisobot — bitta ekranda.",
      metrics: [
        { value: '40 → 5', label: 'daqiqa, kunlik hisobot' },
      ],
    },

    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],

    faq: [
      {
        q: "Maxsus dasturiy ta'minot qancha turadi?",
        a: "Bitta vazifani hal qiluvchi MVP $5,000 dan, 2–3 oy. To'liq biznes ilovasi — CRM integratsiyasi, rollar, avtomatlashtirish bilan — $15,000–$40,000, 4–6 oy. Bir nechta ilovadan iborat ekotizim $50,000 dan. Summa TZ tasdiqlangach qotiriladi.",
      },
      {
        q: "Kod kimga tegishli bo'ladi?",
        a: "Loyiha yakunida barcha manba kodi, dizayn va intellektual mulk sizga o'tadi. Vendor lock-in yo'q — xohlagan paytda o'z jamoangiz yoki boshqa ijrochi davom ettira oladi.",
      },
      {
        q: "To'lov qanday amalga oshiriladi?",
        a: "Bosqichma-bosqich: boshlang'ich avans, so'ngra har bosqich yakunida. Natijani ko'rasiz, keyin to'laysiz — butun summani oldindan bermaysiz.",
      },
      {
        q: "Loyiha davomida talab o'zgarsa nima bo'ladi?",
        a: "Har ikki haftada ishlaydigan versiyani ko'rsatamiz, shuning uchun o'zgarish oxirida emas, yo'lda aniqlanadi. Kelishilgan ko'lamdagi tuzatishlar narxni oshirmaydi; ko'lamdan tashqari yangi funksiya alohida baholanadi va yozma kelishiladi.",
      },
      {
        q: "Tayyor tizimni keyin o'zimiz rivojlantira olamizmi?",
        a: "Ha. Kod sizniki, hujjatlashtirilgan va standart texnologiyalarda yozilgan — React, Node.js, PostgreSQL. Jamoangizga topshirish uchun alohida texnik sessiya o'tkazamiz.",
      },
    ],

    related: ['mobil-ilova-yaratish', 'odoo-erp-joriy-qilish'],
  },

  /* ------------------------------------------------------------------ */
  'mobil-ilova-yaratish': {
    slug: 'mobil-ilova-yaratish',
    eyebrow: 'MOBIL ILOVA',
    title: "Mobil Ilova Yaratish — iOS va Android, Narx va Muddat | Empire Group",
    description:
      "Biznes uchun iOS va Android mobil ilovalar. Bitta kodda ikki platforma. $5,000 dan, MVP 2–3 oyda.",
    h1: "Mobil Ilova Yaratish",
    intro:
      "Mijoz kuniga o'nlab marta telefonini ochadi, saytingizni esa oyiga bir marta. Mobil ilova — biznesingizni mijoz cho'ntagiga joylashtirish usuli. Biz cross-platform quramiz: bitta kod bazasi, iOS va Android'da bir xil ishlaydi.",
    lede:
      "Ichki ilovalar ham shu yerda: sotuvchi, yetkazib beruvchi yoki ombor xodimi uchun mo'ljallangan ish ilovalari.",

    forWho: [
      "Takroriy buyurtma oladigan savdo va xizmat kompaniyalari",
      "Sodiqlik dasturi yoki yetkazib berish tizimi kerak bo'lganlar",
      "Dala xodimlari uchun ish ilovasi kerak korxonalar",
      "Mahsulot g'oyasini MVP bilan sinab ko'rmoqchi bo'lganlar",
    ],

    problems: [
      { p: "Mijoz sizni faqat qidirganda topadi", s: "Ilova telefonda turadi, bildirishnoma yuboradi" },
      { p: "Buyurtma telefon orqali, xatolar bilan", s: "Ilovadan to'g'ridan-to'g'ri tizimga tushadi" },
      { p: "Dala xodimi qog'ozga yozadi", s: "Joyida kiritadi, ofis darhol ko'radi" },
      { p: "Ikki platforma — ikki hisob-kitob", s: "Bitta kod bazasi, ikkalasiga chiqadi" },
    ],

    deliverables: [
      "iOS va Android uchun ilova (React Native yoki Flutter)",
      "UI/UX dizayn — mobil odatlarni hisobga olgan",
      "Backend va API",
      "Push bildirishnomalar",
      "App Store va Google Play'ga joylash",
      "Ishga tushgandan keyin 4 hafta bepul qo'llab-quvvatlash",
    ],

    tiers: [
      { tier: 'STANDARD', price: '$5,000 dan', period: '2–3 oy', desc: "Bitta aniq vazifani bajaradigan MVP ilova.", items: ["Asosiy ekranlar", "Backend va API", "Push bildirishnoma", "Store'ga joylash"] },
      { tier: 'ADVANCED', price: '$15K – $40K', period: '4–6 oy', featured: true, desc: "To'liq mahsulot: to'lov, rollar, integratsiya.", items: ["To'liq mobil ilova", "To'lov tizimlari", "Admin panel", "CRM/ERP integratsiya"] },
      { tier: 'MEGA', price: '$50,000+', period: '6–12 oy', desc: "Bir nechta ilovadan iborat ekotizim.", items: ["Mijoz + xodim ilovalari", "Mikroxizmatlar", "Yuqori yuklama", "Uzoq muddatli SLA"] },
    ],

    caseRef: {
      client: 'Hilol Market',
      body:
        "Do'konlar tarmog'i kassirlari uchun PWA kassa ilovasi — kundalik savdo, xarajat, smena yopish va hisobot bir ekranda. Alohida qurilma sotib olish shart bo'lmadi.",
      metrics: [
        { value: '40 → 5', label: 'daqiqa, kunlik hisobot' },
      ],
    },

    stack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Node.js', 'PostgreSQL'],

    faq: [
      {
        q: "Mobil ilova yaratish qancha turadi?",
        a: "MVP ilova $5,000 dan boshlanadi va 2–3 oyda tayyor bo'ladi. To'lov tizimi, rollar va CRM integratsiyasi bo'lgan to'liq mahsulot $15,000–$40,000, 4–6 oy. Aniq summa TZ tasdiqlangach shartnomada belgilanadi.",
      },
      {
        q: "iOS va Android uchun alohida to'lash kerakmi?",
        a: "Yo'q. Cross-platform texnologiyada (React Native yoki Flutter) bitta kod bazasi ikkala platformaga chiqadi — bu ikki alohida ilova buyurtma qilishdan sezilarli arzon. Faqat platforma talab qilsagina alohida native kod yoziladi.",
      },
      {
        q: "App Store va Google Play'ga joylashni kim qiladi?",
        a: "Biz qilamiz — ilova sizning nomingizdagi developer hisobiga joylanadi, ya'ni egalik sizda qoladi. Store'lar yillik to'lovi (Apple $99, Google bir martalik $25) sizning zimmangizda.",
      },
      {
        q: "Veb-sayt yetarli emasmi, ilova shartmi?",
        a: "Har doim emas. Agar mijoz sizga oyiga bir marta murojaat qilsa — sayt yetarli. Ilova takroriy foydalanishda, bildirishnoma va offline ish kerak bo'lganda o'zini oqlaydi. Tahlil bosqichida buni ochiq aytamiz, kerak bo'lmasa taklif qilmaymiz.",
      },
    ],

    related: ['maxsus-dasturiy-taminot', 'odoo-erp-joriy-qilish'],
  },

  /* ------------------------------------------------------------------ */
  'ai-avtomatlashtirish': {
    slug: 'ai-avtomatlashtirish',
    eyebrow: 'AI AVTOMATLASHTIRISH',
    title: "AI bilan Biznes Jarayonlarni Avtomatlashtirish | Empire Group",
    description:
      "Hujjat tanish, mijoz so'rovlariga javob, bashoratli tahlil va hisobot — AI biznes jarayonlaringizga ulanadi. Odoo va mavjud tizimlar bilan.",
    h1: "AI bilan Biznes Jarayonlarni Avtomatlashtirish",
    intro:
      "AI — alohida sotib olinadigan mahsulot emas, mavjud jarayonga ulanadigan qatlam. Kuniga takrorlanadigan, qoidaga bo'ysunadigan va odam vaqtini yeydigan ishlar bor: hujjatni tizimga kiritish, bir xil savolga javob berish, ma'lumotni saralash. Aynan shularni avtomatlashtiramiz.",
    lede:
      "Biz avval nimani avtomatlashtirish arziydi degan savolga javob beramiz. Ba'zan javob — oddiy qoida, AI emas. Buni ochiq aytamiz.",

    forWho: [
      "Kuniga o'nlab bir xil hujjat qayta ishlaydigan korxonalar",
      "Mijoz savollarining katta qismi takrorlanadigan xizmat kompaniyalari",
      "Odoo yoki CRM'i bor va ustiga aql qo'shmoqchi bo'lganlar",
      "Ma'lumoti ko'p, lekin undan qaror chiqmayotgan bizneslar",
    ],

    problems: [
      { p: "Hujjatni odam qo'lda kiritadi", s: "Rasm yoki PDF'dan matn o'qiladi va tizimga tushadi" },
      { p: "Bir xil savolga kun bo'yi javob beriladi", s: "AI yordamchi javob beradi, murakkabini odamga uzatadi" },
      { p: "Talab qancha bo'lishini taxmin qilasiz", s: "Tarixiy ma'lumot asosida bashorat" },
      { p: "Hisobotni odam o'qib xulosa qiladi", s: "Asosiy o'zgarishlar avtomatik yoziladi" },
    ],

    deliverables: [
      "Qaysi jarayonni avtomatlashtirish arziydi — hisob-kitob bilan tahlil",
      "AI yechimi mavjud tizimingizga ulangan holda (Odoo, CRM, sayt)",
      "Xodim uchun tushunarli interfeys — natijani tekshirish va tuzatish imkoni",
      "Aniqlik ko'rsatkichi va nazorat paneli",
      "Xodimlarni o'qitish",
      "Ishga tushgandan keyin 4 hafta bepul kuzatuv",
    ],

    tiers: [
      { tier: 'STANDARD', price: '$5,000 dan', period: '2–3 oy', desc: "Bitta jarayonni avtomatlashtirish.", items: ["Bitta aniq stsenariy", "Mavjud tizimga ulash", "Nazorat paneli", "Xodimlarni o'qitish"] },
      { tier: 'ADVANCED', price: '$15K – $40K', period: '4–6 oy', featured: true, desc: "Bir nechta jarayon va bashoratli tahlil.", items: ["Bir nechta stsenariy", "Bashoratli tahlil", "Odoo/CRM integratsiya", "Avtomatik hisobot"] },
      { tier: 'MEGA', price: '$50,000+', period: '6–12 oy', desc: "Korxona miqyosidagi avtomatlashtirish.", items: ["Ko'p bo'lim qamrovi", "Maxsus modellar", "Yuqori yuklama", "Uzoq muddatli SLA"] },
    ],

    caseRef: {
      client: 'Shodlik Textile',
      body:
        "To'rt bosqichli to'qimachilik ishlab chiqarishi Odoo 19 Enterprise'ga ko'chirildi va zavod uskunalari to'g'ridan-to'g'ri ERP'ga ulandi — ma'lumot odam orqali emas, uskunadan tizimga tushadi.",
      metrics: [
        { value: '337', label: 'xodim tizimda' },
        { value: '4', label: 'apparat integratsiyasi' },
      ],
    },

    stack: ['Python', 'LLM API', 'OCR', 'PostgreSQL', 'Odoo', 'Docker'],

    faq: [
      {
        q: "AI avtomatlashtirish qancha turadi?",
        a: "Bitta jarayonni avtomatlashtirish $5,000 dan, 2–3 oy. Bir nechta jarayon va bashoratli tahlil bilan $15,000–$40,000, 4–6 oy. Avval tahlil o'tkazamiz va qaysi jarayon qancha vaqt tejashini raqamda ko'rsatamiz — shundan keyin qaror qilasiz.",
      },
      {
        q: "Bizning biznesimizga AI kerakmi?",
        a: "Faqat takrorlanadigan, hajmi katta va qoidaga bo'ysunadigan ish bo'lsa. Kuniga besh marta bajariladigan vazifa uchun AI o'zini oqlamaydi — u yerda oddiy avtomatlashtirish arzonroq. Tahlil bosqichida buni ochiq aytamiz.",
      },
      {
        q: "AI xato qilsa nima bo'ladi?",
        a: "Biz AI ni oxirgi qaror qabul qiluvchi qilib qo'ymaymiz. Natijani xodim ko'radi va tasdiqlaydi, ishonch darajasi past bo'lsa tizim o'zi odamga uzatadi. Aniqlik ko'rsatkichi nazorat panelida doim ko'rinib turadi.",
      },
      {
        q: "Ma'lumotlarimiz tashqariga chiqadimi?",
        a: "Bu sizning tanlovingiz. Maxfiy ma'lumot uchun o'z serveringizda ishlaydigan modelni tanlashimiz mumkin — u holda hech narsa tashqariga chiqmaydi. Tashqi xizmat ishlatilsa, qaysi ma'lumot yuborilishini oldindan yozma kelishamiz va NDA tuzamiz.",
      },
    ],

    related: ['odoo-erp-joriy-qilish', 'maxsus-dasturiy-taminot'],
  },
};

export const serviceSlugs = Object.keys(SERVICE_ENTRIES);

export function getServiceEntry(slug) {
  return SERVICE_ENTRIES[slug] || null;
}
