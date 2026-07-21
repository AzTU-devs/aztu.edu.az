export interface ResearchInstituteEducation {
  id: number;
  university: string;
  degree: string;
  start_year: string;
  end_year: string | null;
}

export interface ResearchInstituteResearchArea {
  id: number;
  content: string;
}

export interface ResearchInstituteDirector {
  id: number;
  full_name: string;
  email: string;
  office: string;
  image_url: string | null;
  title: string;
  biography: string;
  educations: ResearchInstituteEducation[];
  research_areas: ResearchInstituteResearchArea[];
}

export interface ResearchInstituteObjective {
  id: number;
  content: string;
}

export interface ResearchInstituteDirection {
  id: number;
  content: string;
}

export interface ResearchInstituteStaff {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  image_url: string | null;
  title: string;
}

export interface ResearchInstituteDetail {
  id: number;
  institute_code: string;
  image_url: string | null;
  name: string;
  about: string;
  vision: string;
  mission: string;
  /**
   * Rich-text blocks authored in the dashboard. Optional because the curated
   * static records that predate the CMS never carried them — the detail page
   * falls back to `objectives` / `research_directions` when they are absent.
   */
  goals?: string;
  additional_info?: string;
  website_url?: string | null;
  email?: string | null;
  director: ResearchInstituteDirector | null;
  deputy_director?: ResearchInstituteDirector | null;
  objectives: ResearchInstituteObjective[];
  research_directions: ResearchInstituteDirection[];
  staff: ResearchInstituteStaff[];
  created_at: string;
  updated_at: string;
}

export interface ResearchInstituteSummary {
  id: number;
  institute_code: string;
  name: string;
  image_url: string | null;
  about?: string;
  website_url?: string | null;
  email?: string | null;
}
