"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from '@mui/icons-material/History';
import VerifiedIcon from "@mui/icons-material/Verified";

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
            image: "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/7-2022/1%20(1).png",
        },
        {
            name_az: "Abuzər Əliyev",
            name_en: "Abuzar Aliyev",
            tenure: "1954–1961",
            bio_az: "Professor Əliyev Abuzər Əsgər oğlu 1911-ci ildə anadan olub. O, 1937-ci ildə Azərbaycan Sənaye İnstitutunun Memarlıq-İnşaat fakültəsini bitirib. Böyük Vətən Müharibəsi illərində Bakı şəhərində tikilən hərbi zavodda baş mühəndis və respublika tikinti nazirinin müavini vəzifəsində çalışıb. O, Azərbaycanda tikinti üzrə ilk namizədlik dissertasiyasını müdafiə edən alimdir.",
            bio_en: "Professor Abuzar Asgar oglu Aliyev was born in 1911. In 1937 he graduated from the Faculty of Architecture and Construction of the Azerbaijan Industrial Institute. During the Second World War he served as chief engineer of a military plant built in Baku and as Deputy Minister of Construction. He was the first scholar in Azerbaijan to defend a candidate dissertation in the field of construction.",
            image: "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/7-2022/2.png",
        },
        {
            name_az: "Ənvər Qasımzadə",
            name_en: "Anvar Gasimzade",
            tenure: "1962–1969",
            bio_az: "Azərbaycanın görkəmli memarı və dövlət xadimi Ənvər Əlibəy oğlu Qasımzadə 1912-ci il fevralın 12-də Salyan şəhərində anadan olub. 1936-cı ildə Azərbaycan Sənaye İnstitutunun Memarlıq-inşaat fakültəsini bitirib. 1936–1942-ci illərdə Azərbaycan Dövlət Layihə İnstitutunda memar və baş mühəndis, 1946–1962-ci illərdə isə Nazirlər Sovetində Memarlıq işləri idarəsinin rəisi, Bakı Soveti sədrinin birinci müavini, Dövlət Tikinti Komitəsinin sədri, Azərbaycanda tikinti naziri və Memarlar İttifaqının sədr müavini vəzifələrində çalışıb. Böyük Vətən Müharibəsinin fəal iştirakçısı olmuş, “Qırmızı Ulduz” və “Qırmızı Bayraq” ordenləri ilə təltif olunub.",
            bio_en: "Anvar Alibey oglu Gasimzade, a prominent Azerbaijani architect and statesman, was born on February 12, 1912 in Salyan. In 1936 he graduated from the Faculty of Architecture and Construction of the Azerbaijan Industrial Institute. From 1936 to 1942 he worked as architect and chief engineer at the State Design Institute, and between 1946 and 1962 he held senior positions including head of the Architecture Department of the Council of Ministers, First Deputy Chairman of the Baku Soviet, Chairman of the State Construction Committee, Minister of Construction of Azerbaijan, and Deputy Chairman of the Union of Architects. A decorated veteran of the Second World War, he was awarded the Orders of the Red Star and the Red Banner.",
            image: "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/7-2022/3.png",
        },
        {
            name_az: "Rza Bədəlov",
            name_en: "Rza Badalov",
            tenure: "1968–1976",
            bio_az: "Professor Bədəlov Rza Əbdül oğlu 1915-ci il sentyabrın 25-də Bakı şəhərində anadan olub. Azərbaycan Sənaye İnstitutunu (ASİ) bitirdikdən sonra 1945–1968-ci illərdə Əzizbəyov Neft Trestinin Mexaniki Təmir Zavodunda mühəndis-konstruktor və sex rəisi, ASİ-də aspirant, assistent, baş müəllim, dosent, professor, dekan müavini, dekan və Nəzəri Mexanika kafedrasının müdiri vəzifələrində çalışıb. Azərbaycan Milli Elmlər Akademiyasının müxbir üzvü olub.",
            bio_en: "Professor Rza Abdul oglu Badalov was born on September 25, 1915 in Baku. After graduating from the Azerbaijan Industrial Institute (AII), he worked from 1945 to 1968 as a design engineer and shop supervisor at the Mechanical Repair Plant of the Azizbayov Oil Trust, and at AII as graduate student, assistant, senior lecturer, associate professor, professor, deputy dean, dean, and head of the Department of Theoretical Mechanics. He was a corresponding member of the Azerbaijan National Academy of Sciences.",
            image: "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/7-2022/4.png",
        },
        {
            name_az: "Mirzəağa Bağırov",
            name_en: "Mirzaagha Baghirov",
            tenure: "1976–1988",
            bio_az: "Professor Mirzəağa Əyyub oğlu Bağırov 1927-ci il iyunun 16-da Lənkəran şəhərində anadan olub. 1949-cu ildə Azərbaycan Sənaye İnstitutunun Energetika fakültəsini bitirib. 1956–1963-cü illərdə Azərbaycan EA-nın Energetika və Fizika İnstitutunda laboratoriya müdiri, 1959–1967-ci illərdə Akademiyanın partiya komitəsinin katibi vəzifəsində çalışıb. 1966-cı ildə Moskvada Qubkin adına Neft-Kimya və Qaz İnstitutunda doktorluq dissertasiyasını müdafiə edib. 1974–1976-cı illərdə Azərbaycan EA-nın radiasiya tədqiqatları şöbəsinin müdiri olub.",
            bio_en: "Professor Mirzaagha Ayyub oglu Baghirov was born on June 16, 1927 in Lankaran. In 1949 he graduated from the Faculty of Power Engineering of the Azerbaijan Industrial Institute. From 1956 to 1963 he headed a laboratory at the Institute of Power Engineering and Physics of the Azerbaijan Academy of Sciences, and from 1959 to 1967 he was secretary of the Academy's party committee. In 1966 he defended his doctoral dissertation at the Gubkin Institute of Petrochemistry and Gas in Moscow. Between 1974 and 1976 he led the Department of Radiation Research of the Azerbaijan Academy of Sciences.",
            image: "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/7-2022/5.png",
        },
        {
            name_az: "Ramiz Qurbanov",
            name_en: "Ramiz Gurbanov",
            tenure: "1989–1990",
            bio_az: "Professor Ramiz Qurbanov 1935-ci ildə Salyan şəhərində anadan olub. 1956-cı ildə Azərbaycan Sənaye İnstitutunun Neft-mədən fakültəsini neft yataqlarının işlənilməsi və istismarı ixtisası üzrə fərqlənmə ilə bitirib. NQÇİ-də operator kimi əmək fəaliyyətinə başlayıb, sonra usta köməkçisi, neft və qaz hasilatı üzrə usta və böyük mühəndis vəzifələrində işləyib. 1961-ci ildən etibarən Azərbaycan Neft və Kimya İnstitutunun (AzNKİ) Nəzəri Mexanika kafedrasında assistent, baş müəllim, dosent, professor və kafedra müdiri olub. 1989-cu ildən Azərbaycan Milli Elmlər Akademiyasının müxbir üzvüdür.",
            bio_en: "Professor Ramiz Gurbanov was born in 1935 in Salyan. In 1956 he graduated with distinction from the Faculty of Petroleum and Mining of the Azerbaijan Industrial Institute, specializing in oilfield development and exploitation. He began his career as an operator at an oil and gas extraction enterprise, working his way up through assistant foreman, foreman, and senior engineer. From 1961 he served at the Department of Theoretical Mechanics of the Azerbaijan Institute of Oil and Chemistry as assistant, senior lecturer, associate professor, professor, and head of department. He has been a corresponding member of the Azerbaijan National Academy of Sciences since 1989.",
            image: "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/7-2022/6.png",
        },
        {
            name_az: "Əli Sadıxov",
            name_en: "Ali Sadikhov",
            tenure: "1990–1992",
            bio_az: "Professor Sadıxov Əli Hidayət oğlu 29 iyun 1938-ci ildə Bakı şəhərində anadan olub. 1962-ci ildə Azərbaycan Politexnik İnstitutunu (indiki AzTU) bitirərək maşınqayırma texnologiyası, metalkəsən dəzgahlar və alətlər ixtisası üzrə mühəndis-mexanik diplomu alıb. 1964-cü tədris ilinin əvvəlində Maşınqayırma Texnologiyası kafedrasında assistent vəzifəsinə müsabiqə yolu ilə qəbul edilib, 1966–1969-cu illərdə kafedranın aspirantı olub və 1971-ci ildə Kuybışev Politexnik İnstitutunda namizədlik, 2008-ci ildə isə AzTU-nun İxtisaslaşdırılmış Dissertasiya Şurasında doktorluq dissertasiyasını müdafiə edib. Onun rektorluğu dövründə — 1991-ci ildə — institut universitet statusu qazanaraq Azərbaycan Texniki Universiteti adlandırılıb.",
            bio_en: "Professor Ali Hidayat oglu Sadikhov was born on June 29, 1938 in Baku. In 1962 he graduated from the Azerbaijan Polytechnic Institute (today's AzTU) as a mechanical engineer specializing in mechanical engineering technology, metal-cutting machines and tools. In 1964 he joined the Department of Mechanical Engineering Technology as an assistant on a competitive basis, completed graduate studies in 1966–1969, defended his candidate dissertation at the Kuybyshev Polytechnic Institute in 1971, and his doctoral dissertation at AzTU's Specialized Dissertation Council in 2008. During his rectorship, in 1991, the institute received university status and was renamed Azerbaijan Technical University.",
            image: "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/7-2022/7.png",
        },
        {
            name_az: "Allahverdi Orucov",
            name_en: "Allahverdi Orujov",
            tenure: "1993",
            bio_az: "Professor Orucov Allahverdi Oruc oğlu 1944-cü ildə Füzuli rayonunun Yağuvənd kəndində anadan olub. 1964–1969-cu illərdə AzPİ-nin (indiki AzTU) Elektrotexnika fakültəsində təhsil alıb. 1975-ci ildə AzPİ-də assistent olaraq işə başlayıb. 1992-ci il noyabrın 6-dan 2000-ci il yanvarın 3-dək AzTU-nun tədris işləri üzrə prorektoru vəzifəsində çalışıb. 1993-cü il iyulun 2-dən həmin ilin dekabrına qədər AzTU-nun rektor səlahiyyətlərinin icrası ona həvalə edilib.",
            bio_en: "Professor Allahverdi Oruj oglu Orujov was born in 1944 in the village of Yagvand, Fuzuli district. From 1964 to 1969 he studied at the Faculty of Electrical Engineering of the Azerbaijan Polytechnic Institute (today's AzTU). In 1975 he started his career at AzPI as an assistant. From November 6, 1992 to January 3, 2000 he served as Vice-Rector for Academic Affairs of AzTU. From July 2 to December 1993 he was entrusted with the duties of acting rector of AzTU.",
            image: "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/7-2022/8.png",
        },
        {
            name_az: "Rafiq Mehdiyev",
            name_en: "Rafig Mehdiyev",
            tenure: "1993–1999",
            bio_az: "Professor Rafiq Mehdiyev 1936-cı ildə Cəbrayıl rayonunda anadan olub. 1958-ci ildə Azərbaycan Politexnik İnstitutunun (indiki AzTU) Mexanika fakültəsini bitirib. 1964-cü ildə namizədlik, 1981-ci ildə isə Leninqrad Politexnik İnstitutunda doktorluq dissertasiyasını müdafiə edib. Hazırda İstanbul Texniki Universitetində professor kimi fəaliyyətini davam etdirir.",
            bio_en: "Professor Rafig Mehdiyev was born in 1936 in the Jabrayil district. In 1958 he graduated from the Faculty of Mechanics of the Azerbaijan Polytechnic Institute (today's AzTU). He defended his candidate dissertation in 1964 and his doctoral dissertation at the Leningrad Polytechnic Institute in 1981. He currently continues his academic career as a professor at Istanbul Technical University.",
            image: "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/7-2022/9.png",
        },
        {
            name_az: "Havar Məmmədov",
            name_en: "Havar Mammadov",
            tenure: "2000–2016",
            bio_az: "Professor Məmmədov Havar Əmir oğlu 1945-ci il oktyabrın 9-da İmişli rayonunun Qızılkənd kəndində anadan olub. 1963-cü ildə İmişli rayon 34 saylı dəmiryolu orta məktəbini fərqlənmə ilə bitirərək Azərbaycan Politexnik İnstitutunun (indiki AzTU) Avtomatika və Hesablama Texnikası fakültəsinin avtomatika və telemexanika ixtisasına qəbul olunub. 2000–2016-cı illərdə AzTU-nun rektoru, 2017–2023-cü illərdə isə Bakı Mühəndislik Universitetinin rektoru vəzifəsində çalışıb.",
            bio_en: "Professor Havar Amir oglu Mammadov was born on October 9, 1945 in the village of Gizilkend, Imishli district. In 1963 he graduated with distinction from Imishli Railway Secondary School No. 34 and was admitted to the Azerbaijan Polytechnic Institute (today's AzTU), Faculty of Automation and Computing Technology, specializing in automation and telemechanics. He served as Rector of AzTU from 2000 to 2016 and as Rector of Baku Engineering University from 2017 to 2023.",
            image: "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/7-2022/10.png",
        },
        {
            name_az: "Xalıq Yahudov",
            name_en: "Khaliq Yahudov",
            tenure: "2016–2019",
            bio_az: "Professor Yahudov Xalıq Məcid oğlu 14 avqust 1946-cı ildə Zaqatala rayonunun Suvagil kəndində anadan olub. 1964-cü ildə Suvagil kənd orta məktəbini əla qiymətlərlə bitirdikdən sonra S.M.Kirov adına Azərbaycan Dövlət Universitetinin (indiki BDU) İqtisad fakültəsinə daxil olub. 1969-cu ildə D.Bünyadzadə adına Azərbaycan Xalq Təsərrüfatı İnstitutunu bitirib və Dövlət Plan Komitəsinin Elmi-Tədqiqat İqtisadiyyat İnstitutuna işə göndərilib. 1981-ci ildən etibarən AzTU-da müxtəlif akademik və inzibati vəzifələrdə çalışıb. 2016-cı ilin sentyabrından 2019-cu il iyulun 31-dək AzTU-nun rektoru olub.",
            bio_en: "Professor Khaliq Majid oglu Yahudov was born on August 14, 1946 in the village of Suvagil, Zagatala district. After graduating from Suvagil Village Secondary School with excellent marks in 1964, he was admitted to the Faculty of Economics of S.M. Kirov Azerbaijan State University (today's Baku State University). In 1969 he graduated from the D. Bunyadzade Azerbaijan Institute of National Economy and was assigned to the Research Institute of Economics of the State Planning Committee. From 1981 onward he held various academic and administrative positions at AzTU. He served as Rector of AzTU from September 2016 to July 31, 2019.",
            image: "https://www.aztu.edu.az/web_admin/upload/files/aztu.edu.az/menus/9-2022/11-rektor.jpg",
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

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            {/* HERO SECTION */}
            <div className="relative min-h-[50vh] lg:min-h-[60vh] flex flex-col pt-44 lg:pt-48 z-10">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
                    <nav className="flex flex-wrap items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            {lang === "az" ? "Ana səhifə" : "Home"}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={aboutHref} className="hover:text-white transition-colors">
                            {aboutLabel}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={leadershipHref} className="hover:text-white transition-colors">
                            {leadershipLabel}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <div className="flex-1 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-4xl"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                                {p.eyebrow}
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 text-white leading-[1.1] tracking-tight">
                                {p.title}
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/80 font-medium mb-10 leading-relaxed max-w-2xl">
                                {p.subtitle}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* RECTORS LIST SECTION */}
            <div className="relative px-4 md:px-10 lg:px-20 py-24 z-10">
                <div className="max-w-[1400px] mx-auto">
                    {p.rectors.length === 0 ? (
                        <div className="rounded-[2rem] border border-[#1a2355]/15 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-12 text-center">
                            <p className="text-[#1a2355] dark:text-white font-bold text-lg">
                                {lang === "az" ? "Məlumat tezliklə əlavə olunacaq." : "Information will be added soon."}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {p.rectors.map((rector, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 flex flex-col items-center text-center gap-6 shadow-[0_4px_20px_-4px_rgba(26,35,85,0.1)] hover:shadow-[0_40px_80px_-15px_rgba(26,35,85,0.2)] border-2 border-[#1a2355]/30 dark:border-[#1a2355]/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#ee7c7e] via-[#1a2355] to-[#ee7c7e] opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative p-2 rounded-full border-2 border-dashed border-[#ee7c7e]/40 group-hover:border-[#ee7c7e] transition-all duration-500 group-hover:scale-105">
                                        <div className="w-40 h-40 rounded-full bg-[#1a2355]/5 dark:bg-[#1a2355]/20 overflow-hidden shadow-inner flex items-center justify-center text-[#1a2355]/20 group-hover:bg-[#ee7c7e]/10 transition-all duration-500 relative border border-[#1a2355]/30">
                                            {rector.image ? (
                                                <Image
                                                    src={rector.image}
                                                    alt={rector.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <PersonIcon sx={{ fontSize: 80 }} />
                                            )}
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#ee7c7e] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-800">
                                            <VerifiedIcon sx={{ fontSize: 20 }} />
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="font-black text-[#1a2355] dark:text-white text-xl leading-tight group-hover:text-[#ee7c7e] transition-colors duration-300">
                                                {rector.name}
                                            </h3>
                                            <div className="inline-block px-4 py-1.5 rounded-full bg-[#1a2355]/5 dark:bg-white/5 border border-[#1a2355]/30 dark:border-white/10 text-[#1a2355] dark:text-white/70 text-[10px] font-black uppercase tracking-widest">
                                                {rector.tenure}
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-500 font-medium">
                                            {rector.bio}
                                        </p>
                                    </div>

                                    <div className="w-full pt-6 border-t border-[#1a2355]/30 dark:border-white/5">
                                        <div className="flex items-center justify-center gap-2 text-[#1a2355] dark:text-white/60 font-black text-xs uppercase tracking-widest">
                                            <HistoryIcon sx={{ fontSize: 16, color: "#ee7c7e" }} />
                                            {lang === "az" ? "Rektorluq dövrü" : "Tenure Period"}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="pb-24"></div>
        </main>
    );
}
