"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import KtsSidebar from "@/components/kts/KtsSidebar";
import QaCertificates from "@/components/kts/QaCertificates";
import ImprovementPlanFlow from "@/components/kts/diagrams/ImprovementPlanFlow";
import SatisfactionLevels from "@/components/kts/diagrams/SatisfactionLevels";
import RespondentDistribution from "@/components/kts/diagrams/RespondentDistribution";
import KpiOverview from "@/components/kts/diagrams/KpiOverview";
import { useLanguage } from "@/context/LanguageContext";
import {
  getHeroCertificates,
  type HeroCertificate,
} from "@/services/heroCertificateService/heroCertificateService";
import { groupByIssuer, issuerRanks } from "@/util/certificateIssuers";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const MECHANISMS = {
  az: [
    "Sorğular və geribildirim sistemləri",
    "Daxili audit və monitorinq prosesləri",
    "KPI göstəricilərinin izlənməsi",
    "Təlim və inkişaf proqramları",
    "Akkreditasiya və keyfiyyət standartlarına uyğunluq",
  ],
  en: [
    "Surveys and feedback systems",
    "Internal audit and monitoring processes",
    "Tracking KPI indicators",
    "Training and development programs",
    "Compliance with accreditation and quality standards",
  ],
};

/** Section shell. One rhythm for the whole page, instead of five near-identical
 *  oversized glass slabs that gave nothing a hierarchy. */
