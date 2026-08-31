"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { useLanguage } from "@/context/LanguageContext";

import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from '@mui/icons-material/History';
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";

interface FormerRector {
    name: string;
    bio: string;
    tenure: string;
    image: string;
}

export default function FormerRectorsPage() {
    const { lang } = useLanguage();

    const aboutLabel = lang === "az" ? "Haqqımızda" : "About";
    const aboutHref = lang === "az" ? "/az/haqqimizda" : "/en/about";
    const leadershipLabel = lang === "az" ? "Rəhbərlik və İdarəetmə" : "Leadership and Management";
    const leadershipHref = lang === "az" ? "/az/haqqimizda/rehbetlik-ve-idareetme/rektor" : "/en/about/leadership-and-management/rector";

    const RECTORS_DATA: { name_az: string; name_en: string; tenure: string; bio_az: string; bio_en: string; image: string }[] = [
        {
            name_az: "Mahmud Məmmədov",
            name_en: "Mahmud Mammadov",
            tenure: "1950–1954",
            bio_az: "Azərbaycan Texniki Universitetinin (AzTU) ilk rektoru Mahmud Tağı oğlu Məmmədov 1909-cu ildə anadan olub. 1933-cü ildə Azərbaycan Kənd Təsərrüfatı İnstitutunu (indiki Azərbaycan Dövlət Aqrar Universiteti) bitirib və həmin institutda müəllim, dekan vəzifəsində çalışıb. 1939-cu ildə Moskvada Kənd Təsərrüfatının Mexanikləşdirilməsi və Elektrikləşdirilməsi İnstitutunun aspiranturasını bitirərək namizədlik dissertasiyasını müdafiə edib. 1942–1950-ci illərdə Azərbaycan Kənd Təsərrüfatı nazirinin müavini, Nazirlər Sovetinin sədr müavini işləyib və 1950–1954-cü illərdə Azərbaycan Politexnik İnstitutunun (indiki AzTU) rektoru olub.",
            bio_en: "Mahmud Tagi oglu Mammadov, the first rector of Azerbaijan Technical University (AzTU), was born in 1909. In 1933 he graduated from the Azerbaijan Agricultural Institute (today's Azerbaijan State Agrarian University), where he later served as a lecturer and dean. In 1939 he completed his postgraduate studies at the Moscow Institute of Mechanization and Electrification of Agriculture and defended his candidate dissertation. Between 1942 and 1950 he served as Deputy Minister of Agriculture and Deputy Chair of the Council of Ministers of Azerbaijan, and from 1950 to 1954 he led the Azerbaijan Polytechnic Institute (today's AzTU) as rector.",
            image: "/former-rectors/mahmud-mammadov.png",
        },
        {
            name_az: "Abuzər Əliyev",
            name_en: "Abuzar Aliyev",
            tenure: "1954–1961",
            bio_az: "Professor Əliyev Abuzər Əsgər oğlu 1911-ci ildə anadan olub. O, 1937-ci ildə Azərbaycan Sənaye İnstitutunun Memarlıq-İnşaat fakültəsini bitirib. Böyük Vətən Müharibəsi illərində Bakı şəhərində tikilən hərbi zavodda baş mühəndis və respublika tikinti nazirinin müavini vəzifəsində çalışıb. O, Azərbaycanda tikinti üzrə ilk namizədlik dissertasiyasını müdafiə edən alimdir.",
            bio_en: "Professor Abuzar Asgar oglu Aliyev was born in 1911. In 1937 he graduated from the Faculty of Architecture and Construction of the Azerbaijan Industrial Institute. During the Second World War he served as chief engineer of a military plant built in Baku and as Deputy Minister of Construction. He was the first scholar in Azerbaijan to defend a candidate dissertation in the field of construction.",
            image: "/former-rectors/abuzer-aliyev.png",
        },
        {
            name_az: "Ənvər Qasımzadə",
            name_en: "Anvar Gasimzade",
            tenure: "1962–1969",
            bio_az: "Azərbaycanın görkəmli memarı və dövlət xadimi Ənvər Əlibəy oğlu Qasımzadə 1912-ci il fevralın 12-də Salyan şəhərində anadan olub. 1936-cı ildə Azərbaycan Sənaye İnstitutunun Memarlıq-inşaat fakültəsini bitirib. 1936–1942-ci illərdə Azərbaycan Dövlət Layihə İnstitutunda memar və baş mühəndis, 1946–1962-ci illərdə isə Nazirlər Sovetində Memarlıq işləri idarəsinin rəisi, Bakı Soveti sədrinin birinci müavini, Dövlət Tikinti Komitəsinin sədri, Azərbaycanda tikinti naziri və Memarlar İttifaqının sədr müavini vəzifələrində çalışıb. Böyük Vətən Müharibəsinin fəal iştirakçısı olmuş, “Qırmızı Ulduz” və “Qırmızı Bayraq” ordenləri ilə təltif olunub.",
            bio_en: "Anvar Alibey oglu Gasimzade, a prominent Azerbaijani architect and statesman, was born on February 12, 1912 in Salyan. In 1936 he graduated from the Faculty of Architecture and Construction of the Azerbaijan Industrial Institute. From 1936 to 1942 he worked as architect and chief engineer at the State Design Institute, and between 1946 and 1962 he held senior positions including head of the Architecture Department of the Council of Ministers, First Deputy Chairman of the Baku Soviet, Chairman of the State Construction Committee, Minister of Construction of Azerbaijan, and Deputy Chairman of the Union of Architects. A decorated veteran of the Second World War, he was awarded the Orders of the Red Star and the Red Banner.",
            image: "/former-rectors/enver-qasimzade.png",
        },
        {
            name_az: "Rza Bədəlov",
            name_en: "Rza Badalov",
            tenure: "1968–1976",
            bio_az: "Professor Bədəlov Rza Əbdül oğlu 1915-ci il sentyabrın 25-də Bakı şəhərində anadan olub. Azərbaycan Sənaye İnstitutunu (ASİ) bitirdikdən sonra 1945–1968-ci illərdə Əzizbəyov Neft Trestinin Mexaniki Təmir Zavodunda mühəndis-konstruktor və sex rəisi, ASİ-də aspirant, assistent, baş müəllim, dosent, professor, dekan müavini, dekan və Nəzəri Mexanika kafedrasının müdiri vəzifələrində çalışıb. Azərbaycan Milli Elmlər Akademiyasının müxbir üzvü olub.",
            bio_en: "Professor Rza Abdul oglu Badalov was born on September 25, 1915 in Baku. After graduating from the Azerbaijan Industrial Institute (AII), he worked from 1945 to 1968 as a design engineer and shop supervisor at the Mechanical Repair Plant of the Azizbayov Oil Trust, and at AII as graduate student, assistant, senior lecturer, associate professor, professor, deputy dean, dean, and head of the Department of Theoretical Mechanics. He was a corresponding member of the Azerbaijan National Academy of Sciences.",
            image: "/former-rectors/rza-bedelov.png",
        },
        {
            name_az: "Mirzəağa Bağırov",
            name_en: "Mirzaagha Baghirov",
            tenure: "1976–1988",
            bio_az: "Professor Mirzəağa Əyyub oğlu Bağırov 1927-ci il iyunun 16-da Lənkəran şəhərində anadan olub. 1949-cu ildə Azərbaycan Sənaye İnstitutunun Energetika fakültəsini bitirib. 1956–1963-cü illərdə Azərbaycan EA-nın Energetika və Fizika İnstitutunda laboratoriya müdiri, 1959–1967-ci illərdə Akademiyanın partiya komitəsinin katibi vəzifəsində çalışıb. 1966-cı ildə Moskvada Qubkin adına Neft-Kimya və Qaz İnstitutunda doktorluq dissertasiyasını müdafiə edib. 1974–1976-cı illərdə Azərbaycan EA-nın radiasiya tədqiqatları şöbəsinin müdiri olub.",
            bio_en: "Professor Mirzaagha Ayyub oglu Baghirov was born on June 16, 1927 in Lankaran. In 1949 he graduated from the Faculty of Power Engineering of the Azerbaijan Industrial Institute. From 1956 to 1963 he headed a laboratory at the Institute of Power Engineering and Physics of the Azerbaijan Academy of Sciences, and from 1959 to 1967 he was secretary of the Academy's party committee. In 1966 he defended his doctoral dissertation at the Gubkin Institute of Petrochemistry and Gas in Moscow. Between 1974 and 1976 he led the Department of Radiation Research of the Azerbaijan Academy of Sciences.",
            image: "/former-rectors/mirzeaga-bagirov.png",
        },
        {
            name_az: "Ramiz Qurbanov",
            name_en: "Ramiz Gurbanov",
            tenure: "1989–1990",
            bio_az: "Professor Ramiz Qurbanov 1935-ci ildə Salyan şəhərində anadan olub. 1956-cı ildə Azərbaycan Sənaye İnstitutunun Neft-mədən fakültəsini neft yataqlarının işlənilməsi və istismarı ixtisası üzrə fərqlənmə ilə bitirib. NQÇİ-də operator kimi əmək fəaliyyətinə başlayıb, sonra usta köməkçisi, neft və qaz hasilatı üzrə usta və böyük mühəndis vəzifələrində işləyib. 1961-ci ildən etibarən Azərbaycan Neft və Kimya İnstitutunun (AzNKİ) Nəzəri Mexanika kafedrasında assistent, baş müəllim, dosent, professor və kafedra müdiri olub. 1989-cu ildən Azərbaycan Milli Elmlər Akademiyasının müxbir üzvüdür.",
            bio_en: "Professor Ramiz Gurbanov was born in 1935 in Salyan. In 1956 he graduated with distinction from the Faculty of Petroleum and Mining of the Azerbaijan Industrial Institute, specializing in oilfield development and exploitation. He began his career as an operator at an oil and gas extraction enterprise, working his way up through assistant foreman, foreman, and senior engineer. From 1961 he served at the Department of Theoretical Mechanics of the Azerbaijan Institute of Oil and Chemistry as assistant, senior lecturer, associate professor, professor, and head of department. He has been a corresponding member of the Azerbaijan National Academy of Sciences since 1989.",
            image: "/former-rectors/ramiz-qurbanov.png",
        },
        {
            name_az: "Əli Sadıxov",
            name_en: "Ali Sadikhov",
            tenure: "1990–1992",
            bio_az: "Professor Sadıxov Əli Hidayət oğlu 29 iyun 1938-ci ildə Bakı şəhərində anadan olub. 1962-ci ildə Azərbaycan Politexnik İnstitutunu (indiki AzTU) bitirərək maşınqayırma texnologiyası, metalkəsən dəzgahlar və alətlər ixtisası üzrə mühəndis-mexanik diplomu alıb. 1964-cü tədris ilinin əvvəlində Maşınqayırma Texnologiyası kafedrasında assistent vəzifəsinə müsabiqə yolu ilə qəbul edilib, 1966–1969-cu illərdə kafedranın aspirantı olub və 1971-ci ildə Kuybışev Politexnik İnstitutunda namizədlik, 2008-ci ildə isə AzTU-nun İxtisaslaşdırılmış Dissertasiya Şurasında doktorluq dissertasiyasını müdafiə edib. Onun rektorluğu dövründə — 1991-ci ildə — institut universitet statusu qazanaraq Azərbaycan Texniki Universiteti adlandırılıb.",
            bio_en: "Professor Ali Hidayat oglu Sadikhov was born on June 29, 1938 in Baku. In 1962 he graduated from the Azerbaijan Polytechnic Institute (today's AzTU) as a mechanical engineer specializing in mechanical engineering technology, metal-cutting machines and tools. In 1964 he joined the Department of Mechanical Engineering Technology as an assistant on a competitive basis, completed graduate studies in 1966–1969, defended his candidate dissertation at the Kuybyshev Polytechnic Institute in 1971, and his doctoral dissertation at AzTU's Specialized Dissertation Council in 2008. During his rectorship, in 1991, the institute received university status and was renamed Azerbaijan Technical University.",
            image: "/former-rectors/eli-sadixov.png",
        },
        {
            name_az: "Allahverdi Orucov",
            name_en: "Allahverdi Orujov",
            tenure: "1993",
            bio_az: "Professor Orucov Allahverdi Oruc oğlu 1944-cü ildə Füzuli rayonunun Yağuvənd kəndində anadan olub. 1964–1969-cu illərdə AzPİ-nin (indiki AzTU) Elektrotexnika fakültəsində təhsil alıb. 1975-ci ildə AzPİ-də assistent olaraq işə başlayıb. 1992-ci il noyabrın 6-dan 2000-ci il yanvarın 3-dək AzTU-nun tədris işləri üzrə prorektoru vəzifəsində çalışıb. 1993-cü il iyulun 2-dən həmin ilin dekabrına qədər AzTU-nun rektor səlahiyyətlərinin icrası ona həvalə edilib.",
            bio_en: "Professor Allahverdi Oruj oglu Orujov was born in 1944 in the village of Yagvand, Fuzuli district. From 1964 to 1969 he studied at the Faculty of Electrical Engineering of the Azerbaijan Polytechnic Institute (today's AzTU). In 1975 he started his career at AzPI as an assistant. From November 6, 1992 to January 3, 2000 he served as Vice-Rector for Academic Affairs of AzTU. From July 2 to December 1993 he was entrusted with the duties of acting rector of AzTU.",
            image: "/former-rectors/allahverdi-orucov.png",
        },
        {
            name_az: "Rafiq Mehdiyev",
            name_en: "Rafig Mehdiyev",
            tenure: "1993–1999",
            bio_az: "Professor Rafiq Mehdiyev 1936-cı ildə Cəbrayıl rayonunda anadan olub. 1958-ci ildə Azərbaycan Politexnik İnstitutunun (indiki AzTU) Mexanika fakültəsini bitirib. 1964-cü ildə namizədlik, 1981-ci ildə isə Leninqrad Politexnik İnstitutunda doktorluq dissertasiyasını müdafiə edib. Hazırda İstanbul Texniki Universitetində professor kimi fəaliyyətini davam etdirir.",
            bio_en: "Professor Rafig Mehdiyev was born in 1936 in the Jabrayil district. In 1958 he graduated from the Faculty of Mechanics of the Azerbaijan Polytechnic Institute (today's AzTU). He defended his candidate dissertation in 1964 and his doctoral dissertation at the Leningrad Polytechnic Institute in 1981. He currently continues his academic career as a professor at Istanbul Technical University.",
            image: "/former-rectors/rafiq-mehdiyev.png",
        },
        {
            name_az: "Havar Məmmədov",
            name_en: "Havar Mammadov",
            tenure: "2000–2016",
            bio_az: "Professor Məmmədov Havar Əmir oğlu 1945-ci il oktyabrın 9-da İmişli rayonunun Qızılkənd kəndində anadan olub. 1963-cü ildə İmişli rayon 34 saylı dəmiryolu orta məktəbini fərqlənmə ilə bitirərək Azərbaycan Politexnik İnstitutunun (indiki AzTU) Avtomatika və Hesablama Texnikası fakültəsinin avtomatika və telemexanika ixtisasına qəbul olunub. 2000–2016-cı illərdə AzTU-nun rektoru, 2017–2023-cü illərdə isə Bakı Mühəndislik Universitetinin rektoru vəzifəsində çalışıb.",
            bio_en: "Professor Havar Amir oglu Mammadov was born on October 9, 1945 in the village of Gizilkend, Imishli district. In 1963 he graduated with distinction from Imishli Railway Secondary School No. 34 and was admitted to the Azerbaijan Polytechnic Institute (today's AzTU), Faculty of Automation and Computing Technology, specializing in automation and telemechanics. He served as Rector of AzTU from 2000 to 2016 and as Rector of Baku Engineering University from 2017 to 2023.",
            image: "/former-rectors/havar-mammadov.png",
        },
        {
            name_az: "Xalıq Yahudov",
            name_en: "Khaliq Yahudov",
            tenure: "2016–2019",
            bio_az: "Professor Yahudov Xalıq Məcid oğlu 14 avqust 1946-cı ildə Zaqatala rayonunun Suvagil kəndində anadan olub. 1964-cü ildə Suvagil kənd orta məktəbini əla qiymətlərlə bitirdikdən sonra S.M.Kirov adına Azərbaycan Dövlət Universitetinin (indiki BDU) İqtisad fakültəsinə daxil olub. 1969-cu ildə D.Bünyadzadə adına Azərbaycan Xalq Təsərrüfatı İnstitutunu bitirib və Dövlət Plan Komitəsinin Elmi-Tədqiqat İqtisadiyyat İnstitutuna işə göndərilib. 1981-ci ildən etibarən AzTU-da müxtəlif akademik və inzibati vəzifələrdə çalışıb. 2016-cı ilin sentyabrından 2019-cu il iyulun 31-dək AzTU-nun rektoru olub.",
            bio_en: "Professor Khaliq Majid oglu Yahudov was born on August 14, 1946 in the village of Suvagil, Zagatala district. After graduating from Suvagil Village Secondary School with excellent marks in 1964, he was admitted to the Faculty of Economics of S.M. Kirov Azerbaijan State University (today's Baku State University). In 1969 he graduated from the D. Bunyadzade Azerbaijan Institute of National Economy and was assigned to the Research Institute of Economics of the State Planning Committee. From 1981 onward he held various academic and administrative positions at AzTU. He served as Rector of AzTU from September 2016 to July 31, 2019.",
            image: "/former-rectors/xaliq-yahudov.jpg",
        },
    ];

    const p = {
        eyebrow: lang === "az" ? "Rəhbərlik və İdarəetmə" : "Leadership and Management",
        title: lang === "az" ? "Sabiq Rektorlarımız" : "Our Former Rectors",
        subtitle:
            lang === "az"
                ? "Azərbaycan Texniki Universitetinə müxtəlif dövrlərdə rəhbərlik etmiş rektorlar."
                : "Rectors who have led Azerbaijan Technical University across different eras.",
        breadcrumb: lang === "az" ? "Sabiq Rektorlarımız" : "Former Rectors",
        rectors: RECTORS_DATA.map((r) => ({
            name: lang === "az" ? r.name_az : r.name_en,
            bio: lang === "az" ? r.bio_az : r.bio_en,
            tenure: r.tenure,
            image: r.image,
        })) as FormerRector[],
    };

    /* The headline figures are derived from the roll itself rather than written
       down, so they cannot drift when a rector is added. The dash in a tenure is
       an en dash, and one entry ("1993") has no end year. */
    const years = p.rectors
        .flatMap((r) => r.tenure.split(/[–-]/))
        .map((y) => parseInt(y.trim(), 10))
        .filter((y) => Number.isFinite(y));
    const firstYear = years.length ? Math.min(...years) : null;
    const lastYear = years.length ? Math.max(...years) : null;

    const stats = [
        {
            value: firstYear && lastYear ? `${firstYear}–${lastYear}` : "—",
            label: lang === "az" ? "Rəhbərlik dövrü" : "Years of leadership",
        },
        {
            value: String(p.rectors.length),
            label: lang === "az" ? "Rektor" : "Rectors",
        },
        {
            value: firstYear && lastYear ? `${lastYear - firstYear}` : "—",
            label: lang === "az" ? "İl" : "Years",
        },
    ];

    return (
        <main className="min-h-screen bg-page selection:bg-[#ee7c7e]/30">
            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <header className="text-flow relative overflow-hidden bg-[#0a0c1a] pt-40 lg:pt-48">
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c1a] via-[#111827] to-[#0f172a]" />
                    <AboutHeroVideoBg />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c1a]/90 via-[#0a0c1a]/55 to-transparent" />
                    <div className="absolute -right-[8%] -top-[30%] h-[720px] w-[720px] rounded-full bg-blue-800/20 blur-[170px]" />
                    <div className="absolute -bottom-[35%] left-[4%] h-[540px] w-[540px] rounded-full bg-[#ee7c7e]/10 blur-[150px]" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-14 md:px-10 lg:px-20">
                    <Breadcrumbs
                        items={[
                            { label: aboutLabel, href: aboutHref },
                            { label: leadershipLabel, href: leadershipHref },
                            { label: p.breadcrumb },
                        ]}
                    />

                    <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-16">
                        <motion.div
                            initial={{ y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                            className="lg:col-span-7"
                        >
                            <span className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-1.5 backdrop-blur-xl">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ee7c7e] shadow-[0_0_10px_#ee7c7e]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.32em] text-white/85">
                                    {p.eyebrow}
                                </span>
                            </span>

                            <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)] md:text-5xl xl:text-6xl">
                                {p.title}
                            </h1>

                            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/65 md:text-lg">
                                {p.subtitle}
                            </p>
                        </motion.div>

                        {/* Portrait strip — the whole line of succession, at a glance. */}
                        <motion.div
                            initial={{ scale: 0.985 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                            className="lg:col-span-5"
                        >
                            <div className="flex flex-wrap gap-2.5">
                                {p.rectors.map((rector) => (
                                    <span
                                        key={rector.name}
                                        title={`${rector.name} · ${rector.tenure}`}
                                        className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-lg md:h-16 md:w-16"
                                    >
                                        {rector.image ? (
                                            <Image
                                                src={rector.image}
                                                alt={rector.name}
                                                fill
                                                sizes="64px"
                                                className="object-cover opacity-80 grayscale"
                                            />
                                        ) : (
                                            <span className="flex h-full w-full items-center justify-center text-white/30">
                                                <PersonIcon sx={{ fontSize: 26 }} />
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                                {stats.map((stat) => (
                                    <div key={stat.label}>
                                        <p className="text-xl font-black leading-none tracking-tighter text-white tabular-nums md:text-2xl">
                                            {stat.value}
                                        </p>
                                        <p className="mt-2 text-[10px] font-black uppercase leading-tight tracking-[0.18em] text-white/45">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* ── TIMELINE ─────────────────────────────────────────────────── */}
            <div className="mx-auto w-full max-w-[1200px] px-4 py-12 md:px-10 md:py-16">
                {p.rectors.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-white/10 dark:bg-slate-900">
                        <p className="text-lg font-bold text-[#1a2355] dark:text-white">
                            {lang === "az"
                                ? "Məlumat tezliklə əlavə olunacaq."
                                : "Information will be added soon."}
                        </p>
                    </div>
                ) : (
                    <ol className="relative">
                        {/* The spine. Hidden on small screens, where the cards stack. */}
                        <span
                            aria-hidden
                            className="absolute bottom-4 left-[27px] top-4 hidden w-px bg-gradient-to-b from-[#1a2355]/25 via-[#1a2355]/15 to-transparent md:block"
                        />

                        {p.rectors.map((rector, i) => (
                            <motion.li
                                key={rector.name}
                                /* Animated on mount, not on scroll: this list is the
                                   entire page, and tying it to an IntersectionObserver
                                   risks the entrance never firing and leaving the
                                   content at opacity 0. The stagger is capped so the
                                   last entry is not held back. */
                                initial={{ y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.25), ease: [0.23, 1, 0.32, 1] }}
                                className="relative pb-6 last:pb-0 md:pl-20"
                            >
                                {/* Ordinal marker, sitting on the spine. */}
                                <span
                                    aria-hidden
                                    className="absolute left-0 top-8 hidden h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[13px] font-black tabular-nums text-[#1a2355] shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-white md:flex"
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-[#ee7c7e]/50 dark:border-white/10 dark:bg-slate-900">
                                    {/* Coral rule that fills in on hover. */}
                                    <span className="block h-[3px] w-0 bg-[#ee7c7e] transition-all duration-500 group-hover:w-full" />

                                    <div className="flex flex-col gap-6 p-6 sm:flex-row sm:gap-8 md:p-8">
                                        {/* Portrait. The archive scans are 192px squares, so
                                            they are never rendered larger than that. */}
                                        <div className="shrink-0">
                                            <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner dark:border-white/10 dark:bg-white/5 md:h-36 md:w-36">
                                                {rector.image ? (
                                                    <Image
                                                        src={rector.image}
                                                        alt={rector.name}
                                                        fill
                                                        sizes="144px"
                                                        className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                                                    />
                                                ) : (
                                                    <span className="flex h-full w-full items-center justify-center text-slate-300">
                                                        <PersonIcon sx={{ fontSize: 56 }} />
                                                    </span>
                                                )}
                                            </div>

                                            {/* On mobile the spine is hidden, so the ordinal
                                                rides along with the portrait instead. */}
                                            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 md:hidden">
                                                {String(i + 1).padStart(2, "0")} · {rector.tenure}
                                            </p>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                                                <h2 className="text-xl font-black leading-tight tracking-tight text-[#1a2355] dark:text-white md:text-2xl">
                                                    {rector.name}
                                                </h2>
                                                <span className="hidden shrink-0 items-center gap-2 rounded-lg bg-[#1a2355]/[0.06] px-3 py-1.5 text-[11px] font-black tabular-nums tracking-[0.12em] text-[#1a2355] dark:bg-white/10 dark:text-white md:inline-flex">
                                                    <HistoryIcon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
                                                    {rector.tenure}
                                                </span>
                                            </div>

                                            <span className="mt-4 block h-px w-12 bg-gradient-to-r from-[#ee7c7e] to-transparent" />

                                            <p className="mt-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                                                {rector.bio}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </motion.li>
                        ))}
                    </ol>
                )}
            </div>
        </main>
    );
}
