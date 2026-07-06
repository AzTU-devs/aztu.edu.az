import type { StudyPlan } from "@/types/studyPlan";

// Faculty of Information Technologies and Telecommunication — Russian-taught programmes.

const FACULTY = "Информационные технологии и телекоммуникации";

const computerEngineering: StudyPlan = {
  id: "computer-engineering-ru",
  slug: "computer-engineering",
  code: "050620",
  program: "Компьютерная инженерия",
  faculty: FACULTY,
  language: "ru",
  totalCredits: 240,
  semesters: [
    {
      year: 1, term: "fall", semester: 1, totalCredits: 30,
      courses: [
        { code: "ÜF-1306y", name: "Деловое и академическое общение на азербайджанском языке", credits: 4 },
        { code: "ÜF-2518y", name: "Деловое и академическое общение на иностранном языке-1", credits: 4 },
        { code: "İF-40102y", name: "Линейная алгебра и аналитическая геометрия", credits: 3 },
        { code: "İF-40125y", name: "Дискретная математика", credits: 3 },
        { code: "İF-31113y", name: "Основы компьютерной инженерии", credits: 8 },
        { code: "İF-40200y", name: "Основы программирования", credits: 8 },
      ],
    },
    {
      year: 1, term: "spring", semester: 2, totalCredits: 30,
      courses: [
        { code: "ÜF-1302y", name: "История Азербайджана", credits: 5 },
        { code: "ÜF-2519y", name: "Деловое и академическое общение на иностранном языке-2", credits: 4 },
        { code: "İF-40197y", name: "Математический анализ", credits: 7 },
        { code: "İF-2425y", name: "Физика", credits: 5 },
        { code: "İF-31114y", name: "Компьютерная графика", credits: 5 },
        { code: "İFS-40213yn", name: "Веб-программирование (front-end)", credits: 4 },
      ],
    },
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "ÜF-2520y", name: "Деловое и академическое общение на иностранном языке-3", credits: 4 },
        { code: "İF-40124y", name: "Дифференциальные уравнения", credits: 3 },
        { code: "İF-31115y", name: "Операционные системы", credits: 8 },
        { code: "İF-3192y", name: "Архитектура компьютеров", credits: 8 },
        { code: "İFS-40212yn", name: "Проекты систем на базе микропроцессора", credits: 4 },
        { code: "ÜFS-1303y", name: "Философия", credits: 3, selective: true },
        { code: "ÜFS-1308y", name: "Социология", credits: 3, selective: true },
        { code: "ÜFS-1304y", name: "Конституция Азербайджанской Республики и основы права", credits: 3, selective: true },
        { code: "ÜFS-1713y", name: "Логика", credits: 3, selective: true },
        { code: "ÜFS-1305y", name: "Этика и эстетика", credits: 3, selective: true },
        { code: "ÜFS-1301y", name: "Введение в мультикультурализм", credits: 3, selective: true },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        { code: "ÜF-2521y", name: "Деловое и академическое общение на иностранном языке-4", credits: 3 },
        { code: "İF-40126y", name: "Теория вероятностей и математическая статистика", credits: 3 },
        { code: "İF-40201y", name: "Структура данных и алгоритмы", credits: 6 },
        { code: "İF-3196y", name: "Компьютерные сети", credits: 8 },
        { code: "İF-21107y", name: "Теория цепей", credits: 7 },
        { code: "İF-4153y", name: "Гражданская оборона", credits: 3 },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "İF-40131y", name: "Системы баз данных", credits: 7 },
        { code: "İF-1861y", name: "Основы электроники", credits: 6 },
        { code: "İF-31119y", name: "Безопасность компьютерных систем", credits: 8 },
        { code: "İFS-40203yn", name: "Технический иностранный язык (Введение в вычислительную технику и информационные технологии)", credits: 7 },
        { code: "ÜFS-40213y", name: "Информационные технологии (специализация)", credits: 3, selective: true },
        { code: "ÜFS-40214y", name: "Управление информацией", credits: 3, selective: true },
        { code: "ÜFS-2722y", name: "Основы предпринимательства и введение в бизнес", credits: 3, selective: true },
        { code: "ÜFS-1424y", name: "Политология", credits: 3, selective: true },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-31118y", name: "Цифровые системы", credits: 7 },
        { code: "İFS-40206yn", name: "Интернет и веб-программирование", credits: 6 },
        { code: "İFS-40207yn", name: "Инженерия данных", credits: 6 },
        { code: "İFS-40208yn", name: "Машинное обучение", credits: 6 },
        { code: "İFS-40211yn", name: "Управление сетью", credits: 5 },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-40202y", name: "Компьютерное моделирование", credits: 7 },
        { code: "İFS-40204yn", name: "Системы IoT (Интернета вещей)", credits: 6 },
        { code: "İFS-40205yn", name: "Введение в нечеткую логику", credits: 6 },
        { code: "İFS-40209yn", name: "Глубокое обучение", credits: 6 },
        { code: "İFS-40210yn", name: "Архитектура облачных решений", credits: 5 },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [{ code: "", name: "Практика", credits: 30 }],
    },
  ],
};

