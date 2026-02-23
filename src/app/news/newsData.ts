export interface NewsItem {
    id: number;
    title: string;
    desc: string;
    body: string[];
    date: string;
    month: string;
    year: string;
    category: string;
    featured?: boolean;
    readTime: string;
    author: string;
    imageIndex: number;
    tags: string[];
}

export const allNews: NewsItem[] = [
    {
        id: 1,
        title: "Çankaya Universitetinin professoru AzTU-da seminar keçirib",
        desc: "Türkiyənin Çankaya Universitetinin professoru Buket Akkoyunlu Azərbaycan Texniki Universitetində (AzTU) Müasir təhsil standartlarında süni intellektin tətbiqləri mövzusunda seminar keçirib.",
        body: [
            "Türkiyənin Çankaya Universitetinin professoru Buket Akkoyunlu Azərbaycan Texniki Universitetində (AzTU) Müasir təhsil standartlarında süni intellektin tətbiqləri mövzusunda geniş seminar keçirib. Seminarda AzTU-nun professor-müəllim heyəti, tədqiqatçılar və tələbələr böyük maraqla iştirak edib.",
            "Professor Akkoyunlu süni intellektin müasir universitetlərdə tədris prosesinin keyfiyyətini artırmaq üçün necə istifadə oluna biləcəyini geniş şəkildə izah edib. O, adaptiv öyrənmə sistemlərini, fərdi tədris yanaşmalarını, həmçinin AI əsaslı qiymətləndirmə metodlarını praktik nümunələrlə nümayiş etdirib.",
            "Azərbaycan Texniki Universiteti beynəlxalq akademik əlaqələrin inkişafına xüsusi önəm verir. Bu növ seminarlar universitetin qlobal elmi mühitlə inteqrasiyasına ciddi töhfə verir. Tərəflər gələcək əməkdaşlıq imkanları, birgə tədqiqat layihələri və tələbə mübadiləsi proqramları üzrə də ətraflı fikir mübadiləsi aparıb.",
            "AzTU rektoru seminarın universitetin innovasiya mühitinin gücləndirilməsindəki əhəmiyyətini vurğulayaraq gələcəkdə də bu cür beynəlxalq tədbirlərin müntəzəm olaraq davam etdiriləcəyini bildirib. Rektorluq hər iki universitetin araşdırmacılarını birləşdirəcək ortaq tədqiqat layihəsinin başladılmasını da planlaşdırır.",
        ],
        date: "22",
        month: "Yanvar",
        year: "2025",
        category: "AzTU",
        featured: true,
        readTime: "4 dəq",
        author: "AzTU Mətbuat Xidməti",
        imageIndex: 1,
        tags: ["AzTU", "Seminar", "Süni İntellekt", "Beynəlxalq"],
    },
    {
        id: 2,
        title: "AzTU-da beynəlxalq konfrans keçirildi",
        desc: "Azərbaycan Texniki Universiteti müxtəlif ölkələrdən 200-dən çox alim və mütəxəssisi bir araya gətirən Mühəndislik Elmləri üzrə Beynəlxalq Konfransına ev sahibliyi etdi.",
        body: [
            "Azərbaycan Texniki Universiteti (AzTU) bu il də mühəndislik elmləri sahəsindəki ən mühüm beynəlxalq tədbirə ev sahibliyi etdi. Üç gün davam edən konfransda 35 ölkədən 200-dən çox alim, tədqiqatçı və sənaye nümayəndəsi iştirak edib.",
            "Konfransın əsas mövzuları arasında davamlı enerji, süni intellekt, smart şəhər texnologiyaları, biotibbi mühəndislik və rəqəmsal çevrilmə yer alıb. Hər bir sessiyada aparıcı tədqiqatçılar öz son işlərini təqdim etmiş, müzakirələr yüksək elmi səviyyədə keçirilmişdir.",
            "Konfrans çərçivəsində AzTU bir sıra xarici universitetlərlə memorandum imzalayıb. Bu sənədlər birgə tədqiqat layihələrinin həyata keçirilməsi, professor mübadiləsi və tələbə staj proqramlarını əhatə edir.",
            "Konfransın bağlanış mərasimində AzTU rektoru bu tədbirlərin universitetin dünya elminə inteqrasiyasındakı əhəmiyyətini vurğulayıb və növbəti il konfransın daha genişmiqyaslı keçiriləcəyini elan edib.",
        ],
        date: "18",
        month: "Yanvar",
        year: "2025",
        category: "Elm",
        readTime: "5 dəq",
        author: "Elm Şöbəsi",
        imageIndex: 2,
        tags: ["Konfrans", "Beynəlxalq", "Elm", "Mühəndislik"],
    },
    {
        id: 3,
        title: "Tələbələr robotika yarışmasında birincilik qazanıb",
        desc: "AzTU-nun tələbə komandası Bakıda keçirilən Milli Robotika Olimpiadasında birinci yerə layiq görülüb.",
        body: [
            "Azərbaycan Texniki Universitetinin Kompüter Mühəndisliyi fakultəsinin tələbələrindən ibarət komanda Bakıda keçirilən Milli Robotika Olimpiadasında birinci yeri qazanmağa müvəffəq olub. Komandanın işlənib hazırladığı robot tibbi yardım sahəsində istifadə üçün nəzərdə tutulmuşdur.",
            "Yarışmada 20 universitetin 80-dən çox komandası müxtəlif mürəkkəblikdə tapşırıqları yerinə yetirmək üçün rəqabət aparıb. AzTU komandası kompleks navigasiya, əşya tanıma və insan-robot əməkdaşlığı modullarını uğurla nümayiş etdirib.",
            "Komandanın rəhbəri, professor Elnur Əliyev qeyd edib ki, tələbələr bu robotu altı aylıq gərgin iş və araşdırmalar nəticəsində hazırlayıblar. Texnologiya öyrənmə qabiliyyəti, sensor sensorları birləşdirən mürəkkəb bir süni intellekt arxitekturasına əsaslanır.",
            "Qazanılmış birincilik trofeyini rektora təqdim edən komanda üzvləri universitetin növbəti il beynəlxalq robotika yarışmasında da iştirak etmək planlarını paylaşıb.",
        ],
        date: "15",
        month: "Yanvar",
        year: "2025",
        category: "Tələbə",
        readTime: "3 dəq",
        author: "Tələbə İşləri Departamenti",
        imageIndex: 3,
        tags: ["Robotika", "Tələbə", "Olimpiada", "Mühəndislik"],
    },
    {
        id: 4,
        title: "Yeni Süni İntellekt Tədqiqat Mərkəzi açıldı",
        desc: "AzTU rəsmi olaraq Süni İntellekt Tədqiqat Mərkəzini açdı. Mərkəz tənqidi düşüncə qabiliyyəti olan sistemlər üzərində araşdırmalar aparacaq.",
        body: [
            "Azərbaycan Texniki Universiteti keçirdiyi rəsmi açılış mərasiminin ardından Süni İntellekt Tədqiqat Mərkəzinin (SAIM) fəaliyyətə başladığını elan edib. Müasir avadanlıqla təchiz olunmuş mərkəz ölkənin ən güclü AI tədqiqat bazasına çevriləcək.",
            "Mərkəzdə maşın öyrənməsi, dərin öyrənmə, kompüter görmə, natural dil emalı və qarar qəbuletmə alqoritmlərini əhatə edən geniş tədqiqat proqramları həyata keçiriləcək. Bundan əlavə, sağlamlıq, enerji, kənd təsərrüfatı sahələrinin ehtiyaclarına yönəlmiş tətbiqi layihələr də planlaşdırılır.",
            "Mərkəzin direktoru dosent Günel Babayeva bildirib ki, SAIM gənc tədqiqatçılar üçün staj proqramları təşkil edəcək, həm də yerli şirkətlərlə birgə AI həlləri işləyib hazırlayacaq. Mərkəz eyni zamanda Avropa Birliyi tədqiqat fondlarına müraciət etməyi planlaşdırır.",
            "Açılış mərasimində iştirak edən Elm, Texnologiya və İnnovasiya Naziri mərkəzin Azərbaycanın rəqəmsal iqtisadiyyat strategiyası üçün strateji əhəmiyyətini vurğulayıb.",
        ],
        date: "10",
        month: "Yanvar",
        year: "2025",
        category: "Elm",
        readTime: "4 dəq",
        author: "Elm Şöbəsi",
        imageIndex: 4,
        tags: ["Süni İntellekt", "Tədqiqat", "Texnologiya", "İnnovasiya"],
    },
    {
        id: 5,
        title: "Sənaye ilə əməkdaşlıq müqaviləsi imzalandı",
        desc: "AzTU aparıcı texnologiya şirkəti ilə tələbələrə praktiki təlim imkanları yaratmaq məqsədilə strateji tərəfdaşlıq müqaviləsi bağladı.",
        body: [
            "Azərbaycan Texniki Universiteti Azərbaycanın aparıcı texnologiya şirkəti PAŞA Holding ilə strateji tərəfdaşlıq müqaviləsi imzalayıb. Müqavilə tələbələr üçün praktiki təlim, staj proqramları və iş yerinin yaradılmasını nəzərdə tutur.",
            "Sənəd çərçivəsində şirkətin mütəxəssisləri AzTU-da qonaq mühazirəçi kimi çıxış edəcək, tələbələr isə real iş mühitində layihələr üzərində çalışma imkanı əldə edəcəklər. Hər tədris ilindən 50 tələbə ödənişli staja cəlb olunacaq.",
            "Tərəfdaşlıq həm də birgə tədqiqat laboratoriyasının yaradılmasını, peşəkar sertifikasiya proqramlarının işlənib hazırlanmasını və innovasiya startaplarına dəstəyin təmin edilməsini əhatə edir.",
            "AzTU rektoru bu müqavilənin universitetin akademik tədris ilə sənaye tərəfindəki real ehtiyacları arasındakı körpünü möhkəmləndirəcəyini vurğulayıb.",
        ],
        date: "07",
        month: "Yanvar",
        year: "2025",
        category: "Əməkdaşlıq",
        readTime: "3 dəq",
        author: "AzTU Mətbuat Xidməti",
        imageIndex: 5,
        tags: ["Əməkdaşlıq", "Sənaye", "Staj", "Tərəfdaşlıq"],
    },
    {
        id: 6,
        title: "Bakalavr proqramlarına qəbul başladı",
        desc: "AzTU 2025-2026 tədris ili üçün bakalavr proqramlarına qəbul kampaniyasını rəsmi olaraq başlatdı. Müraciət son tarixi — 31 mart 2025.",
        body: [
            "Azərbaycan Texniki Universiteti 2025-2026 tədris ili üçün bakalavr proqramlarına qəbul prosesini rəsmi olaraq başlatdığını elan edib. Bu il universitetdə 28 ixtisas üzrə qəbul aparılacaq.",
            "Yeniliklər arasında tam onlayn müraciət portalı, sənəd yükləmə sistemi və qəbul statusunun real vaxtda izlənilməsi imkanları diqqəti çəkir. Avropa standartlarına uyğun hazırlanmış yeni mühəndislik proqramları da bu tədris ilindən etibarən tətbiq olunacaq.",
            "Qəbul komissiyasının rəhbəri bildirib ki, bu il Mühəndislik Kimyası, Ağıllı Sistemlər Mühəndisliyi və Kibertəhlükəsizlik ixtisasları üzrə yeni qəbul kvotaları müəyyənləşdirilib. Güclü abituriyentlər üçün tam təqaüd proqramı da təklif olunur.",
            "Ərizə vermək istəyənlər universitetin rəsmi saytından ətraflı məlumat ala, onlayn forma doldura, həmçinin sənəd yükləyə bilərlər. Son müraciət tarixi 31 mart 2025-ci ildir.",
        ],
        date: "03",
        month: "Yanvar",
        year: "2025",
        category: "Qəbul",
        readTime: "3 dəq",
        author: "Qəbul Komissiyası",
        imageIndex: 1,
        tags: ["Qəbul", "Bakalavr", "Tədris", "2025"],
    },
    {
        id: 7,
        title: "Professorlar heyəti beynəlxalq mükafat aldı",
        desc: "AzTU-nun elmi heyətindən iki professor dayanıqlı mühəndislik sahəsindəki fərqli töhfələrinə görə Avropa Texniki Elmlər Akademiyasının mükafatına layiq görülüb.",
        body: [
            "Azərbaycan Texniki Universitetinin iki professoru — Professor Anar Hüseynov (Enerji Mühəndisliyi) və dosent Könül Məmmədova (Ətraf Mühit Mühəndisliyi) — Avropa Texniki Elmlər Akademiyasının (EATA) illik mükafatına layiq görülüblər.",
            "Mükafat Vyana şəhərində keçirilən böyük beynəlxalq mərasimdə təqdim olunub. Professor Hüseynov günəş enerjisini birbaşa hidrogen yanacağına çevirən yeni bir katalitik sistem üzərindəki əsərindən ötrü, dosent Məmmədova isə sənaye prosseslərindən yaranan karbon dioksid emissiyalarını qapadığı innovativ bir karbon tutma texnologiyası üçün mükafata layiq görülüblər.",
            "Tədqiqatçılar yeddi ildir AzTU-nun Tətbiqi Kimya departamentinin dəstəyi ilə bu sahədə işlərini davam etdirirlər. Onların işi beynəlxalq elmi jurnallarda 40-dan çox məqalə ilə nəticələnib.",
            "AzTU rektoru bu nailiyyətin universitetin beynəlxalq reytinqinə müsbət təsir edəcəyini vurğulayıb və hər iki tədqiqatçını universitetin adından təbrik edib.",
        ],
        date: "28",
        month: "Dekabr",
        year: "2024",
        category: "AzTU",
        readTime: "4 dəq",
        author: "AzTU Mətbuat Xidməti",
        imageIndex: 2,
        tags: ["Mükafat", "AzTU", "Beynəlxalq", "Elm"],
    },
    {
        id: 8,
        title: "Kampus Yenilənmə Layihəsi başladı",
        desc: "Mövcud infrastrukturu modernləşdirmək üçün nəzərdə tutulmuş genişmiqyaslı kampus yeniləmə layihəsi rəsmi olaraq icraya başlanıldı.",
        body: [
            "Azərbaycan Texniki Universiteti (AzTU) kampusunun müasirləşdirilməsinə yönəlmiş 15 milyon manatlıq genişmiqyaslı yenilənmə layihəsini rəsmi olaraq başlatdı. Layihə 3 il ərzində həyata keçiriləcək.",
            "Birinci mərhələdə baş bina, mühəndislik laboratoriyaları korpusu və tələbə mərkəzinin tam yenidən qurulması planlaşdırılır. Renovasiya edilmiş fəzalarda müasir tədris otaqları, birgə iş sahələri, AI avadanlıqları olan lablaboratoriyalar və yüksəzsürətli internetlə təchiz olunmuş kitabxana yer alacaq.",
            "İkinci mərhələdə istirahət sahələri, idman infrastrukturu, yaşıl həyət düzəldilməsi və dayanıqlı enerji sistemlərinin quraşdırılması nəzərdə tutulur. Bütün tikililər günəş panelləri, ağıllı istilik sistemləri və yağış suyu toplama sistemləri ilə təchiz olunacaq.",
            "Layihə müvafiq icra hakimiyyəti orqanlarının, özəl sektorun dəstəyi ilə həyata keçiriləcək. Yenilənmə zamanı tədris prosesi fasiləsiz davam edəcək.",
        ],
        date: "24",
        month: "Dekabr",
        year: "2024",
        category: "AzTU",
        readTime: "4 dəq",
        author: "AzTU Mətbuat Xidməti",
        imageIndex: 3,
        tags: ["Kampus", "İnfrastruktur", "Yenilənmə", "AzTU"],
    },
    {
        id: 9,
        title: "Erasmus+ mübadiləsi proqramı genişləndirildi",
        desc: "AzTU Erasmus+ şəbəkəsinə 5 yeni Avropa universiteti əlavə etdi. Bu genişlənmə tələbələrə daha çox xarici mübadilə imkanı yaradır.",
        body: [
            "Azərbaycan Texniki Universiteti (AzTU) Erasmus+ proqramı çərçivəsində əməkdaşlıq şəbəkəsini 5 yeni Avropa universiteti ilə genişləndirib. Yeni tərəfdaşlar arasında Avropa, Skandinaviya ölkələrindən aparıcı texniki universitetlər yer alır.",
            "Bu genişlənmə nəticəsində tələbələr Almaniya, Hollandiya, İsveçrə, Finlandiya və Polşadakı tərəfdaş universitetlərə bir semestr müddətinə gedə biləcəklər. Proqram həm bakalavr, həm magistr, həm də doktorantura tələbələrini əhatə edir.",
            "Beynəlxalq əlaqələr üzrə prorektor qeyd edib ki, mübadilə proqramları tələbələrin texniki bilikləri ilə yanaşı, qlobal perspektiv, dil bacarıqları və mədəniyyətlərarası kommunikasiya bacarıqlarını da inkişaf etdirir.",
            "Erasmus+ proqramı stipendiyaları seyahət xərcləri, yaşayış haqqı və yaşayış müavinəti daxil olmaqla tam maliyyə dəstəyi təklif edir. İstəkli tələbələr növbəti tədris ili üçün müraciətlərini fevral 2025-ci il tarixinə qədər təqdim edə bilərlər.",
        ],
        date: "20",
        month: "Dekabr",
        year: "2024",
        category: "Əməkdaşlıq",
        readTime: "4 dəq",
        author: "Beynəlxalq Əlaqələr Şöbəsi",
        imageIndex: 4,
        tags: ["Erasmus+", "Mübadilə", "Avropa", "Tələbə"],
    },
];

export const categories = ["Hamısı", "AzTU", "Elm", "Tələbə", "Əməkdaşlıq", "Qəbul"];

export const categoryColors: Record<string, string> = {
    AzTU: "bg-[#1a2355]",
    Elm: "bg-emerald-500",
    Tələbə: "bg-violet-500",
    Əməkdaşlıq: "bg-amber-500",
    Qəbul: "bg-[#ee7c7e]",
};
