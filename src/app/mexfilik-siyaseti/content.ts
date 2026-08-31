import type { LegalDoc } from "@/components/legal/LegalDocument";

/**
 * Privacy policy content.
 *
 * Written against what this site actually does, verified in the code rather than
 * adapted from a template: the single `aztu-lang` cookie, the cookie-less visit
 * counter, the chatbot (which is the only place a visitor's own words leave the
 * university's servers), and the embeds that load from Google and other hosts.
 *
 * Structured to follow Article 11.2 of the Law on Personal Data No. 998-IIIQ of
 * 11 May 2010, which lists what a data owner has to tell a data subject: who the
 * owner is, the purpose and its legal basis, the protection level of the system,
 * the intended recipients, and the subject's rights.
 */

const UPDATED_AZ = "Son yenilənmə: 31 avqust 2026";
const UPDATED_EN = "Last updated: 31 August 2026";

export const PRIVACY: Record<"az" | "en", LegalDoc> = {
    az: {
        eyebrow: "Hüquqi məlumatlar",
        title: "Məxfilik Siyasəti",
        description:
            "Bu sənəd aztu.edu.az saytının hansı məlumatları topladığını, niyə topladığını və sizin hansı hüquqlarınız olduğunu izah edir.",
        breadcrumb: "Məxfilik Siyasəti",
        updatedLabel: UPDATED_AZ,
        contentsLabel: "Bölmələr",
        intro: [
            {
                kind: "p",
                text: "Azərbaycan Texniki Universiteti (AzTU) publik hüquqi şəxsdir və bu saytda emal olunan fərdi məlumatların mülkiyyətçisidir. Aşağıdakı mətn ümumi vədlərdən ibarət deyil — burada saytın texniki olaraq nə etdiyi konkret şəkildə göstərilir: hansı kuki qoyulur, brauzerinizdə nə saxlanılır, hansı sorğular serverə gedir və hansı üçüncü tərəflər sizin brauzerinizlə əlaqə qurur.",
            },
            {
                kind: "p",
                text: "Bu siyasət yalnız aztu.edu.az saytına aiddir. Universitetin ayrıca sistemləri — LMS (sso.aztu.edu.az), kitabxana, məzun portalı, elektron qrant və apellyasiya sistemləri, habelə majors.aztu.edu.az ixtisas portalı — öz qaydaları ilə idarə olunur.",
            },
            {
                kind: "note",
                text: "Qısa cavab: sayta sadəcə baxdıqda sizdən heç bir ad, e-poçt və ya telefon tələb olunmur. Saytda qeydiyyat və ya istifadəçi hesabı yoxdur. Reklam və izləmə pikselləri, Google Analytics və buna bənzər üçüncü tərəf analitika vasitələri ümumiyyətlə istifadə olunmur.",
            },
        ],
        sections: [
            {
                id: "operator",
                title: "Məlumatların mülkiyyətçisi kimdir",
                blocks: [
                    {
                        kind: "p",
                        text: "«Fərdi məlumatlar haqqında» Qanunun mənasında bu saytda toplanan fərdi məlumatların mülkiyyətçisi Azərbaycan Texniki Universitetidir.",
                    },
                    {
                        kind: "contact",
                        rows: [
                            { label: "Qurum", value: "Azərbaycan Texniki Universiteti" },
                            { label: "Ünvan", value: "H.Cavid prospekti 25, Bakı, Azərbaycan" },
                            { label: "E-poçt", value: "aztu@aztu.edu.az", href: "mailto:aztu@aztu.edu.az" },
                            { label: "Telefon", value: "(+994 12) 539-13-05", href: "tel:+994125391305" },
                        ],
                    },
                ],
            },
            {
                id: "collect",
                title: "Hansı məlumatları toplayırıq",
                blocks: [
                    {
                        kind: "p",
                        text: "Saytda oxucu kimi gəzdiyiniz zaman sizdən şəxsiyyətinizi müəyyən edən heç bir məlumat istənilmir. Serverə məlumat çatan yalnız dörd hal var və onların yalnız biri sizin öz yazdığınız mətni saxlayır:",
                    },
                    {
                        kind: "table",
                        head: ["Hal", "Nə göndərilir", "Saxlanılırmı"],
                        rows: [
                            [
                                "Səhifə baxışlarının sayılması",
                                "Yalnız səhifənin ünvanı (məsələn /az/haqqimizda)",
                                "Yalnız gündəlik ümumi say. IP ünvanı və brauzer məlumatı olduğu kimi saxlanılmır — onlardan hər gün dəyişən şifrələnmiş bir iz (hash) hesablanır ki, təkrar ziyarətçilər sayıla bilsin. Bu iz hər gün dəyişdiyi üçün sizi günlər arasında izləmək mümkün deyil.",
                            ],
                            [
                                "Saytdaxili axtarış",
                                "Axtarış sözünüz",
                                "Xeyr. Sorğu axtarış sisteminə ötürülür və nəticələr qaytarılır; heç bir cədvələ yazılmır.",
                            ],
                            [
                                "Sənədin açılması və ya yüklənməsi",
                                "Yalnız sənədin nömrəsi",
                                "Yalnız həmin sənədin ümumi baxış sayğacı bir vahid artır. Kimin açdığı qeyd olunmur.",
                            ],
                            [
                                "Süni intellekt köməkçisi (çat)",
                                "Yazdığınız mətn, söhbət nömrəsi və IP ünvanınız",
                                "Bəli. Ətraflı 4-cü bölmədə.",
                            ],
                        ],
                    },
                    {
                        kind: "note",
                        text: "Saytdakı bir sıra axtarış və filtr qutuları (fakültələrin siyahısı, klublar, sənəd siyahıları) yalnız brauzerinizin daxilində işləyir — orada yazdığınız mətn ümumiyyətlə serverə göndərilmir.",
                    },
                ],
            },
            {
                id: "cookies",
                title: "Kukilər və brauzer yaddaşı",
                blocks: [
                    {
                        kind: "p",
                        text: "Sayt bir dənə kuki qoyur. Qalan üç element kuki deyil — brauzerinizin öz yaddaşında (localStorage) saxlanılır və serverə göndərilmir.",
                    },
                    {
                        kind: "table",
                        head: ["Ad", "Növ", "Nə üçündür", "Müddət"],
                        rows: [
                            [
                                "aztu-lang",
                                "Kuki",
                                "Seçdiyiniz interfeys dilini (az və ya en) yadda saxlayır ki, səhifələr düzgün dildə açılsın.",
                                "Brauzer bağlananadək",
                            ],
                            [
                                "aztu-theme",
                                "localStorage",
                                "İşıqlı və ya qaranlıq rejim seçiminizi yadda saxlayır.",
                                "Siz sayt məlumatlarını silənədək",
                            ],
                            [
                                "aztu_chat_session_id",
                                "localStorage",
                                "Süni intellekt köməkçisi ilə söhbətinizin nömrəsi — səhifəni yeniləyəndə söhbətin davam etməsi üçün. Yalnız çatdan istifadə etsəniz yaranır.",
                                "Siz sayt məlumatlarını silənədək",
                            ],
                            [
                                "persist:root",
                                "localStorage",
                                "Saytın texniki komponentinin qeydiyyat girişi. Hazırda heç bir şəxsi məlumat saxlamır.",
                                "Siz sayt məlumatlarını silənədək",
                            ],
                        ],
                    },
                    {
                        kind: "p",
                        text: "Bunların hamısını brauzerinizin parametrlərindən silə bilərsiniz. Silinmə saytın işinə mane olmur — yalnız dil və rejim seçiminiz ilkin vəziyyətə qayıdır.",
                    },
                    {
                        kind: "note",
                        text: "Reklam, remarketinq və ya davranış izləmə kukisi yoxdur. Google Analytics, Google Tag Manager, Meta Pixel, Yandex Metrica və oxşar üçüncü tərəf analitika alətlərinin heç biri saytda istifadə olunmur.",
                    },
                ],
            },
            {
                id: "chatbot",
                title: "Süni intellekt köməkçisi (çat)",
                blocks: [
                    {
                        kind: "p",
                        text: "Saytın aşağı küncündəki çat köməkçisi ən çox məlumat toplayan hissədir, ona görə də ayrıca izah olunur. Ondan istifadə etmək tamamilə könüllüdür — pəncərəni açmasanız heç nə toplanmır.",
                    },
                    {
                        kind: "p",
                        text: "Mesaj göndərdikdə saxlanılanlar: yazdığınız mətnin tam məzmunu, köməkçinin cavabı, söhbətin nömrəsi, IP ünvanınız və vaxt damğaları. IP ünvanı həm də təhlükəsizlik məqsədi daşıyır — söhbətə yalnız onu başlatmış şəbəkədən davam etmək mümkündür.",
                    },
                    {
                        kind: "p",
                        text: "Cavabı hazırlamaq üçün mesajınız və həmin söhbətin əvvəlki yazışması OpenAI şirkətinin dil modelinə (gpt-4o) ötürülür. Bu, sizin yazdığınız mətnin universitetin öz serverlərindən kənara çıxdığı yeganə haldır. Ötürülmə serverdən-serverə baş verir; brauzeriniz OpenAI ilə birbaşa əlaqə qurmur.",
                    },
                    {
                        kind: "note",
                        text: "Çata şəxsiyyət vəsiqəsi nömrəsi, FİN, sağlamlıq məlumatı, parol, bank kartı məlumatı və ya digər həssas məlumat yazmayın. Rəsmi müraciət üçün aztu@aztu.edu.az ünvanından və ya rəsmi qəbul qaydalarından istifadə edin.",
                    },
                ],
            },
            {
                id: "third-parties",
                title: "Üçüncü tərəflər və qoşma məzmun",
                blocks: [
                    {
                        kind: "p",
                        text: "Bəzi səhifələrdə kənar xidmətlərdən gələn məzmun göstərilir. Belə səhifəni açdıqda brauzeriniz həmin xidmətlə birbaşa əlaqə qurur və o xidmət sizin IP ünvanınızı, brauzer məlumatınızı və hansı səhifədən gəldiyinizi görə bilər. Bu, universitetin nəzarətində olmayan bir prosesdir.",
                    },
                    {
                        kind: "table",
                        head: ["Xidmət", "Harada", "Nə zaman işə düşür"],
                        rows: [
                            ["YouTube (Google)", "75 illik film səhifəsi və bəzi xəbərlər", "Səhifə açılan kimi"],
                            ["Google Xəritə", "Əlaqə səhifəsi", "Xəritə ekranda görünəndə"],
                            ["Google Drive / Google Docs", "KTS sənədləri, patent səhifələri", "Sənədi açdıqda"],
                            ["ui-avatars.com", "Bəzi əməkdaş kartlarında şəkil əvəzi", "Səhifə açılan kimi"],
                            ["open-sdg.github.io", "Dayanıqlı İnkişaf Məqsədləri nişanları", "Səhifə açılan kimi"],
                            ["OpenAI", "Süni intellekt köməkçisi", "Yalnız çata mesaj yazdıqda (serverdən)"],
                        ],
                    },
                    {
                        kind: "p",
                        text: "Saytın şriftləri universitetin öz serverindən verilir — yazı şriftləri üçün Google-a sorğu getmir. Xəbərlərdə və elanlarda redaktorların əlavə etdiyi video yalnız YouTube, Vimeo və Google Drive/Docs ünvanlarından ola bilər.",
                    },
                ],
            },
            {
                id: "basis",
                title: "Hüquqi əsas",
                blocks: [
                    {
                        kind: "p",
                        text: "«Fərdi məlumatlar haqqında» Qanunun 9.6-cı maddəsi emal üçün məhdud sayda əsas müəyyən edir. Saytda:",
                    },
                    {
                        kind: "ul",
                        items: [
                            "Universitetin publik hüquqi şəxs kimi ictimaiyyəti məlumatlandırmaq vəzifəsindən irəli gələn emal — o cümlədən saytın işləməsi, dil seçimi və ümumi ziyarət statistikası — qanunvericilikdən irəli gələn əsasla (maddə 9.6.2) həyata keçirilir.",
                            "Süni intellekt köməkçisindən istifadə tamamilə könüllüdür və sizin razılığınıza əsaslanır (maddə 9.6.1). Ondan istifadə etməmək seçimi saytın qalan hissəsinə heç bir təsir göstərmir.",
                        ],
                    },
                    {
                        kind: "p",
                        text: "Sayt xüsusi kateqoriyalı fərdi məlumatları (irqi və ya milli mənsubiyyət, ailə həyatı, dini etiqad, səhhət, məhkumluq) məqsədli şəkildə toplamır.",
                    },
                ],
            },
            {
                id: "retention",
                title: "Məlumatlar nə qədər saxlanılır",
                blocks: [
                    {
                        kind: "ul",
                        items: [
                            "Gündəlik ziyarət sayğacları müddətsiz saxlanılır — onlar yalnız rəqəmdir və heç kimə aid deyil.",
                            "Təkrar ziyarətçiləri saymaq üçün istifadə olunan şifrələnmiş gündəlik izlər 400 gün sonra avtomatik silinir.",
                            "Çat yazışmaları və onlara aid IP ünvanı hazırda avtomatik silinmir; onlar universitetin idarəçiləri tərəfindən silinənədək saxlanılır. Söhbətinizin silinməsini aşağıdakı ünvana yazaraq tələb edə bilərsiniz.",
                            "Dil və rejim seçimləri yalnız sizin brauzerinizdədir; siz silənə qədər qalır.",
                        ],
                    },
                ],
            },
            {
                id: "transfer",
                title: "Məlumatların ölkədən kənara ötürülməsi",
                blocks: [
                    {
                        kind: "p",
                        text: "Qanunun 14-cü maddəsi fərdi məlumatların transsərhəd ötürülməsinə yalnız qəbul edən ölkədə müdafiə səviyyəsi təmin edildikdə və ya subyektin razılığı olduqda yol verir.",
                    },
                    {
                        kind: "p",
                        text: "Saytda ölkədən kənara gedən yeganə axın süni intellekt köməkçisidir: mesajınız cavab hazırlanması üçün OpenAI-yə ötürülür. Çatdan istifadə etməklə siz bu ötürülməyə razılıq vermiş olursunuz. Razı deyilsinizsə, çatdan istifadə etməyin — bütün rəsmi məlumat və müraciət yolları çatsız da əlçatandır.",
                    },
                    {
                        kind: "p",
                        text: "Bundan başqa, 5-ci bölmədə göstərilən qoşma məzmun (YouTube, Google Xəritə, Google Drive) açıldıqda brauzeriniz həmin şirkətlərin serverlərinə birbaşa qoşulur.",
                    },
                ],
            },
            {
                id: "rights",
                title: "Sizin hüquqlarınız",
                blocks: [
                    {
                        kind: "p",
                        text: "«Fərdi məlumatlar haqqında» Qanunun 7-ci maddəsi subyektə, o cümlədən aşağıdakı hüquqları verir:",
                    },
                    {
                        kind: "ol",
                        items: [
                            "Barənizdə fərdi məlumatların olub-olmadığını və mülkiyyətçinin kim olduğunu bilmək.",
                            "Toplanmanın, işlənilmənin və üçüncü şəxsə verilmənin hüquqi əsasını tələb etmək.",
                            "Məlumatların məzmunu ilə tanış olmaq.",
                            "Emalın məqsədini, müddətini, üsullarını və məlumatı görə bilən şəxslərin dairəsini bilmək.",
                            "Məlumatların dəqiqləşdirilməsini və ya məhv edilməsini tələb etmək.",
                            "Toplanmanın və işlənilmənin qadağan edilməsini tələb etmək.",
                            "Məlumatın mənbəyini bilmək və onun qanuniliyinin sübutunu tələb etmək.",
                            "Məlumatların mühafizəsini tələb etmək.",
                        ],
                    },
                    {
                        kind: "p",
                        text: "Müraciətinizə Qanunun 12-ci maddəsinə uyğun olaraq ödənişsiz, ən geci 7 iş günü ərzində cavab verilir; üçüncü şəxsdən məlumat almaq lazım gələrsə bu müddət daha 7 iş günü uzadıla bilər. İmtina əsaslandırılmalı və 5 iş günü ərzində bildirilməlidir.",
                    },
                ],
            },
            {
                id: "how-to",
                title: "Hüquqlarınızdan necə istifadə etməli və şikayət",
                blocks: [
                    {
                        kind: "p",
                        text: "Müraciətinizi universitetin rəsmi e-poçt ünvanına göndərin. Çat yazışmasının silinməsini istəyirsinizsə, brauzerinizdə saxlanılan söhbət nömrəsini də qeyd etsəniz, tapılması asanlaşar.",
                    },
                    {
                        kind: "contact",
                        rows: [
                            { label: "E-poçt", value: "aztu@aztu.edu.az", href: "mailto:aztu@aztu.edu.az" },
                            { label: "Ünvan", value: "H.Cavid prospekti 25, Bakı, Azərbaycan" },
                        ],
                    },
                    {
                        kind: "p",
                        text: "Qanunun 7.4-cü maddəsinə əsasən, cavabdan razı qalmasanız, Rəqəmsal İnkişaf və Nəqliyyat Nazirliyinə (fərdi məlumatlar üzrə səlahiyyətli orqan) və ya birbaşa məhkəməyə müraciət edə bilərsiniz. İnformasiya əldə etmək hüququ ilə bağlı məsələlərdə Azərbaycan Respublikasının İnsan Hüquqları üzrə Müvəkkilinə (Ombudsman) da müraciət mümkündür.",
                    },
                ],
            },
            {
                id: "security",
                title: "Təhlükəsizlik",
                blocks: [
                    {
                        kind: "p",
                        text: "Sayt bütün ziyarətçilər üçün şifrələnmiş bağlantı (HTTPS) üzərindən işləyir və brauzer səviyyəsində əlavə mühafizə başlıqları tətbiq olunur. İdarəetmə paneli ayrıca autentifikasiya ilə qorunur və ictimai sayt ziyarətçiləri üçün əlçatan deyil.",
                    },
                    {
                        kind: "p",
                        text: "Bununla belə, internet üzərindən ötürülən heç bir məlumat üçün mütləq təhlükəsizlik zəmanəti vermək mümkün deyil. Saytda təhlükəsizlik zəifliyi aşkar etsəniz, aztu@aztu.edu.az ünvanına yazmağınızı xahiş edirik.",
                    },
                ],
            },
            {
                id: "children",
                title: "Uşaqlar",
                blocks: [
                    {
                        kind: "p",
                        text: "Sayt ümumi auditoriya üçün nəzərdə tutulub və uşaqlardan məqsədli şəkildə məlumat toplamır. Saytda yaş tələb edən qeydiyyat və ya hesab yoxdur.",
                    },
                ],
            },
            {
                id: "changes",
                title: "Bu siyasətdəki dəyişikliklər",
                blocks: [
                    {
                        kind: "p",
                        text: "Sayt dəyişdikcə bu sənəd də yenilənir. Yenilənmə tarixi səhifənin yuxarısında göstərilir. Toplanan məlumatların həcmini və ya məqsədini əhəmiyyətli dərəcədə dəyişən hallar bu səhifədə aydın şəkildə əks olunacaq.",
                    },
                ],
            },
        ],
        disclaimer:
            "Bu sənəd saytın hazırkı texniki vəziyyətini təsvir edir və hüquqi məsləhət deyil. Mətnin hüquqi qüvvəsi universitetin hüquq xidməti tərəfindən təsdiq edildikdən sonra yaranır. Azərbaycan və ingilis variantları arasında uyğunsuzluq olarsa, Azərbaycan dilindəki mətn əsas götürülür.",
    },

    en: {
        eyebrow: "Legal Information",
        title: "Privacy Policy",
        description:
            "What aztu.edu.az collects, why it collects it, and what rights you have over it.",
        breadcrumb: "Privacy Policy",
        updatedLabel: UPDATED_EN,
        contentsLabel: "Contents",
        intro: [
            {
                kind: "p",
                text: "Azerbaijan Technical University (AzTU) is a public legal entity and is the owner of the personal data processed through this website. What follows is not a set of general promises: it describes specifically what this site does technically — which cookie it sets, what is kept in your browser, which requests reach our servers, and which third parties your browser contacts.",
            },
            {
                kind: "p",
                text: "This policy covers aztu.edu.az only. The university's separate systems — the LMS (sso.aztu.edu.az), the library, the alumni portal, the e-grant and appeals systems, and the majors.aztu.edu.az programme portal — are governed by their own terms.",
            },
            {
                kind: "note",
                text: "The short answer: simply reading this site asks nothing of you. There is no registration and no user account. There are no advertising or tracking pixels, and no third-party analytics such as Google Analytics.",
            },
        ],
        sections: [
            {
                id: "operator",
                title: "Who owns the data",
                blocks: [
                    {
                        kind: "p",
                        text: "For the purposes of the Law on Personal Data, the owner of the personal data collected through this site is Azerbaijan Technical University.",
                    },
                    {
                        kind: "contact",
                        rows: [
                            { label: "Institution", value: "Azerbaijan Technical University" },
                            { label: "Address", value: "25 H.Javid Avenue, Baku, Azerbaijan" },
                            { label: "Email", value: "aztu@aztu.edu.az", href: "mailto:aztu@aztu.edu.az" },
                            { label: "Phone", value: "(+994 12) 539-13-05", href: "tel:+994125391305" },
                        ],
                    },
                ],
            },
            {
                id: "collect",
                title: "What we collect",
                blocks: [
                    {
                        kind: "p",
                        text: "Browsing this site as a reader asks for nothing that identifies you. There are only four ways information reaches our servers, and only one of them stores anything you wrote:",
                    },
                    {
                        kind: "table",
                        head: ["Activity", "What is sent", "Is it stored"],
                        rows: [
                            [
                                "Page-view counting",
                                "Only the address of the page (e.g. /en/about)",
                                "Only a daily total. Your IP address and browser details are never stored as such — they are turned into an encrypted daily fingerprint so that repeat visitors can be counted. Because that fingerprint changes every day, it cannot follow you from one day to the next.",
                            ],
                            [
                                "Site search",
                                "Your search words",
                                "No. The query is passed to the search engine and results come back; nothing is written to any table.",
                            ],
                            [
                                "Opening or downloading a document",
                                "Only the document's number",
                                "Only that document's public view counter goes up by one. Who opened it is not recorded.",
                            ],
                            [
                                "AI assistant (chat)",
                                "Your message, a conversation id, and your IP address",
                                "Yes. See section 4.",
                            ],
                        ],
                    },
                    {
                        kind: "note",
                        text: "Several search and filter boxes on the site (the faculty list, clubs, document lists) work entirely inside your browser — what you type there is never sent anywhere.",
                    },
                ],
            },
            {
                id: "cookies",
                title: "Cookies and browser storage",
                blocks: [
                    {
                        kind: "p",
                        text: "The site sets one cookie. The other three items are not cookies — they live in your browser's own storage and are never sent to us.",
                    },
                    {
                        kind: "table",
                        head: ["Name", "Type", "Purpose", "Lifetime"],
                        rows: [
                            [
                                "aztu-lang",
                                "Cookie",
                                "Remembers your chosen interface language (az or en) so pages open in the right one.",
                                "Until the browser closes",
                            ],
                            [
                                "aztu-theme",
                                "localStorage",
                                "Remembers whether you chose light or dark mode.",
                                "Until you clear site data",
                            ],
                            [
                                "aztu_chat_session_id",
                                "localStorage",
                                "The id of your conversation with the AI assistant, so it survives a page reload. Created only if you use the chat.",
                                "Until you clear site data",
                            ],
                            [
                                "persist:root",
                                "localStorage",
                                "Bookkeeping for a technical component of the site. It currently holds no personal data.",
                                "Until you clear site data",
                            ],
                        ],
                    },
                    {
                        kind: "p",
                        text: "You can delete all of these from your browser settings. Doing so does not break the site — you simply return to the default language and theme.",
                    },
                    {
                        kind: "note",
                        text: "There are no advertising, remarketing or behavioural tracking cookies. Google Analytics, Google Tag Manager, Meta Pixel, Yandex Metrica and comparable third-party analytics tools are not used anywhere on this site.",
                    },
                ],
            },
            {
                id: "chatbot",
                title: "The AI assistant (chat)",
                blocks: [
                    {
                        kind: "p",
                        text: "The chat assistant in the corner of the site collects more than anything else here, so it is described separately. Using it is entirely optional — nothing is collected unless you open it and write.",
                    },
                    {
                        kind: "p",
                        text: "When you send a message we store: the full text of what you wrote, the assistant's reply, the conversation id, your IP address, and timestamps. The IP address also serves a security purpose — a conversation can only be continued from the network that started it.",
                    },
                    {
                        kind: "p",
                        text: "To produce a reply, your message and the earlier messages in that conversation are sent to a language model operated by OpenAI (gpt-4o). This is the only place where words you have written leave the university's own servers. The transfer happens server to server; your browser does not contact OpenAI directly.",
                    },
                    {
                        kind: "note",
                        text: "Please do not type ID numbers, health information, passwords, payment details or other sensitive data into the chat. For an official request, write to aztu@aztu.edu.az or use the formal admission channels.",
                    },
                ],
            },
            {
                id: "third-parties",
                title: "Third parties and embedded content",
                blocks: [
                    {
                        kind: "p",
                        text: "Some pages display content served by outside providers. When you open such a page your browser contacts that provider directly, and it can see your IP address, your browser details and which page you came from. That exchange is outside the university's control.",
                    },
                    {
                        kind: "table",
                        head: ["Service", "Where", "When it loads"],
                        rows: [
                            ["YouTube (Google)", "75th-anniversary film page and some news items", "As soon as the page opens"],
                            ["Google Maps", "Contact page", "When the map scrolls into view"],
                            ["Google Drive / Google Docs", "QA documents, patent pages", "When you open a document"],
                            ["ui-avatars.com", "Placeholder portraits on some staff cards", "As soon as the page opens"],
                            ["open-sdg.github.io", "Sustainable Development Goal icons", "As soon as the page opens"],
                            ["OpenAI", "AI assistant", "Only when you send a chat message (from our server)"],
                        ],
                    },
                    {
                        kind: "p",
                        text: "The site's typefaces are served from the university's own server, so no request goes to Google for fonts. Video embedded by editors in news and announcements can only come from YouTube, Vimeo or Google Drive/Docs addresses.",
                    },
                ],
            },
            {
                id: "basis",
                title: "Legal basis",
                blocks: [
                    {
                        kind: "p",
                        text: "Article 9.6 of the Law on Personal Data sets out a limited list of grounds for processing. On this site:",
                    },
                    {
                        kind: "ul",
                        items: [
                            "Processing that follows from the university's duty as a public legal entity to inform the public — running the site, remembering your language, and counting visits in aggregate — rests on the ground of processing provided for by legislation (Article 9.6.2).",
                            "Use of the AI assistant is entirely voluntary and rests on your consent (Article 9.6.1). Choosing not to use it has no effect on the rest of the site.",
                        ],
                    },
                    {
                        kind: "p",
                        text: "The site does not set out to collect special categories of personal data (racial or national origin, family life, religious belief, health, or criminal conviction).",
                    },
                ],
            },
            {
                id: "retention",
                title: "How long we keep it",
                blocks: [
                    {
                        kind: "ul",
                        items: [
                            "Daily visit counters are kept indefinitely — they are numbers only and relate to no one in particular.",
                            "The encrypted daily fingerprints used to count repeat visitors are deleted automatically after 400 days.",
                            "Chat transcripts and the IP address attached to them are not currently deleted automatically; they remain until an administrator removes them. You can ask us to delete your conversation using the contact details below.",
                            "Language and theme preferences live only in your browser and remain until you clear them.",
                        ],
                    },
                ],
            },
            {
                id: "transfer",
                title: "Transfers outside Azerbaijan",
                blocks: [
                    {
                        kind: "p",
                        text: "Article 14 of the Law on Personal Data permits cross-border transfer only where the receiving country ensures an equivalent level of protection, or where the data subject has consented.",
                    },
                    {
                        kind: "p",
                        text: "The only outbound flow on this site is the AI assistant: your message is passed to OpenAI so that a reply can be generated. By using the chat you consent to that transfer. If you would rather not, simply do not use it — every official channel for information and applications is available without it.",
                    },
                    {
                        kind: "p",
                        text: "Separately, when the embedded content listed in section 5 loads, your browser connects directly to those companies' servers.",
                    },
                ],
            },
            {
                id: "rights",
                title: "Your rights",
                blocks: [
                    {
                        kind: "p",
                        text: "Article 7 of the Law on Personal Data gives you, among others, the following rights:",
                    },
                    {
                        kind: "ol",
                        items: [
                            "To know whether personal data about you exists and who owns it.",
                            "To require the legal justification for its collection, processing and disclosure to third parties.",
                            "To see the content of the data.",
                            "To know the purpose, duration and methods of processing, and who may see the data.",
                            "To require correction or destruction of the data.",
                            "To require that its collection and processing be prohibited.",
                            "To know the source of the data and require proof that it was obtained lawfully.",
                            "To require that the data be protected.",
                        ],
                    },
                    {
                        kind: "p",
                        text: "Under Article 12 we must answer free of charge within 7 working days, extendable by a further 7 working days where a third party has to be consulted. A refusal must be reasoned and given within 5 working days.",
                    },
                ],
            },
            {
                id: "how-to",
                title: "How to exercise your rights, and how to complain",
                blocks: [
                    {
                        kind: "p",
                        text: "Send your request to the university's official email address. If you want a chat conversation deleted, including the conversation id stored in your browser will help us find it.",
                    },
                    {
                        kind: "contact",
                        rows: [
                            { label: "Email", value: "aztu@aztu.edu.az", href: "mailto:aztu@aztu.edu.az" },
                            { label: "Address", value: "25 H.Javid Avenue, Baku, Azerbaijan" },
                        ],
                    },
                    {
                        kind: "p",
                        text: "Under Article 7.4, if you are not satisfied with our answer you may complain to the Ministry of Digital Development and Transport, which is the competent authority for personal data, or go directly to court. On questions about access to public information you may also approach the Commissioner for Human Rights (Ombudsman) of the Republic of Azerbaijan.",
                    },
                ],
            },
            {
                id: "security",
                title: "Security",
                blocks: [
                    {
                        kind: "p",
                        text: "The site is served to every visitor over an encrypted connection (HTTPS), with additional protective headers applied at the browser level. The administrative dashboard is behind separate authentication and is not reachable by visitors to the public site.",
                    },
                    {
                        kind: "p",
                        text: "No transmission over the internet can be guaranteed absolutely secure. If you find a security weakness on this site, please write to aztu@aztu.edu.az.",
                    },
                ],
            },
            {
                id: "children",
                title: "Children",
                blocks: [
                    {
                        kind: "p",
                        text: "This site is intended for a general audience and does not set out to collect information from children. There is no registration or account that would ask for an age.",
                    },
                ],
            },
            {
                id: "changes",
                title: "Changes to this policy",
                blocks: [
                    {
                        kind: "p",
                        text: "This document is updated as the site changes. The date of the last revision is shown at the top of the page. Any change that materially alters what is collected, or why, will be reflected clearly here.",
                    },
                ],
            },
        ],
        disclaimer:
            "This document describes the current technical behaviour of the site and is not legal advice. It takes legal effect once approved by the university's legal service. If the Azerbaijani and English versions differ, the Azerbaijani text prevails.",
    },
};
