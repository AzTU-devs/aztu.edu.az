export interface NavItem {
    title: string;
    slug: string;
    description: string;
    content: string;
}

export interface NavSection {
    key: string;
    label: string;
    basePath: string;
    items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
    {
        key: "haqqimizda",
        label: "HAQQIMIZDA",
        basePath: "/haqqimizda",
        items: [
            {
                title: "Universitetin tarixi",
                slug: "universitetin-tarixi",
                description: "Azərbaycan Texniki Universitetinin yaranması və inkişaf tarixi.",
                content: "Azərbaycan Texniki Universiteti (AzTU) 1950-ci ildə Bakı Politexnik İnstitutu adı ilə əsası qoyulmuş, 1991-ci ildən bu adla fəaliyyət göstərir. Universitet 70 ildən artıq ərzində mühəndis kadrlar hazırlayır.",
            },
            {
                title: "İntizam Komissiyası",
                slug: "intizam-komissiyasi",
                description: "Universitetdə intizam qaydalarını tənzimləyən komissiya haqqında məlumat.",
                content: "İntizam Komissiyası universitetin daxili qaydalarına əməl olunmasına nəzarət edir, tələbə və əməkdaşlar arasında münasibətləri tənzimləyir.",
            },
            {
                title: "Fəxri doktorlarımız",
                slug: "fexri-doktorlarimiz",
                description: "AzTU-nun fəxri doktor unvanı verdiyi tanınmış şəxsiyyətlər.",
                content: "Azərbaycan Texniki Universiteti elm və texnologiyaya töhfə vermiş görkəmli şəxsiyyətlərə fəxri doktor unvanı verir.",
            },
            {
                title: "Sabiq rektorlarımız",
                slug: "sabiq-rektorlarimiz",
                description: "Universitetə rəhbərlik etmiş keçmiş rektorların siyahısı.",
                content: "Azərbaycan Texniki Universitetinin tarixi boyunca rəhbərlik etmiş rektorlar universiteti bugünkü səviyyəyə çatdırmışlar.",
            },
            {
                title: "Şuralar",
                slug: "suralar",
                description: "Universiteti idarə edən müxtəlif şuralar haqqında məlumat.",
                content: "AzTU-nun idarəetmə strukturunda Elmi Şura, Akademik Şura, Müşahidə Şurası və digər şuralar fəaliyyət göstərir.",
            },
            {
                title: "Rektorun müraciəti",
                slug: "rektorun-muraciyeti",
                description: "Rektor tərəfindən tələbə, qəbulçu və tərəfdaşlara müraciət.",
                content: "Hörmətli tələbələr, qəbulçular və tərəfdaşlar! Azərbaycan Texniki Universiteti olaraq sizi müasir texnoloji biliklərlə silahlandırmaq missiyasında davamlı irəliləyirik.",
            },
            {
                title: "Elmi şuranın qərarları",
                slug: "elmi-suranin-qararlari",
                description: "Elmi Şuranın sonuncu iclaslarında qəbul edilmiş qərarlar.",
                content: "Elmi Şuranın qərarları universitətin akademik siyasətini, tədris planlarını və elmi istiqamətlərini müəyyənləşdirir.",
            },
            {
                title: "Fəxri məzunlarımız",
                slug: "fexri-mezunlarimiz",
                description: "AzTU-nu bitirmiş və ölkəyə böyük töhfə vermiş məzunlar.",
                content: "Onilliklər ərzində AzTU-nun on minlərlə məzunu Azərbaycanda və dünyada uğurlu karyera qurmuş, ölkə iqtisadiyyatına və elminə böyük töhfələr vermişlər.",
            },
            {
                title: "Qəhrəmanlarımız",
                slug: "qehremanlarimiz",
                description: "AzTU ilə bağlı Vətən müharibəsi şəhidləri və qəhrəmanlar.",
                content: "Azərbaycan Texniki Universitetinin bir sıra məzun və tələbələri Vətən müharibəsində igidliklə vuruşmuş, ölkəmizin ərazi bütövlüyü uğrunda canlarını fəda etmişlər.",
            },
            {
                title: "Kampus",
                slug: "kampus",
                description: "AzTU kampusunun infrastrukturu, binalar və imkanlar haqqında.",
                content: "AzTU kampusu müasir tədris korpusları, laboratoriyalar, idman qurğuları, yataqxanalar və istirahət zonaları ilə tam təchiz edilmişdir.",
            },
        ],
    },
    {
        key: "struktur",
        label: "STRUKTUR",
        basePath: "/struktur",
        items: [
            {
                title: "Rektorat",
                slug: "rektorat",
                description: "Universitetin rəhbər heyəti haqqında məlumat.",
                content: "Rektorat AzTU-nun strateji idarəetməsini həyata keçirir. Rektor, prorektorlar və katiblik heyətindən ibarətdir.",
            },
            {
                title: "Dekanlar şurası",
                slug: "dekanlar-surasi",
                description: "Fakültə dekanlarından ibarət məşvərət orqanı.",
                content: "Dekanlar Şurası hər fakültənin dekanından ibarət olub akademik məsələləri müzakirə edir və qərarlar qəbul edir.",
            },
            {
                title: "Kafedra rəhbərləri",
                slug: "kafedra-rehberleri",
                description: "Bütün kafedraların müdirləri haqqında məlumat.",
                content: "Hər kafedra öz sahəsinin mütəxəssisi olan müdir tərəfindən idarə edilir. Kafedra müdirləri tədris və tədqiqat fəaliyyətlərini koordinasiya edir.",
            },
            {
                title: "İnzibati heyət",
                slug: "inzibati-heyat",
                description: "Universiteti inzibati cəhətdən idarə edən heyət.",
                content: "İnzibati heyət universitetin maliyyə, təsərrüfat, insan resursları və digər inzibati funksiyalarını idarə edir.",
            },
            {
                title: "Elmi şura",
                slug: "elmi-sura",
                description: "Universitetin ali kollegial idarəetmə orqanı.",
                content: "Elmi Şura AzTU-nun ən ali kollegial orqanıdır. Tədris planları, elmi istiqamətlər və strateji qərarlar Elmi Şurada müzakirə edilir.",
            },
            {
                title: "Müşahidə şurası",
                slug: "musahide-surasi",
                description: "Universitetin fəaliyyətinə nəzarət edən ictimai orqan.",
                content: "Müşahidə Şurası universitetin şəffaflığını və hesabatlılığını təmin edir, maliyyə və idarəetmə məsələlərini müstəqil nəzarət altında saxlayır.",
            },
            {
                title: "Fakültələr",
                slug: "fakulteler",
                description: "AzTU-nun bütün fakültələri haqqında icmal.",
                content: "AzTU bir neçə ixtisaslaşmış fakültədən ibarətdir: İnformasiya Texnologiyaları, Mühəndislik, Enerji, Memarlıq və s.",
            },
            {
                title: "Kafedralar",
                slug: "kafedralar",
                description: "Universitetin bütün kafedraları haqqında məlumat.",
                content: "AzTU-da 50-dən çox kafedra fəaliyyət göstərir. Hər kafedra öz ixtisas sahəsinin tədris və tədqiqat işlərini aparır.",
            },
            {
                title: "Tədqiqat mərkəzləri",
                slug: "tedqiqat-merkezleri",
                description: "Universitetin tədqiqat və innovasiya mərkəzləri.",
                content: "AzTU-da Süni İntellekt, Dayanıqlı Enerji, Robototexnika və digər sahələrdə ixtisaslaşmış tədqiqat mərkəzləri fəaliyyət göstərir.",
            },
            {
                title: "Xidmətlər",
                slug: "xidmetler",
                description: "Tələbə və əməkdaşlara göstərilən xidmətlər.",
                content: "AzTU kitabxana, psixoloji dəstək, karyera mərkəzi, sağlamlıq məntəqəsi və digər xidmətlər təklif edir.",
            },
        ],
    },
    {
        key: "tehsil",
        label: "TƏHSİL",
        basePath: "/tehsil",
        items: [
            {
                title: "Bakalavr proqramları",
                slug: "bakalavr-proqramlari",
                description: "Bakalavriat səviyyəsindəki bütün ixtisaslar.",
                content: "AzTU 30-dan çox bakalavr ixtisası üzrə 4 illik proqramlar təklif edir. Proqramlar müasir mühəndislik standartlarına uyğun qurulmuşdur.",
            },
            {
                title: "Magistr proqramları",
                slug: "magistr-proqramlari",
                description: "Magistratura səviyyəsindəki ixtisaslar.",
                content: "Magistratura proqramları 2 il davam edir və dərin elmi-tədqiqat bilikləri verir. Proqramlar Azərbaycan, Rusiya və İngilis dillərində aparılır.",
            },
            {
                title: "Doktorantura",
                slug: "doktorantura",
                description: "PhD və elmlər doktoru proqramları.",
                content: "AzTU doktorantura proqramları müxtəlif elm sahələri üzrə yüksək ixtisaslı tədqiqatçıların hazırlanmasına yönəlmişdir.",
            },
            {
                title: "Qiyabi/distant təhsil",
                slug: "qiyabi-distant-tehsil",
                description: "Distant və qiyabi formatda təhsil imkanları.",
                content: "AzTU həm qiyabi, həm də distant formatda bir sıra proqramlar təklif edir. Bu format işçi tələbələrə rahatlıq yaradır.",
            },
            {
                title: "Tədris planları",
                slug: "tedris-planlari",
                description: "Bütün proqramların rəsmi tədris planları.",
                content: "Hər proqramın tədris planı ECTS kreditlərə uyğun hazırlanmış olub icbari, seçmə fənnlər və praktika bloklarını əhatə edir.",
            },
            {
                title: "Elektron resurslar",
                slug: "elektron-resurslar",
                description: "Elektron kitabxana, e-jurnal və digər rəqəmsal resurslar.",
                content: "Tələbələrimiz 20,000-dən çox elektron kitab, beynəlxalq elmi jurnallara çıxış və rəqəmsal tədris platformalarından istifadə edə bilər.",
            },
            {
                title: "Tələbə qəbulu",
                slug: "telebe-qebulu",
                description: "Qəbul prosesi, şərtlər və müraciət qaydaları.",
                content: "AzTU-ya qəbul Dövlət Tələbə Qəbulu Komissiyası vasitəsilə həyata keçirilir. Xarici tələbələr birbaşa müraciət edə bilər.",
            },
            {
                title: "Akademik təqvim",
                slug: "akademik-teqvim",
                description: "Tədris ili, semestrlər, tətil və imtahan tarixləri.",
                content: "Akademik il sentyabrdan başlayır. Payız semestri sentyabr-yanvar, yaz semestri fevral-iyun aylarını əhatə edir.",
            },
            {
                title: "İmtahan cədvəli",
                slug: "imtahan-cedveli",
                description: "Semestr sonu imtahanlarının cədvəli.",
                content: "İmtahan cədvəli hər semestr sonunda dekanat tərəfindən elan edilir. Tələbələr imtahan tarixlərini elektron portal üzərindən izləyə bilərlər.",
            },
            {
                title: "Diplom əlavəsi",
                slug: "diplom-elavesi",
                description: "Avropa standartlarına uyğun diplom əlavəsi haqqında məlumat.",
                content: "AzTU məzunlarına Avropa Diplom Əlavəsi (Diploma Supplement) verilir. Bu sənəd diplomunun beynəlxalq tanınmasına kömək edir.",
            },
        ],
    },
    {
        key: "tedqiqat",
        label: "TƏDQİQAT",
        basePath: "/tedqiqat",
        items: [
            {
                title: "Elmi mərkəzlər",
                slug: "elmi-merkezler",
                description: "AzTU-nun fəaliyyət göstərən elmi tədqiqat mərkəzləri.",
                content: "Universitetdə Süni İntellekt, Dayanıqlı Enerji, Robototexnika, Kibertəhlükəsizlik və digər sahələrdə 15-dən çox tədqiqat mərkəzi fəaliyyət göstərir.",
            },
            {
                title: "Tədqiqat laboratoriyaları",
                slug: "tedqiqat-laboratoriyalari",
                description: "Müasir avadanlıqlarla təchiz edilmiş laboratoriyalar.",
                content: "AzTU-nun 80-dən çox müasir tədqiqat laboratoriyası var. Bu laboratoriyalar həm tələbə praktikası, həm də elmi tədqiqat üçün istifadə olunur.",
            },
            {
                title: "Elmi jurnallar",
                slug: "elmi-jurnallar",
                description: "AzTU tərəfindən nəşr olunan elmi jurnallar.",
                content: "AzTU bir neçə peer-reviewed elmi jurnal nəşr edir. Bu jurnallar mühəndislik, texnologiya və tətbiqi elmlər sahəsindəki tədqiqatları əhatə edir.",
            },
            {
                title: "Aktiv layihələr",
                slug: "aktiv-layiheler",
                description: "Cari dövrdə icra edilən elmi tədqiqat layihələri.",
                content: "AzTU hazırda 40-dan çox yerli və beynəlxalq elmi-tədqiqat layihəsini icra edir. Layihələr dövlət, sənaye və beynəlxalq qrantlar çərçivəsində maliyyələşdirilir.",
            },
            {
                title: "Patentlər",
                slug: "patentler",
                description: "AzTU tərəfindən qeydiyyata alınmış ixtiraclar.",
                content: "AzTU-nun alimləri son 10 ildə 200-dən çox patent almışlar. Patentlər texnologiya, mühəndislik və tətbiqi elmlər sahəsini əhatə edir.",
            },
            {
                title: "Elmi konfranslar",
                slug: "elmi-konfranslar",
                description: "AzTU-nun ev sahibliyi etdiyi elmi tədbirlər.",
                content: "AzTU hər il beynəlxalq alimləri bir araya gətirən bir neçə elmi konfrans keçirir. Konfransların materialları elmi jurnallarda nəşr edilir.",
            },
            {
                title: "Əqli mülkiyyət",
                slug: "eqli-mulkiyyet",
                description: "Universitetin əqli mülkiyyət siyasəti.",
                content: "AzTU öz əməkdaş və tələbələrinin yaratdığı intellektual məhsulları qorumaq üçün əqli mülkiyyət siyasəti tətbiq edir.",
            },
            {
                title: "Sənaye tərəfdaşları",
                slug: "senaye-teredaslari",
                description: "Birgə tədqiqat üçün sənaye tərəfdaşları.",
                content: "AzTU SOCAR, Azərenerji, Azərsu, PASHA Holding və digər aparıcı şirkətlərlə tərəfdaşlıq sazişləri bağlamışdır.",
            },
            {
                title: "Qrantlar",
                slug: "qrantlar",
                description: "Elmi tədqiqat üçün qrant proqramları.",
                content: "AzTU əməkdaşları SOCAR, ANAS, Horizon Europe, NATO STI proqramları çərçivəsində qrant maliyyəsi alır.",
            },
            {
                title: "Elmi nəticələr",
                slug: "elmi-neticeler",
                description: "Son illərdə əldə edilmiş əsas elmi nailiyyətlər.",
                content: "AzTU alimləri hər il Scopus və Web of Science indeksli jurnallarda 300-dən çox məqalə nəşr edir.",
            },
        ],
    },
    {
        key: "sosial",
        label: "SOSİAL",
        basePath: "/sosial",
        items: [
            {
                title: "Tələbə həyatı",
                slug: "telebe-heyati",
                description: "Kampusdə tələbə həyatı haqqında tam məlumat.",
                content: "AzTU-da tələbə həyatı dərsdən kənar tədbirlərlə, klub fəaliyyəti, idman yarışmaları və mədəni proqramlarla zəngindir.",
            },
            {
                title: "Yataqxanalar",
                slug: "yataqxanalar",
                description: "Tələbə yataqxanaları, şərtlər və yerləşdirmə qaydaları.",
                content: "AzTU kampusunda 2000-dən çox tələbəni yerləşdirə bilən müasir yataqxanalar mövcuddur. Yataqxanalarda internet, yemək və ərzaq xidmətləri var.",
            },
            {
                title: "İdman kompleksi",
                slug: "idman-kompleksi",
                description: "Universitetin idman qurğuları və seksiyaları.",
                content: "AzTU idman kompleksi futbol, basketbol, voleybol, üzgüçülük hovuzu, trenajor zalı və tennis kortunu əhatə edir.",
            },
            {
                title: "Mədəni tədbirlər",
                slug: "medeni-tedbirler",
                description: "Universitetdə mütəmadi keçirilən mədəni-kütləvi tədbirlər.",
                content: "Konsertlər, teatr tamaşaları, mədəniyyət festivalları, rəsm sərgiləri – AzTU kampusu canlı mədəni həyat mərkəzidir.",
            },
            {
                title: "Tələbə klubları",
                slug: "telebe-klublari",
                description: "Universitetdə fəaliyyət göstərən tələbə klubları.",
                content: "AzTU-da robotika, proqramlaşdırma, mübahisə, musiqı, rəqs, könüllülük və s. istiqamətlərə aid 20-dən çox tələbə klubu var.",
            },
            {
                title: "Psixoloji dəstək",
                slug: "psixoloji-destey",
                description: "Tələbələrə göstərilən psixoloji və sosial dəstək xidmətləri.",
                content: "AzTU-nun Psixoloji Dəstək Mərkəzi tələbələrə stres idarəetməsi, motivasiya, karyera planlaması üzrə pulsuz məsləhət verir.",
            },
            {
                title: "Yemək xidməti",
                slug: "yemek-xidmeti",
                description: "Kampusdəki yemək xidmətləri haqqında məlumat.",
                content: "Universitetdə 3 yemək zalı, kafeteri və kafeteria fəaliyyət göstərir. Tələbə kartı ilə endirimli yemək almaq mümkündür.",
            },
            {
                title: "Tələbə ittifaqı",
                slug: "telebe-ittifaqi",
                description: "Tələbə özünüidarəetmə orqanı haqqında.",
                content: "Tələbə İttifaqı tələbələrin hüquqlarını qoruyur, ümumi həyatlarını təşkil edir və rektoratla əlaqə körpüsü rolunu oynayır.",
            },
            {
                title: "Sağlamlıq xidmətləri",
                slug: "saglamliq-xidmetleri",
                description: "Tələbə sağlamlığını dəstəkləyən tibb məntəqəsi.",
                content: "Kampusdə tibb məntəqəsi fəaliyyət göstərir. Tələbələr pulsuz ilkin tibbi yardım, nevropatoloq və ümumi həkim xidmətlərindən faydalana bilər.",
            },
            {
                title: "Sosial yardım",
                slug: "sosial-yardim",
                description: "Ehtiyaclı tələbələrə verilən maddi dəstəklər.",
                content: "AzTU kasıb ailələrdən gələn tələbələrə stipendiya, yataqxana güzəşti, yemək talonu və kitab yardımı şəklində sosial dəstək göstərir.",
            },
        ],
    },
    {
        key: "beynelxalq",
        label: "BEYNƏLXALQ",
        basePath: "/beynelxalq",
        items: [
            {
                title: "Beynəlxalq əlaqələr",
                slug: "beynelxalq-elaqeler",
                description: "Dünya universitetləri ilə əməkdaşlıq sazişləri.",
                content: "AzTU 60-dan çox ölkədəki universitetlər və təşkilatlarla ikitərəfli əməkdaşlıq sazişi bağlamışdır.",
            },
            {
                title: "Erasmus+ proqramı",
                slug: "erasmus-plus",
                description: "Avropa İttifaqının Erasmus+ mübadilə proqramı.",
                content: "AzTU Erasmus+ proqramı çərçivəsində tələbə və müəllimlərin Avropa universitetlərinə göndərilməsini və qəbulunu həyata keçirir.",
            },
            {
                title: "Tərəfdaş universitetlər",
                slug: "teredas-universitetler",
                description: "AzTU-nun əməkdaşlıq etdiyi xarici universitetlər.",
                content: "Türkiyə, Rusiya, Almaniya, Polşa, Fransa, Çin, Hindistan, Qazaxıstan, Gürcüstan və digər ölkələrdəki universitetlər AzTU-nun tərəfdaşları sırasındadır.",
            },
            {
                title: "Xarici tələbələr",
                slug: "xarici-telebeler",
                description: "AzTU-da təhsil alan xarici ölkə tələbələri.",
                content: "AzTU-da 30-dan çox ölkədən 500-dən çox xarici tələbə təhsil alır. Xarici tələbələrə qəbul, yaşayış, dil kursları üzrə dəstək göstərilir.",
            },
            {
                title: "Mübadilə proqramları",
                slug: "mubadile-proqramlari",
                description: "Tələbə və müəllim mübadilə proqramları.",
                content: "Bir semestr xaricdə oxumaq istəyən tələbələr mübadilə proqramlarına müraciət edə bilərlər. Bu proqramlar AzTU kreditləri ilə tanınır.",
            },
            {
                title: "Beynəlxalq layihələr",
                slug: "beynelxalq-layiheler",
                description: "Beynəlxalq maliyyəli tədqiqat layihələri.",
                content: "AzTU Horizon Europe, TEMPUS, NATO SPS, World Bank və digər beynəlxalq proqramlar çərçivəsində 20-dən çox layihə icra edir.",
            },
            {
                title: "Xarici dil mərkəzi",
                slug: "xarici-dil-merkezi",
                description: "Xarici dillərin öyrənilməsi mərkəzi.",
                content: "Xarici Dil Mərkəzi İngilis, Alman, Fransız, Çin, Ərəb dilləri üzrə kursllar, IELTS/TOEFL hazırlığı və beynəlxalq sertifikat proqramları təklif edir.",
            },
            {
                title: "Viza köməyi",
                slug: "viza-komeyyi",
                description: "Xarici tələbələrə visa və sənədləşdirmə köməyi.",
                content: "AzTU Beynəlxalq Əlaqələr İdarəsi xarici tələbələrə Azərbaycana gəliş, qalma icazəsi, sənəd hazırlanması məsələlərində köməklik göstərir.",
            },
            {
                title: "Beynəlxalq sertifikatlar",
                slug: "beynelxalq-sertifikatlar",
                description: "Beynəlxalq tanınan sertifikat proqramları.",
                content: "AzTU müxtəlif beynəlxalq akkreditasiya qurumları ilə əməkdaşlıq edərək tələbələrə beynəlxalq sertifikatlar qazanmaq imkanı verir.",
            },
            {
                title: "Qlobal şəbəkə",
                slug: "qlobal-sebeke",
                description: "AzTU-nun qlobal akademik şəbəkəsi.",
                content: "AzTU UNESCO, EUA (Avropa Universitetlər Assosiasiyası), IAUP, Black Sea Universities Network kimi beynəlxalq qurumların üzvüdür.",
            },
        ],
    },
    {
        key: "sustainability",
        label: "SUSTAINABILITY",
        basePath: "/sustainability",
        items: [
            {
                title: "Yaşıl kampus",
                slug: "yasil-kampus",
                description: "AzTU kampusunun ekoloji cəhətdən davamlı inkişafı.",
                content: "AzTU 2030-cu ilə qədər tam yaşıl kampusa çevrilmə məqsədi güdür. Günəş panelləri, yaşıl örtüklü damlar və enerji effektiv binalar bu planın bir hissəsidir.",
            },
            {
                title: "Enerji qənaəti",
                slug: "enerji-qenayeti",
                description: "Kampusdə enerji effektivliyi proqramları.",
                content: "AzTU 2020-ci ildən bəri enerji qənaəti proqramı həyata keçirir. Bu proqram sayəsində enerjinin istifadəsi 25% azaldılmışdır.",
            },
            {
                title: "Ekoloji tədbirlər",
                slug: "ekoloji-tedbirler",
                description: "Ətraf mühitin qorunmasına yönəlik kampus tədbirləri.",
                content: "İllik ağac əkimi aksiyaları, ekoloji maarifləndirmə tədbirləri, plastik istifadəsinin azaldılması proqramları AzTU-nun ekoloji siyasətinin bir hissəsidir.",
            },
            {
                title: "SDG məqsədlər",
                slug: "sdg-meqsedler",
                description: "BM-nin Dayanıqlı İnkişaf Məqsədlərinə töhfə.",
                content: "AzTU BMT-nin 17 Dayanıqlı İnkişaf Məqsədinə (SDG) töhfə verməyi öz strateji prioriteti hesab edir. Keyfiyyətli Təhsil (SDG 4) birinci prioritetdir.",
            },
            {
                title: "Tullantı idarəetməsi",
                slug: "tullantilar-idaresi",
                description: "Kampusdə tullantıların idarə edilməsi sistemi.",
                content: "AzTU kampusunda tullantılar növünə görə ayrılır. Elektron tullantılar, kağız, plastik və üzvi tullantılar ayrıca yığılır.",
            },
            {
                title: "Dayanıqlı tədqiqatlar",
                slug: "dayaniqli-tedqiqatlar",
                description: "Dayanıqlı inkişaf mövzusunda elmi tədqiqatlar.",
                content: "AzTU-da dayanıqlı enerji, su resursları, aqrotexnologiya, ekoloji mühəndislik üzrə tədqiqat qrupları fəaliyyət göstərir.",
            },
            {
                title: "Enerji mənbələri",
                slug: "enerji-menbeleri",
                description: "Kampusda istifadə olunan alternativ enerji mənbələri.",
                content: "Kampus binalarında günəş enerjisi panelləri, LED işıqlandırma sistemi və ağıllı istilik sistemi qurulmuşdur.",
            },
            {
                title: "Yaşıllıq planı",
                slug: "yasilliq-plani",
                description: "2030-cu il yaşıl kampus hədəflərinin planı.",
                content: "AzTU-nun 2030 Yaşıl Kampus Planı karbon neytral tədris mühiti yaratmağı, bərpa olunan enerjidən tam keçişi hədəfləyir.",
            },
            {
                title: "Hesabatlar",
                slug: "hesabatlar",
                description: "İllik dayanıqlılıq hesabatları.",
                content: "AzTU hər il dayanıqlılıq hesabatı nəşr edir. Hesabat enerji istehlakı, tullantı miqdarı, su istehlakı və karbon ayak izini əhatə edir.",
            },
            {
                title: "Tərəfdaşlıqlar",
                slug: "teredaşliqlar",
                description: "Dayanıqlı inkişaf sahəsindəki tərəfdaşlar.",
                content: "AzTU UNDP, UNEP, IRENA, Dünya Bankı, Avropa Yenidənqurma və İnkişaf Bankı ilə dayanıqlı inkişaf sahəsindəki əməkdaşlığını davam etdirir.",
            },
        ],
    },
    {
        key: "niye-aztu",
        label: "NİYƏ AzTU?",
        basePath: "/niye-aztu",
        items: [
            {
                title: "Üstünlüklərimiz",
                slug: "ustunluklerimiz",
                description: "AzTU-nu digər universitetlərdən fərqləndirən üstünlüklər.",
                content: "Güclü mühəndislik ənənəsi, müasir laboratoriyalar, beynəlxalq mübadilələr, yüksək məşğulluq nisbəti — AzTU seçiminin əsas səbəbləri.",
            },
            {
                title: "Reytinqlər",
                slug: "reytinqler",
                description: "Milli və beynəlxalq reytinqlərdə AzTU-nun mövqeyi.",
                content: "AzTU milli reytinqlərdə daim ilk yerlərdə qərar tutur. QS World University Rankings, THE Rankings kimi platformalarda da iştirak edir.",
            },
            {
                title: "Akkreditasiya",
                slug: "akkreditasiya",
                description: "Milli və beynəlxalq akkreditasiya statusları.",
                content: "AzTU Azərbaycan Respublikası Nazirlər Kabineti tərəfindən akkreditə edilmiş, bir sıra proqramlar beynəlxalq mühəndislik akkreditasiyası almışdır.",
            },
            {
                title: "Uğur hekayələri",
                slug: "ugur-hekayyleri",
                description: "AzTU məzunlarının uğur hekayələri.",
                content: "AzTU məzunları şirkətlərin baş direktorları, baş mühəndisləri, elm adamları və dövlət rəsmiləri kimi fərqli sahələrdə mühüm mövqelər tutmuşlar.",
            },
            {
                title: "Tələbə rəyləri",
                slug: "telebe-reyleri",
                description: "AzTU-da oxuyan tələbələrin rəy və fikirləri.",
                content: "Tələbələrimizin fikirləri, kampus həyatı, müəllimlərin keyfiyyəti və gələcək planları haqqında nə düşündüklərini öyrənin.",
            },
            {
                title: "Məşğulluq statistikası",
                slug: "mesqulluq-statistikasi",
                description: "Məzunların işə düzəlmə nisbəti və karyera statistikası.",
                content: "AzTU məzunlarının 85%-i bitirdikdən sonra 6 ay içərisində ixtisasları üzrə iş tapırlar. Ortalama maaş sahə ortalamasının üzərindədir.",
            },
            {
                title: "Müasir infrastruktur",
                slug: "muasir-infrastruktur",
                description: "Müasir tədris binaları, laboratoriyalar və imkanlar.",
                content: "2000-ci illərdən bəri tam yenilənmiş tədris korpusları, rəqəmsal sinifxanalar, ultra-sürətli internet və müasir tədqiqat avadanlıqları.",
            },
            {
                title: "Beynəlxalq tanınma",
                slug: "beynelxalq-taninma",
                description: "Dünyada AzTU-nun tanındığı qurum və platformalar.",
                content: "AzTU diplomunun tanındığı ölkə sayı 50-dən çoxdur. Məzunlar heç bir əlavə ərizə vermədən Avropada, Türkiyədə, Rusiyada işə düzələ bilir.",
            },
            {
                title: "Elmi nailiyyətlər",
                slug: "elmi-nailiyyetler",
                description: "Universitetin son illərdəki elmi uğurları.",
                content: "AzTU alimləri son 5 ildə 1500-dən çox elmi məqalə nəşr etmiş, 200-dən çox patent almış, 50-dən çox beynəlxalq layihədə iştirak etmişlər.",
            },
            {
                title: "Karyera dəstəyi",
                slug: "karyera-desteyyi",
                description: "Məzunlara karyera qurmaqda göstərilən dəstək.",
                content: "AzTU Karyera Mərkəzi iş elanları, CV hazırlama, müsahibə hazırlığı, networking tədbirləri və sənaye tərəfdaşları ilə görüşlər təşkil edir.",
            },
        ],
    },
    {
        key: "media",
        label: "MEDİA",
        basePath: "/media",
        items: [
            {
                title: "Xəbərlər",
                slug: "xeberler",
                description: "AzTU-dan ən son xəbərlər.",
                content: "Universitetin rəsmi xəbər səhifəsindən ən son hadisələri, elmi nailiyyətləri, tədbirləri izləyin.",
            },
            {
                title: "Press-relizlər",
                slug: "press-relizler",
                description: "Media üçün rəsmi press-relizlər.",
                content: "Jurnalistlər, bloggerlər və media nümayəndələri üçün AzTU-nun rəsmi press-relizləri, açıqlamaları və brifinq materialları.",
            },
            {
                title: "Foto qalereya",
                slug: "foto-qalereya",
                description: "Tədbirlərdən foto materiallar.",
                content: "Tədrisin, konfransların, kampus həyatının, mezuniyet mərasimlərinin foto arxivi.",
            },
            {
                title: "Video arxiv",
                slug: "video-arxiv",
                description: "AzTU-nun video çarxlarının arxivi.",
                content: "Universitetlə bağlı bütün video materiallar, reportajlar, sənədli filmlər bu arxivdə toplanmışdır.",
            },
            {
                title: "AzTU TV",
                slug: "aztu-tv",
                description: "Universitetin rəsmi video kanalı.",
                content: "AzTU TV-nin canlı yayımları, leksiyalar, görüşlər, tədbirlər haqqında videoları izləyin.",
            },
            {
                title: "Sosial media",
                slug: "sosial-media",
                description: "AzTU-nun rəsmi sosial media hesabları.",
                content: "Facebook, Instagram, LinkedIn, YouTube, Twitter/X platformalarında AzTU-nu izləyin, ən son yeniliklərdən xəbərdar olun.",
            },
            {
                title: "Elanlar",
                slug: "elanlar",
                description: "Tələbə və əməkdaşlara ünvanlanan rəsmi elanlar.",
                content: "Rəsmi elanlar, təkliflər, müsabiqə çağırışları və fərqləndiricilər burada paylaşılır.",
            },
            {
                title: "Tədbirlər",
                slug: "tedbirler",
                description: "Yaxın tədbirlərin tam siyahısı.",
                content: "Konfranslar, seminarlar, açıq dərslər, mədəni tədbirlər, idman yarışmaları — AzTU-nun yaxın tarixlərindəki tədbirlərini izləyin.",
            },
            {
                title: "Jurnallar",
                slug: "jurnallar",
                description: "Universitetin nəşr etdiyi jurnallar.",
                content: "AzTU-nun elmi və korporativ nəşrləri: Texniki Elmlər Jurnalı, Tələbə Bülleteni, İllik Hesabat və digər nəşrlər.",
            },
            {
                title: "Media üçün",
                slug: "media-ucun",
                description: "Jurnalistlər üçün əlaqə və material paketləri.",
                content: "Korporativ şəkillər, loqolar, media kitinin yüklənməsi, AzTU-nun PR şöbəsi ilə əlaqə məlumatları.",
            },
        ],
    },
];

export function getSectionByKey(key: string): NavSection | undefined {
    return NAV_SECTIONS.find((s) => s.key === key);
}

export function getItemBySlug(sectionKey: string, slug: string): NavItem | undefined {
    const section = getSectionByKey(sectionKey);
    return section?.items.find((i) => i.slug === slug);
}
