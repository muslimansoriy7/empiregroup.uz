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

const UZ = {
  /* ------------------------------------------------------------------ */
  'odoo-erp-joriy-qilish': {
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
  },

  /* ------------------------------------------------------------------ */
  'maxsus-dasturiy-taminot': {
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
  },

  /* ------------------------------------------------------------------ */
  'mobil-ilova-yaratish': {
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
  },

  /* ------------------------------------------------------------------ */
  'ai-avtomatlashtirish': {
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
  },
};

/**
 * Russian.
 *
 * Not a translation pass over the Uzbek — a large share of B2B search here
 * happens in Russian ("внедрение Odoo", "разработка ERP", "заказная
 * разработка"), and those are the words the copy is built around. The figures,
 * the guarantees and the case numbers are identical; only the language and the
 * phrasing of the queries differ.
 */
const RU = {
  /* ------------------------------------------------------------------ */
  'odoo-erp-joriy-qilish': {
    eyebrow: 'ODOO ERP',
    title: "Внедрение Odoo ERP в Узбекистане — Цена и Сроки | Empire Group",
    description:
      "Внедрение Odoo ERP: продажи, склад, финансы, производство и HR в одной системе. От $8,800, 2–3 месяца. Odoo Learning Partner.",
    h1: "Внедрение Odoo ERP",
    intro:
      "Отделы ведут свои таблицы, остаток на складе не сходится с фактом, сбор отчёта занимает три дня. Odoo ERP — готовая платформа, которая объединяет продажи, склад, финансы, производство, закупки и HR в одной базе. Мы настраиваем её под ваши процессы и обучаем сотрудников.",
    lede:
      "Empire Group — официальный Learning Partner Odoo S.A.: прямой доступ к методологии внедрения, обновлениям продукта и поддержке вендора.",

    forWho: [
      "Компании, где отделы не видят друг друга, а данные разбросаны по Excel",
      "Производство, которому нужна реальная себестоимость, а не приблизительная",
      "Торговые компании с несколькими филиалами или складами",
      "Те, кто переходит с 1С или устаревшей системы на современную платформу",
    ],

    problems: [
      { p: "Остаток на бумаге один, на складе другой", s: "Каждое движение фиксируется: приход, расход, перемещение, брак" },
      { p: "Себестоимость считается приблизительно", s: "Реальная себестоимость по сырью, оплате труда и времени оборудования" },
      { p: "Сбор отчёта занимает три дня", s: "Панель управления — в любой момент, из любой точки" },
      { p: "Не видно, кто что сделал", s: "Каждое действие записывается с пользователем и временем" },
    ],

    deliverables: [
      "Odoo, настроенная под ваши процессы (в облаке или на вашем сервере)",
      "Перенос существующих данных — клиенты, товары, остатки",
      "Роли и права: кто что видит и может изменять",
      "Обучение сотрудников и руководство на русском языке",
      "При необходимости — собственные модули и интеграции с внешними системами",
      "4 недели бесплатного сопровождения после запуска",
    ],

    tiers: [
      { tier: 'STANDARD', price: 'от $8,800', period: '2–3 мес.', desc: "Внедрение стандартных модулей Odoo.", items: ["Основные модули", "Миграция данных", "Обучение сотрудников", "Стандартные отчёты"] },
      { tier: 'ADVANCED', price: '$25K – $35K', period: '4–6 мес.', featured: true, desc: "Модули под ваш бизнес и AI-автоматизация.", items: ["Полное внедрение ERP", "Собственные модули", "AI-автоматизация", "Внешние интеграции"] },
      { tier: 'MEGA', price: '$85,000+', period: '~1 год', desc: "Полная цифровая трансформация предприятия.", items: ["Корпоративная экосистема", "Несколько филиалов / компаний", "Аппаратные интеграции", "SLA 24/7"] },
    ],

    caseRef: {
      client: 'Shodlik Textile',
      body:
        "От хлопкового сырья до пряжи, суровой ткани и готовой одежды — четыре передела, 337 сотрудников, три смены. Всё держалось на Excel и бумаге. Мы перевели весь кластер на Odoo 19 Enterprise и подключили заводское оборудование напрямую к ERP.",
      metrics: [
        { value: '337', label: 'сотрудников в системе' },
        { value: '28', label: 'собственных модулей' },
        { value: '4', label: 'аппаратные интеграции' },
      ],
    },

    faq: [
      {
        q: "Сколько стоит внедрение Odoo ERP?",
        a: "Стандартное внедрение — от $8,800, срок 2–3 месяца. Если нужны собственные модули и интеграции — $25,000–$35,000, 4–6 месяцев. Корпоративная экосистема с несколькими филиалами — от $85,000. Точная сумма фиксируется в договоре после утверждения ТЗ и дальше не меняется.",
      },
      {
        q: "Сколько времени занимает внедрение Odoo?",
        a: "Стандартный пакет — 2–3 месяца: анализ, настройка, перенос данных, обучение и запуск. С собственными модулями и аппаратными интеграциями — 4–6 месяцев. Срок, как и цена, закрепляется договором.",
      },
      {
        q: "Odoo или 1С — что лучше?",
        a: "1С сильна в бухгалтерии и налоговой отчётности. Odoo управляет всем предприятием в одной базе: продажи, склад, производство, HR, проекты. Открытый код — любой процесс можно настроить под себя и вы не привязаны к вендору. Многие клиенты используют обе: Odoo для операционной работы, 1С для официальной отчётности.",
      },
      {
        q: "Лицензия Odoo оплачивается отдельно?",
        a: "Да. Лицензия Odoo Enterprise оплачивается напрямую Odoo S.A. по числу пользователей и не входит в стоимость внедрения. Odoo Community бесплатна, но часть модулей в ней отсутствует. На этапе анализа считаем, какой вариант выйдет дешевле именно для вас.",
      },
      {
        q: "Смогут ли мои сотрудники освоить систему?",
        a: "Обучение входит во внедрение и в стоимость. Проводим отдельное занятие для каждой роли и оставляем руководство на русском языке. Первые 4 недели после запуска отвечаем на вопросы бесплатно.",
      },
      {
        q: "Безопасны ли наши данные?",
        a: "Договор и NDA оформляются официально — от лица ООО «EMPIRE GROUP CORP». Систему можно разместить на вашем сервере, тогда данные полностью остаются у вас. Роли и права чётко ограничивают, кто что видит.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  'maxsus-dasturiy-taminot': {
    eyebrow: 'ЗАКАЗНАЯ РАЗРАБОТКА',
    title: "Заказная Разработка ПО — Цена и Сроки | Empire Group",
    description:
      "Веб-приложения и внутренние системы, построенные под ваши процессы. От $5,000, MVP за 2–3 месяца. Код и права переходят к вам.",
    h1: "Заказная Разработка Программного Обеспечения",
    intro:
      "Когда готовая программа не ложится на ваш процесс, есть два пути: подстроить процесс под программу или программу под процесс. Второй кажется дороже, но ручная работа каждый день — тоже деньги. Мы строим систему, которая точно соответствует тому, как вы работаете.",
    lede:
      "Fixed-scope: после утверждения ТЗ сумма закрепляется в договоре. Никакой почасовой оплаты и неожиданных цифр в конце.",

    forWho: [
      "Компании, чей процесс не помещается в готовую программу",
      "Те, кто ведёт работу в Excel и Telegram и хочет перевести её в систему",
      "Компании, которым нужно связать между собой существующие системы",
      "Те, у кого есть идея продукта и нужно проверить рынок через MVP",
    ],

    problems: [
      { p: "Одни и те же данные вводятся в трёх местах", s: "Один источник — остальное заполняется автоматически" },
      { p: "Системы не разговаривают друг с другом", s: "Связываются через API и интеграции" },
      { p: "Об ошибке узнаёте только в конце месяца", s: "Правила проверки работают в момент ввода" },
      { p: "Отчёт собирается вручную", s: "Панель управления обновляется сама" },
    ],

    deliverables: [
      "Техническое задание и документ по архитектуре",
      "Дизайн — для мобильных и десктопа",
      "Работающая система: веб-приложение, админ-панель, роли",
      "Интеграции с внешними сервисами (платежи, SMS, Telegram, 1С, Odoo)",
      "Исходный код и права на интеллектуальную собственность — полностью вам",
      "4 недели бесплатной поддержки после запуска",
    ],

    tiers: [
      { tier: 'STANDARD', price: 'от $5,000', period: '2–3 мес.', desc: "MVP, решающий одну конкретную задачу.", items: ["Лендинг или MVP", "Формы и интеграции", "Базовая админ-панель", "Адаптивный дизайн"] },
      { tier: 'ADVANCED', price: '$15K – $40K', period: '4–6 мес.', featured: true, desc: "Полноценное приложение со сложной бизнес-логикой.", items: ["Полное веб- или мобильное приложение", "Интеграция с CRM", "Админ-панель и роли", "API и автоматизация"] },
      { tier: 'MEGA', price: '$50,000+', period: '6–12 мес.', desc: "Экосистема из нескольких приложений.", items: ["Крупная экосистема", "Микросервисы", "Высокая нагрузка", "Долгосрочный SLA"] },
    ],

    caseRef: {
      client: 'Hilol Market',
      body:
        "Для сети магазинов в Ташкенте — PWA-касса для кассиров: дневные продажи, ввод расходов, закрытие смены и отчёт на одном экране.",
      metrics: [
        { value: '40 → 5', label: 'минут, дневной отчёт' },
      ],
    },

    faq: [
      {
        q: "Сколько стоит заказная разработка?",
        a: "MVP, решающий одну задачу — от $5,000, 2–3 месяца. Полноценное бизнес-приложение с интеграцией CRM, ролями и автоматизацией — $15,000–$40,000, 4–6 месяцев. Экосистема из нескольких приложений — от $50,000. Сумма фиксируется после утверждения ТЗ.",
      },
      {
        q: "Кому принадлежит код?",
        a: "По завершении проекта весь исходный код, дизайн и права на интеллектуальную собственность переходят к вам. Никакой привязки к вендору — в любой момент работу может продолжить ваша команда или другой исполнитель.",
      },
      {
        q: "Как происходит оплата?",
        a: "Поэтапно: стартовый аванс, затем по завершении каждого этапа. Вы видите результат, потом платите — всю сумму вперёд отдавать не нужно.",
      },
      {
        q: "Что если требования изменятся по ходу проекта?",
        a: "Каждые две недели мы показываем работающую версию, поэтому изменения всплывают по пути, а не в конце. Правки в рамках согласованного объёма цену не поднимают; новая функциональность сверх объёма оценивается отдельно и согласуется письменно.",
      },
      {
        q: "Сможем ли мы потом развивать систему сами?",
        a: "Да. Код ваш, задокументирован и написан на стандартных технологиях — React, Node.js, PostgreSQL. Для передачи вашей команде проводим отдельную техническую сессию.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  'mobil-ilova-yaratish': {
    eyebrow: 'МОБИЛЬНОЕ ПРИЛОЖЕНИЕ',
    title: "Разработка Мобильных Приложений — iOS и Android | Empire Group",
    description:
      "Мобильные приложения для бизнеса на iOS и Android. Одна кодовая база — две платформы. От $5,000, MVP за 2–3 месяца.",
    h1: "Разработка Мобильных Приложений",
    intro:
      "Клиент открывает телефон десятки раз в день, а ваш сайт — раз в месяц. Мобильное приложение переносит бизнес в карман клиента. Мы делаем кросс-платформенные приложения: одна кодовая база работает одинаково на iOS и Android.",
    lede:
      "Внутренние приложения тоже здесь: рабочие приложения для продавца, курьера или кладовщика.",

    forWho: [
      "Торговые и сервисные компании с повторными заказами",
      "Те, кому нужна программа лояльности или система доставки",
      "Компании, где нужно рабочее приложение для сотрудников «в поле»",
      "Те, кто хочет проверить идею продукта через MVP",
    ],

    problems: [
      { p: "Клиент находит вас, только когда ищет", s: "Приложение стоит в телефоне и присылает уведомления" },
      { p: "Заказы принимаются по телефону, с ошибками", s: "Из приложения попадают прямо в систему" },
      { p: "Сотрудник «в поле» записывает на бумагу", s: "Вводит на месте, офис видит сразу" },
      { p: "Две платформы — два бюджета", s: "Одна кодовая база выходит на обе" },
    ],

    deliverables: [
      "Приложение для iOS и Android (React Native или Flutter)",
      "UI/UX-дизайн с учётом мобильных привычек",
      "Бэкенд и API",
      "Push-уведомления",
      "Публикация в App Store и Google Play",
      "4 недели бесплатной поддержки после запуска",
    ],

    tiers: [
      { tier: 'STANDARD', price: 'от $5,000', period: '2–3 мес.', desc: "MVP-приложение под одну конкретную задачу.", items: ["Основные экраны", "Бэкенд и API", "Push-уведомления", "Публикация в сторах"] },
      { tier: 'ADVANCED', price: '$15K – $40K', period: '4–6 мес.', featured: true, desc: "Полноценный продукт: платежи, роли, интеграции.", items: ["Полное мобильное приложение", "Платёжные системы", "Админ-панель", "Интеграция с CRM/ERP"] },
      { tier: 'MEGA', price: '$50,000+', period: '6–12 мес.', desc: "Экосистема из нескольких приложений.", items: ["Приложения для клиентов и сотрудников", "Микросервисы", "Высокая нагрузка", "Долгосрочный SLA"] },
    ],

    caseRef: {
      client: 'Hilol Market',
      body:
        "PWA-касса для кассиров сети магазинов — продажи за день, расходы, закрытие смены и отчёт на одном экране. Покупать отдельные устройства не потребовалось.",
      metrics: [
        { value: '40 → 5', label: 'минут, дневной отчёт' },
      ],
    },

    faq: [
      {
        q: "Сколько стоит разработка мобильного приложения?",
        a: "MVP-приложение — от $5,000, готово за 2–3 месяца. Полноценный продукт с платежами, ролями и интеграцией с CRM — $15,000–$40,000, 4–6 месяцев. Точная сумма закрепляется в договоре после утверждения ТЗ.",
      },
      {
        q: "Нужно ли платить отдельно за iOS и Android?",
        a: "Нет. На кросс-платформенных технологиях (React Native или Flutter) одна кодовая база выходит на обе платформы — это заметно дешевле, чем заказывать два отдельных приложения. Отдельный нативный код пишется только там, где этого требует платформа.",
      },
      {
        q: "Кто публикует приложение в App Store и Google Play?",
        a: "Публикуем мы, но в аккаунт разработчика, оформленный на вас — права остаются у вас. Сборы сторов (Apple $99 в год, Google $25 единоразово) оплачиваете вы.",
      },
      {
        q: "Может, достаточно сайта и приложение не нужно?",
        a: "Не всегда нужно. Если клиент обращается к вам раз в месяц — сайта достаточно. Приложение окупается при регулярном использовании, когда нужны уведомления и работа офлайн. На этапе анализа говорим об этом прямо и не предлагаем то, что не нужно.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  'ai-avtomatlashtirish': {
    eyebrow: 'AI-АВТОМАТИЗАЦИЯ',
    title: "AI-Автоматизация Бизнес-Процессов | Empire Group",
    description:
      "Распознавание документов, ответы на запросы клиентов, прогнозная аналитика и отчёты — AI подключается к вашим процессам и к Odoo.",
    h1: "AI-Автоматизация Бизнес-Процессов",
    intro:
      "AI — не отдельный продукт, а слой, который подключается к существующему процессу. Есть работа, которая повторяется каждый день, подчиняется правилам и съедает время людей: занести документ в систему, ответить на один и тот же вопрос, отсортировать данные. Именно это мы и автоматизируем.",
    lede:
      "Сначала мы отвечаем на вопрос, что вообще стоит автоматизировать. Иногда ответ — простое правило, а не AI. Мы говорим об этом прямо.",

    forWho: [
      "Компании, обрабатывающие десятки однотипных документов в день",
      "Сервисные компании, где большая часть вопросов клиентов повторяется",
      "Те, у кого есть Odoo или CRM и хочется добавить к ним интеллект",
      "Бизнесы, где данных много, а решений из них не выходит",
    ],

    problems: [
      { p: "Документ заносит человек вручную", s: "Текст считывается с фото или PDF и попадает в систему" },
      { p: "На один и тот же вопрос отвечают весь день", s: "AI-помощник отвечает, сложное передаёт человеку" },
      { p: "Спрос прогнозируется на глаз", s: "Прогноз на основе исторических данных" },
      { p: "Отчёт читает и обобщает человек", s: "Ключевые изменения фиксируются автоматически" },
    ],

    deliverables: [
      "Анализ с расчётом: какой процесс автоматизировать выгодно",
      "AI-решение, подключённое к вашей системе (Odoo, CRM, сайт)",
      "Понятный сотруднику интерфейс — с возможностью проверить и исправить результат",
      "Показатель точности и панель контроля",
      "Обучение сотрудников",
      "4 недели бесплатного сопровождения после запуска",
    ],

    tiers: [
      { tier: 'STANDARD', price: 'от $5,000', period: '2–3 мес.', desc: "Автоматизация одного процесса.", items: ["Один конкретный сценарий", "Подключение к текущей системе", "Панель контроля", "Обучение сотрудников"] },
      { tier: 'ADVANCED', price: '$15K – $40K', period: '4–6 мес.', featured: true, desc: "Несколько процессов и прогнозная аналитика.", items: ["Несколько сценариев", "Прогнозная аналитика", "Интеграция с Odoo/CRM", "Автоматические отчёты"] },
      { tier: 'MEGA', price: '$50,000+', period: '6–12 мес.', desc: "Автоматизация масштаба предприятия.", items: ["Охват нескольких отделов", "Собственные модели", "Высокая нагрузка", "Долгосрочный SLA"] },
    ],

    caseRef: {
      client: 'Shodlik Textile',
      body:
        "Четыре передела текстильного производства переведены на Odoo 19 Enterprise, заводское оборудование подключено напрямую к ERP — данные попадают в систему с оборудования, а не через человека.",
      metrics: [
        { value: '337', label: 'сотрудников в системе' },
        { value: '4', label: 'аппаратные интеграции' },
      ],
    },

    faq: [
      {
        q: "Сколько стоит AI-автоматизация?",
        a: "Автоматизация одного процесса — от $5,000, 2–3 месяца. Несколько процессов с прогнозной аналитикой — $15,000–$40,000, 4–6 месяцев. Сначала проводим анализ и в цифрах показываем, сколько времени экономит каждый процесс — решение принимаете после этого.",
      },
      {
        q: "Нужен ли AI нашему бизнесу?",
        a: "Только если работа повторяется, её много и она подчиняется правилам. Для задачи, которая выполняется пять раз в день, AI себя не окупает — там дешевле обычная автоматизация. На этапе анализа мы говорим об этом прямо.",
      },
      {
        q: "Что если AI ошибётся?",
        a: "Мы не делаем AI последней инстанцией. Результат видит и подтверждает сотрудник, а при низкой уверенности система сама передаёт задачу человеку. Показатель точности всегда виден на панели контроля.",
      },
      {
        q: "Уйдут ли наши данные наружу?",
        a: "Это ваш выбор. Для конфиденциальных данных можно взять модель, работающую на вашем сервере — тогда наружу не уходит ничего. Если используется внешний сервис, состав передаваемых данных согласуется письменно заранее и оформляется NDA.",
      },
    ],
  },
};

/**
 * Language-neutral: the URL, the technology list and the cross-links are the
 * same page in every locale.
 */
const SHARED = {
  'odoo-erp-joriy-qilish': {
    slug: 'odoo-erp-joriy-qilish',
    stack: ['Odoo 17–19', 'Python', 'PostgreSQL', 'XML-RPC / REST', 'Docker', 'Odoo.sh'],
    related: ['ai-avtomatlashtirish', 'maxsus-dasturiy-taminot'],
  },
  'maxsus-dasturiy-taminot': {
    slug: 'maxsus-dasturiy-taminot',
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    related: ['mobil-ilova-yaratish', 'odoo-erp-joriy-qilish'],
  },
  'mobil-ilova-yaratish': {
    slug: 'mobil-ilova-yaratish',
    stack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Node.js', 'PostgreSQL'],
    related: ['maxsus-dasturiy-taminot', 'odoo-erp-joriy-qilish'],
  },
  'ai-avtomatlashtirish': {
    slug: 'ai-avtomatlashtirish',
    stack: ['Python', 'LLM API', 'OCR', 'PostgreSQL', 'Odoo', 'Docker'],
    related: ['odoo-erp-joriy-qilish', 'maxsus-dasturiy-taminot'],
  },
};

const COPY = { uz: UZ, ru: RU };

/** Languages these pages are actually written in — English is not one. */
export const serviceLocales = ['uz', 'ru'];

export const serviceSlugs = Object.keys(SHARED);

export function getServiceEntry(slug, lang = 'uz') {
  const shared = SHARED[slug];
  if (!shared) return null;
  const copy = (COPY[lang] || UZ)[slug];
  return { ...shared, ...copy };
}
