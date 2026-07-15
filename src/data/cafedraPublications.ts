/**
 * Static Scopus / Web of Science publication lists per cafedra (keyed by
 * `cafedra_code`). The public cafedra API does not expose a publications field,
 * so these curated lists are rendered on the cafedra "Elmi fəaliyyət /
 * Scientific Activity" page. Publication titles, author lists and journal names
 * are kept verbatim (they are proper nouns and are not translated); only the
 * surrounding UI chrome is localized in the page component.
 */

export type PublicationIndex = "Scopus" | "Web of Science" | "Scopus / Web of Science";
export type PublicationQuartile = "Q1" | "Q2" | "Q3" | "Q4";

export interface CafedraPublication {
    no: number;
    title: string;
    authors: string;
    /** Country of the publisher/journal, in Azerbaijani (may be empty). */
    country?: string;
    journal: string;
    /** Publication date as reported (day.month.year or month + year). */
    date: string;
    link: string;
    index: PublicationIndex;
    quartile: PublicationQuartile;
}

const KIMYA_EKO_PUBLICATIONS: CafedraPublication[] = [
    {
        no: 1,
        title:
            "Filtirləmə və koliform bakteriyalarının təmizlənməsi üçün substrat kimi biokömürdən istifadə edərək davamlı su təmizləmə prosesinin hazırlanması",
        authors: "F. Yusubov, T. Xəlil, M. İ. Əli, R. Abid, Ə. Müctəba, R. Əsğər, Ə. Cəmal, Y. Tutar, Ə. Həbib",
        country: "Kanada",
        journal: "The Canadian Journal of Chemical Engineering",
        date: "07.05.2026",
        link: "https://www.scopus.com/pages/publications/105038341146?origin=resultslist",
        index: "Scopus",
        quartile: "Q3",
    },
    {
        no: 2,
        title: "Study of the Complex Processing Technology of Alunite Using Sulfurous Acid: A Pilot Approach",
        authors: "Fakhraddin Yusubov, Jamil I. Safarov, Ali A. Ibrahimov, Subhan N. Namazov, Ramil I. Hasanov",
        journal: "Mathematical Modelling of Engineering Problems",
        date: "10.10.2025",
        link: "https://www.scopus.com/pages/publications/105030785708?origin=resultslist",
        index: "Scopus",
        quartile: "Q3",
    },
    {
        no: 3,
        title: "Enantioselective Alkoxylation of β-Substituted Aromatic Nitroalkenes with Allyl Alcohol",
        authors: "Talybov G. M.",
        country: "Macarıstan",
        journal: "Hungarian Journal of Industry and Chemistry, 2025, V. 53(2), pp. 1–6",
        date: "15.09.2025",
        link: "https://www.webofscience.com/wos/woscc/full-record/WOS:001592218500001",
        index: "Web of Science",
        quartile: "Q4",
    },
    {
        no: 4,
        title: "Pressure and Density Distribution in Axisymmetric Compactions Pressed in a Rigid Matrix",
        authors: "Jafarova A. A.",
        country: "Rusiya",
        journal: "Russian Engineering Research, Vol. 45, No. 6, pp. 780–784 (DOI: 10.3103/S1068798X25701278)",
        date: "İyun 2025",
        link: "https://www.scopus.com/pages/publications/105014719766?origin=resultslist",
        index: "Scopus",
        quartile: "Q3",
    },
    {
        no: 5,
        title:
            "Разработка и освоение технологии термического упрочнения муфтовых заготовок бурильных и обсадных труб для нефтедобычи из стали 32Г2",
        authors: "A. Mammadov, A. Jafarova, S. Rustamova",
        country: "Rusiya",
        journal: "Журнал «Черные металлы», Т. 1125, No 09, pp. 37–43 (DOI: 10.17580/chm.2025.09.06)",
        date: "06.09.2025",
        link: "https://www.scopus.com/pages/publications/105021325155?origin=resultslist",
        index: "Scopus",
        quartile: "Q4",
    },
    {
        no: 6,
        title: "Experience in Manufacturing Hot-Formed Casing Pipes from 32G2 Steel for Oil Production",
        authors: "A. Mammadov, S. Rustamova, A. Jafarova, F. Jafarov",
        country: "Rusiya",
        journal:
            "International Journal on Technical and Physical Problems of Engineering, Issue 65, Volume 17, Number 4, pp. 162–167",
        date: "30.12.2025",
        link: "https://www.scopus.com/pages/publications/105028625293?origin=resultslist",
        index: "Scopus",
        quartile: "Q3",
    },
    {
        no: 7,
        title: "Development of technology for producing a bimetallic roll for rolling construction rebars",
        authors: "Arif Mammadov, Ramin Kerimov, Faiq Guliyev, Afet Jafarova",
        country: "Estoniya",
        journal: "EUREKA: Physics and Engineering, Number 3, pp. 66–74 (DOI: 10.21303/2461-4262.2026.004206)",
        date: "Mart 2026",
        link: "https://journal.eu-jr.eu/engineering/article/view/4206",
        index: "Scopus",
        quartile: "Q3",
    },
    {
        no: 8,
        title: "Influence of Metallurgical Defects on Cracking of Oil and Gas Pipelines",
        authors: "A. T. Mammadov, N. Sh. Ismailov, A. I. Babayev, M. Ch. Hüseynov, A. A. Jafarova",
        country: "Azərbaycan",
        journal: "SOCAR Proceedings, No. 1 (2026) 099–105",
        date: "May 2026",
        link: "https://www.scopus.com/pages/publications/105034842160?origin=resultslist",
        index: "Scopus",
        quartile: "Q2",
    },
    {
        no: 9,
        title:
            "Performance Modeling and Field Validation of Decentralized Wastewater Treatment Systems in Semi-Arid Azerbaijan: A Pilot Case Study",
        authors: "Pasha N., Mikayil O., Qasimov I., Aliyev E.",
        country: "Yunanıstan",
        journal: "Global NEST Journal, 27(10)",
        date: "Dekabr 2025",
        link: "https://www.scopus.com/pages/publications/105027817306?origin=resultslist",
        index: "Scopus",
        quartile: "Q3",
    },
    {
        no: 10,
        title:
            "Adaptive Water Governance Model in Azerbaijan: Integrating International Experience under Climate and Institutional Risks",
        authors: "Pasha N., Ismayilov R. & Mikayil O.",
        country: "Yunanıstan",
        journal: "Global NEST Journal, 28(1)",
        date: "Yanvar 2026",
        link: "https://www.scopus.com/pages/publications/105030707240?origin=resultslist",
        index: "Scopus",
        quartile: "Q3",
    },
    {
        no: 11,
        title:
            "The study of the laws of convective heat transfer to optimize hydrogen production processes from carbohydrates",
        authors:
            "Sh. Mamedov, Sh. Nasirov, T. Jabarov, T. Axmedova, G. Alesgerov, S. Abdullayeva, Sh. Eyvazova, B. Mehdiyev, M. Javadova",
        country: "Rusiya",
        journal: "International Journal of Hydrogen Energy",
        date: "05.01.2026",
        link:
            "https://www.scopus.com/results/results.uri?st1=alkyl%2C+alkylphenil-substited+cyclohexsane%2C+benzimidazole%2C+benzoxazole%2C+phenylcarboxsylic+acid%2C+indole&st2=&s=TITLE%28The+study+of+the+laws+of+convective+heat+transfer+to+optimize+hydrogen+production+processes+from+carbohydrates%29&limit=10&origin=searchbasic&sort=plf-f&src=s&sot=b&sdt=b&sessionSearchId=2fac9269fce3f98f19a6e4a6cde11ede",
        index: "Scopus / Web of Science",
        quartile: "Q1",
    },
    {
        no: 12,
        title:
            "The synthesis and study of tris-(2,4-bis(trichloromethyl))-1,3,5-triazapentadienato Co(III) complex through Hirshfeld surface analysis and evaluation of its antimicrobial activity",
        authors:
            "Reyhana Ganiyeva, Gulnaz Mirzayeva, Nigar Ahmedova, Nazrin Zeynalli, Teymur Ilyasli, Arzu Niftaliyeva, Khudaverdi Ganbarov, Gaoussou Binate, Samir Aliyev",
        journal: "New Materials, Compounds and Applications",
        date: "04.12.2025",
        link: "https://www.scopus.com/pages/publications/105025718463?origin=resultslist",
        index: "Scopus",
        quartile: "Q3",
    },
    {
        no: 13,
        title:
            "Syntheses, crystal structures and Hirshfeld surface analyses of (E)-1-[2,2-dichloro-1-(2,3-dimethoxyphenyl)ethen-1-yl]-2-phenyldiazene and (E)-1-(4-chlorophenyl)-2-[2,2-dichloro-1-(2,3-dimethoxyphenyl)ethen-1-yl]diazene",
        authors:
            "Naila Mammadova, Gulnar T. Atakishiyeva, Peri A. Huseynova, Gulnara V. Babayeva, Gulnaz A. Mirzayeva, Mehmet Akkurt, Ajaya Bhattarai",
        journal: "Acta Crystallographica Section E: Crystallographic Communications",
        date: "Fevral 2026",
        link: "https://www.scopus.com/pages/publications/105029557770?origin=resultslist",
        index: "Scopus",
        quartile: "Q4",
    },
    {
        no: 14,
        title:
            "Correction to: Numerical Modelling of Adsorption Wastewater Treatment to Remove Heavy Metals (Chemistry and Technology of Fuels and Oils, (2026), 61, 6, (1483–1490), 10.1007/s10553-026-01997-1)",
        authors: "Yusubov F. V., Rzaeva A. A., Yariyeva A. M.",
        country: "Rusiya",
        journal: "Chemistry and Technology of Fuels and Oils",
        date: "18.02.2026",
        link: "https://www.scopus.com/pages/publications/105036645446?origin=resultslist",
        index: "Scopus",
        quartile: "Q3",
    },
    {
        no: 15,
        title:
            "A First-Principles Study of Structural Reorganization and Metallization in Fe-Substituted CrPSe3",
        authors: "Phuc Nguyen, Tran T. A., Tran H. C., Yariyeva A. M., Aliyev M. E., +1 author",
        country: "ABŞ",
        journal: "Advanced Physical Research",
        date: "01.02.2026",
        link: "https://www.scopus.com/pages/publications/105030681214?origin=resultslist",
        index: "Scopus",
        quartile: "Q3",
    },
    {
        no: 16,
        title:
            "Correlations of Analytical Properties of Mercury Complexes with 2-Hydroxythiophenol and Pyridine",
        authors: "Zalov A. Z., Şahverdiyeva A. F., Mammadova Sh. A., Yariyeva A. M., Abdullayeva N. Z., +1 author",
        country: "Azərbaycan",
        journal: "Chemical Problems",
        date: "07.07.2025",
        link: "https://www.scopus.com/pages/publications/105014201389?origin=resultslist",
        index: "Scopus",
        quartile: "Q4",
    },
    {
        no: 17,
        title:
            "Synthesis of bis-1,2,3-triazole derivatives based on terephthalic aldehyde and study of their biological activity",
        authors:
            "Nigar E. Ahmadova, Afaq A. Abdullayeva, Gulnar T. Atakishiyeva, Irada J. Ahmadova, Shafiga A. Ibrahimova, Sevinc H. Mukhtarova, Khatira A. Garazade, Namiq Q. Shikhaliyev, Abel M. Maharramov",
        country: "Azərbaycan",
        journal: "New Materials, Compounds and Applications, Vol. 9, No. 3, 2025, pp. 455–467 (DOI: 10.62476/nmca.93455)",
        date: "Dekabr 2025",
        link: "https://www.scopus.com/pages/publications/105027370307?origin=resultslist",
        index: "Scopus",
        quartile: "Q4",
    },
    {
        no: 18,
        title:
            "Computational assessment and molecular docking of arylhydrazone ester derivatives as SARS-CoV-2 main protease inhibitors",
        authors:
            "Gulnar Atakishiyeva, Sevinc Mukhtarova, Sima Musayeva, Ulviyya Askerova, Khatira Garazade, Samira Miriyeva, Nurana Gurbanova, Namiq Shikhaliyev, Abel Maharramov",
        country: "Azərbaycan",
        journal: "New Materials, Compounds and Applications, Vol. 10, No. 1, 2026, pp. 65–85 (DOI: 10.62476/nmca.10165)",
        date: "2026",
        link: "https://www.scopus.com/pages/publications/105035163609?origin=resultslist",
        index: "Scopus",
        quartile: "Q4",
    },
    {
        no: 19,
        title: "Adsorption and modeling of humic acid by Cu-doped metal-organic framework meta-ZIF-8",
        authors: "Sima Musayeva, Mahmoud Shams, Elmina Gadirova, Sabiya Osmanova, Zohreh Niazi, Lee D. Wilson",
        journal: "Materials Chemistry and Physics, Volume 352 (2026) 132038",
        date: "15.03.2026",
        link: "https://www.scopus.com/pages/publications/105027276187?origin=resultslist",
        index: "Web of Science",
        quartile: "Q1",
    },
    {
        no: 20,
        title:
            "Сернокислотное разложение каолиновых глин Човдарского месторождения (Азербайджан)",
        authors: "Е. Гахраманова, С. Г. Эфендиева, П. А. Надиров, С. Т. Джафарова",
        country: "Rusiya",
        journal: "Химия в интересах устойчивого развития",
        date: "Dekabr 2025",
        link: "https://www.scopus.com/pages/publications/105022938713?origin=resultslist",
        index: "Web of Science",
        quartile: "Q4",
    },
];

/** All cafedra publication lists, keyed by `cafedra_code`. */
export const CAFEDRA_PUBLICATIONS: Record<string, CafedraPublication[]> = {
    KIMYA_EKO: KIMYA_EKO_PUBLICATIONS,
};

/** Returns the publication list for a cafedra code, or an empty array. */
export function getCafedraPublications(cafedraCode: string | undefined | null): CafedraPublication[] {
    if (!cafedraCode) return [];
    return CAFEDRA_PUBLICATIONS[cafedraCode] ?? [];
}