function Section({
  id,
  index,
  eyebrow,
  title,
  children,
}: {
  id: string;
  index: number;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      /* Never starts at opacity 0 — the copy has to be readable even if the
         animation never runs. */
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="scroll-mt-28"
    >
      <div className="mb-6">
        <span className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-[#ee7c7e]">
          <span className="tabular-nums">{String(index).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-[#ee7c7e]/40" />
          {eyebrow}
        </span>
        <h2 className="text-2xl font-black tracking-tight text-[#1a2355] md:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

/** A diagram with a caption. Previously every chart sat above its prose with no
 *  label, so the reader met a chart before knowing what it measured. */
function Figure({
  number,
  caption,
  children,
}: {
  number: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-7 overflow-hidden rounded-2xl border border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="p-5 md:p-6">{children}</div>
      <figcaption className="flex gap-3 border-t border-slate-100 px-5 py-3 text-[12px] leading-relaxed text-slate-500 dark:border-white/5">
        <span className="shrink-0 font-black tabular-nums text-[#ee7c7e]">{number}</span>
        <span className="min-w-0">{caption}</span>
      </figcaption>
    </figure>
  );
}

const PROSE =
  "text-flow space-y-4 whitespace-pre-line text-[15px] leading-[1.75] text-slate-600 md:text-base";

export default function KtsPage() {
  const { lang } = useLanguage();
  const mechanisms = lang === "az" ? MECHANISMS.az : MECHANISMS.en;

  /* The stat band counts real certificates rather than quoting figures nobody
     maintains, so it can never drift from what the CMS actually holds. */
  const [certs, setCerts] = useState<HeroCertificate[] | null>(null);
  useEffect(() => {
    let alive = true;
    getHeroCertificates(lang).then((list) => {
      if (alive) setCerts(list);
    });
    return () => {
      alive = false;
    };
  }, [lang]);

  const groups = groupByIssuer(certs ?? []);
  const rankingCount = groups.filter((g) => issuerRanks(g.issuer)).reduce((n, g) => n + g.items.length, 0);
  const accreditedCount = groups.filter((g) => !issuerRanks(g.issuer)).reduce((n, g) => n + g.items.length, 0);
  const bodyCount = groups.length;

  const copy = {
    az: {
      eyebrow: "Keyfiyyətin Təminatı",
      title: "KT (Keyfiyyətin Təminatı)",
      description:
        "Keyfiyyət planlaması, monitorinqi, təhlili, nəzarəti və davamlı inkişafını həyata keçirən struktur bölmə.",
      breadcrumb: "KT",
      stats: [
        { value: accreditedCount, label: "Akkreditasiya olunmuş proqram" },
        { value: rankingCount, label: "Beynəlxalq reytinq nəticəsi" },
        { value: bodyCount, label: "Qiymətləndirən qurum" },
      ],
      aboutEyebrow: "Bölmə haqqında",
      aboutTitle: "Keyfiyyətin Təminatı Haqqında",
      aboutBody: `Keyfiyyətin Təminatı Şöbəsi 2021-ci il dekabrın 17-də Elmi Şuranın qərarı ilə yaradılmışdır. 2022-ci il mayın 18-də "Keyfiyyətin İdarəedilməsi Şöbəsi" "Keyfiyyətin Təminatı və Tədris-Öyrənmə Mərkəzi" adına dəyişdirilmişdir. Daha sonra 2023-cü il iyulun 23-də şöbə sadəcə Keyfiyyətin Təminatı Şöbəsi adını almışdır.\n\nŞöbə "tələbə mərkəzli tədris mühitinin dəstək strukturu" kimi fəaliyyət göstərir — universitetin bütün fəaliyyətlərində keyfiyyət planlaması, monitorinq, təhlil, nəzarət və davamlı inkişafı həyata keçirir.\n\nKeyfiyyət Təminatı, universitetin davamlı monitorinq və qiymətləndirmə yolu ilə təhsil, tədqiqat və xidmətlərin keyfiyyətini qorumasını və təkmilləşdirməsini təmin edən bir sistemdir. KT tədris keyfiyyətini yaxşılaşdırmağa, şəffaflığı təmin etməyə, akkreditasiyanı dəstəkləməyə və maraqlı tərəflərin məmnuniyyətini artırmağa kömək edir.`,
      mechanismsEyebrow: "Necə işləyirik",
      mechanismsTitle: "Tətbiq mexanizmləri",
      mechanismsNote:
        "Universitetdə keyfiyyətin yalnız nəzarət olunan proses deyil, bütün iştirakçıların gündəlik fəaliyyətinin ayrılmaz hissəsi kimi formalaşdırılması.",
      figImprovement: "Keyfiyyətin davamlı təkmilləşdirilməsi dövrü — planlaşdırmadan nəticələrin tətbiqinə qədər.",
      kpiEyebrow: "Nəyi ölçürük",
      kpiTitle: "Əsas göstəricilər (KPI)",
      kpiBody: `Azərbaycan Texniki Universitetində (AzTU) əsas performans göstəriciləri (KPI) universitetin tədris, elmi-tədqiqat, idarəetmə və xidmət sahələrində fəaliyyətinin effektivliyini ölçmək məqsədilə tətbiq olunur. Bu göstəricilər strateji hədəflərin icra vəziyyətini qiymətləndirməyə, keyfiyyətin davamlı yaxşılaşdırılmasına və qərarvermə prosesinin daha səmərəli təşkilinə xidmət edir.\n\nKPI-lar vasitəsilə universitetin akademik nəticələri, tələbə və məzun göstəriciləri, elmi fəaliyyət, beynəlxalq əməkdaşlıq və infrastruktur səviyyəsi müntəzəm olaraq izlənilir və təhlil olunur.`,
      figKpi: "İzlənilən KPI kateqoriyaları.",
      surveysEyebrow: "Nə eşidirik",
      surveysTitle: "Sorğular",
      surveysBody: `Keyfiyyətin təminatı çərçivəsində müxtəlif maraqlı tərəflər (tələbələr, akademik heyət, məzunlar və işəgötürənlər) arasında mütəmadi sorğular keçirilir. Bu sorğuların əsas məqsədi təhsil, idarəetmə və xidmətlərin keyfiyyətinin qiymətləndirilməsi, problemlərin aşkar edilməsi və onların aradan qaldırılması üçün tədbirlərin müəyyən edilməsidir.\n\nSorğular əsasən onlayn platformalar (Google Forms) vasitəsilə həyata keçirilir və nəticələr analiz olunaraq qərarvermə prosesinə daxil edilir.`,
      figSatisfaction: "Sorğular üzrə məmnunluq səviyyələri.",
      figRespondents: "Sorğularda iştirak edən respondentlərin bölgüsü.",
      cultureEyebrow: "Nəyə inanırıq",
      cultureTitle: "Keyfiyyət mədəniyyəti",
      cultureBody: `Keyfiyyət mədəniyyəti Azərbaycan Texniki Universitetində bütün fəaliyyət sahələrində keyfiyyətin təmin olunmasını və davamlı inkişafını dəstəkləyən əsas dəyərlər sistemidir. Bu yanaşma tədris, elmi-tədqiqat, idarəetmə və xidmət proseslərində məsuliyyət, şəffaflıq və əməkdaşlıq prinsiplərinə əsaslanır.\n\nUniversitetdə keyfiyyət mədəniyyətinin formalaşdırılması məqsədilə bütün maraqlı tərəflərin – tələbələrin, akademik və inzibati heyətin aktiv iştirakı təmin olunur. Müntəzəm monitorinq, qiymətləndirmə və geribildirim mexanizmləri vasitəsilə fəaliyyətlər təhlil edilir və təkmilləşdirilir.`,
    },
    en: {
      eyebrow: "Quality Assurance",
      title: "QA (Quality Assurance)",
      description:
        "The structural unit responsible for quality planning, monitoring, analysis, control and continuous improvement across all university activities.",
      breadcrumb: "QA",
      stats: [
        { value: accreditedCount, label: "Accredited programmes" },
        { value: rankingCount, label: "International ranking results" },
        { value: bodyCount, label: "Assessing bodies" },
      ],
      aboutEyebrow: "About the department",
      aboutTitle: "About Quality Assurance",
      aboutBody: `The Quality Assurance Department was established by a Scientific Council decision on December 17, 2021. On May 18, 2022, the "Quality Management Department" was renamed to the "Quality Assurance and Learning-Teaching Center." On July 23, 2023, the unit adopted its current name — Quality Assurance Department.\n\nThe department functions as a "student-centered teaching environment support structure," implementing quality planning, monitoring, analysis, control, and continuous improvement across all university activities.\n\nQuality Assurance is a system that ensures the university maintains and improves the quality of education, research, and services through continuous monitoring and evaluation. QA helps improve teaching quality, ensure transparency, support accreditation, and increase stakeholder satisfaction.`,
      mechanismsEyebrow: "How we work",
      mechanismsTitle: "Implementation Mechanisms",
      mechanismsNote:
        "Forming quality at the university as an integral part of the daily activities of all participants, not just a controlled process.",
      figImprovement: "The continuous improvement cycle — from planning through to acting on the results.",
      kpiEyebrow: "What we measure",
      kpiTitle: "Key Performance Indicators (KPIs)",
      kpiBody: `Key performance indicators (KPIs) are used at Azerbaijan Technical University (AzTU) to measure the effectiveness of the university's activities in the areas of teaching, research, management and service. These indicators serve to assess the implementation status of strategic goals, continuously improve quality and organize the decision-making process more efficiently.\n\nThrough KPIs, the university's academic results, student and graduate indicators, scientific activity, international cooperation and infrastructure level are regularly monitored and analyzed.`,
      figKpi: "The KPI categories tracked.",
      surveysEyebrow: "What we hear",
      surveysTitle: "Surveys",
      surveysBody: `As part of quality assurance, regular surveys are conducted among various stakeholders (students, academic staff, alumni and employers). The main purpose of these surveys is to assess the quality of education, management and services, identify problems and determine measures to eliminate them.\n\nSurveys are mainly carried out through online platforms (Google Forms) and the results are analyzed and included in the decision-making process.`,
      figSatisfaction: "Satisfaction levels reported in the surveys.",
      figRespondents: "Distribution of survey respondents.",
      cultureEyebrow: "What we believe",
      cultureTitle: "Quality Culture",
      cultureBody: `Quality culture is a core value system that supports quality assurance and sustainable development in all areas of activity at Azerbaijan Technical University. This approach is based on the principles of responsibility, transparency and cooperation in teaching, research, management and service processes.\n\nIn order to form a quality culture at the university, the active participation of all stakeholders - students, academic and administrative staff - is ensured. Activities are analyzed and improved through regular monitoring, evaluation and feedback mechanisms.`,
    },
  }[lang];

  return (
    /* `overflow-x-clip`, not `overflow-hidden`: an ancestor with `overflow:hidden`
       becomes the scroll container for `position:sticky`, which is why the
       sidebar's `sticky top-28` never held on this page. `clip` does not create
       one. */
    <main className="relative min-h-screen overflow-x-clip bg-page selection:bg-[#ee7c7e]/30">
      <PageHero
        title={copy.title}
        description={copy.description}
        breadcrumbs={[{ label: copy.breadcrumb }]}
        eyebrow={copy.eyebrow}
      />

      <div className="mx-auto w-full max-w-[1600px] px-4 py-14 md:px-10 md:py-20 lg:px-20">
        {/* Scale before argument — this is the accreditation page of a
            university and it used to open with a definition. Every figure is
            counted from the certificates the CMS actually holds. */}
        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {copy.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#1a2355]/10 bg-[#1a2355] px-6 py-7 text-white dark:border-white/10"
            >
              <div className="text-4xl font-black tabular-nums tracking-tighter">
                {certs === null ? "—" : stat.value}
              </div>
              <div className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/55">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          <div className="min-w-0 flex-1 space-y-16">
            <Section id="about" index={1} eyebrow={copy.aboutEyebrow} title={copy.aboutTitle}>
              <div className={PROSE}>{copy.aboutBody}</div>
            </Section>

            <Section
              id="mechanisms"
              index={2}
              eyebrow={copy.mechanismsEyebrow}
              title={copy.mechanismsTitle}
            >
              <div className="space-y-3">
                {mechanisms.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white/70 px-5 py-3.5 transition-colors hover:border-[#ee7c7e]/40 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <CheckCircleOutlineIcon sx={{ fontSize: 18 }} className="shrink-0 text-[#ee7c7e]" />
                    <span className="min-w-0 text-[15px] font-bold text-[#1a2355]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              {/* The five mechanisms are the claim; the improvement cycle is the
                  same claim drawn. List first, diagram as its proof. */}
              <Figure number="01" caption={copy.figImprovement}>
                <ImprovementPlanFlow />
              </Figure>
              <p className="text-[13px] italic leading-relaxed text-slate-500">
                {copy.mechanismsNote}
              </p>
            </Section>

            <Section id="kpi" index={3} eyebrow={copy.kpiEyebrow} title={copy.kpiTitle}>
              <div className={PROSE}>{copy.kpiBody}</div>
              {/* Was SatisfactionLevels — a survey chart under the KPI heading.
                  KpiOverview is the one that shows the KPI categories. */}
              <Figure number="02" caption={copy.figKpi}>
                <KpiOverview />
              </Figure>
            </Section>

            <Section id="surveys" index={4} eyebrow={copy.surveysEyebrow} title={copy.surveysTitle}>
              <div className={PROSE}>{copy.surveysBody}</div>
              {/* Both survey charts now sit with the survey copy: satisfaction
                  levels were under "KPI" and respondent distribution under
                  "Quality culture". */}
              <Figure number="03" caption={copy.figSatisfaction}>
                <SatisfactionLevels />
              </Figure>
              <Figure number="04" caption={copy.figRespondents}>
                <RespondentDistribution />
              </Figure>
            </Section>

            <Section id="culture" index={5} eyebrow={copy.cultureEyebrow} title={copy.cultureTitle}>
              <div className={PROSE}>{copy.cultureBody}</div>
            </Section>

            <QaCertificates id="certificates" />
          </div>

          {/* No sticky wrapper here: KtsSidebar already carries `sticky top-28`
              itself. It simply never worked on this route, because the old
              `overflow-hidden` on <main> made that box its scroll container. */}
          <aside className="lg:w-[300px] lg:shrink-0">
            <KtsSidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}