const computerSciences: StudyPlan = {
  id: "computer-sciences-ru",
  slug: "computer-sciences",
  code: "050509",
  program: "Компьютерные науки",
  faculty: FACULTY,
  language: "ru",
  totalCredits: 240,
  semesters: [
    {
      year: 1, term: "fall", semester: 1, totalCredits: 30,
      courses: [
        { code: "ÜF-1306y", name: "Деловое и академическое общение на азербайджанском языке", credits: 4 },
        { code: "ÜF-2518y", name: "Деловое и академическое общение на иностранном языке-1", credits: 4 },
        { code: "İF-40162y", name: "Математический анализ-1", credits: 7 },
        { code: "İF-40166y", name: "Линейная алгебра", credits: 4 },
        { code: "İF-40172y", name: "Основы программирования-1", credits: 8 },
        { code: "İF-2472y", name: "Физика", credits: 3 },
      ],
    },
    {
      year: 1, term: "spring", semester: 2, totalCredits: 30,
      courses: [
        { code: "ÜF-1302y", name: "История Азербайджана", credits: 5 },
        { code: "ÜF-2519y", name: "Деловое и академическое общение на иностранном языке-2", credits: 4 },
        { code: "İF-40163y", name: "Математический анализ-2", credits: 5 },
        { code: "İF-40173y", name: "Основы программирования-2", credits: 6 },
        { code: "İF-31169y", name: "Компьютерная архитектура", credits: 5 },
        { code: "İF-40236y", name: "Операционные системы", credits: 5 },
      ],
    },
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "ÜF-2520y", name: "Деловое и академическое общение на иностранном языке-3", credits: 4 },
        { code: "ÜFS-40213y", name: "Информационные технологии (специализация)", credits: 3, selective: true },
        { code: "ÜFS-40214y", name: "Управление информацией", credits: 3, selective: true },
        { code: "ÜFS-2722y", name: "Основы предпринимательства и введение в бизнес", credits: 3, selective: true },
        { code: "ÜFS-1424y", name: "Политология", credits: 3, selective: true },
        { code: "İF-40165y", name: "Аналитическая геометрия", credits: 4 },
        { code: "İF-40169y", name: "Численные методы-1", credits: 6 },
        { code: "İF-40174y", name: "Алгоритмический анализ и методы подготовки", credits: 8 },
        { code: "İF-40175y", name: "Технологии программирования", credits: 5 },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        { code: "ÜF-2521y", name: "Деловое и академическое общение на иностранном языке-4", credits: 3 },
        { code: "İF-40167y", name: "Дискретная математика", credits: 6 },
        { code: "İF-40168y", name: "Дифференциальные уравнения", credits: 6 },
        { code: "İF-40170y", name: "Численные методы-2", credits: 3 },
        { code: "İF-31116y", name: "Компьютерные сети", credits: 6 },
        { code: "İFS-31113yn", name: "Теория графов", credits: 6, selective: true },
        { code: "İFS-31116yn", name: "Элементы теории интегральных преобразований", credits: 6, selective: true },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "ÜFS-1303y", name: "Философия", credits: 3, selective: true },
        { code: "ÜFS-1308y", name: "Социология", credits: 3, selective: true },
        { code: "ÜFS-1304y", name: "Конституция Азербайджанской Республики и основы права", credits: 3, selective: true },
        { code: "ÜFS-1713y", name: "Логика", credits: 3, selective: true },
        { code: "ÜFS-1305y", name: "Этика и эстетика", credits: 3, selective: true },
        { code: "ÜFS-1301y", name: "Введение в мультикультурализм", credits: 3, selective: true },
        { code: "İF-40118y", name: "Теория вероятностей и математическая статистика", credits: 4 },
        { code: "İF-40176y", name: "База данных", credits: 5 },
        { code: "İFS-31111yn", name: "Статистическое обучение", credits: 6 },
        { code: "İFS-31112yn", name: "Теория чисел", credits: 6 },
        { code: "İFS-31104yn", name: "Технический иностранный язык (Введение в вычислительную технику и информационные технологии)", credits: 6 },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-40171y", name: "Методы оптимизации", credits: 5 },
        { code: "İF-40178y", name: "Искусственный интеллект", credits: 4 },
        { code: "İF-4153y", name: "Гражданская оборона", credits: 3 },
        { code: "İFS-31107yn", name: "Интернет и веб-программирование", credits: 6 },
        { code: "İFS-31108yn", name: "Инженерия данных", credits: 6 },
        { code: "İFS-31109yn", name: "Машинное обучение", credits: 6 },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-40164y", name: "Комплексный анализ", credits: 4 },
        { code: "İF-31170y", name: "Веб-технологии", credits: 4 },
        { code: "İF-40177y", name: "Параллельные и распределенные вычисления", credits: 4 },
        { code: "İFS-31105yn", name: "Системы IoT (Интернета вещей)", credits: 6 },
        { code: "İFS-31106yn", name: "Введение в нечеткую логику", credits: 6 },
        { code: "İFS-31110yn", name: "Глубокое обучение", credits: 6 },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [{ code: "", name: "Практика", credits: 30 }],
    },
  ],
};

