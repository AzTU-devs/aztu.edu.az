import type { StaticImageData } from "next/image";
import Slide1 from "@/../public/slide-1.png";
import Slide2 from "@/../public/slide-2.png";
import Slide3 from "@/../public/slide-3.png";
import Slide4 from "@/../public/slide-4.png";
import News2 from "@/../public/news/news-2.png";
import News4 from "@/../public/news/news-4.png";
import type { Locale } from "@/locales";
import type { Lang } from "@/util/apiClient";

export interface NavSubItem {
    title: string;
    slug: string;
}

export interface NavItem {
    title: string;
    slug?: string;
    description?: string;
    content?: string;
    subItems?: NavSubItem[];
}

export interface NavSection {
    key: string;
    label: string;
    basePath: string;
    image: StaticImageData | string;
    items: NavItem[];
}

/** Returns the nav sections with labels translated via the given locale. */
export function getNavSections(t: Locale, lang: Lang): NavSection[] {
    const n = t.nav.items;
    return [
        {
            key: "about",
            label: t.nav.sections.about,
            basePath: "/about",
            image: Slide1,
            items: [
                {
                    title: n.visionMission,
                    subItems: [
                        { title: n.historyOfAztu, slug: lang === "az" ? "vizyon-ve-missiya/aztu-nun-tarixi" : "vision-mission/history-of-aztu" },
                        { title: n.vision, slug: lang === "az" ? "vizyon-ve-missiya/vizyon" : "vision-mission/vision" },
                        { title: n.mission, slug: lang === "az" ? "vizyon-ve-missiya/missiya" : "vision-mission/mission" },
                        { title: n.strategicPlan, slug: lang === "az" ? "vizyon-ve-missiya/strateji-plan" : "vision-mission/strategic-plan" },
                        { title: n.anniversaryFilm, slug: lang === "az" ? "vizyon-ve-missiya/75-illik-yubiley-filmi" : "vision-mission/75th-anniversary-film" },
                    ],
                },
                {
                    title: n.leadershipGovernance,
                    subItems: [
                        { title: n.rector, slug: lang === "az" ? "rehbetlik-ve-idareetme/rektor" : "leadership-and-management/rector" },
                        { title: n.viceRector, slug: "vice-rector" },
                        { title: n.scientificBoard, slug: "scientific-board" },
                    ],
                },
                {
                    title: n.affiliatedEntities,
                    subItems: [
                        { title: n.tau, slug: "tau" },
                        { title: n.iit, slug: "iit" },
                        { title: n.ics, slug: "ics" },
                        { title: n.bakuTechnicalColleges, slug: "baku-technical-colleges" },
                        { title: n.bakuStateColleges, slug: "baku-state-colleges" },
                    ],
                },
                {
                    title: n.policiesDocuments,
                    subItems: [
                        { title: n.generalPolicies, slug: "general-policies" },
                        { title: n.academicPolicies, slug: "academic-policies" },
                        { title: n.sustainabilityPolicies, slug: "sustainability-policies" },
                        { title: n.procedureGuidelines, slug: "procedure-guidelines" },
                    ],
                },
            ],
        },
        {
            key: "academics",
            label: t.nav.sections.academics,
            basePath: lang === "az" ? "/akademik" : "/academic",
            image: Slide2,
            items: [
                { title: n.faculties, slug: lang === "az" ? "fakulteler" : "faculties" },
                { title: n.cafedras, slug: "cafedras" },
                {
                    title: n.higherEducationInstitutes,
                    subItems: [
                        { title: n.bakuTechnicalColleges, slug: "baku-technical-colleges" },
                        { title: n.bakuStateCollegesComm, slug: "baku-state-colleges" },
                        { title: n.mba, slug: "mba" },
                        { title: n.lifeLongLearning, slug: "life-long-learning" },
                    ],
                },
            ],
        },
        {
            key: "administration",
            label: t.nav.sections.administration,
            basePath: "/administration",
            image: Slide3,
            items: [
                {
                    title: n.departments,
                    subItems: [
                        { title: n.researchDevelopment, slug: "research-development" },
                        { title: n.internationalAffairs, slug: "international-affairs" },
                    ],
                },
                { title: n.secretariesCounsels, slug: "secretaries-counsels" },
            ],
        },
        {
            key: "students",
            label: t.nav.sections.students,
            basePath: "/students",
            image: Slide4,
            items: [
                {
                    title: n.academicCalendar,
                    subItems: [
                        { title: n.academicCalendar2026, slug: "academic-calendar-2026" },
                        { title: n.academicCalendar2025, slug: "academic-calendar-2025" },
                    ],
                },
                {
                    title: n.undergraduate,
                    subItems: [
                        { title: n.specialties, slug: "undergraduate-specialties" },
                        { title: n.curriculum, slug: "undergraduate-curriculum" },
                        { title: n.learningOutcomes, slug: "undergraduate-outcomes" },
                        { title: n.tuitionFees, slug: "undergraduate-tuition" },
                    ],
                },
                {
                    title: n.postgraduates,
                    subItems: [
                        { title: n.specialties, slug: "postgraduate-specialties" },
                        { title: n.curriculum, slug: "postgraduate-curriculum" },
                        { title: n.cdio, slug: "cdio" },
                        { title: n.internationalStudents, slug: "international-students" },
                        { title: n.exchangePrograms, slug: "exchange-programs" },
                        { title: n.lmsGuidelines, slug: "lms-guidelines" },
                    ],
                },
            ],
        },
        {
            key: "research",
            label: t.nav.sections.research,
            basePath: lang === "az" ? "/tedqiqat" : "/research",
            image: News2,
            items: [
                {
                    title: n.researchActivities,
                    slug: lang === "az" ? "tedqiqat-fealiyyeti" : "research-activity",
                    subItems: [
                        { title: n.researchInstitutes, slug: lang === "az" ? "tedqiqat-institutlari" : "research-institutes" },
                        { title: n.researchPriorities, slug: "tedqiqat-prioritetleri" },
                        { title: lang === "az" ? "Tədqiqat Layihələri" : "Research Projects", slug: lang === "az" ? "tedqiqat-layiheleri" : "research-projects" },
                        { title: lang === "az" ? "Əqli Mülkiyyət və Patentlər" : "Intellectual Property and Patents", slug: lang === "az" ? "eqli-mulkiyyet-ve-patentler" : "intellectual-property-and-patents" },
                    ],
                },
                {
                    title: lang === "az" ? "Performans və Qiymətləndirmə" : "Performance and Evaluation",
                    slug: lang === "az" ? "performans-ve-qiymetlendirme" : "performance-and-evaluation",
                    subItems: [
                        { 
                            title: lang === "az" ? "Daxili Qrant Proqramları" : "Internal Grant Programs", 
                            slug: "daxili-qrant-proqramlari" 
                        },
                    ],
                },
                {
                    title: lang === "az" ? "Konfranslar və Tədbirlər" : "Conferences and Events",
                    slug: lang === "az" ? "konfranslar-ve-tedbirler" : "conferences-and-events",
                    subItems: [
                        { 
                            title: lang === "az" ? "Seminarlar və Təlimlər" : "Seminars and Trainings", 
                            slug: "seminarlar-ve-telimler" 
                        },
                    ],
                },
            ],
        },
        {
            key: "community",
            label: t.nav.sections.community,
            basePath: lang === "az" ? "/icma" : "/community",
            image: News4,
            items: [
                {
                    title: lang === "az" ? "AzTU-nun Fəxriləri" : "AzTU's Honors",
                    subItems: [
                        { 
                            title: lang === "az" ? "Fəxri Doktorlar" : "Honorary Doctors", 
                            slug: lang === "az" ? "aztu-nun-fexrileri/fexri-doktorlar" : "aztus-honors/honorary-doctors" 
                        },
                        { 
                            title: lang === "az" ? "Qəhrəmanlarımız" : "Our Heroes", 
                            slug: lang === "az" ? "aztu-nun-fexrileri/qehremanlarimiz" : "aztus-honors/our-heroes" 
                        },
                    ],
                },
                {
                    title: n.campusLife,
                    subItems: [
                        { title: n.studentLife, slug: "student-life" },
                        { title: n.clubs, slug: "clubs" },
                        { title: n.sport, slug: "sport" },
                        { title: n.culturalEvents, slug: "cultural-events" },
                        { title: n.aztuPolyclinic, slug: "polyclinic" },
                        { title: n.tradeUnion, slug: "trade-union" },
                        { title: n.studentTradeUnion, slug: "student-trade-union" },
                        { title: n.studentYouthOrg, slug: "student-youth-organization" },
                    ],
                },
                {
                    title: n.universityCooperation,
                    subItems: [
                        { title: n.collaborations, slug: "collaborations" },
                    ],
                },
            ],
        },
    ];
}

