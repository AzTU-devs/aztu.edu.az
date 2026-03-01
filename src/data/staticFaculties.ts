export interface StaticFaculty {
  faculty_id: number;
  name: string;
  short_name: string;
  description: string;
  is_active: boolean;
}

export interface StaticCafedra {
  cafedra_id: number;
  faculty_id: number;
  name: string;
  short_name: string;
  description: string;
  is_active: boolean;
}

export const STATIC_FACULTIES: StaticFaculty[] = [
  {
    faculty_id: 1,
    name: "İnformasiya Texnologiyaları və Sistemlər Mühəndisliyi fakültəsi",
    short_name: "İTSM",
    description:
      "İnformasiya texnologiyaları, kompüter elmləri, proqram mühəndisliyi və sistemlər mühəndisliyi sahəsində yüksəkixtisaslı mütəxəssislər hazırlayan fakültə.",
    is_active: true,
  },
  {
    faculty_id: 2,
    name: "Maşınqayırma və Robotexnika fakültəsi",
    short_name: "MRF",
    description:
      "Maşınqayırma, mexanika, robotexnika və avtomatlaşdırılmış istehsal texnologiyaları sahəsində müasir kadrlar yetişdirən fakültə.",
    is_active: true,
  },
  {
    faculty_id: 3,
    name: "Neft-Kimya Mühəndisliyi fakültəsi",
    short_name: "NKM",
    description:
      "Neft-kimya sənayesi, kimyəvi texnologiyalar və enerji mühəndisliyi sahəsini əhatə edən fakültə.",
    is_active: true,
  },
  {
    faculty_id: 4,
    name: "Elektrotexnika və Elektronika fakültəsi",
    short_name: "EEF",
    description:
      "Elektrik enerjisi sistemləri, elektronika, telekommunikasiya və elektrotexniki cihazlar sahəsində mütəxəssislər hazırlayan fakültə.",
    is_active: true,
  },
  {
    faculty_id: 5,
    name: "İnşaat Mühəndisliyi fakültəsi",
    short_name: "İMF",
    description:
      "Tikinti, hidrotexniki qurğular, yol mühəndisliyi və geotexnika sahəsini əhatə edən fakültə.",
    is_active: true,
  },
  {
    faculty_id: 6,
    name: "Nəqliyyat, Mexanika-Maşınqayırma fakültəsi",
    short_name: "NMM",
    description:
      "Avtomobil nəqliyyatı, dəmir yolu nəqliyyatı, logistika və mexanika-maşınqayırma ixtisaslarını əhatə edən fakültə.",
    is_active: true,
  },
];

export const STATIC_CAFEDRAS: StaticCafedra[] = [
  // Faculty 1 – İTSM
  {
    cafedra_id: 101,
    faculty_id: 1,
    name: "Kompüter Elmləri kafedras",
    short_name: "KEK",
    description:
      "Proqramlaşdırma, alqoritmlər, süni intellekt və məlumat strukturları sahəsini əhatə edən kafedra.",
    is_active: true,
  },
  {
    cafedra_id: 102,
    faculty_id: 1,
    name: "İnformasiya Sistemləri kafedras",
    short_name: "İSK",
    description:
      "İnformasiya sistemlərinin layihələndirilməsi, verilənlər bazaları idarəetməsi və sistem analizi kafedras.",
    is_active: true,
  },
  {
    cafedra_id: 103,
    faculty_id: 1,
    name: "Kibertəhlükəsizlik kafedras",
    short_name: "KTK",
    description:
      "Şəbəkə təhlükəsizliyi, kriptoqrafiya, kiberhücumlara qarşı müdafiə metodları kafedras.",
    is_active: true,
  },
  // Faculty 2 – MRF
  {
    cafedra_id: 201,
    faculty_id: 2,
    name: "Maşın Elementləri kafedras",
    short_name: "MEK",
    description:
      "Maşın elementlərinin hesablanması, layihələndirilməsi və istismarı sahəsini əhatə edən kafedra.",
    is_active: true,
  },
  {
    cafedra_id: 202,
    faculty_id: 2,
    name: "Robotexnika kafedras",
    short_name: "RTK",
    description:
      "Robot sistemləri, sənaye avtomatikası, mexatronika və idarəetmə sistemləri kafedras.",
    is_active: true,
  },
  // Faculty 3 – NKM
  {
    cafedra_id: 301,
    faculty_id: 3,
    name: "Neft-Kimya Texnologiyası kafedras",
    short_name: "NKTK",
    description:
      "Neft-kimya məhsullarının emalı, kimyəvi texnologiyalar və istehsal prosesləri kafedras.",
    is_active: true,
  },
  {
    cafedra_id: 302,
    faculty_id: 3,
    name: "Enerji Mühəndisliyi kafedras",
    short_name: "EMK",
    description:
      "Enerji mənbələri, bərpa olunan enerji sistemləri və enerji effektivliyi kafedras.",
    is_active: true,
  },
  // Faculty 4 – EEF
  {
    cafedra_id: 401,
    faculty_id: 4,
    name: "Elektrotexnika kafedras",
    short_name: "ETK",
    description:
      "Elektrik enerjisi sistemlərinin istehsalı, ötürülməsi, paylanması və istehlakı kafedras.",
    is_active: true,
  },
  {
    cafedra_id: 402,
    faculty_id: 4,
    name: "Elektronika kafedras",
    short_name: "ELK",
    description:
      "Analoq və rəqəmsal elektronika, mikrosxemlər, siqnal emalı kafedras.",
    is_active: true,
  },
  // Faculty 5 – İMF
  {
    cafedra_id: 501,
    faculty_id: 5,
    name: "Tikinti Konstruksiyaları kafedras",
    short_name: "TKK",
    description:
      "Dəmir-beton, polad və ahəng konstruksiyaların hesablanması, layihələndirilməsi kafedras.",
    is_active: true,
  },
  // Faculty 6 – NMM
  {
    cafedra_id: 601,
    faculty_id: 6,
    name: "Avtomobil Nəqliyyatı kafedras",
    short_name: "ANK",
    description:
      "Avtomobil nəqliyyatının təşkili, idarəetməsi və texniki istismarı kafedras.",
    is_active: true,
  },
  {
    cafedra_id: 602,
    faculty_id: 6,
    name: "Logistika kafedras",
    short_name: "LOGİK",
    description:
      "Təchizat zəncirinin idarəedilməsi, nəqliyyat logistikası və anbar idarəetməsi kafedras.",
    is_active: true,
  },
];

export function getFacultyById(id: number): StaticFaculty | undefined {
  return STATIC_FACULTIES.find((f) => f.faculty_id === id);
}

export function getCafedrasByFacultyId(facultyId: number): StaticCafedra[] {
  return STATIC_CAFEDRAS.filter((c) => c.faculty_id === facultyId);
}

export function getCafedraById(id: number): StaticCafedra | undefined {
  return STATIC_CAFEDRAS.find((c) => c.cafedra_id === id);
}
