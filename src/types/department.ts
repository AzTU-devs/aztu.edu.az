export interface DepartmentSummary {
  id: number;
  department_code: string;
  department_name: string;
  created_at: string;
  updated_at?: string;
}

export interface WorkingHour {
  day: string;
  time_range: string;
}

export interface Education {
  degree?: string;
  university?: string;
  year?: string | number;
}

export interface SectionItem {
  id?: number;
  title: string;
  description?: string;
}

export interface DepartmentDirector {
  first_name: string;
  last_name: string;
  father_name: string;
  scientific_degree?: string;
  scientific_title?: string;
  room_number?: string;
  bio?: string;
  profile_image?: string;
  working_hours?: WorkingHour[] | string;
  educations?: Education[] | string;
}

export interface DepartmentWorker {
  id: number;
  first_name: string;
  last_name: string;
  father_name: string;
  duty: string;
  scientific_info?: string;
  email?: string;
  phone?: string;
  profile_image?: string;
}

export interface DepartmentDetail {
  id: number;
  department_code: string;
  department_name: string;
  about_html: string;
  objectives?: SectionItem[];
  core_functions?: SectionItem[];
  director?: DepartmentDirector;
  workers?: DepartmentWorker[];
}
