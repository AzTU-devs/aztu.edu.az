---

# Backend API Documentation — Menus

This document defines the backend API contracts required for the **Header Navigation**, **Footer**, and **Quick Menu** components. All endpoints must support multi-language responses via a `lang_code` query parameter.

---

## Base URL

```
/api
```

All endpoints return JSON. All responses follow this envelope:

```json
{
  "status_code": 200,
  "data": { ... }
}
```

Error responses:

```json
{
  "status_code": 404,
  "message": "Not found"
}
```

---

## 1. Header Navigation Menu

The header displays 6 top-level navigation sections. Each section has a label, a base path, and a list of items. Items can be direct links or category headers with sub-items.

### Endpoint

```
GET /api/menu/header?lang_code={lang_code}
```

| Parameter   | Type   | Required | Description                        |
|-------------|--------|----------|------------------------------------|
| `lang_code` | string | Yes      | Language code. Example: `az`, `en` |

### Response

```json
{
  "status_code": 200,
  "data": {
    "sections": [
      {
        "key": "about",
        "label": "ABOUT",
        "base_path": "/about",
        "image_url": "https://cdn.aztu.edu.az/images/slide-1.png",
        "items": [
          {
            "title": "Vision & Mission",
            "slug": "vision-mission",
            "sub_items": []
          },
          {
            "title": "History of AzTU",
            "slug": "history",
            "sub_items": []
          },
          {
            "title": "Leadership & Governance",
            "slug": null,
            "sub_items": [
              { "title": "Rector", "slug": "leadership/rector" },
              { "title": "Vice-Rector", "slug": "leadership/vice-rector" },
              { "title": "Scientific Board", "slug": "leadership/scientific-board" }
            ]
          },
          {
            "title": "TAU",
            "slug": null,
            "sub_items": [
              { "title": "Affiliated Institutes", "slug": "tau/affiliated-institutes" }
            ]
          }
        ]
      },
      {
        "key": "academics",
        "label": "ACADEMICS",
        "base_path": "/academics",
        "image_url": "https://cdn.aztu.edu.az/images/slide-2.png",
        "items": [
          { "title": "Faculties", "slug": "faculties", "sub_items": [] },
          { "title": "Cafedras", "slug": "cafedras", "sub_items": [] },
          {
            "title": "Higher Education Institutes",
            "slug": null,
            "sub_items": [
              { "title": "Baku Technical Colleges", "slug": "higher-education/baku-technical-colleges" },
              { "title": "Baku State Colleges of Communication and Transport", "slug": "higher-education/baku-state-colleges" },
              { "title": "MBA", "slug": "higher-education/mba" },
              { "title": "Life Long Learning", "slug": "higher-education/life-long-learning" }
            ]
          }
        ]
      },
      {
        "key": "administration",
        "label": "ADMINISTRATION",
        "base_path": "/administration",
        "image_url": "https://cdn.aztu.edu.az/images/slide-3.png",
        "items": [
          {
            "title": "Departments",
            "slug": null,
            "sub_items": [
              { "title": "Research Development and Reputation", "slug": "departments/research-development" },
              { "title": "International Affairs", "slug": "departments/international-affairs" }
            ]
          },
          { "title": "Secretaries and Counsels", "slug": "secretaries-counsels", "sub_items": [] }
        ]
      },
      {
        "key": "students",
        "label": "STUDENTS",
        "base_path": "/students",
        "image_url": "https://cdn.aztu.edu.az/images/slide-4.png",
        "items": [
          {
            "title": "Academic Calendar",
            "slug": null,
            "sub_items": [
              { "title": "2026-2027 Academic Calendar", "slug": "academic-calendar/2026-2027" },
              { "title": "2025-2026 Academic Calendar", "slug": "academic-calendar/2025-2026" }
            ]
          },
          {
            "title": "Undergraduate",
            "slug": null,
            "sub_items": [
              { "title": "Specialties", "slug": "undergraduate/specialties" },
              { "title": "Curriculum", "slug": "undergraduate/curriculum" },
              { "title": "Learning Outcomes", "slug": "undergraduate/learning-outcomes" },
              { "title": "Tuition Fees", "slug": "undergraduate/tuition-fees" }
            ]
          },
          {
            "title": "Postgraduates",
            "slug": null,
            "sub_items": [
              { "title": "Specialties", "slug": "postgraduates/specialties" },
              { "title": "Curriculum", "slug": "postgraduates/curriculum" },
              { "title": "CDIO", "slug": "postgraduates/cdio" },
              { "title": "International Students Unit", "slug": "postgraduates/international-students-unit" },
              { "title": "Exchange Programs", "slug": "postgraduates/exchange-programs" },
              { "title": "LMS Guidelines", "slug": "postgraduates/lms-guidelines" }
            ]
          }
        ]
      },
      {
        "key": "research",
        "label": "RESEARCH",
        "base_path": "/research",
        "image_url": "https://cdn.aztu.edu.az/images/news-2.png",
        "items": [
          { "title": "Research Activities", "slug": "activities", "sub_items": [] },
          { "title": "Research Priorities", "slug": "priorities", "sub_items": [] }
        ]
      },
      {
        "key": "community",
        "label": "COMMUNITY",
        "base_path": "/community",
        "image_url": "https://cdn.aztu.edu.az/images/news-4.png",
        "items": [
          {
            "title": "Campus Life",
            "slug": null,
            "sub_items": [
              { "title": "Student Life", "slug": "campus-life/student-life" },
              { "title": "Clubs", "slug": "campus-life/clubs" },
              { "title": "Sport", "slug": "campus-life/sport" },
              { "title": "Cultural Events", "slug": "campus-life/cultural-events" },
              { "title": "AzTU Polyclinic", "slug": "campus-life/polyclinic" },
              { "title": "Trade Union", "slug": "campus-life/trade-union" },
              { "title": "Student Trade Union", "slug": "campus-life/student-trade-union" },
              { "title": "Student Youth Organization", "slug": "campus-life/student-youth-organization" }
            ]
          },
          {
            "title": "University Cooperation",
            "slug": null,
            "sub_items": [
              { "title": "Collaborations", "slug": "cooperation/collaborations" }
            ]
          }
        ]
      }
    ]
  }
}
```

