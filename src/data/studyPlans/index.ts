import type { StudyPlan, StudyPlanLanguage } from "@/types/studyPlan";
import { economicsEnPlans } from "./economics-en";
import { ittEnPlans } from "./itt-en";
import { ittRuPlans } from "./itt-ru";

// All study plans currently available (transcribed from the official study-plan
// document). Programmes taught in Russian for Mechanical Engineering, Process
// Automation, Logistics, and the Russian Radio & Telecommunications plan are not
// yet included — their source data was not available.
export const studyPlans: StudyPlan[] = [...economicsEnPlans, ...ittEnPlans, ...ittRuPlans];

const byId: Record<string, StudyPlan> = studyPlans.reduce((acc, plan) => {
  acc[plan.id] = plan;
  return acc;
}, {} as Record<string, StudyPlan>);

/** Look up a single study plan by its route id (`${slug}-${language}`). */
export function getStudyPlan(id: string): StudyPlan | undefined {
  return byId[id];
}

/** Whether a study plan exists for the given programme slug + instruction language. */
export function hasStudyPlan(slug: string, language: StudyPlanLanguage): boolean {
  return Boolean(byId[`${slug}-${language}`]);
}

/** All available study plans for a programme slug (used for the language switcher). */
export function getStudyPlansForSlug(slug: string): StudyPlan[] {
  return studyPlans.filter((plan) => plan.slug === slug);
}