/** English static fallback — used as the default before translations load. */
export const NAV_SECTIONS: NavSection[] = [
    {
        key: "about",
        label: "ABOUT",
        basePath: "/about",
        image: Slide1,
        items: [
            {
                title: "Vision & Mission",
                subItems: [
                    { title: "History of AzTU", slug: "vision-mission/history-of-aztu" },
                    { title: "Vision", slug: "vision-mission/vision" },
                    { title: "Mission", slug: "vision-mission/mission" },
                    { title: "Strategic Plan", slug: "vision-mission/strategic-plan" },
                    { title: "75th Anniversary Film", slug: "vision-mission/75th-anniversary-film" },
                ],
            },
            {
                title: "Leadership & Governance",
                subItems: [
                    { title: "Rector", slug: "leadership-and-management/rector" },
                    { title: "Vice-Rector", slug: "vice-rector" },
                    { title: "Scientific Board", slug: "scientific-board" },
                ],
            },
            {
                title: "Affiliated Entities",
                subItems: [
                    { title: "Turkish-Azerbaijan University (TAU)", slug: "tau" },
                    { title: "Institute of Information Technology", slug: "iit" },
                    { title: "Institute of Control Systems", slug: "ics" },
                    { title: "Baku Technical Colleges", slug: "baku-technical-colleges" },
                    { title: "Baku State Colleges", slug: "baku-state-colleges" },
                ],
            },
            {
                title: "Policies & Documents",
                subItems: [
                    { title: "General Policies", slug: "general-policies" },
                    { title: "Academic Policies", slug: "academic-policies" },
                    { title: "Sustainability Policies", slug: "sustainability-policies" },
                    { title: "Procedure & Guidelines", slug: "procedure-guidelines" },
                ],
            },
        ],
    },
    {
        key: "academics",
        label: "ACADEMICS",
        basePath: "/academic",
        image: Slide2,
        items: [
            { title: "Faculties", slug: "faculties" },
            { title: "Cafedras", slug: "cafedras" },
            {
                title: "Higher Education Institutes",
                subItems: [
                    { title: "Baku Technical Colleges", slug: "baku-technical-colleges" },
                    { title: "Baku State Colleges of Communication and Transport", slug: "baku-state-colleges" },
                    { title: "MBA", slug: "mba" },
                    { title: "Life Long Learning", slug: "life-long-learning" },
                ],
            },
        ],
    },
    {
        key: "administration",
        label: "ADMINISTRATION",
        basePath: "/administration",
        image: Slide3,
        items: [
            {
                title: "Departments",
                subItems: [
                    { title: "Research Development and Reputation", slug: "research-development" },
                    { title: "International Affairs", slug: "international-affairs" },
                ],
            },
            { title: "Secretaries and Counsels", slug: "secretaries-counsels" },
        ],
    },
    {
        key: "students",
        label: "STUDENTS",
        basePath: "/students",
        image: Slide4,
        items: [
            {
                title: "Academic Calendar",
                subItems: [
                    { title: "2026-2027 Academic Calendar", slug: "academic-calendar-2026" },
                    { title: "2025-2026 Academic Calendar", slug: "academic-calendar-2025" },
                ],
            },
            {
                title: "Undergraduate",
                subItems: [
                    { title: "Specialties", slug: "undergraduate-specialties" },
                    { title: "Curriculum", slug: "undergraduate-curriculum" },
                    { title: "Learning Outcomes", slug: "undergraduate-outcomes" },
                    { title: "Tuition Fees", slug: "undergraduate-tuition" },
                ],
            },
            {
                title: "Postgraduates",
                subItems: [
                    { title: "Specialties", slug: "postgraduate-specialties" },
                    { title: "Curriculum", slug: "postgraduate-curriculum" },
                    { title: "CDIO", slug: "cdio" },
                    { title: "International Students Unit", slug: "international-students" },
                    { title: "Exchange Programs", slug: "exchange-programs" },
                    { title: "LMS Guidelines", slug: "lms-guidelines" },
                ],
            },
        ],
    },
    {
        key: "research",
        label: "RESEARCH",
        basePath: "/research",
        image: News2,
        items: [
            {
                title: "Research Activities",
                slug: "research-activity",
                subItems: [
                    { title: "Research Institutes", slug: "research-institutes" },
                ],
            },
            { title: "Research Priorities", slug: "priorities" },
        ],
    },
    {
        key: "community",
        label: "COMMUNITY",
        basePath: "/community",
        image: News4,
        items: [
            {
                title: "AzTU's Honors",
                subItems: [
                    { title: "Honorary Doctors", slug: "aztus-honors/honorary-doctors" },
                    { title: "Our Heroes", slug: "aztus-honors/our-heroes" },
                ],
            },
            {
                title: "Campus Life",
                subItems: [
                    { title: "Student Life", slug: "student-life" },
                    { title: "Clubs", slug: "clubs" },
                    { title: "Sport", slug: "sport" },
                    { title: "Cultural Events", slug: "cultural-events" },
                    { title: "AzTU Polyclinic", slug: "polyclinic" },
                    { title: "Trade Union", slug: "trade-union" },
                    { title: "Student Trade Union", slug: "student-trade-union" },
                    { title: "Student Youth Organization", slug: "student-youth-organization" },
                ],
            },
            {
                title: "University Cooperation",
                subItems: [
                    { title: "Collaborations", slug: "collaborations" },
                ],
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