### TypeScript Interface (Frontend)

```ts
interface NavSubItem {
  title: string;
  slug: string;
}

interface NavItem {
  title: string;
  slug: string | null;   // null = category header with sub_items only
  sub_items: NavSubItem[];
}

interface NavSection {
  key: string;
  label: string;
  base_path: string;
  image_url: string;
  items: NavItem[];
}

interface HeaderMenuResponse {
  status_code: number;
  data: {
    sections: NavSection[];
  };
}
```

### Frontend URL construction

```
{base_path}/{item.slug}           → e.g. /about/history
{base_path}/{sub_item.slug}       → e.g. /about/leadership/rector
```

---

## 2. Footer Menu

The footer displays three link columns (About, Structure, Research), contact information, and social media links.

### Endpoint

```
GET /api/menu/footer?lang_code={lang_code}
```

| Parameter   | Type   | Required | Description                        |
|-------------|--------|----------|------------------------------------|
| `lang_code` | string | Yes      | Language code. Example: `az`, `en` |

### Response

```json
{
  "status_code": 200,
  "data": {
    "university_name": "Azerbaijan Technical University",
    "columns": [
      {
        "title": "Haqqımızda",
        "links": [
          { "label": "Universitetin tarixi", "url": "/about/history" },
          { "label": "Rektorun müraciəti", "url": "/about/rector-address" },
          { "label": "Fəxri məzunlarımız", "url": "/about/honorary-graduates" },
          { "label": "Fəxri doktorlarımız", "url": "/about/honorary-doctors" },
          { "label": "Qəhrəmanlarımız", "url": "/about/heroes" },
          { "label": "Şuralar", "url": "/about/councils" },
          { "label": "Kampus", "url": "/about/campus" }
        ]
      },
      {
        "title": "Struktur",
        "links": [
          { "label": "Rəhbərlik", "url": "/administration/leadership" },
          { "label": "Fakültələr", "url": "/academics/faculties" },
          { "label": "Kafedralar", "url": "/academics/cafedras" },
          { "label": "Ömür boyu öyrənmə məktəbi", "url": "/academics/higher-education/life-long-learning" },
          { "label": "Yüksək Təhsil İnstitutu", "url": "/academics/higher-education" },
          { "label": "Şöbələr", "url": "/administration/departments" },
          { "label": "Kolleclər", "url": "/academics/colleges" }
        ]
      },
      {
        "title": "Tədqiqat",
        "links": [
          { "label": "İnstitutlar", "url": "/research/institutes" },
          { "label": "Elmi-innovasiya strategiyası", "url": "/research/strategy" },
          { "label": "Fəaliyyət istiqamətləri", "url": "/research/activities" },
          { "label": "Tədqiqat və inkişaf şöbəsi", "url": "/research/rd-department" },
          { "label": "İnnovasiyalar", "url": "/research/innovations" },
          { "label": "Kitabxana İnformasiya Mərkəzi", "url": "/research/library" },
          { "label": "Konfranslar", "url": "/research/conferences" },
          { "label": "Tələbə Elmi Cəmiyyəti", "url": "/research/student-science-society" }
        ]
      }
    ],
    "contact": {
      "email": "aztu@aztu.edu.az",
      "phones": [
        "(+994 12) 539-13-05",
        "(+994 12) 538-33-83"
      ],
      "address": "H.Cavid prospekti 25, Bakı, Azərbaycan AZ 1073 Azərbaycan Texniki Universiteti."
    },
    "social_links": [
      { "platform": "facebook",  "url": "https://www.facebook.com/aztu1950.official/" },
      { "platform": "instagram", "url": "https://www.instagram.com/aztueduaz" },
      { "platform": "linkedin",  "url": "https://www.linkedin.com/school/aztueduaz/" },
      { "platform": "youtube",   "url": "https://www.youtube.com/channel/UCu_PoZ-9DKNYs3hxuK9pW1Q" }
    ],
    "partner_logos": [
      { "label": "Prezident.az",              "image_url": "https://cdn.aztu.edu.az/logos/presidentaz.png",            "url": "https://president.az" },
      { "label": "Heydər Əliyev Fondu",       "image_url": "https://cdn.aztu.edu.az/logos/heydar-aliyev-foundation.png", "url": "https://heydar-aliyev-foundation.org" },
      { "label": "First Lady",                "image_url": "https://cdn.aztu.edu.az/logos/first_lady.png",             "url": "https://mehriban-aliyeva.az" },
      { "label": "Virtual Qarabağ",           "image_url": "https://cdn.aztu.edu.az/logos/virtual_qarabag.png",        "url": "https://virtualkarabakh.az" }
    ],
    "quick_icons": [
      { "label": "E-Library",   "icon": "ImportContacts", "url": "/research/library" },
      { "label": "Rankings",    "icon": "TrendingUp",     "url": "/about/rankings" },
      { "label": "E-Learning",  "icon": "School",         "url": "https://lms.aztu.edu.az" }
    ]
  }
}
```

