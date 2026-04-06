export interface PersonnelItem {
  first_name: string;
  last_name: string;
  father_name: string;
  duty: string;
  scientific_name: string;
  scientific_degree: string;
  email: string;
  phone: string;
  profile_image: string | null;
}

export interface Education {
  degree: string;
  university: string;
  start_year: string;
  end_year: string;
}

export interface WorkingHour {
  day: string;
  time_range: string;
}

export interface Director {
  first_name: string;
  last_name: string;
  father_name: string;
  scientific_degree: string;
  scientific_title: string;
  bio: string;
  profile_image: string | null;
  email: string;
  phone: string;
  room_number: string;
  scientific_research_fields: string[];
  working_hours: WorkingHour[];
  educations: Education[];
}

export interface ContentSection {
  id: number;
  title: string;
  description: string;
}

export interface University {
  name: string;
  website?: string;
}

export interface PartnerUniversity {
  country: string;
  universities: University[];
}

export interface Specialization {
  id: number;
  name: string;
  code?: string;
  degree: string;
  duration_years: number;
  description?: string;
}

export interface FacultyDetail {
  faculty_code: string;
  title: string;
  html_content: string;
  bachelor_programs_count: number;
  master_programs_count: number;
  phd_programs_count: number;
  international_collaborations_count: number;
  laboratories_count: number;
  projects_patents_count: number;
  industrial_collaborations_count: number;
  sdgs: number[];
  director: Director | null;
  deputy_deans: PersonnelItem[];
  scientific_council: PersonnelItem[];
  workers: PersonnelItem[];
  laboratories: ContentSection[];
  research_works: ContentSection[];
  partner_companies: ContentSection[];
  objectives: ContentSection[];
  duties: ContentSection[];
  projects: ContentSection[];
  directions_of_action: ContentSection[];
}
