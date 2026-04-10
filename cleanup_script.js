const fs = require('fs');
const path = require('path');

const files = [
    'src/app/tehsil/[slug]/page.tsx',
    'src/app/sosial/[slug]/page.tsx',
    'src/app/faculties/page.tsx',
    'src/app/projects/[id]/page.tsx',
    'src/app/projects/page.tsx',
    'src/app/announcements/[id]/page.tsx',
    'src/app/announcements/page.tsx',
    'src/app/departments/[department_code]/layout.tsx',
    'src/app/departments/[department_code]/loading.tsx',
    'src/app/departments/loading.tsx',
    'src/app/departments/page.tsx',
    'src/app/about/baku-state-colleges/page.tsx',
    'src/app/about/scientific-board/page.tsx',
    'src/app/about/strategic-plan/page.tsx',
    'src/app/about/vice-rector/page.tsx',
    'src/app/about/vision/page.tsx',
    'src/app/about/rector/page.tsx',
    'src/app/about/mission/page.tsx',
    'src/app/about/baku-technical-colleges/page.tsx',
    'src/app/about/history/page.tsx',
    'src/app/about/tau/page.tsx',
    'src/app/about/ics/page.tsx',
    'src/app/about/[slug]/page.tsx',
    'src/app/about/iit/page.tsx',
    'src/app/haqqimizda/[slug]/page.tsx',
    'src/app/niye-aztu/[slug]/page.tsx',
    'src/app/news/[id]/page.tsx',
    'src/app/news/page.tsx',
    'src/app/beynelxalq/[slug]/page.tsx',
    'src/app/sustainability/[slug]/page.tsx',
    'src/app/tedqiqat/[slug]/page.tsx',
    'src/app/administration/[slug]/page.tsx',
    'src/app/struktur/[slug]/page.tsx',
    'src/app/media/[slug]/page.tsx',
    'src/components/cafedra/CafedraDetailLayout.tsx',
    'src/components/about/PolicyPDFPage.tsx',
    'src/components/pages/StaticSubPage.tsx'
];

files.forEach(file => {
    const fullPath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
        console.log(`File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');

    // Remove JSX components
    content = content.replace(/<HeaderChanger\s*\/?>\s*/g, '');
    content = content.replace(/<Footer\s*\/?>\s*/g, '');

    // Remove imports
    content = content.replace(/^import\s+HeaderChanger\s+from\s+["']@\/components\/header\/HeaderChanger["'];?\s*$/gm, '');
    content = content.replace(/^import\s+Footer\s+from\s+["']@\/components\/footer\/Footer["'];?\s*$/gm, '');

    // Cleanup empty fragments if they were wrapping only these components
    content = content.replace(/<>\s*<\/>/g, '');
    
    // Cleanup double or more newlines
    content = content.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(fullPath, content);
    console.log(`Processed: ${file}`);
});