### TypeScript Interface (Frontend)

```ts
interface FooterLink {
  label: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin" | "youtube";
  url: string;
}

interface PartnerLogo {
  label: string;
  image_url: string;
  url: string;
}

interface QuickIcon {
  label: string;
  icon: string;
  url: string;
}

interface FooterContact {
  email: string;
  phones: string[];
  address: string;
}

interface FooterMenuResponse {
  status_code: number;
  data: {
    university_name: string;
    columns: FooterColumn[];
    contact: FooterContact;
    social_links: SocialLink[];
    partner_logos: PartnerLogo[];
    quick_icons: QuickIcon[];
  };
}
```

---

## 3. Quick Menu

The Quick Menu is a slide-in panel with two sections:

- **Left panel** — quick shortcut links + contact info + social links
- **Right panel** — tabbed sections (Platform, Alumni, Why AzTU?)

### Endpoint

```
GET /api/menu/quick?lang_code={lang_code}
```

| Parameter   | Type   | Required | Description                        |
|-------------|--------|----------|------------------------------------|
| `lang_code` | string | Yes      | Language code. Example: `az`, `en` |

### Response

```json
{
  "status_code": 200,
  "data": {
    "title": "AzTU Quick Menu",
    "left_items": [
      { "label": "Ranking",       "url": "/about/rankings" },
      { "label": "Accreditation", "url": "/about/accreditation" },
      { "label": "Policies",      "url": "/about/policies" },
      { "label": "Reports",       "url": "/about/reports" },
      { "label": "FAQ",           "url": "/faq" }
    ],
    "contact": {
      "email": "aztu@aztu.edu.az",
      "phones": [
        "(+994 12) 539-13-05",
        "(+994 12) 538-33-83"
      ]
    },
    "social_links": [
      { "platform": "facebook",  "url": "https://www.facebook.com/aztu1950.official/" },
      { "platform": "instagram", "url": "https://www.instagram.com/aztueduaz" },
      { "platform": "linkedin",  "url": "https://www.linkedin.com/school/aztueduaz/" },
      { "platform": "youtube",   "url": "https://www.youtube.com/channel/UCu_PoZ-9DKNYs3hxuK9pW1Q" }
      { "platform": "X", "url": "https://www.linkedin.com/school/aztueduaz/"}
    ],
    "right_sections": [
      {
        "key": "platform",
        "title": "Platform",
        "items": [
          { "label": "LMS",                             "url": "https://lms.aztu.edu.az" },
          { "label": "Internal Grant Competition",      "url": "/research/internal-grant" },
          { "label": "Plan Report Information System",  "url": "/administration/plan-report" }
        ]
      },
      {
        "key": "alumni",
        "title": "Alumni",
        "items": [
          { "label": "Career",            "url": "/alumni/career" },
          { "label": "Honorary Doctors",  "url": "/about/honorary-doctors" },
          { "label": "Honorary Graduates","url": "/about/honorary-graduates" },
          { "label": "Our Heroes",        "url": "/about/heroes" }
        ]
      },
      {
        "key": "why-aztu",
        "title": "Why AzTU?",
        "items": [
          { "label": "Infrastructure",      "url": "/about/infrastructure" },
          { "label": "Startups",            "url": "/community/startups" },
          { "label": "Dual Degree Diplomas","url": "/academics/dual-degree" },
          { "label": "Scholarships",        "url": "/students/scholarships" }
        ]
      }
    ]
  }
}
```

