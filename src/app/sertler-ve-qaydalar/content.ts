import type { LegalDoc } from "@/components/legal/LegalDocument";

/**
 * Terms and conditions content.
 *
 * Scoped to what this site actually offers: it publishes information, it runs a
 * site search, and it has an AI assistant. There is no account, no payment and
 * no submission of applications here, so the text does not pretend otherwise —
 * every transactional service lives on a separate university portal with its own
 * terms, and those are named rather than glossed over.
 */

const UPDATED_AZ = "Son yenilənmə: 31 avqust 2026";
const UPDATED_EN = "Last updated: 31 August 2026";

export const TERMS: Record<"az" | "en", LegalDoc> = {
    az: {
        eyebrow: "Hüquqi məlumatlar",
        title: "Şərtlər və Qaydalar",
        description:
            "aztu.edu.az saytından istifadə qaydaları, məzmunun statusu və tərəflərin məsuliyyəti.",
        breadcrumb: "Şərtlər və Qaydalar",
        updatedLabel: UPDATED_AZ,
        contentsLabel: "Bölmələr",
        intro: [
            {
                kind: "p",
                text: "Bu şərtlər Azərbaycan Texniki Universitetinin (AzTU) rəsmi veb-saytından — aztu.edu.az — istifadəni tənzimləyir. Saytdan istifadə etməklə siz bu şərtləri qəbul etmiş sayılırsınız.",
            },
            {
                kind: "p",
                text: "Sayt məlumatlandırma resursudur. Burada hesab yaratmaq, ödəniş etmək və ya rəsmi ərizə vermək mümkün deyil — bu xidmətlər universitetin ayrıca sistemlərində həyata keçirilir və onların öz qaydaları var.",
            },
        ],
        sections: [
            {
                id: "scope",
                title: "Şərtlərin əhatə dairəsi",
                blocks: [
                    {
                        kind: "p",
                        text: "Bu şərtlər yalnız aztu.edu.az domenindəki səhifələrə aiddir. Aşağıdakı sistemlər ayrıca resurslardır və onlardan istifadə həmin resursların öz qaydaları ilə tənzimlənir:",
                    },
                    {
                        kind: "ul",
                        items: [
                            "sso.aztu.edu.az — tədris idarəetmə sistemi (LMS)",
                            "majors.aztu.edu.az — ixtisaslar portalı",
                            "library.aztu.edu.az — kitabxana",
                            "alumni.aztu.edu.az — məzunlar portalı",
                            "online-apellyasiya.aztu.edu.az — apellyasiya sistemi",
                            "e-grant.aztu.edu.az, plan-report.aztu.edu.az, proceedings.aztu.edu.az və digər ixtisaslaşmış portallar",
                        ],
                    },
                ],
            },
            {
                id: "information",
                title: "Saytdakı məlumatın statusu",
                blocks: [
                    {
                        kind: "p",
                        text: "Universitet publik hüquqi şəxs kimi ictimaiyyəti məlumatlandırmaq öhdəliyi daşıyır və saytdakı məlumatların dəqiq və aktual olması üçün ağlabatan səylər göstərir.",
                    },
                    {
                        kind: "p",
                        text: "Bununla belə, saytdakı ümumi məlumat rəsmi sənədi əvəz etmir. Qəbul şərtləri, tədris planları, imtahan nəticələri, ödəniş məbləğləri və oxşar məsələlərdə hüquqi qüvvəyə malik olan universitetin rəsmi sənədləri, əmrləri və müvafiq dövlət qurumlarının aktlarıdır. Uyğunsuzluq halında rəsmi sənəd əsas götürülür.",
                    },
                    {
                        kind: "note",
                        text: "Xəbərlər, elanlar və tarixi materiallar dərc olunduğu tarixdəki vəziyyəti əks etdirir və sonradan yenilənməyə bilər. Qərar qəbul etməzdən əvvəl aktual məlumatı müvafiq struktur bölmədən dəqiqləşdirin.",
                    },
                ],
            },
            {
                id: "permitted",
                title: "İcazə verilən istifadə",
                blocks: [
                    {
                        kind: "p",
                        text: "Saytdan sərbəst şəkildə istifadə edə bilərsiniz: səhifələri oxumaq, çap etmək, şəxsi və ya təhsil məqsədləri üçün saxlamaq, məzmuna istinad vermək və linkini paylaşmaq. Universitet məzmununa mənbə göstərilməklə istinad edilməsini alqışlayır.",
                    },
                ],
            },
            {
                id: "prohibited",
                title: "Qadağan olunan istifadə",
                blocks: [
                    {
                        kind: "ul",
                        items: [
                            "Saytın və ya ona bağlı sistemlərin normal işinə mane olmaq, həddindən artıq avtomatlaşdırılmış sorğular göndərmək, saytı yükləməyə yönəlmiş hərəkətlər etmək.",
                            "Təhlükəsizlik tədbirlərini aşmağa cəhd etmək, icazəsiz giriş əldə etməyə çalışmaq, zərərli proqram təminatı yerləşdirmək.",
                            "Universitetin adından çıxış etmək, rəsmi məzmunu təhrif edərək yaymaq və ya saytın surətini rəsmi resurs kimi təqdim etmək.",
                            "Saytdakı şəxsi məlumatları (əməkdaş adları, e-poçt ünvanları, telefon nömrələri) kütləvi şəkildə toplamaq və reklam və ya digər icazəsiz məqsədlər üçün istifadə etmək.",
                            "Məzmunu icazəsiz olaraq kommersiya məqsədilə yenidən dərc etmək.",
                        ],
                    },
                ],
            },
            {
                id: "ip",
                title: "Əqli mülkiyyət",
                blocks: [
                    {
                        kind: "p",
                        text: "Saytdakı mətnlər, fotoşəkillər, videolar, qrafika, dizayn və proqram təminatı — üçüncü tərəflərə məxsus olduğu ayrıca göstərilən materiallar istisna olmaqla — Azərbaycan Texniki Universitetinə məxsusdur və müəllif hüququ ilə qorunur.",
                    },
                    {
                        kind: "p",
                        text: "Universitetin adı, loqosu, gerbi və digər fərqləndirici nişanları universitetin mülkiyyətidir. Onların istifadəsi üçün yazılı razılıq tələb olunur.",
                    },
                    {
                        kind: "p",
                        text: "Saytdakı bəzi materiallar (qoşma videolar, xarici sənədlər, tərəfdaş təşkilatların logoları) üçüncü tərəflərə məxsusdur və onların öz şərtləri ilə qorunur.",
                    },
                ],
            },
            {
                id: "chatbot",
                title: "Süni intellekt köməkçisi",
                blocks: [
                    {
                        kind: "p",
                        text: "Saytda süni intellektə əsaslanan çat köməkçisi var. Ondan istifadə könüllüdür.",
                    },
                    {
                        kind: "note",
                        text: "Köməkçinin cavabları avtomatik yaradılır və universitetin rəsmi mövqeyi deyil. Cavablar natamam və ya səhv ola bilər. Qəbul, ödəniş, imtahan və digər rəsmi məsələlərdə yalnız rəsmi sənədlərə və müvafiq struktur bölmənin cavabına etibar edin.",
                    },
                    {
                        kind: "p",
                        text: "Çata şəxsiyyət vəsiqəsi nömrəsi, FİN, sağlamlıq məlumatı, parol və ya bank kartı məlumatı yazmayın. Yazışmanın necə saxlanıldığı və emal olunduğu Məxfilik Siyasətində izah olunur.",
                    },
                    {
                        kind: "p",
                        text: "Köməkçidən qanunsuz, təhqiredici məzmun yaratmaq və ya sistemin işinə mane olmaq üçün istifadə etmək qadağandır.",
                    },
                ],
            },
            {
                id: "links",
                title: "Xarici keçidlər və qoşma məzmun",
                blocks: [
                    {
                        kind: "p",
                        text: "Sayt tərəfdaş universitetlərin, dövlət qurumlarının, elmi bazaların və reytinq təşkilatlarının resurslarına keçidlər verir. Universitet bu resursların məzmununa, əlçatanlığına və məxfilik təcrübələrinə görə məsuliyyət daşımır.",
                    },
                    {
                        kind: "p",
                        text: "Bəzi səhifələrdə kənar xidmətlərdən (YouTube, Google Xəritə, Google Drive) qoşma məzmun göstərilir. Belə məzmun açıldıqda brauzeriniz həmin xidmətlə birbaşa əlaqə qurur.",
                    },
                ],
            },
            {
                id: "availability",
                title: "Saytın əlçatanlığı",
                blocks: [
                    {
                        kind: "p",
                        text: "Universitet saytın fasiləsiz işləməsi üçün səy göstərir, lakin texniki işlər, yeniləmələr və ya nəzarətdən kənar hallar səbəbindən müvəqqəti dayanmalar mümkündür. Universitet saytın istənilən hissəsini əvvəlcədən xəbərdarlıq etmədən dəyişdirmək, dayandırmaq və ya ləğv etmək hüququnu saxlayır.",
                    },
                ],
            },
            {
                id: "liability",
                title: "Məsuliyyətin məhdudlaşdırılması",
                blocks: [
                    {
                        kind: "p",
                        text: "Sayt «olduğu kimi» təqdim olunur. Qanunvericiliyin yol verdiyi hüdudlarda universitet saytdakı məlumatlara əsaslanaraq qəbul edilmiş qərarlardan, saytın müvəqqəti əlçatmazlığından, texniki səhvlərdən və ya xarici resurslardakı məzmundan yaranan dolayı zərərlərə görə məsuliyyət daşımır.",
                    },
                    {
                        kind: "p",
                        text: "Bu bənd universitetin qanunvericiliklə müəyyən edilmiş, o cümlədən informasiya əldə etmək hüququ və fərdi məlumatların mühafizəsi üzrə öhdəliklərini məhdudlaşdırmır.",
                    },
                ],
            },
            {
                id: "accessibility",
                title: "Əlçatanlıq və problemlərin bildirilməsi",
                blocks: [
                    {
                        kind: "p",
                        text: "Sayt müxtəlif cihazlarda və köməkçi texnologiyalarla işləmək üçün hazırlanır. Səhifədə səhv məlumat, işləməyən keçid, əlçatanlıq problemi və ya təhlükəsizlik zəifliyi aşkar etsəniz, bildirməyinizi xahiş edirik.",
                    },
                    {
                        kind: "contact",
                        rows: [
                            { label: "E-poçt", value: "aztu@aztu.edu.az", href: "mailto:aztu@aztu.edu.az" },
                            { label: "Telefon", value: "(+994 12) 539-13-05", href: "tel:+994125391305" },
                        ],
                    },
                ],
            },
            {
                id: "law",
                title: "Tətbiq olunan qanunvericilik",
                blocks: [
                    {
                        kind: "p",
                        text: "Bu şərtlər Azərbaycan Respublikasının qanunvericiliyi ilə tənzimlənir. Mübahisələr Azərbaycan Respublikasının məhkəmələrində baxılır.",
                    },
                    {
                        kind: "p",
                        text: "Saytın Azərbaycan və ingilis dilli variantları arasında uyğunsuzluq olarsa, Azərbaycan dilindəki mətn əsas götürülür.",
                    },
                ],
            },
            {
                id: "changes",
                title: "Şərtlərdəki dəyişikliklər",
                blocks: [
                    {
                        kind: "p",
                        text: "Universitet bu şərtləri yeniləyə bilər. Yenilənmə tarixi səhifənin yuxarısında göstərilir. Dəyişiklikdən sonra saytdan istifadəni davam etdirmək yeni şərtlərin qəbulu deməkdir.",
                    },
                ],
            },
        ],
        disclaimer:
            "Bu sənəd hüquqi məsləhət deyil və universitetin hüquq xidməti tərəfindən təsdiq edildikdən sonra qüvvəyə minir. Azərbaycan və ingilis variantları arasında uyğunsuzluq olarsa, Azərbaycan dilindəki mətn əsas götürülür.",
    },

    en: {
        eyebrow: "Legal Information",
        title: "Terms & Conditions",
        description:
            "The rules for using aztu.edu.az, the status of what is published here, and where responsibility lies.",
        breadcrumb: "Terms & Conditions",
        updatedLabel: UPDATED_EN,
        contentsLabel: "Contents",
        intro: [
            {
                kind: "p",
                text: "These terms govern the use of the official website of Azerbaijan Technical University (AzTU) at aztu.edu.az. By using the site you accept them.",
            },
            {
                kind: "p",
                text: "This is an informational site. You cannot create an account, make a payment or file a formal application here — those services run on the university's separate systems, each with its own terms.",
            },
        ],
        sections: [
            {
                id: "scope",
                title: "What these terms cover",
                blocks: [
                    {
                        kind: "p",
                        text: "These terms apply to pages on the aztu.edu.az domain only. The following are separate systems, governed by their own rules:",
                    },
                    {
                        kind: "ul",
                        items: [
                            "sso.aztu.edu.az — the learning management system (LMS)",
                            "majors.aztu.edu.az — the specializations portal",
                            "library.aztu.edu.az — the library",
                            "alumni.aztu.edu.az — the alumni portal",
                            "online-apellyasiya.aztu.edu.az — the appeals system",
                            "e-grant.aztu.edu.az, plan-report.aztu.edu.az, proceedings.aztu.edu.az and other specialised portals",
                        ],
                    },
                ],
            },
            {
                id: "information",
                title: "The status of information on this site",
                blocks: [
                    {
                        kind: "p",
                        text: "As a public legal entity the university has a duty to inform the public, and makes reasonable efforts to keep what is published here accurate and current.",
                    },
                    {
                        kind: "p",
                        text: "Even so, general information on this site does not replace an official document. On admission requirements, curricula, examination results, fees and similar matters, legal force rests with the university's official documents and orders and with the acts of the competent state bodies. Where the two differ, the official document governs.",
                    },
                    {
                        kind: "note",
                        text: "News, announcements and archive material reflect the position on the date they were published and may not have been updated since. Confirm current details with the relevant department before acting on them.",
                    },
                ],
            },
            {
                id: "permitted",
                title: "Permitted use",
                blocks: [
                    {
                        kind: "p",
                        text: "You are free to use this site: to read pages, print them, save them for personal or educational purposes, quote from them and share links to them. The university welcomes citation of its content with the source acknowledged.",
                    },
                ],
            },
            {
                id: "prohibited",
                title: "Prohibited use",
                blocks: [
                    {
                        kind: "ul",
                        items: [
                            "Interfering with the normal operation of the site or connected systems, sending excessive automated requests, or otherwise attempting to overload it.",
                            "Attempting to circumvent security measures, gain unauthorised access, or introduce malicious software.",
                            "Acting in the university's name, distributing distorted versions of official content, or presenting a copy of the site as an official resource.",
                            "Harvesting personal data published here (staff names, email addresses, telephone numbers) in bulk for advertising or other unauthorised purposes.",
                            "Republishing content for commercial purposes without permission.",
                        ],
                    },
                ],
            },
            {
                id: "ip",
                title: "Intellectual property",
                blocks: [
                    {
                        kind: "p",
                        text: "The text, photographs, video, graphics, design and software on this site — other than material identified as belonging to a third party — belong to Azerbaijan Technical University and are protected by copyright.",
                    },
                    {
                        kind: "p",
                        text: "The university's name, logo, emblem and other distinguishing marks are its property. Their use requires written permission.",
                    },
                    {
                        kind: "p",
                        text: "Some material on the site (embedded video, external documents, partner organisations' logos) belongs to third parties and is protected under their own terms.",
                    },
                ],
            },
            {
                id: "chatbot",
                title: "The AI assistant",
                blocks: [
                    {
                        kind: "p",
                        text: "The site offers a chat assistant based on artificial intelligence. Using it is voluntary.",
                    },
                    {
                        kind: "note",
                        text: "The assistant's answers are generated automatically and are not an official position of the university. They may be incomplete or wrong. On admission, fees, examinations and other formal matters, rely only on official documents and on the answer of the relevant department.",
                    },
                    {
                        kind: "p",
                        text: "Do not type ID numbers, health information, passwords or payment details into the chat. How conversations are stored and processed is explained in the Privacy Policy.",
                    },
                    {
                        kind: "p",
                        text: "The assistant must not be used to generate unlawful or abusive content, or to interfere with the operation of the system.",
                    },
                ],
            },
            {
                id: "links",
                title: "External links and embedded content",
                blocks: [
                    {
                        kind: "p",
                        text: "The site links to partner universities, state bodies, scientific databases and ranking organisations. The university is not responsible for the content, availability or privacy practices of those resources.",
                    },
                    {
                        kind: "p",
                        text: "Some pages display content embedded from outside services (YouTube, Google Maps, Google Drive). When such content loads, your browser connects to that service directly.",
                    },
                ],
            },
            {
                id: "availability",
                title: "Availability",
                blocks: [
                    {
                        kind: "p",
                        text: "The university aims to keep the site continuously available, but interruptions are possible during maintenance and updates or through circumstances outside its control. The university may change, suspend or withdraw any part of the site without prior notice.",
                    },
                ],
            },
            {
                id: "liability",
                title: "Limitation of liability",
                blocks: [
                    {
                        kind: "p",
                        text: "The site is provided “as is”. To the extent permitted by law, the university is not liable for indirect loss arising from decisions taken in reliance on information published here, from temporary unavailability of the site, from technical errors, or from content on external resources.",
                    },
                    {
                        kind: "p",
                        text: "Nothing in this section limits the university's obligations under legislation, including those on access to information and the protection of personal data.",
                    },
                ],
            },
            {
                id: "accessibility",
                title: "Accessibility and reporting problems",
                blocks: [
                    {
                        kind: "p",
                        text: "The site is built to work across devices and with assistive technology. If you find incorrect information, a broken link, an accessibility barrier or a security weakness, please tell us.",
                    },
                    {
                        kind: "contact",
                        rows: [
                            { label: "Email", value: "aztu@aztu.edu.az", href: "mailto:aztu@aztu.edu.az" },
                            { label: "Phone", value: "(+994 12) 539-13-05", href: "tel:+994125391305" },
                        ],
                    },
                ],
            },
            {
                id: "law",
                title: "Governing law",
                blocks: [
                    {
                        kind: "p",
                        text: "These terms are governed by the legislation of the Republic of Azerbaijan. Disputes are heard by the courts of the Republic of Azerbaijan.",
                    },
                    {
                        kind: "p",
                        text: "If the Azerbaijani and English versions of the site differ, the Azerbaijani text prevails.",
                    },
                ],
            },
            {
                id: "changes",
                title: "Changes to these terms",
                blocks: [
                    {
                        kind: "p",
                        text: "The university may update these terms. The date of the last revision is shown at the top of the page. Continuing to use the site after a change means accepting the revised terms.",
                    },
                ],
            },
        ],
        disclaimer:
            "This document is not legal advice and takes effect once approved by the university's legal service. If the Azerbaijani and English versions differ, the Azerbaijani text prevails.",
    },
};
