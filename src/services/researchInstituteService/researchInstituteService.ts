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