### TypeScript Interface (Frontend)

```ts
interface QuickMenuItem {
  label: string;
  url: string;
}

interface QuickMenuSection {
  key: string;
  title: string;
  items: QuickMenuItem[];
}

interface QuickMenuContact {
  email: string;
  phones: string[];
}

interface QuickMenuResponse {
  status_code: number;
  data: {
    title: string;
    left_items: QuickMenuItem[];
    contact: QuickMenuContact;
    social_links: SocialLink[];       // same as FooterMenuResponse
    right_sections: QuickMenuSection[];
  };
}
```

---

## 4. Generic Menu Endpoint (existing)

The frontend also uses a generic menu endpoint via `menuService.ts`:

```
GET /api/menu/all?lang_code={lang_code}
```

### Response

```json
{
  "status_code": 200,
  "menus": [
    {
      "menu_id": 1,
      "category_id": 2,
      "url": "/about",
      "display_order": 1,
      "title": "About",
      "created_at": "2024-01-01T00:00:00Z",
      "menu_items": [
        {
          "item_id": 10,
          "url": "/about/history",
          "display_order": 1,
          "title": "History of AzTU",
          "created_at": "2024-01-01T00:00:00Z"
        }
      ]
    }
  ]
}
```

### TypeScript Interface (Frontend — `src/services/menu/menuService.ts`)

```ts
interface MenuItemInterface {
  item_id: number;
  url: string;
  display_order: number;
  title: string;
  created_at: string;
}

interface MenuInterface {
  menu_id: number;
  category_id: number;
  url?: string;
  display_order: number;
  title: string;
  created_at: string;
  menu_items: MenuItemInterface[];
}
```

Special return values from `getMenus(langCode)`:

| Return value  | Meaning                              |
|---------------|--------------------------------------|
| `MenuInterface[]` | Success — array of menu objects  |
| `"NO_CONTENT"`    | HTTP 204 — no menus found        |
| `"ERROR"`         | Network or server error          |

---

## 5. Supported Language Codes

| Code | Language   |
|------|------------|
| `az` | Azerbaijani |
| `en` | English     |
| `ru` | Russian     |

---

## 6. Summary of All Endpoints

| Endpoint               | Method | Description                        |
|------------------------|--------|------------------------------------|
| `/api/menu/header`     | GET    | Header navigation sections & items |
| `/api/menu/footer`     | GET    | Footer columns, contact, logos      |
| `/api/menu/quick`      | GET    | Quick menu left/right panel items   |
| `/api/menu/all`        | GET    | Generic flat menu list (existing)   |

All endpoints require `?lang_code=az` (or `en`, `ru`).

---