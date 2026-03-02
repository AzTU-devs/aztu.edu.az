export interface NavSubItem {
    title: string;
    slug: string;
}

export interface NavItem {
    title: string;
    slug?: string;          // if set, item itself is a direct link
    subItems?: NavSubItem[]; // if set, renders as category header with sub-links
}

export interface NavSection {
    key: string;
    label: string;
    basePath: string;
    items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
    {
        key: "about",
        label: "ABOUT",
        basePath: "/about",
        items: [
            { title: "Vision & Mission", slug: "vision-mission" },
            { title: "History of AzTU", slug: "history" },
            {
                title: "Leadership & Governance",
                subItems: [
                    { title: "Rector", slug: "leadership/rector" },
                    { title: "Vice-Rector", slug: "leadership/vice-rector" },
                    { title: "Scientific Board", slug: "leadership/scientific-board" },
                ],
            },
            {
                title: "TAU",
                subItems: [
                    { title: "Affiliated Institutes", slug: "tau/affiliated-institutes" },
                ],
            },
        ],
    },
    {
        key: "academics",
        label: "ACADEMICS",
        basePath: "/academics",
        items: [
            { title: "Faculties", slug: "faculties" },
            { title: "Cafedras", slug: "cafedras" },
            {
                title: "Higher Education Institutes",
                subItems: [
                    { title: "Baku Technical Colleges", slug: "higher-education/baku-technical-colleges" },
                    { title: "Baku State Colleges of Communication and Transport", slug: "higher-education/baku-state-colleges" },
                    { title: "MBA", slug: "higher-education/mba" },
                    { title: "Life Long Learning", slug: "higher-education/life-long-learning" },
                ],
            },
        ],
    },
    {
        key: "administration",
        label: "ADMINISTRATION",
        basePath: "/administration",
        items: [
            {
                title: "Departments",
                subItems: [
                    { title: "Research Development and Reputation", slug: "departments/research-development" },
                    { title: "International Affairs", slug: "departments/international-affairs" },
                ],
            },
            { title: "Secretaries and Counsels", slug: "secretaries-counsels" },
        ],
    },
    {
        key: "students",
        label: "STUDENTS",
        basePath: "/students",
        items: [
            {
                title: "Academic Calendar",
                subItems: [
                    { title: "2026-2027 Academic Calendar", slug: "academic-calendar/2026-2027" },
                    { title: "2025-2026 Academic Calendar", slug: "academic-calendar/2025-2026" },
                ],
            },
            {
                title: "Undergraduate",
                subItems: [
                    { title: "Specialties", slug: "undergraduate/specialties" },
                    { title: "Curriculum", slug: "undergraduate/curriculum" },
                    { title: "Learning Outcomes", slug: "undergraduate/learning-outcomes" },
                    { title: "Tuition Fees", slug: "undergraduate/tuition-fees" },
                ],
            },
            {
                title: "Postgraduates",
                subItems: [
                    { title: "Specialties", slug: "postgraduates/specialties" },
                    { title: "Curriculum", slug: "postgraduates/curriculum" },
                    { title: "CDIO", slug: "postgraduates/cdio" },
                    { title: "International Students Unit", slug: "postgraduates/international-students-unit" },
                    { title: "Exchange Programs", slug: "postgraduates/exchange-programs" },
                    { title: "LMS Guidelines", slug: "postgraduates/lms-guidelines" },
                ],
            },
        ],
    },
    {
        key: "research",
        label: "RESEARCH",
        basePath: "/research",
        items: [
            { title: "Research Activities", slug: "activities" },
            { title: "Research Priorities", slug: "priorities" },
        ],
    },
    {
        key: "community",
        label: "COMMUNITY",
        basePath: "/community",
        items: [
            {
                title: "Campus Life",
                subItems: [
                    { title: "Student Life", slug: "campus-life/student-life" },
                    { title: "Clubs", slug: "campus-life/clubs" },
                    { title: "Sport", slug: "campus-life/sport" },
                    { title: "Cultural Events", slug: "campus-life/cultural-events" },
                    { title: "AzTU Polyclinic", slug: "campus-life/polyclinic" },
                    { title: "Trade Union", slug: "campus-life/trade-union" },
                    { title: "Student Trade Union", slug: "campus-life/student-trade-union" },
                    { title: "Student Youth Organization", slug: "campus-life/student-youth-organization" },
                ],
            },
            {
                title: "University Cooperation",
                subItems: [
                    { title: "Collaborations", slug: "cooperation/collaborations" },
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
