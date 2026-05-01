import { API_BASE_URL } from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";
import type {
    ResearchInstituteDetail,
    ResearchInstituteSummary,
} from "@/types/researchInstitute";
import { slugify } from "@/util/slugify";

export function getImageUrl(path?: string | null): string | undefined {
    if (!path) return undefined;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const base = (API_BASE_URL ?? "").replace(/\/$/, "");
    const cleanPath = path.replace(/^\//, "");
    if (cleanPath.startsWith("static/") || cleanPath.startsWith("media/")) {
        return `${base}/${cleanPath}`;
    }
    return `${base}/static/${cleanPath}`;
}

const RI_MEDIA = "media/prod/research_insitutes";

interface StaticInstituteRecord {
    az: ResearchInstituteDetail;
    en: ResearchInstituteDetail;
}

const NOW = new Date().toISOString();

const STATIC_INSTITUTES: StaticInstituteRecord[] = [
    {
        az: {
            id: 1,
            institute_code: "biotib",
            image_url: `${RI_MEDIA}/biotib/logo.jpg`,
            name: "Biotibbi Mühəndislik İnstitutu",
            about:
                "<p>Azərbaycan Texniki Universitetinin Biotibbi Mühəndislik İnstitutu 2024-cü ilin noyabr ayında yaradılmışdır və biotibbi mühəndislik ilə süni intellektin kəsişməsində innovasiyaların inkişafına yönəlmiş çoxşaxəli tədqiqat mərkəzi kimi fəaliyyət göstərir.</p>" +
                "<p>İnstitut müasir səhiyyə sahəsində mövcud çağırışların həlli üçün elmi əsaslandırılmış və texnoloji baxımdan qabaqcıl həllərin hazırlanmasına fokuslanır. Tədqiqat istiqamətlərinə biotibbi siqnalların emalı, xəstəliklərin diaqnostikası və proqnozlaşdırılması, süni intellekt əsaslı klinik qərar dəstək sistemləri, eləcə də farmakokinetik və hesablama modellərinin hazırlanması daxildir.</p>" +
                "<p>Mühəndislik prinsiplərini ən müasir süni intellekt metodları ilə birləşdirərək İnstitut səhiyyə sistemlərinin modernləşdirilməsinə, klinik nəticələrin yaxşılaşdırılmasına və yeni nəsil tibbi texnologiyaların inkişafına töhfə verməyi hədəfləyir.</p>",
            vision:
                "Biotibbi mühəndislik və süni intellekt sahələrində regional və beynəlxalq səviyyədə aparıcı tədqiqat mərkəzlərindən birinə çevrilmək, xəstəliklərin diaqnostikası və müalicəsi üçün innovativ texnologiyaların inkişafına töhfə vermək.",
            mission:
                "Süni intellekt texnologiyalarını biotibbi mühəndisliyə inteqrasiya edərək tibbi problemlərə elmi əsaslandırılmış və effektiv həllər təqdim etmək və səhiyyənin inkişafını dəstəkləmək və multidissiplinar tədqiqat mühiti formalaşdırmaq.",
            director: {
                id: 1,
                full_name: "Abdullayev Nuran Elcan oğlu",
                email: "nuran.abdullayev@aztu.edu.az",
                office: "I korpus, 218 nömrəli otaq",
                image_url: `${RI_MEDIA}/biotib/nuran.jpg`,
                title: "Tibb elmləri doktoru, professor",
                biography:
                    "<p>Nuran Elcan oğlu Abdullayev — tibb elmləri doktoru, professor, neyroradioloq. Azərbaycan Dövlət Tibb Universitetini müvəffəqiyyətlə başa vurduqdan sonra ixtisasını daha da təkmilləşdirmək məqsədilə Almaniya Federativ Respublikasına getmiş, Köln Universiteti Klinikasında radiologiya və neyroradiologiya sahəsində mütəxəssis kimi fəaliyyətə başlamışdır. Göstərdiyi yüksək peşəkarlıq nəticəsində Almaniyanın Reyn-Ziq bölgəsinin müvafiq klinikasına direktor vəzifəsinə təyin edilmişdir. Həmçinin Almaniya-Azərbaycan Radioloji və Neyroradioloji Cəmiyyətinin sədri vəzifəsini icra etmiş, iki ölkə arasında tibbi əməkdaşlığın inkişafına mühüm töhfə vermişdir. 2024-cü il noyabr ayından etibarən Azərbaycan Texniki Universitetinin Biotibbi Mühəndislik İnstitutuna rəhbər təyin edilmiş olub, bu vəzifə çərçivəsində biotibbi mühəndislik sahəsində süni intellekt texnologiyalarının tətbiqi üzrə elmi tədqiqatların idarə edilməsi və doktorant kadrların hazırlanması istiqamətlərini əhatə edən fəaliyyət həyata keçirir.</p>",
                educations: [
                    {
                        id: 1,
                        university: "Azərbaycan Tibb Universiteti, İstanbul Universiteti",
                        degree: "Tibb ixtisası",
                        start_year: "2006",
                        end_year: "2012",
                    },
                    {
                        id: 2,
                        university: "Diaqnostik radiologiya institutu, Köln Hospital Universiteti",
                        degree: "PhD",
                        start_year: "2014",
                        end_year: "2018",
                    },
                ],
                research_areas: [
                    { id: 1, content: "Neyroradiologiya və radiologiya" },
                    { id: 2, content: "Kəskin işemik beyin insultu, insult xəstələrində damardaxili müdaxilələr və beyin əməliyyatları" },
                    { id: 3, content: "COVID-19 və tənəffüs sistemi ilə bağlı radioloji və klinik tədqiqatlar" },
                    { id: 4, content: "Süni intellektin səhiyyədə tətbiqi" },
                    { id: 5, content: "Tibbi məlumatların intellektual analizi və rəqəmsal səhiyyə texnologiyaları" },
                    { id: 6, content: "Biotibbi cihazların, biomexanika və biotibbi mühəndislik texnologiyalarının layihələndirilməsi" },
                ],
            },
            objectives: [
                { id: 1, content: "Xəstəliklərin diaqnostikası və tibbi proseslərin dəqiqliyini və səmərəliliyini artırmaq üçün süni intellekt texnologiyalarının inteqrasiyası." },
                { id: 2, content: "Müalicə nəticələrini və xəstəlik dinamikasını proqnozlaşdırmağa imkan verən hesablama və riyazi modellərin işlənməsi." },
                { id: 3, content: "Məlumat əsaslı və intellektual səhiyyə həllərinin yaradılmasına töhfə vermək." },
                { id: 4, content: "Tibbi qərar qəbulunun təkmilləşdirilməsi və pasiyent qayğısının yaxşılaşdırılması." },
            ],
            research_directions: [
                { id: 1, content: "Süni intellektin tibdə tətbiqi, xüsusilə maşın öyrənməsi üsulları ilə xəstəliklərin erkən diaqnostikası." },
                { id: 2, content: "Tibbi görüntülərin (MRT, KT, ultrasəs) emalı." },
                { id: 3, content: "Biotibbi siqnalların analizi." },
                { id: 4, content: "Big Data texnologiyaları əsasında tibbi məlumatların intellektual analizi." },
                { id: 5, content: "Bioinformatika və bioloji proseslərin riyazi modelləşdirilməsi." },
                { id: 6, content: "Biotibbi cihazların layihələndirilməsi." },
            ],
            staff: [
                {
                    id: 1,
                    full_name: "Abbaslı Cavid Yaşar oğlu",
                    email: "cavid.abbasli@aztu.edu.az",
                    phone: "+994508099933",
                    image_url: `${RI_MEDIA}/biotib/cavid.jpg`,
                    title: "",
                },
                {
                    id: 2,
                    full_name: "Əliyeva Sevinc Hüşən qızı",
                    email: "sevinj.aliyeva@aztu.edu.az",
                    phone: "+994104602323",
                    image_url: `${RI_MEDIA}/biotib/sevind.jpg`,
                    title: "",
                },
                {
                    id: 3,
                    full_name: "Nəzərov Xalid Əfqan oğlu",
                    email: "khalid.nazarov@aztu.edu.az",
                    phone: "+994706250112",
                    image_url: `${RI_MEDIA}/biotib/xalid.jpg`,
                    title: "",
                },
            ],
            created_at: NOW,
            updated_at: NOW,
        },
        en: {
            id: 1,
            institute_code: "biotib",
            image_url: `${RI_MEDIA}/biotib/logo.jpg`,
            name: "Institute of Biomedical Engineering",
            about:
                "<p>The Institute of Biomedical Engineering at Azerbaijan Technical University was established in November 2024 and operates as a multidisciplinary research center aimed at advancing innovations at the intersection of biomedical engineering and artificial intelligence.</p>" +
                "<p>The Institute focuses on developing scientifically grounded and technologically advanced solutions to address existing challenges in modern healthcare. Its research areas include biomedical signal processing, disease diagnosis and prediction, AI-based clinical decision support systems, as well as the development of pharmacokinetic and computational models.</p>" +
                "<p>By integrating engineering principles with the most advanced artificial intelligence methods, the Institute strives to contribute to the modernization of healthcare systems, improvement of clinical outcomes, and advancement of next-generation medical technologies.</p>",
            vision:
                "To become one of the leading research centers regionally and internationally in the fields of biomedical engineering and artificial intelligence, contributing to the development of innovative technologies for disease diagnosis and treatment.",
            mission:
                "To integrate artificial intelligence technologies into biomedical engineering in order to provide scientifically grounded and effective solutions to medical problems, support the development of healthcare, and foster a multidisciplinary research environment.",
            director: {
                id: 1,
                full_name: "Nuran E. Abdullayev",
                email: "nuran.abdullayev@aztu.edu.az",
                office: "Building I, room 218",
                image_url: `${RI_MEDIA}/biotib/nuran.jpg`,
                title: "Doctor of Medical Sciences, Professor",
                biography:
                    "<p>Nuran Elcan Abdullayev is a Doctor of Medical Sciences, Professor, and neuroradiologist. After successfully graduating from the Azerbaijan State Medical University, he moved to the Federal Republic of Germany to further advance his specialization and began working as a specialist in radiology and neuroradiology at the University Hospital of Cologne. Owing to his high level of professionalism, he was appointed director of the relevant clinic in the Rhein-Sieg region of Germany. He has also served as the Chair of the German-Azerbaijani Society of Radiology and Neuroradiology, making significant contributions to the development of medical cooperation between the two countries. Since November 2024, he has been appointed Head of the Institute of Biomedical Engineering at Azerbaijan Technical University, within which he leads activities covering the management of scientific research on the application of artificial intelligence technologies in the field of biomedical engineering and the supervision of doctoral training.</p>",
                educations: [
                    {
                        id: 1,
                        university: "Azerbaijan Medical University, Istanbul University",
                        degree: "Medicine",
                        start_year: "2006",
                        end_year: "2012",
                    },
                    {
                        id: 2,
                        university: "Institute of Diagnostic Radiology, University Hospital of Cologne",
                        degree: "PhD",
                        start_year: "2014",
                        end_year: "2018",
                    },
                ],
                research_areas: [
                    { id: 1, content: "Neuroradiology and radiology" },
                    { id: 2, content: "Acute ischemic stroke, endovascular interventions and brain surgeries in stroke patients" },
                    { id: 3, content: "Radiological and clinical studies related to COVID-19 and the respiratory system" },
                    { id: 4, content: "Application of artificial intelligence in healthcare" },
                    { id: 5, content: "Intelligent analysis of medical data and digital health technologies" },
                    { id: 6, content: "Design of biomedical devices, biomechanics, and biomedical engineering technologies" },
                ],
            },
            objectives: [
                { id: 1, content: "Enhance the accuracy and efficiency of disease diagnosis and medical processes by integrating AI technologies." },
                { id: 2, content: "Develop computational and mathematical models capable of predicting treatment outcomes and disease dynamics." },
                { id: 3, content: "Contribute to the creation of data-driven, intelligent healthcare solutions." },
                { id: 4, content: "Improve medical decision-making and patient care." },
            ],
            research_directions: [
                { id: 1, content: "Application of artificial intelligence in medicine, particularly early diagnosis of diseases using machine learning methods." },
                { id: 2, content: "Processing of medical images (MRI, CT, ultrasound)." },
                { id: 3, content: "Analysis of biomedical signals." },
                { id: 4, content: "Intelligent analysis of medical data based on Big Data technologies." },
                { id: 5, content: "Bioinformatics and mathematical modeling of biological processes." },
                { id: 6, content: "Design and development of biomedical devices." },
            ],
            staff: [
                {
                    id: 1,
                    full_name: "Abbasli Cavid Yashar",
                    email: "cavid.abbasli@aztu.edu.az",
                    phone: "+994508099933",
                    image_url: `${RI_MEDIA}/biotib/cavid.jpg`,
                    title: "",
                },
                {
                    id: 2,
                    full_name: "Aliyeva Sevinc Hushan",
                    email: "sevinj.aliyeva@aztu.edu.az",
                    phone: "+994104602323",
                    image_url: `${RI_MEDIA}/biotib/sevind.jpg`,
                    title: "",
                },
                {
                    id: 3,
                    full_name: "Nazarov Khalid Afgan",
                    email: "khalid.nazarov@aztu.edu.az",
                    phone: "+994706250112",
                    image_url: `${RI_MEDIA}/biotib/xalid.jpg`,
                    title: "",
                },
            ],
            created_at: NOW,
            updated_at: NOW,
        },
    },
    {
        az: {
            id: 2,
            institute_code: "mtkt",
            image_url: `${RI_MEDIA}/mtkt/logo.png`,
            name: "Müdafiə Texnologiyaları və Kibertəhlükəsizlik İnstitutu",
            about:
                "<p>Müdafiə Texnologiyaları və Kibertəhlükəsizlik İnstitutu Azərbaycan Texniki Universitetində müasir texnologiyalar sahəsində elmi-tədqiqat və innovasiya fəaliyyətini inkişaf etdirmək məqsədilə yaradılmışdır. İnstitutun əsas fəaliyyəti süni intellekt, kibertəhlükəsizlik, müdafiə texnologiyaları və intellektual data analitikası istiqamətlərini əhatə edir.</p>" +
                "<p>Burada qabaqcıl laboratoriyalar, tədqiqat layihələri və tətbiqi həllər vasitəsilə həm akademik, həm də sənaye yönümlü nəticələrin əldə olunması hədəflənir. İnstitut eyni zamanda müasir təhsil yanaşmalarının tətbiqi və yüksəkixtisaslı kadrların hazırlanması istiqamətində fəaliyyət göstərir.</p>",
            vision:
                "Müdafiə texnologiyaları, kibertəhlükəsizlik və süni intellekt sahələrində qabaqcıl elmi-tədqiqat və innovasiya mərkəzinə çevrilərək, milli təhlükəsizliyin gücləndirilməsinə və qlobal texnoloji inkişafda rəqabətqabiliyyətli mövqe tutmağa töhfə vermək.",
            mission:
                "Müdafiə texnologiyaları, kibertəhlükəsizlik və süni intellekt sahələrində elmi-tədqiqat, innovasiya və tətbiqi həlləri inkişaf etdirərək, yüksək ixtisaslı kadrların hazırlanmasına, müasir texnologiyaların tətbiqinə və milli təhlükəsizlik prioritetlərinin dəstəklənməsinə töhfə vermək.",
            director: {
                id: 2,
                full_name: "Ələkbərli Rahid Zahid oğlu",
                email: "rahid.alekberli@aztu.edu.az",
                office: "II korpus, 505-ci otaq",
                image_url: `${RI_MEDIA}/mtkt/${encodeURIComponent("Ələkbərli Rahid.jpg")}`,
                title: "İdarəetmə üzrə fəlsəfə doktoru, dosent",
                biography:
                    "<p>Ələkbərli Rahid Zahid oğlu informasiya texnologiyaları, data idarəçiliyi və kibertəhlükəsizlik sahələrində uzunmüddətli təcrübəyə malik mütəxəssis və rəhbərdir. O, müxtəlif dövlət və özəl sektor qurumlarında yüksək vəzifələrdə çalışaraq texnoloji infrastruktur quruculuğu, kritik informasiya infrastukturları, rəqəmsal transformasiya, strateji idarəetmə və texnoloji inkişaf, beynəlxalq texnologiya layihələrinə rəhbərlik etmişdir.</p>" +
                    "<p>Rahid Ələkbərli AzTU-da bakalavr, magistr təhsilini fərqlənmə diplomu ilə bitirmiş, beynəlxalq təhsil almış, idarəetmə və informasiya sistemləri sahəsində magistr və doktorantura dərəcələrinə yiyələnmişdir. Onun elmi fəaliyyəti əsasən böyük verilənlərin idarə olunması, texnoloji idarəçilik strategiyaları və süni intellektin tətbiqi istiqamətlərini əhatə edir.</p>" +
                    "<p>Hazırda o, müdafiə texnologiyaları və kibertəhlükəsizlik sahəsində elmi-tədqiqat və innovasiya fəaliyyətlərinin inkişafı istiqamətində, yeni texnologiyaların tətbiqi və insan kapitalının gücləndirilməsi istiqamətində layihələr həyata keçirir. Rahid Ələkbərli həmçinin beynəlxalq əməkdaşlıqların qurulması və akademik mühitdə müasir yanaşmaların tətbiqi ilə seçilir.</p>" +
                    "<p><strong>Qəbul saatları:</strong> Çərşənbə axşamı, 15:00–16:30</p>",
                educations: [
                    { id: 1, university: "Azərbaycan Texniki Universiteti", degree: "Bakalavr və magistr təhsili", start_year: "1994", end_year: "2000" },
                    { id: 2, university: "University of Liverpool", degree: "MSc – Management Information Systems", start_year: "2017", end_year: "2020" },
                    { id: 3, university: "Walden University", degree: "MPhil – Business Administration and Management", start_year: "2021", end_year: "2023" },
                    { id: 4, university: "Walden University", degree: "PhD – Information Systems Management", start_year: "2021", end_year: "2024" },
                ],
                research_areas: [
                    { id: 1, content: "Data Siyasəti və Strateji İdarəetmə – böyük verilənlərin korporativ strategiyalarla inteqrasiyası və qərar qəbuletmə mexanizmləri" },
                    { id: 2, content: "Süni İntellekt və Analitika – Süni İntellekt modellərinin tətbiqi, qərar dəstək sistemləri və intellektual data analitikası" },
                    { id: 3, content: "Kibertəhlükəsizlik və Rəqəmsal Dayanıqlılıq – kritik infrastrukturun qorunması və təhlükəsizlik idarəetməsi" },
                    { id: 4, content: "IoT və Rəqəmsal Ekosistemlər – ağıllı sistemlər və sənaye tətbiqləri" },
                    { id: 5, content: "Rəqəmsal Transformasiya və Texnoloji Strategiyalar – təşkilatların texnoloji inkişaf modelləri və innovasiya yanaşmaları" },
                    { id: 6, content: "Süni İntellekt İdarəçiliyi və Etik İdarəetmə Modelləri – süni intellektin idarə olunması və etik çərçivə prinsiplərinin formalaşdırılması, tətbiqi və optimallaşdırılması" },
                ],
            },
            deputy_director: {
                id: 3,
                full_name: "Kərimov Hikmət Məhəmməd oğlu",
                email: "hikmat.karimov@aztu.edu.az",
                office: "II korpus, 505-ci otaq",
                image_url: `${RI_MEDIA}/mtkt/${encodeURIComponent("Kərimov Hikmət.jpg")}`,
                title: "Kimya mühəndisliyi üzrə texniki elmlər doktoru, dosent",
                biography:
                    "<p>Kərimov Hikmət Məhəmməd oğlu, kimya mühəndisi və layihə meneceri, kimya mühəndisliyi üzrə elmlər doktoru dərəcəsinə malik, akademik tədqiqat, sənaye əməliyyatları və genişmiqyaslı layihə idarəçiliyi sahəsində 20 ildən artıq təcrübəyə malik mütəxəssis və rəhbərdir. Çoxşaxəli komandaları idarə etmək, beynəlxalq əməkdaşlıqları təşkil etmək və kimyəvi emal, tullantı sularının təmizlənməsi, kriogen ayrılma və polimer istehsalı, və bir çox bu kimi sahələrdə texniki layihələri həyata keçirmək təcrübəsinə malik mütəxəssisdir.</p>" +
                    "<p>Azərbaycan Neft və Kimya İnstitutunun (indiki ADNSU) «Kimya-texnologiya» fakultəsini bitirmişdir. Azərbaycan Dövlət Neft Akademiyasında dissertasiya müdafiə edərək «Kimya elmləri namizədi» elmi dərəcəsi almışdır. Almaniya Federativ Respublikasının Heidelberg, Karlsruhe və Bayreuth, həmçinin Türkiyədə EGE universitetlərində elmi araşdırma aparmış və ixtisas artırma kurslarında iştirak etmişdir.</p>" +
                    "<p>O, müxtəlif dövlət və özəl sektor qurumlarında yüksək vəzifələrdə, o cümlədən SOCAR Azərneftyağ NEZ-də İstehsalat-texniki şöbənin rəisi, baş texnoloq, Sumqayıt Texnologiyalar Parkında (STP) direktor, «AMEA Yüksək Texnologiyalar Parkında» şöbə rəisi, baş mühəndis vəzifəsində çalışmışdır. Azərbaycan Respublikası Prezidenti Yanında Ali Attestasiya Komissiyasının qərarı ilə «Texnika üzrə elmlər doktoru» elmi dərəcəsinə layiq görülmüşdür. 50 elmi əsər, o cümlədən 5 patent və ixtira, 3 ali məktəb tələbələri üçün dərslik və dərs vəsaiti, 1 monoqrafiya müəllifidir.</p>" +
                    "<p><strong>Qəbul saatları:</strong> Çərşənbə axşamı, cümə axşamı, 15:00–17:00</p>",
                educations: [
                    { id: 1, university: "Azərbaycan Neft və Kimya İnstitutu", degree: "Kimya-texnologiya mühəndisi", start_year: "1982", end_year: "1989" },
                    { id: 2, university: "Azərbaycan Neft və Kimya İnstitutu", degree: "Kimya elmlər namizədi", start_year: "1989", end_year: "1992" },
                    { id: 3, university: "Heidelberg və Karlsruhe Universiteti, Engler-Bunte İnstitutu", degree: "Elmi araşdırma", start_year: "1999", end_year: "2000" },
                    { id: 4, university: "Ege Universiteti, Kimya Mühəndisliyi bölümü", degree: "Elmi araşdırma", start_year: "2001", end_year: "2002" },
                    { id: 5, university: "Bayreuth Universiteti", degree: "Elmi araşdırma", start_year: "2003", end_year: "2004" },
                    { id: 6, university: "Azərbaycan Neft və Kimya İnstitutu", degree: "Texnika elmlər doktoru", start_year: "2006", end_year: "2009" },
                ],
                research_areas: [
                    { id: 1, content: "Nadir torpaq metallarının katalitik xüsusiyyətləri – Ce yarım ailəsinin promotor xüsusiyyətlərinin tədqiqi" },
                    { id: 2, content: "Parsial oksidləşmə – etanolun sirkə turşusuna katalitik parsial oksidləşməsinin tədqiqi" },
                    { id: 3, content: "Yanar şistlərin kompleks emal texnologiyası – Azərbaycan yanar şistlərinin tədqiqi və onların əsasında müxtəlif məhsulların istehsal texnologiyasının işlənməsi" },
                    { id: 4, content: "Kriogen texnologiyalar – yüksək təmizlikli maye Azot, Oksigen, Arqon və CO2 istehsalı" },
                    { id: 5, content: "Korroziyadan müdafiə – qaynar sinkləmə prosesi" },
                    { id: 6, content: "Neft emalı texnologiyaları – müxtəlif neft məhsulları, o cümlədən sürtkü yağları, aviasiya hidravlik mayeləri və s." },
                ],
            },
            objectives: [
                { id: 1, content: "Müdafiə texnologiyaları, kibertəhlükəsizlik və süni intellekt sahələrində prioritet elmi-tədqiqat istiqamətlərini inkişaf etdirmək." },
                { id: 2, content: "Müasir laboratoriyalar və texnoloji infrastruktur vasitəsilə innovativ həllərin yaradılmasını təmin etmək." },
                { id: 3, content: "Yüksək ixtisaslı mütəxəssislərin hazırlanmasına və insan kapitalının gücləndirilməsinə töhfə vermək." },
                { id: 4, content: "Təhsil və tədqiqat fəaliyyətini beynəlxalq standartlara uyğunlaşdırmaq və keyfiyyətini artırmaq." },
                { id: 5, content: "Yerli və beynəlxalq tərəfdaşlıqları genişləndirərək birgə layihələrin həyata keçirilməsini təşviq etmək." },
                { id: 6, content: "Milli təhlükəsizlik və rəqəmsal dayanıqlılıq istiqamətində tətbiqi həllərin hazırlanmasına dəstək vermək." },
            ],
            research_directions: [
                { id: 1, content: "Süni intellekt və intellektual data analitikası" },
                { id: 2, content: "Kibertəhlükəsizlik və rəqəmsal dayanıqlılıq" },
                { id: 3, content: "Müdafiə texnologiyaları və tətbiqi həllər" },
                { id: 4, content: "Rəqəmsal transformasiya və texnoloji strategiyalar" },
                { id: 5, content: "IoT və ağıllı sistemlər" },
                { id: 6, content: "Süni intellekt idarəçiliyi və etik çərçivələr" },
            ],
            staff: [
                {
                    id: 1,
                    full_name: "Qasımlı Fərid Fikrət oğlu",
                    email: "farid.gasimli@aztu.edu.az",
                    phone: "+994504030744",
                    image_url: null,
                    title: "Kibertəhlükəsizlik kafedrasının baş müəllimi",
                },
            ],
            created_at: NOW,
            updated_at: NOW,
        },
        en: {
            id: 2,
            institute_code: "mtkt",
            image_url: `${RI_MEDIA}/mtkt/logo.png`,
            name: "Institute of Defense Technologies and Cybersecurity",
            about:
                "<p>The Institute of Defense Technologies and Cybersecurity at Azerbaijan Technical University (AzTU) was established to advance research, innovation, and technological development in modern digital domains. The Institute focuses on artificial intelligence, cybersecurity, defense technologies, and intelligent data analytics.</p>" +
                "<p>Through advanced laboratories, research initiatives, and applied solutions, it aims to deliver both academic excellence and industry-oriented outcomes. The Institute also promotes modern educational approaches and contributes to the development of highly qualified professionals.</p>",
            vision:
                "To become a leading research and innovation center in defense technologies, cybersecurity, and artificial intelligence, contributing to national security and achieving a competitive position in the global technological landscape.",
            mission:
                "To advance research, innovation, and applied solutions in defense technologies, cybersecurity, and artificial intelligence, while contributing to the development of highly skilled professionals and supporting national security priorities.",
            director: {
                id: 2,
                full_name: "Rahid Zahid Alekberli",
                email: "rahid.alekberli@aztu.edu.az",
                office: "Building II, Room 505",
                image_url: `${RI_MEDIA}/mtkt/${encodeURIComponent("Ələkbərli Rahid.jpg")}`,
                title: "PhD in Management, Associate Professor",
                biography:
                    "<p>Rahid Zahid Alekberli is a distinguished expert and senior executive with extensive experience in information technologies, data governance, and cybersecurity. He has held senior positions across public and private sectors, leading major initiatives in technological infrastructure, critical information systems, digital transformation, and strategic management.</p>" +
                    "<p>He graduated with distinction from Azerbaijan Technical University and pursued advanced international education in management and information systems. He holds an MSc from the University of Liverpool and both MPhil and PhD degrees from Walden University.</p>" +
                    "<p>His research focuses on big data governance, technology-driven strategic management, and artificial intelligence applications. He currently contributes to advancing research and innovation in defense technologies and cybersecurity, while fostering international collaboration and modern academic practices.</p>" +
                    "<p><strong>Office Hours:</strong> Tuesday, 15:00–16:30</p>",
                educations: [
                    { id: 1, university: "Azerbaijan Technical University", degree: "Bachelor's and Master's degrees", start_year: "1994", end_year: "2000" },
                    { id: 2, university: "University of Liverpool", degree: "MSc – Management Information Systems", start_year: "2017", end_year: "2020" },
                    { id: 3, university: "Walden University", degree: "MPhil – Business Administration and Management", start_year: "2021", end_year: "2023" },
                    { id: 4, university: "Walden University", degree: "PhD – Information Systems Management", start_year: "2021", end_year: "2024" },
                ],
                research_areas: [
                    { id: 1, content: "Data Governance and Strategic Management" },
                    { id: 2, content: "Artificial Intelligence and Data Analytics" },
                    { id: 3, content: "Cybersecurity and Digital Resilience" },
                    { id: 4, content: "Internet of Things (IoT) and Digital Ecosystems" },
                    { id: 5, content: "Digital Transformation and Technology Strategies" },
                    { id: 6, content: "AI Governance and Ethical Frameworks" },
                ],
            },
            deputy_director: {
                id: 3,
                full_name: "Karimov Hikmat Mahammad oglu",
                email: "hikmat.karimov@aztu.edu.az",
                office: "Building II, Room 505",
                image_url: `${RI_MEDIA}/mtkt/${encodeURIComponent("Kərimov Hikmət.jpg")}`,
                title: "Doctor of Technical Sciences in Chemical Engineering, Associate Professor",
                biography:
                    "<p>Karimov Hikmat Mahammad oglu is a chemical engineer and project manager, holding a Doctor of Sciences degree in Chemical Engineering. He is a specialist and leader with more than 20 years of experience in academic research, industrial operations, and large-scale project management. He has expertise in managing multidisciplinary teams, organizing international collaborations, and implementing technical projects in areas such as chemical processing, wastewater treatment, cryogenic separation, polymer production, and many others.</p>" +
                    "<p>He graduated from the \"Chemical Technology\" faculty of the Azerbaijan Oil and Chemistry Institute (now ASOIU). He defended his dissertation at the Azerbaijan State Oil Academy and received the degree of Candidate of Chemical Sciences. He conducted scientific research and participated in advanced training courses at Heidelberg, Karlsruhe, and Bayreuth Universities in Germany, as well as at EGE University in Turkey.</p>" +
                    "<p>He has held senior positions in various state and private sector organizations, including Head of the Production-Technical Department and Chief Technologist at SOCAR Azerneft Oil Refinery, Director at Sumgait Technologies Park (STP), Head of Department and Chief Engineer at the High Technologies Park of ANAS. By decision of the Supreme Attestation Commission under the President of the Republic of Azerbaijan, he was awarded the degree of Doctor of Technical Sciences. He is the author of 50 scientific works, including 5 patents and inventions, 3 textbooks and teaching aids for university students, and 1 monograph.</p>" +
                    "<p><strong>Office Hours:</strong> Tuesday, Thursday, 15:00–17:00</p>",
                educations: [
                    { id: 1, university: "Azerbaijan Oil and Chemistry Institute", degree: "Chemical Technology Engineer", start_year: "1982", end_year: "1989" },
                    { id: 2, university: "Azerbaijan Oil and Chemistry Institute", degree: "Candidate of Chemical Sciences", start_year: "1989", end_year: "1992" },
                    { id: 3, university: "Heidelberg and Karlsruhe University, Engler-Bunte Institute", degree: "Scientific research", start_year: "1999", end_year: "2000" },
                    { id: 4, university: "EGE University, Department of Chemical Engineering", degree: "Scientific research", start_year: "2001", end_year: "2002" },
                    { id: 5, university: "Bayreuth University", degree: "Scientific research", start_year: "2003", end_year: "2004" },
                    { id: 6, university: "Azerbaijan Oil and Chemistry Institute", degree: "Doctor of Technical Sciences", start_year: "2006", end_year: "2009" },
                ],
                research_areas: [
                    { id: 1, content: "Catalytic properties of rare earth metals – study of promoter characteristics of the Ce subgroup" },
                    { id: 2, content: "Partial oxidation – catalytic partial oxidation of ethanol to acetic acid" },
                    { id: 3, content: "Complex processing technology of oil shales – study of Azerbaijani oil shales and development of production technologies for various products" },
                    { id: 4, content: "Cryogenic technologies – production of high-purity liquid Nitrogen, Oxygen, Argon, and CO2" },
                    { id: 5, content: "Corrosion protection – hot-dip galvanizing process" },
                    { id: 6, content: "Oil refining technologies – production of various petroleum products, including lubricants, aviation hydraulic fluids, etc." },
                ],
            },
            objectives: [
                { id: 1, content: "Develop priority research areas in defense technologies, cybersecurity, and artificial intelligence." },
                { id: 2, content: "Foster innovation through modern laboratories and technological infrastructure." },
                { id: 3, content: "Contribute to the development of highly qualified human capital." },
                { id: 4, content: "Align education and research activities with international standards." },
                { id: 5, content: "Promote collaboration through local and international partnerships." },
                { id: 6, content: "Support applied solutions for national security and digital resilience." },
            ],
            research_directions: [
                { id: 1, content: "Artificial intelligence and intelligent data analytics" },
                { id: 2, content: "Cybersecurity and digital resilience" },
                { id: 3, content: "Defense technologies and applied solutions" },
                { id: 4, content: "Digital transformation and technology strategies" },
                { id: 5, content: "IoT and smart systems" },
                { id: 6, content: "AI governance and ethical frameworks" },
            ],
            staff: [
                {
                    id: 1,
                    full_name: "Farid Fikrat Gasimli",
                    email: "farid.gasimli@aztu.edu.az",
                    phone: "+994504030744",
                    image_url: null,
                    title: "Senior Lecturer, Department of Cybersecurity",
                },
            ],
            created_at: NOW,
            updated_at: NOW,
        },
    },
    {
        az: {
            id: 3,
            institute_code: "sdt",
            image_url: `${RI_MEDIA}/sdt/logo.png`,
            name: "Sənaye Dizaynı və Texnologiyalar İnstitutu",
            about:
                "<p>Sənaye Dizaynı və Texnologiyalar İnstitutu Azərbaycan Texniki Universitetinin Maşınqayırma və metallurgiya fakültəsinin elmi və pedaqoji bazası üzərində formalaşmış, sənaye yönümlü mühəndislik yanaşmalarını müasir texnologiyalarla sintez edən ixtisaslaşmış akademik qurumdur. İnstitutun fəaliyyəti ənənəvi maşınqayırma məktəbinin fundamental prinsiplərini qorumaqla yanaşı, rəqəmsal transformasiya, innovasiya və tətbiqi tədqiqatların inteqrasiyasına əsaslanır.</p>" +
                "<p>İnstitutun istiqamətləri fakültənin kafedralarının fəaliyyət sahələri ilə üzvi şəkildə əlaqələndirilmişdir. Bu çərçivədə mexaniki sistemlərin nəzəriyyəsi və tətbiqi, maşın hissələrinin konstruktiv layihələndirilməsi, materialşünaslıq və metallurgiya, istehsal texnologiyaları, qaynaq və tökmə prosesləri, səthlərin möhkəmləndirilməsi və funksionallaşdırılması kimi sahələr prioritet təşkil edir. Eyni zamanda, istehsalın avtomatlaşdırılması, texnoloji proseslərin idarə olunması və rəqəmsal mühəndislik yanaşmaları bu ənənəvi istiqamətlərlə paralel inkişaf etdirilir.</p>" +
                "<p>Tədris prosesi kompleks yanaşma əsasında qurularaq tələbələrə həm fundamental mühəndislik bilikləri, həm də praktiki bacarıqlar qazandırır. Müasir layihələndirmə və modelləşdirmə alətləri, o cümlədən CAD/CAM/CAE sistemləri, rəqəmsal prototipləşdirmə, 3D istehsal texnologiyaları və avtomatlaşdırılmış istehsal mühitləri tədris prosesinin ayrılmaz hissəsini təşkil edir. Bu yanaşma məzunların həm klassik sənaye müəssisələrində, həm də yüksək texnologiyalı istehsal sahələrində rəqabətqabiliyyətli fəaliyyətini təmin edir.</p>" +
                "<p>Elmi-tədqiqat fəaliyyəti institutun inkişaf strategiyasının əsas sütunlarından biridir. Bu sahədə aparılan işlər yeni materialların yaradılması və xassələrinin yaxşılaşdırılması, istehsal proseslərinin optimallaşdırılması, rəqəmsal əkiz texnologiyalarının tətbiqi, ağıllı istehsal sistemlərinin qurulması və enerji resurslarından səmərəli istifadə kimi istiqamətləri əhatə edir. Tədqiqat nəticələri yalnız nəzəri çərçivədə qalmır, eyni zamanda sənaye tətbiqlərinə yönəldilərək real problemlərin həllinə xidmət edir.</p>" +
                "<p>İnstitut sənaye ilə qarşılıqlı əməkdaşlığa xüsusi önəm verir. Dövlət qurumları, istehsal müəssisələri və beynəlxalq tərəfdaşlarla həyata keçirilən birgə layihələr vasitəsilə tələbələrin istehsalat təcrübəsi gücləndirilir, innovativ ideyaların tətbiqi və kommersiyalaşdırılması üçün əlverişli mühit yaradılır. Bu əməkdaşlıq modeli həm təhsilin keyfiyyətinin yüksəldilməsinə, həm də elmi nəticələrin praktik əhəmiyyətinin artırılmasına xidmət edir.</p>" +
                "<p>Beləliklə, institut maşınqayırma və metallurgiya fakültəsinin elmi ənənələrini müasir texnologiyalar və dizayn yanaşmaları ilə birləşdirərək, regionda sənaye və texnoloji inkişafın dəstəklənməsində mühüm rol oynayan, rəqabətqabiliyyətli və innovativ kadrların hazırlanmasına yönəlmiş qabaqcıl elmi-tədris mərkəzi kimi çıxış edir.</p>",
            vision:
                "Sənaye dizaynı və texnologiyalar sahəsində innovasiya yönümlü, beynəlxalq səviyyədə tanınan və sənaye ilə sıx inteqrasiya olunmuş qabaqcıl elmi-tədris mərkəzinə çevrilmək.",
            mission:
                "Sənaye dizaynı və müasir texnologiyaların inteqrasiyası əsasında yüksək ixtisaslı mühəndis kadrlar hazırlamaq, tətbiqyönümlü elmi tədqiqatlar aparmaq və sənaye ilə əməkdaşlıq vasitəsilə innovativ həllərin yaradılmasına töhfə vermək.",
            director: {
                id: 4,
                full_name: "Namazov Manafəddin Bəşir oğlu",
                email: "manafeddin.namazov@aztu.edu.az",
                office: "4 korpus, 101-ci otaq",
                image_url: `${RI_MEDIA}/sdt/${encodeURIComponent("Namazov Manafəddin.jpg")}`,
                title: "Texnika elmləri namizədi, dosent",
                biography:
                    "<p>Namazov Manafəddin Bəşir oğlu 28 fevral 1963-cü ildə anadan olmuşdur. 1980-ci ildə Xanlar rayonunun Nərimanov kənd orta məktəbini bitirmiş və həmin il Leninqrad Elektronika İnstitutunun Avtomatika və Hesablama Texnikası fakültəsinin “Avtomatika və telemexanika” ixtisasına qəbul olunmuşdur. 1986-cı ildə ali təhsilini başa vurmuşdur. Təhsil aldığı müddətdə “Avtomatika və proseslərin idarəedilməsi” kafedrasında II dərəcəli radio-montajçı kimi fəaliyyət göstərmiş, eyni zamanda tələbə elmi cəmiyyətinin sədri olmuşdur.</p>" +
                    "<p>1988–1991-ci illərdə Leninqrad şəhərində yerləşən SSRİ Elmlər Akademiyasının İnformatika və Avtomatlaşdırma İnstitutunun aspiranturasında təhsil almış və “Messbauer spektrlərinin emalı və identifikasiyası üçün alqoritmik və proqram təminatının işlənib hazırlanması” mövzusunda namizədlik dissertasiyasını müdafiə etmişdir.</p>" +
                    "<h4>Əmək fəaliyyəti</h4>" +
                    "<ul>" +
                    "<li>1992–1994: Azərbaycan Milli Elmlər Akademiyasının Fizika İnstitutunda baş laborant və kiçik elmi işçi.</li>" +
                    "<li>1994–1997: AzTU Avtomatika və idarəetmə kafedrasında baş müəllim.</li>" +
                    "<li>1997–2006: həmin kafedrada dosent.</li>" +
                    "<li>2000–2002: “Elektrotexnika fakültəsinin yeniləşdirilməsi (CD-2103-2000 AZB)” TEMPUS layihəsinin baş əlaqələndiricisi.</li>" +
                    "<li>2002–2006: “Azərbaycanda mühəndislik təhsilinin yeniləşdirilməsi (MP-JEP-23264-2002)” TEMPUS layihəsinin baş əlaqələndiricisi.</li>" +
                    "<li>2006–2012: Türkiyə, Sivas, Cumhuriyyət Universitetinin Mühəndislik fakültəsinin Elektrik və elektronika bölməsində dosent.</li>" +
                    "<li>2012–2015: Bakı Ali Neft Məktəbinin Kompüter və informasiya-kommunikasiya texnologiyaları kafedrasında dosent.</li>" +
                    "<li>2015–2018: həmin Ali məktəbin Proseslərin avtomatlaşdırılması kafedrasının müdiri.</li>" +
                    "<li>2019 (yanvar) – 2024: Bakı Mühəndislik Universitetində beynəlxalq əlaqələr üzrə prorektor.</li>" +
                    "<li>2024-dən: AzTU Sənaye Dizaynı və Texnologiyalar İnstitutunun direktoru.</li>" +
                    "</ul>" +
                    "<p>Elmi fəaliyyəti dövründə 67 elmi əsərin müəllifidir.</p>" +
                    "<h4>Sertifikatlar</h4>" +
                    "<ul>" +
                    "<li>EPLAN Electrical P8 v2.3 üzrə təlim sertifikatı (2014).</li>" +
                    "<li>AutoCAD proqramı üzrə sertifikat.</li>" +
                    "<li>Electrical training course sertifikatı (2014).</li>" +
                    "<li>ABŞ-ın Indiana Universiteti ilə birgə distant təhsil metodologiyası və proqram platformaları üzrə sertifikat (2004).</li>" +
                    "<li>NATO tərəfindən maliyyələşdirilən “Virtual Silk Highway” distant təhsil seminarlarının iştirakçısı (2003).</li>" +
                    "<li>Niderlandın Zuyd Ali Məktəbində Project Education və Project Management üzrə sertifikat (2003).</li>" +
                    "<li>University of Applied Sciences Cologne – “Modern Automatisierungstechnik” üzrə sertifikat (Almaniya, 2003).</li>" +
                    "<li>LEYBOLD DIDACTIC GmbH – Automatisierungstechnik (PLC), Mikrocomputertechnik və Regelungstechnik kursları üzrə sertifikatlar (Almaniya, 2002).</li>" +
                    "<li>University of Applied Sciences Cologne – Alman dili kursu üzrə sertifikat.</li>" +
                    "<li>Siemens (PRIMERGY, Intel əsaslı sürücü konfiqurasiyası) üzrə sertifikat.</li>" +
                    "<li>PC və şəbəkə arxitekturası üzrə təlim (Köln, Almaniya, 1989–1992).</li>" +
                    "</ul>" +
                    "<h4>Əlavə məlumat</h4>" +
                    "<ul>" +
                    "<li>68 elmi məqalənin müəllifidir.</li>" +
                    "<li>Almaniya (Köln): Proseslərin avtomatlaşdırılması texnologiyası üzrə təlim kursu (15.06.2001 – 09.12.2001).</li>" +
                    "<li>Niderland (Heerlen): Control Engineering, Microprocessors və Automation Technology üzrə təlim kursu (01.09.2001 – 09.12.2001).</li>" +
                    "<li>Almaniya (Köln): Process Control üzrə təlim kursu (01.11.2002 – 30.11.2002).</li>" +
                    "<li>Almaniya (Köln): Web-based control texnologiyalarının tətbiqi üzrə təlim kursu (01.04.2004 – 30.04.2004).</li>" +
                    "<li>İtaliya (Roma): “Tempus Projects Implementation” konfransında iştirak.</li>" +
                    "<li>ABŞ: Indiana Universiteti ilə birgə Distance Education Partnership Program kursu.</li>" +
                    "</ul>" +
                    "<p><strong>Telefon:</strong> +994 50 346 57 07 &nbsp;·&nbsp; <strong>Qəbul saatları:</strong> Cümə, 14:00–17:00</p>" +
                    "<p><strong>Ailə vəziyyəti:</strong> Ailəlidir, iki oğlu var.</p>",
                educations: [
                    {
                        id: 1,
                        university: "Leninqrad Elektronika İnstitutu, Avtomatika və Hesablama Texnikası fakültəsi",
                        degree: "Avtomatika və telemexanika ixtisası (ali təhsil)",
                        start_year: "1980",
                        end_year: "1986",
                    },
                    {
                        id: 2,
                        university: "SSRİ Elmlər Akademiyasının İnformatika və Avtomatlaşdırma İnstitutu (Leninqrad)",
                        degree: "Aspirantura — texnika elmləri namizədi",
                        start_year: "1988",
                        end_year: "1991",
                    },
                ],
                research_areas: [
                    { id: 1, content: "Avtomatika və proseslərin idarəedilməsi sistemləri" },
                    { id: 2, content: "Sənaye proseslərinin modelləşdirilməsi və simulyasiyası" },
                    { id: 3, content: "SCADA və sənaye idarəetmə sistemləri (AİTPİS)" },
                    { id: 4, content: "Rəqəmsal və intellektual idarəetmə sistemləri" },
                    { id: 5, content: "Süni intellekt alqoritmlərinin texniki sistemlərdə tətbiqi" },
                    { id: 6, content: "Mikroprosessor sistemləri və sənaye elektronikasının tətbiqləri" },
                    { id: 7, content: "Robototexnika və avtomatlaşdırılmış texnoloji sistemlər" },
                    { id: 8, content: "Ölçmə sistemləri və sensor texnologiyaları" },
                    { id: 9, content: "Proseslərin optimallaşdırılması və adaptiv idarəetmə metodları" },
                    { id: 10, content: "Təhsil texnologiyaları və mühəndislik təhsilinin modernləşdirilməsi" },
                ],
            },
            objectives: [
                { id: 1, content: "Sənaye dizaynı və texnologiyalar sahəsində müasir, rəqabətqabiliyyətli təhsil proqramlarının hazırlanması və tətbiqi." },
                { id: 2, content: "Maşınqayırmada yaşıl və davamlı istehsalın rəqəmsal texnologiyalar və riyazi modelləşdirmə əsasında optimallaşdırılması." },
                { id: 3, content: "Hidromexaniki qurğuların mexaniki və termodinamik parametrlərinin elmi əsaslarla tədqiqi." },
                { id: 4, content: "Texniki sistem və proseslərin süni intellekt alqoritmləri vasitəsilə diaqnostikası və idarə edilməsi." },
                { id: 5, content: "Robototexniki sistemlərin və texnoloji maşınların etibarlılığının artırılması məqsədilə intellektual diaqnostika və proqnostik texniki xidmət metodologiyalarının işlənməsi." },
                { id: 6, content: "Qabaqcıl materialların öyrənilməsi və müasir metallurgiya texnologiyalarının inkişaf etdirilməsi." },
            ],
            research_directions: [
                { id: 1, content: "Mexaniki sistemlərin nəzəriyyəsi və tətbiqi, maşın hissələrinin konstruktiv layihələndirilməsi" },
                { id: 2, content: "Materialşünaslıq, metallurgiya, qaynaq və tökmə prosesləri" },
                { id: 3, content: "İstehsal texnologiyaları, səthlərin möhkəmləndirilməsi və funksionallaşdırılması" },
                { id: 4, content: "İstehsalın avtomatlaşdırılması və texnoloji proseslərin idarə olunması" },
                { id: 5, content: "CAD/CAM/CAE sistemləri, rəqəmsal prototipləşdirmə və 3D istehsal" },
                { id: 6, content: "Rəqəmsal əkiz, ağıllı istehsal sistemləri və enerji resurslarından səmərəli istifadə" },
            ],
            staff: [
                {
                    id: 1,
                    full_name: "İbrahimov Bahadur Nazim oğlu",
                    email: "bahaduribrahimov@gmail.com",
                    phone: "+994505744455",
                    image_url: `${RI_MEDIA}/sdt/${encodeURIComponent("Ibrahimov Bahadur.png")}`,
                    title: "Aparıcı tədqiqatçı — Robototexnika, sənaye robotları, kollaborativ robotlar, avtomatlaşdırma. Texnika elmləri üzrə fəlsəfə doktoru (PhD).",
                },
                {
                    id: 2,
                    full_name: "Abbas Əlili İlham oğlu",
                    email: "abbas.alili@aztu.edu.az",
                    phone: "+994505641015",
                    image_url: `${RI_MEDIA}/sdt/${encodeURIComponent("Abbas Əlili.png")}`,
                    title: "Tədqiqatçı — Robototexnika, avtomatlaşdırma, süni intellektin tibbi tətbiqləri. Texnika elmləri üzrə fəlsəfə doktoru (PhD).",
                },
            ],
            created_at: NOW,
            updated_at: NOW,
        },
        en: {
            id: 3,
            institute_code: "sdt",
            image_url: `${RI_MEDIA}/sdt/logo.png`,
            name: "Institute of Industrial Design and Technologies",
            about:
                "<p>The Institute of Industrial Design and Technologies is a specialized academic institution established on the scientific and pedagogical foundation of the Faculty of Mechanical Engineering and Metallurgy of Azerbaijan Technical University, synthesizing industry-oriented engineering approaches with modern technologies. The Institute's activities are based on preserving the fundamental principles of the traditional school of mechanical engineering while integrating digital transformation, innovation, and applied research.</p>" +
                "<p>The Institute's areas of focus are organically aligned with the activities of the faculty's departments. Within this framework, priority is given to fields such as the theory and application of mechanical systems, the structural design of machine components, materials science and metallurgy, manufacturing technologies, welding and casting processes, and the strengthening and functionalization of surfaces. At the same time, the automation of production, the management of technological processes, and digital engineering approaches are developed in parallel with these traditional directions.</p>" +
                "<p>The teaching process is structured on the basis of an integrated approach, providing students with both fundamental engineering knowledge and practical skills. Modern design and modeling tools, including CAD/CAM/CAE systems, digital prototyping, 3D manufacturing technologies, and automated production environments, form an integral part of the educational process. This approach ensures that graduates can compete effectively in both classical industrial enterprises and high-technology manufacturing sectors.</p>" +
                "<p>Scientific research is one of the main pillars of the Institute's development strategy. Work in this area covers directions such as the creation of new materials and the improvement of their properties, the optimization of production processes, the application of digital twin technologies, the development of intelligent manufacturing systems, and the efficient use of energy resources. Research findings are not confined to the theoretical framework; they are also directed towards industrial applications, serving the resolution of real-world problems.</p>" +
                "<p>The Institute places particular importance on cooperation with industry. Through joint projects carried out with state institutions, manufacturing enterprises, and international partners, students' industrial practice is strengthened, and a favorable environment is created for the implementation and commercialization of innovative ideas. This model of cooperation contributes both to enhancing the quality of education and to increasing the practical significance of scientific results.</p>" +
                "<p>Thus, by combining the scientific traditions of the Faculty of Mechanical Engineering and Metallurgy with modern technologies and design approaches, the Institute serves as an advanced scientific and educational center dedicated to training competitive and innovative personnel, playing a significant role in supporting industrial and technological development in the region.</p>",
            vision:
                "To become an internationally recognized, advanced scientific and educational center in the field of industrial design and technologies, oriented towards innovation and closely integrated with industry.",
            mission:
                "To train highly qualified engineering personnel on the basis of integrating industrial design with modern technologies, to conduct application-oriented scientific research, and to contribute to the creation of innovative solutions through cooperation with industry.",
            director: {
                id: 4,
                full_name: "Namazov Manafaddin Bashir oghlu",
                email: "manafeddin.namazov@aztu.edu.az",
                office: "Building 4, Room 101",
                image_url: `${RI_MEDIA}/sdt/${encodeURIComponent("Namazov Manafəddin.jpg")}`,
                title: "Candidate of Technical Sciences, Associate Professor",
                biography:
                    "<p>Namazov Manafaddin Bashir oghlu was born on 28 February 1963. In 1980, he graduated from Narimanov Village Secondary School in the Khanlar District and was admitted that same year to the Faculty of Automation and Computer Engineering of the Leningrad Institute of Electronics, in the specialty “Automation and Telemechanics.” He completed his higher education in 1986. During his studies, he worked as a second-class radio assembler in the Department of Automation and Process Control and also served as the chairperson of the Student Scientific Society.</p>" +
                    "<p>From 1988 to 1991, he studied as a postgraduate at the Institute of Informatics and Automation of the USSR Academy of Sciences in Leningrad, where he defended his candidate's dissertation on “Development of Algorithmic and Software Support for the Processing and Identification of Mössbauer Spectra.”</p>" +
                    "<h4>Professional Experience</h4>" +
                    "<ul>" +
                    "<li>1992–1994: Senior laboratory assistant and junior researcher, Institute of Physics, Azerbaijan National Academy of Sciences.</li>" +
                    "<li>1994–1997: Senior lecturer, Department of Automation and Control, AzTU.</li>" +
                    "<li>1997–2006: Associate professor in the same department.</li>" +
                    "<li>2000–2002: Chief coordinator, TEMPUS project “Modernization of the Faculty of Electrical Engineering (CD-2103-2000 AZB).”</li>" +
                    "<li>2002–2006: Chief coordinator, TEMPUS project “Modernization of Engineering Education in Azerbaijan (MP-JEP-23264-2002).”</li>" +
                    "<li>2006–2012: Associate professor, Department of Electrical and Electronic Engineering, Cumhuriyet University, Sivas, Türkiye.</li>" +
                    "<li>2012–2015: Associate professor, Department of Computer and ICT, Baku Higher Oil School.</li>" +
                    "<li>2015–2018: Head of the Department of Process Automation, Baku Higher Oil School.</li>" +
                    "<li>January 2019 – 2024: Vice-Rector for International Relations, Baku Engineering University.</li>" +
                    "<li>Since 2024: Director, Institute of Industrial Design and Technologies, AzTU.</li>" +
                    "</ul>" +
                    "<p>He has authored 67 scientific works during his academic career.</p>" +
                    "<h4>Certificates</h4>" +
                    "<ul>" +
                    "<li>EPLAN Electrical P8 v2.3 training certificate (2014).</li>" +
                    "<li>AutoCAD certificate.</li>" +
                    "<li>Electrical Training Course certificate (2014).</li>" +
                    "<li>Distance education methodology and software platforms, jointly with Indiana University, USA (2004).</li>" +
                    "<li>NATO-funded “Virtual Silk Highway” distance education seminars participant (2003).</li>" +
                    "<li>Project Education and Project Management, Zuyd University of Applied Sciences, the Netherlands (2003).</li>" +
                    "<li>“Modern Automatisierungstechnik”, University of Applied Sciences Cologne, Germany (2003).</li>" +
                    "<li>LEYBOLD DIDACTIC GmbH — Automatisierungstechnik (PLC), Mikrocomputertechnik and Regelungstechnik courses, Germany (2002).</li>" +
                    "<li>German language course, University of Applied Sciences Cologne.</li>" +
                    "<li>Siemens (PRIMERGY, Intel-based server configuration) certificate.</li>" +
                    "<li>PC and network architecture training (Cologne, Germany, 1989–1992).</li>" +
                    "</ul>" +
                    "<h4>Additional Information</h4>" +
                    "<ul>" +
                    "<li>Author of 68 scientific articles.</li>" +
                    "<li>Germany (Cologne): Process automation technology training course (15.06.2001 – 09.12.2001).</li>" +
                    "<li>The Netherlands (Heerlen): Control Engineering, Microprocessors and Automation Technology training (01.09.2001 – 09.12.2001).</li>" +
                    "<li>Germany (Cologne): Process Control training (01.11.2002 – 30.11.2002).</li>" +
                    "<li>Germany (Cologne): Application of web-based control technologies training (01.04.2004 – 30.04.2004).</li>" +
                    "<li>Italy (Rome): Participation in the “Tempus Projects Implementation” conference.</li>" +
                    "<li>USA: Distance Education Partnership Program with Indiana University.</li>" +
                    "</ul>" +
                    "<p><strong>Phone:</strong> +994 50 346 57 07 &nbsp;·&nbsp; <strong>Office Hours:</strong> Friday, 14:00–17:00</p>" +
                    "<p><strong>Family Status:</strong> Married, with two sons.</p>",
                educations: [
                    {
                        id: 1,
                        university: "Leningrad Institute of Electronics, Faculty of Automation and Computer Engineering",
                        degree: "Specialty “Automation and Telemechanics” (higher education)",
                        start_year: "1980",
                        end_year: "1986",
                    },
                    {
                        id: 2,
                        university: "Institute of Informatics and Automation, USSR Academy of Sciences (Leningrad)",
                        degree: "Postgraduate studies — Candidate of Technical Sciences",
                        start_year: "1988",
                        end_year: "1991",
                    },
                ],
                research_areas: [
                    { id: 1, content: "Automation and process control systems" },
                    { id: 2, content: "Modeling and simulation of industrial processes" },
                    { id: 3, content: "SCADA and industrial control systems" },
                    { id: 4, content: "Digital and intelligent control systems" },
                    { id: 5, content: "Application of artificial intelligence algorithms in technical systems" },
                    { id: 6, content: "Microprocessor systems and industrial electronics applications" },
                    { id: 7, content: "Robotics and automated technological systems" },
                    { id: 8, content: "Measurement systems and sensor technologies" },
                    { id: 9, content: "Process optimization and adaptive control methods" },
                    { id: 10, content: "Educational technologies and modernization of engineering education" },
                ],
            },
            objectives: [
                { id: 1, content: "Develop and implement modern, competitive educational programs in industrial design and technologies." },
                { id: 2, content: "Optimize green and sustainable production in mechanical engineering through digital technologies and mathematical modeling." },
                { id: 3, content: "Conduct scientifically grounded research into the mechanical and thermodynamic parameters of hydromechanical installations." },
                { id: 4, content: "Diagnose and control technical systems and processes through artificial intelligence algorithms." },
                { id: 5, content: "Develop methodologies for intelligent diagnostics and predictive maintenance to enhance the reliability of robotic systems and technological machines." },
                { id: 6, content: "Study advanced materials and develop modern metallurgical technologies." },
            ],
            research_directions: [
                { id: 1, content: "Theory and application of mechanical systems; structural design of machine components" },
                { id: 2, content: "Materials science, metallurgy, welding and casting processes" },
                { id: 3, content: "Manufacturing technologies; surface strengthening and functionalization" },
                { id: 4, content: "Production automation and control of technological processes" },
                { id: 5, content: "CAD/CAM/CAE systems, digital prototyping and 3D manufacturing" },
                { id: 6, content: "Digital twin, intelligent manufacturing systems and efficient use of energy resources" },
            ],
            staff: [
                {
                    id: 1,
                    full_name: "Ibrahimov Bahadur Nazim oghlu",
                    email: "bahaduribrahimov@gmail.com",
                    phone: "+994505744455",
                    image_url: `${RI_MEDIA}/sdt/${encodeURIComponent("Ibrahimov Bahadur.png")}`,
                    title: "Lead Researcher — Robotics, industrial robots, collaborative robots, automation. PhD in Technical Sciences.",
                },
                {
                    id: 2,
                    full_name: "Abbas Alili Ilham oghlu",
                    email: "abbas.alili@aztu.edu.az",
                    phone: "+994505641015",
                    image_url: `${RI_MEDIA}/sdt/${encodeURIComponent("Abbas Əlili.png")}`,
                    title: "Researcher — Robotics, automation, medical applications of artificial intelligence. PhD in Technical Sciences.",
                },
            ],
            created_at: NOW,
            updated_at: NOW,
        },
    },
    {
        az: {
            id: 4,
            institute_code: "logistika",
            image_url: `${RI_MEDIA}/logistika/logo.jpg`,
            name: "Logistika və Nəqliyyat İnstitutu",
            about:
                "<p>Azərbaycan Texniki Universitetinin Logistika və Nəqliyyat İnstitutu 2021-ci ilin sentyabr ayında yaradılmışdır. İnstitut yük və sərnişin daşımalarının təşkili, yol hərəkətinin təşkili və təhlükəsizliyi, logistik proseslərin idarə olunması istiqamətində tədqiqat strukturu kimi fəaliyyət göstərir. İnstitutun tərkibinə Azərbaycan Respublikasında yol hərəkətinin təhlükəsizliyinə dair “2019–2023-cü illər üçün Dövlət Proqramı” çərçivəsində yaradılmış “Yol hərəkətinin təşkili və təhlükəsizliyi Elmi-Tədqiqat Mərkəzi”, ERASMUS proqramı çərçivəsində yaradılmış CRENG Service Office və PTV laboratoriyası daxildir.</p>" +
                "<p>Logistika və Nəqliyyat İnstitutu şəhər, region, ölkə və beynəlxalq səviyyələrdə nəqliyyat problemlərinin müasir yanaşmalara əsaslanan həllinə həsr olunmuş tədqiqatlar aparılmasını, ölkənin logistika və nəqliyyat sahəsindəki prioritetlərinə uyğun elmi nəticələrin əldə olunmasını hədəfləyir. Tədqiqat istiqamətlərinə nəqliyyat axınlarının öyrənilməsi və modelləşdirilməsi, daşınma proseslərinin öyrənilməsi, modelləşdirilməsi və idarə olunması, nəqliyyat texnologiyalarının təkmilləşdirilməsi və işlənib hazırlanması daxildir.</p>",
            vision:
                "Yol hərəkətinin təşkili və təhlükəsizliyi, daşınma proseslərinin təşkili və idarə edilməsi, logistik şəbəkələrin qurulması üzrə aparıcı regional tədqiqat mərkəzi kimi ölkənin və regionun nəqliyyat sahəsində inkişafına töhfə vermək, yeni həllər yarada bilən yüksək ixtisaslı tədqiqatçılar hazırlamaq.",
            mission:
                "Qabaqcıl texnologiyaların inteqrasiyasını təmin etməklə ölkənin və regionun strateji nəqliyyat və logistika problemlərinin elmi əsaslandırılmış və orijinal həllərini hazırlamaq, təhsilin və sənayenin inkişafını dəstəkləmək üçün əlverişli tədqiqat mühitini formalaşdırmaq.",
            director: {
                id: 5,
                full_name: "Daşdəmirov Fuad Səmid oğlu",
                email: "fuad.dashdamirov@aztu.edu.az",
                office: "V korpus, 112-ci otaq",
                image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Daşdəmirov Fuad.jpg")}`,
                title: "Texnika elmləri doktoru, dosent",
                biography:
                    "<p>Daşdəmirov Fuad Səmid oğlu şəhər ictimai nəqliyyatı, daşınma proseslərinin idarə olunması sahələri üzrə ixtisaslaşmış alimdir. O, logistika və nəqliyyat texnologiyaları, nəqliyyat mühəndisliyi istiqamətlərində elmi və pedaqoji fəaliyyət göstərir.</p>" +
                    "<p>Fuad Səmid oğlu Daşdəmirovun elmi tədqiqatlarının əsas istiqamətlərinə şəhər nəqliyyatının simulyasiya modelləşdirilməsi, nəqliyyat mobilliyinin təmin edilməsi, nəqliyyatda çoxfaktorlu seçim metodlarının tətbiqi, nəqliyyatda iş rejimlərinin koordinasiya texnologiyaları daxildir. Bu sahələr üzrə apardığı tədqiqatların nəticələri nüfuzlu elmi jurnallarda dərc olunmuşdur. 100-dən çox elmi əsərin, o cümlədən 3 kitabın, bir beynəlxalq kollektiv monoqrafiyanın müəllifidir.</p>" +
                    "<p>Azərbaycan Respublikasının 44 şəhərində şəhərdaxili hərəkət (mobillik) planlarının hazırlanması, Baku Bus MMC şirkətində ixtisasartırma kurslarının təşkili ilə əlaqədar layihələrə rəhbərlik etmiş, Erasmus (“Nəqliyyat servisləri üçün risk və böhran mühəndisliyi” magistr proqramı) layihəsinin iştirakçısı olmuşdur.</p>" +
                    "<p>2021-ci ildən Azərbaycan Texniki Universitetinin Logistika və Nəqliyyat İnstitutunun direktoru vəzifəsində çalışır. 2020-ci ildə Azərbaycan Respublikası Prezidentinin Sərəncamına əsasən “Tərəqqi” medalı ilə təltif edilmişdir.</p>" +
                    "<p><strong>Telefon:</strong> +994 50 300 99 73</p>",
                educations: [
                    { id: 1, university: "Azərbaycan Texniki Universiteti", degree: "Mühəndis", start_year: "1989", end_year: "1994" },
                    { id: 2, university: "Azərbaycan Texniki Universiteti", degree: "Elmlər namizədi (PhD)", start_year: "", end_year: "2012" },
                    { id: 3, university: "Azərbaycan Texniki Universiteti", degree: "Elmlər doktoru (DSc)", start_year: "", end_year: "2026" },
                ],
                research_areas: [
                    { id: 1, content: "Nəqliyyatda simulyasiya modelləşdirilməsi" },
                    { id: 2, content: "Daşıma proseslərinin idarə edilməsi" },
                    { id: 3, content: "Nəqliyyat mobilliyinin artırılması" },
                    { id: 4, content: "Logistik şəbəkələrin dizaynı" },
                    { id: 5, content: "Nəqliyyatda hərəkətin təşkili və təhlükəsizliyi" },
                    { id: 6, content: "Nəqliyyatda və logistikada risk və böhran menecmenti" },
                ],
            },
            objectives: [
                { id: 1, content: "Logistika və nəqliyyat sahəsində elmi tədqiqatların aparılmasında müasir simulyasiya, izləmə və idarəetmə sistemlərindən istifadə etmək." },
                { id: 2, content: "Logistika və nəqliyyat sahəsində həyata keçirilən beynəlxalq və yerli layihələrdə iştirak etmək." },
                { id: 3, content: "Doktorant, dissertant və magistrantların elmi araşdırmalarını dəstəkləmək." },
                { id: 4, content: "Sahə üzrə elmi nailiyyətləri və innovativ texnologiyaları təqib etməklə yüksək səviyyəli elmi kadrların hazırlığına kömək etmək." },
                { id: 5, content: "Logistika və nəqliyyat sahəsində innovativ texnologiyaların inteqrasiyasını təmin etmək." },
            ],
            research_directions: [
                { id: 1, content: "Logistika və nəqliyyat sahəsində güclü elmi potensialın formalaşdırılması" },
                { id: 2, content: "Magistratura və doktorantura səviyyəsində proqramların hazırlanması və yenilənməsi" },
                { id: 3, content: "Beynəlxalq konfrans, seminar və layihələrdə iştirak" },
                { id: 4, content: "Yerli və xarici tədqiqat mərkəzləri ilə tərəfdaşlığın qurulması və inkişaf etdirilməsi" },
                { id: 5, content: "AzTU-nun strateji hədəflərinə uyğun gələn digər fəaliyyətlərdə iştirak" },
            ],
            staff: [
                {
                    id: 1,
                    full_name: "Tağızadə Əsgər Həbib oğlu",
                    email: "tagizade.asger@aztu.edu.az",
                    phone: "+994503313186",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Tağızadə Əsgər.jpg")}`,
                    title: "Tədqiqatçı professor — Texnika elmləri doktoru, professor",
                },
                {
                    id: 2,
                    full_name: "Əliyev Əlləz Hacıəhməd oğlu",
                    email: "allaz.aliyev@aztu.edu.az",
                    phone: "+994503272792",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Əliyev Əlləz.jpg")}`,
                    title: "“Yol hərəkətinin təşkili və təhlükəsizliyi” Elmi-Tədqiqat Mərkəzinin rəhbəri — Texnika üzrə fəlsəfə doktoru, dosent",
                },
                {
                    id: 3,
                    full_name: "Cavadlı Ülvi Yusif oğlu",
                    email: "ulvi.javadli@aztu.edu.az",
                    phone: "+994773430081",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Cavadlı Ülvi.jpg")}`,
                    title: "Böyük elmi işçi",
                },
                {
                    id: 4,
                    full_name: "Verdiyev Turan Şəmsi oğlu",
                    email: "turan.verdiyev@aztu.edu.az",
                    phone: "+994507628062",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Verdiyev Turan.jpg")}`,
                    title: "Böyük elmi işçi",
                },
                {
                    id: 5,
                    full_name: "Allahverdiyev Röyal Şöhrət oğlu",
                    email: "royal.allahverdiyev@aztu.edu.az",
                    phone: "+994773093343",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Allahverdiyev Röyal.jpg")}`,
                    title: "Böyük elmi işçi",
                },
                {
                    id: 6,
                    full_name: "Məmmədov Məmməd Qurban oğlu",
                    email: "memmed.memmedov@aztu.edu.az",
                    phone: "+994515266641",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Məmmədov Məmməd.png")}`,
                    title: "Elmi işçi",
                },
            ],
            created_at: NOW,
            updated_at: NOW,
        },
        en: {
            id: 4,
            institute_code: "logistika",
            image_url: `${RI_MEDIA}/logistika/logo.jpg`,
            name: "Logistics and Transport Institute",
            about:
                "<p>The Logistics and Transport Institute of Azerbaijan Technical University was established in September 2021. The institute operates as a research structure in the field of organization of cargo and passenger transportation, organization and safety of road traffic, and management of logistics processes. The institute includes the Scientific Research Center for Organization and Safety of Road Traffic — established within the framework of the “State Program for 2019–2023” on road traffic safety in the Republic of Azerbaijan — the CRENG Service Office established under the ERASMUS program, and the PTV laboratory.</p>" +
                "<p>The Logistics and Transport Institute aims to conduct research dedicated to solving transport problems at the city, regional, national and international levels based on modern approaches, and to obtain scientific results aligned with the country's priorities in logistics and transport. Research areas include the study and modeling of transport flows; the study, modeling and management of transportation processes; and the development and improvement of transport technologies.</p>",
            vision:
                "To contribute to the development of the country and the region in the field of transport as a leading regional research center for the organization and safety of road traffic, the organization and management of transportation processes, and the establishment of logistics networks, and to train highly qualified researchers who can create new solutions.",
            mission:
                "To develop scientifically grounded and original solutions to the strategic transport and logistics problems of the country and the region by ensuring the integration of advanced technologies, and to form a favorable research environment that supports the development of education and industry.",
            director: {
                id: 5,
                full_name: "Fuad Samid Dashdamirov",
                email: "fuad.dashdamirov@aztu.edu.az",
                office: "Building V, Room 112",
                image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Daşdəmirov Fuad.jpg")}`,
                title: "Doctor of Technical Sciences, Associate Professor",
                biography:
                    "<p>Fuad Dashdamirov is a scientist specializing in urban public transport and the management of transportation processes. He carries out scientific and pedagogical activities in the areas of logistics and transport technologies, and transport engineering.</p>" +
                    "<p>The main directions of Fuad Dashdamirov's scientific research include simulation modeling of urban transport, ensuring transport mobility, application of multifactor selection methods in transport, and coordination technologies of work regimes in transport. The results of his research in these areas have been published in reputable scientific journals. He is the author of more than 100 scientific works, including 3 books and one international collective monograph.</p>" +
                    "<p>He has led projects related to the preparation of urban movement (mobility) plans in 44 cities of the Republic of Azerbaijan, the organization of advanced training courses at Baku Bus LLC, and was a participant in the Erasmus project “Crisis and Risk Engineering for Transport Services” (master's program).</p>" +
                    "<p>Since 2021, he has served as Director of the Logistics and Transport Institute of Azerbaijan Technical University. In 2020, he was awarded the “Progress” medal by Decree of the President of the Republic of Azerbaijan.</p>" +
                    "<p><strong>Phone:</strong> +994 50 300 99 73</p>",
                educations: [
                    { id: 1, university: "Azerbaijan Technical University", degree: "Engineer", start_year: "1989", end_year: "1994" },
                    { id: 2, university: "Azerbaijan Technical University", degree: "Candidate of Sciences (PhD)", start_year: "", end_year: "2012" },
                    { id: 3, university: "Azerbaijan Technical University", degree: "Doctor of Sciences (DSc)", start_year: "", end_year: "2026" },
                ],
                research_areas: [
                    { id: 1, content: "Simulation modeling in transport" },
                    { id: 2, content: "Management of transportation processes" },
                    { id: 3, content: "Increasing transport mobility" },
                    { id: 4, content: "Design of logistics networks" },
                    { id: 5, content: "Organization and safety of traffic in transport" },
                    { id: 6, content: "Crisis and risk management in transport and logistics" },
                ],
            },
            objectives: [
                { id: 1, content: "Use modern simulation, tracking, and management systems in conducting scientific research in logistics and transport." },
                { id: 2, content: "Participate in international and local projects implemented in the field of logistics and transport." },
                { id: 3, content: "Support the scientific research of doctoral, dissertation and master's students." },
                { id: 4, content: "Assist in training high-level scientific personnel by following scientific achievements and innovative technologies in the field." },
                { id: 5, content: "Ensure the integration of innovative technologies in logistics and transport." },
            ],
            research_directions: [
                { id: 1, content: "Formation of strong scientific potential in the field of logistics and transport" },
                { id: 2, content: "Development and updating of programs at the master's and doctoral levels" },
                { id: 3, content: "Participation in international conferences, seminars and projects" },
                { id: 4, content: "Establishment and development of partnerships with local and foreign research centers" },
                { id: 5, content: "Participation in other activities consistent with AzTU's strategic goals" },
            ],
            staff: [
                {
                    id: 1,
                    full_name: "Asgar Habib Tagizade",
                    email: "tagizade.asger@aztu.edu.az",
                    phone: "+994503313186",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Tağızadə Əsgər.jpg")}`,
                    title: "Researcher Professor — Doctor of Technical Sciences, Professor",
                },
                {
                    id: 2,
                    full_name: "Allaz Hajiahmad Aliyev",
                    email: "allaz.aliyev@aztu.edu.az",
                    phone: "+994503272792",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Əliyev Əlləz.jpg")}`,
                    title: "Head of the Scientific Research Center “Road Traffic Organization and Safety” — PhD in Engineering, Associate Professor",
                },
                {
                    id: 3,
                    full_name: "Ulvi Yusif Javadli",
                    email: "ulvi.javadli@aztu.edu.az",
                    phone: "+994773430081",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Cavadlı Ülvi.jpg")}`,
                    title: "Senior Researcher",
                },
                {
                    id: 4,
                    full_name: "Turan Shamsi Verdiyev",
                    email: "turan.verdiyev@aztu.edu.az",
                    phone: "+994507628062",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Verdiyev Turan.jpg")}`,
                    title: "Senior Researcher",
                },
                {
                    id: 5,
                    full_name: "Royal Shohrat Allahverdiyev",
                    email: "royal.allahverdiyev@aztu.edu.az",
                    phone: "+994773093343",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Allahverdiyev Röyal.jpg")}`,
                    title: "Senior Researcher",
                },
                {
                    id: 6,
                    full_name: "Mammad Gurban Mammadov",
                    email: "memmed.memmedov@aztu.edu.az",
                    phone: "+994515266641",
                    image_url: `${RI_MEDIA}/logistika/${encodeURIComponent("Məmmədov Məmməd.png")}`,
                    title: "Researcher",
                },
            ],
            created_at: NOW,
            updated_at: NOW,
        },
    },
];

function findRecordBySlug(slug: string): StaticInstituteRecord | undefined {
    return STATIC_INSTITUTES.find(
        (rec) => slugify(rec.az.name) === slug || slugify(rec.en.name) === slug,
    );
}

function findRecordByCode(code: string): StaticInstituteRecord | undefined {
    return STATIC_INSTITUTES.find((rec) => rec.az.institute_code === code);
}

export const getResearchInstitutes = async (
    params: { start?: number; end?: number; lang?: Lang } = {},
): Promise<ResearchInstituteSummary[]> => {
    const { lang = "az" } = params;
    return STATIC_INSTITUTES.map((rec) => {
        const data = rec[lang];
        return {
            id: data.id,
            institute_code: data.institute_code,
            name: data.name,
            image_url: data.image_url,
        };
    });
};

export const translateInstituteSlug = (slug: string, toLang: Lang): string => {
    const record = findRecordBySlug(slug);
    if (!record) return slug;
    return slugify(record[toLang].name);
};

export const getResearchInstituteBySlug = async (
    slug: string,
    lang: Lang = "az",
): Promise<ResearchInstituteDetail | null> => {
    const record = findRecordBySlug(slug);
    if (!record) return null;
    return record[lang];
};

export const getResearchInstituteByCode = async (
    instituteCode: string,
    lang: Lang = "az",
): Promise<ResearchInstituteDetail | null> => {
    const record = findRecordByCode(instituteCode);
    if (!record) return null;
    return record[lang];
};