const informationSecurity: StudyPlan = {
  id: "information-security-ru",
  slug: "information-security",
  code: "050615",
  program: "Информационная безопасность",
  faculty: FACULTY,
  language: "ru",
  totalCredits: 240,
  semesters: [
    {
      year: 1, term: "fall", semester: 1, totalCredits: 30,
      courses: [
        { code: "ÜF-1302y", name: "История Азербайджана", credits: 5 },
        { code: "ÜF-2518y", name: "Деловая и академическая коммуникация на иностранном языке-1", credits: 4 },
        { code: "İF-17121y", name: "Математический анализ", credits: 6 },
        { code: "İF-2203y", name: "Основы информационной безопасности", credits: 6 },
        { code: "İF-2204y", name: "Основы программирования", credits: 6 },
        { code: "ÜFS-1310y", name: "Психология", credits: 3, selective: true },
        { code: "ÜFS-1308y", name: "Социология", credits: 3, selective: true },
        { code: "ÜFS-1309y", name: "Основы права", credits: 3, selective: true },
        { code: "ÜFS-1311y", name: "Инженерная этика", credits: 3, selective: true },
      ],
    },
    {
      year: 1, term: "spring", semester: 2, totalCredits: 30,
      courses: [
        { code: "ÜF-1306y", name: "Деловая и академическая коммуникация на азербайджанском языке", credits: 4 },
        { code: "ÜF-2519y", name: "Деловая и академическая коммуникация на иностранном языке-2", credits: 4 },
        { code: "İF-1720y", name: "Линейная алгебра", credits: 6 },
        { code: "İF-2250y", name: "Основы сетей", credits: 6 },
        { code: "İF-2201y", name: "Основы кибербезопасности", credits: 6 },
        { code: "İFS-2220yn", name: "Веб-программирование (front-end)", credits: 4 },
      ],
    },
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "ÜF-2520y", name: "Деловая и академическая коммуникация на иностранном языке-3", credits: 4 },
        { code: "İF-17122y", name: "Дискретная математика", credits: 5 },
        { code: "İF-2202y", name: "Безопасность сетей", credits: 5 },
        { code: "İF-2206y", name: "Операционные системы", credits: 5 },
        { code: "İFS-2225yn", name: "Python для кибербезопасности", credits: 5 },
        { code: "İFS-2226yn", name: "Алгоритмы и структуры данных", credits: 6 },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        { code: "ÜF-2521y", name: "Деловая и академическая коммуникация на иностранном языке-4", credits: 3 },
        { code: "İF-17123y", name: "Теория вероятностей", credits: 5 },
        { code: "İF-2205y", name: "Веб-безопасность", credits: 5 },
        { code: "İF-2208y", name: "Правовые аспекты информационной и кибербезопасности", credits: 5 },
        { code: "İFS-2218yn", name: "Интернет вещей для промышленности (IIoT)", credits: 6 },
        { code: "İFS-2223yn", name: "Управление IT-проектами", credits: 6 },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "İF-2207y", name: "Системы управления информационной безопасностью", credits: 5 },
        { code: "İF-2209y", name: "Безопасность баз данных", credits: 5 },
        { code: "İF-2210y", name: "Безопасность облачных технологий", credits: 5 },
        { code: "İF-4153y", name: "Гражданская оборона", credits: 3 },
        { code: "İFS-2217yn", name: "Технический иностранный язык (Основы кибербезопасности)", credits: 6 },
        { code: "İFS-2222yn", name: "Язык программирования Java", credits: 6 },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-2211y", name: "Основы криптографии", credits: 5 },
        { code: "İF-2212y", name: "Основы тестирования на проникновение", credits: 8 },
        { code: "İF-2213y", name: "Основы электроники и безопасность IoT", credits: 5 },
        { code: "İFS-2221yn", name: "Аналитика данных", credits: 5 },
        { code: "İFS-2224yn", name: "Мобильное программирование", credits: 4 },
        { code: "ÜFS-2701y", name: "Основы предпринимательства и введение в бизнес", credits: 3, selective: true },
        { code: "ÜFS-1312y", name: "Критическое мышление", credits: 3, selective: true },
        { code: "ÜFS-1313y", name: "Планирование образования и карьеры", credits: 3, selective: true },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-2214y", name: "Безопасное программирование", credits: 5 },
        { code: "İF-2215y", name: "Основы цифровой криминалистики", credits: 8 },
        { code: "İF-2216y", name: "Безопасность промышленных систем управления", credits: 5 },
        { code: "İFS-2219yn", name: "Машинное обучение", credits: 6 },
        { code: "İFS-2227yn", name: "Анализ вредоносного программного обеспечения", credits: 6 },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [{ code: "", name: "Практика", credits: 30 }],
    },
  ],
};

