export interface CafedraSummary {
  id: number;
  faculty_code: string;
  cafedra_code: string;
  cafedra_name: string;
  deputy_director_count: number;
  created_at: string;
}

export interface Personnel {
  first_name: string;
  last_name: string;
  father_name: string;
  profile_image: string | null;
  scientific_degree: string | null;
  scientific_title: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  room_number: string | null;
  duty: string | null;
  scientific_name: string | null;
  working_hours?: Array<{ day: string; time_range: string }>;
  educations?: Array<{ degree: string; university: string; start_year: number; end_year: number }>;
  scientific_events?: Array<{ event_title: string; event_description: string }>;
}

export interface GenericSection {
  id: number;
  title: string;
  description: string;
}

export interface CafedraDetail {
  id: number;
  faculty_code: string;
  cafedra_code: string;
  title: string;
  html_content: string;
  
  // Statistics
  bachelor_programs_count: number;
  master_programs_count: number;
  phd_programs_count: number;
  international_collaborations_count: number;
  laboratories_count: number;
  projects_patents_count: number;
  industrial_collaborations_count: number;
  
  // SDGs
  sdgs: number[];
  
  // Personnel
  director: Personnel | null;
  deputy_directors: Personnel[];
  workers: Personnel[];
  scientific_council: Personnel[];
  
  // Academic & Research
  laboratories: GenericSection[];
  research_works: GenericSection[];
  partner_companies: GenericSection[];
  objectives: GenericSection[];
  duties: GenericSection[];
  projects: GenericSection[];
  directions_of_action: GenericSection[];
  
  created_at: string;
}
