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