const informationTechnologies: StudyPlan = {
  id: "information-technologies-ru",
  slug: "information-technologies",
  code: "050616",
  program: "Информационные технологии",
  faculty: FACULTY,
  language: "ru",
  totalCredits: 240,
  semesters: [
    {
      year: 1, term: "fall", semester: 1, totalCredits: 30,
      courses: [
        { code: "ÜF-1306y", name: "Деловая и академическая коммуникация на азербайджанском языке", credits: 4 },
        { code: "ÜF-2522y", name: "Деловая и академическая коммуникация на иностранном языке-1", credits: 4 },
        { code: "İF-40102y", name: "Линейная алгебра и аналитическая геометрия", credits: 3 },
        { code: "İF-2425y", name: "Физика", credits: 5 },
        { code: "İF-40127y", name: "Основы информационных технологий", credits: 8 },
        { code: "İF-40128y", name: "Основы программирования", credits: 6 },
      ],
    },
    {
      year: 1, term: "spring", semester: 2, totalCredits: 30,
      courses: [
        { code: "ÜF-1418y", name: "История Азербайджана", credits: 5 },
        { code: "ÜF-2523y", name: "Деловая и академическая коммуникация на иностранном языке-2", credits: 4 },
        { code: "İF-40123y", name: "Математический анализ", credits: 7 },
        { code: "İF-40130y", name: "Структура данных и алгоритмы", credits: 7 },
        { code: "İF-3197y", name: "Веб-системы и технологии", credits: 7 },
      ],
    },
    {
      year: 2, term: "fall", semester: 3, totalCredits: 30,
      courses: [
        { code: "ÜF-2524y", name: "Деловая и академическая коммуникация на иностранном языке-3", credits: 4 },
        { code: "İF-40124y", name: "Дифференциальные уравнения", credits: 3 },
        { code: "İF-40129y", name: "Современные языки программирования", credits: 6 },
        { code: "İF-3192y", name: "Компьютерная архитектура", credits: 8 },
        { code: "İF-40234y", name: "Операционные системы", credits: 6 },
        { code: "ÜFS-40213y", name: "Информационные технологии (специализация)", credits: 3, selective: true },
        { code: "ÜFS-40214y", name: "Управление информацией", credits: 3, selective: true },
        { code: "ÜFS-2722y", name: "Основы предпринимательства и введение в бизнес", credits: 3, selective: true },
        { code: "ÜFS-1424y", name: "Политология", credits: 3, selective: true },
      ],
    },
    {
      year: 2, term: "spring", semester: 4, totalCredits: 30,
      courses: [
        { code: "ÜF-2525y", name: "Деловая и академическая коммуникация на иностранном языке-4", credits: 3 },
        { code: "İF-40125y", name: "Дискретная математика", credits: 3 },
        { code: "İF-40126y", name: "Теория вероятностей и математическая статистика", credits: 3 },
        { code: "İF-40131y", name: "Системы баз данных", credits: 7 },
        { code: "İF-3196y", name: "Компьютерные сети", credits: 8 },
        { code: "İFS-40142yn", name: "Облачные технологии и технологии больших данных", credits: 6 },
      ],
    },
    {
      year: 3, term: "fall", semester: 5, totalCredits: 30,
      courses: [
        { code: "İF-40132", name: "Человеко-компьютерный интерфейс", credits: 7 },
        { code: "İF-40134y", name: "Управление ИТ-проектами", credits: 5 },
        { code: "İF-4153y", name: "Гражданская оборона", credits: 3 },
        { code: "İFS-40135yn", name: "Технический иностранный язык (Введение в вычислительную технику и информационные технологии)", credits: 6 },
        { code: "İFS-40144yn", name: "Инструменты и языки управления базами данных", credits: 6 },
        { code: "ÜFS-1419y", name: "Философия", credits: 3, selective: true },
        { code: "ÜFS-1425y", name: "Социология", credits: 3, selective: true },
        { code: "ÜFS-1420y", name: "Конституция Азербайджанской Республики и основы права", credits: 3, selective: true },
        { code: "ÜFS-40108y", name: "Логика", credits: 3, selective: true },
        { code: "ÜFS-1422y", name: "Этика и эстетика", credits: 3, selective: true },
        { code: "ÜFS-1423y", name: "Введение в мультикультурализм", credits: 3, selective: true },
      ],
    },
    {
      year: 3, term: "spring", semester: 6, totalCredits: 30,
      courses: [
        { code: "İF-40235y", name: "Мультимедийные технологии", credits: 6 },
        { code: "İF-40133y", name: "Искусственный интеллект", credits: 6 },
        { code: "İFS-40138yn", name: "Интернет и веб-программирование", credits: 6 },
        { code: "İFS-40139yn", name: "Инженерия данных", credits: 6 },
        { code: "İFS-40140yn", name: "Машинное обучение", credits: 6 },
      ],
    },
    {
      year: 4, term: "fall", semester: 7, totalCredits: 30,
      courses: [
        { code: "İF-3195y", name: "Информационная безопасность", credits: 6 },
        { code: "İFS-40136yn", name: "Системы IoT (Интернета вещей)", credits: 6 },
        { code: "İFS-40137yn", name: "Введение в нечеткую логику", credits: 6 },
        { code: "İFS-40141yn", name: "Глубокое обучение", credits: 6 },
        { code: "İFS-40143yn", name: "Интеллектуальный анализ данных для бизнес-аналитики", credits: 6 },
      ],
    },
    {
      year: 4, term: "spring", semester: 8, totalCredits: 30,
      courses: [{ code: "", name: "Практика", credits: 30 }],
    },
  ],
};

export const ittRuPlans: StudyPlan[] = [
  computerEngineering,
  computerSciences,
  informationSecurity,
  informationTechnologies,
];
