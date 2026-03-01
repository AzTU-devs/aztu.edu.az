export interface CafedraDetail {
  cafedra_id: number;
  faculty_id: number;
  name: string;
  short_name: string;
  description: string;
  purpose?: string;
  main_directions?: string[];
  educational_work?: string;
  international_relations?: string;
  is_active: boolean;
  created_at: string;
}

export interface CafedraHead {
  id: number;
  full_name: string;
  title: string;
  academic_degree?: string;
  photo_url?: string;
  email?: string;
  phone?: string;
  office?: string;
  bio?: string;
}

export interface CafedraEmployee {
  id: number;
  full_name: string;
  position: string;
  academic_degree?: string;
  photo_url?: string;
  cv_url?: string;
  email?: string;
}

export interface CafedraNews {
  id: number;
  title: string;
  summary: string;
  date: string;
  image_url?: string;
}

export interface CafedraContact {
  building: string;
  room: string;
  phone: string;
  fax?: string;
  email: string;
}

export interface CafedraSpecialization {
  id: number;
  name: string;
  code?: string;
  degree: "bachelor" | "master" | "phd";
  duration_years: number;
  description?: string;
}

export interface ScientificPublication {
  id: number;
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  doi?: string;
  type: "article" | "book" | "conference" | "patent";
}
