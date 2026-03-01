export interface FacultyDetail {
  faculty_id: number;
  name: string;
  short_name: string;
  description: string;
  about?: string;
  goals?: string;
  duties?: string;
  is_active: boolean;
  created_at: string;
}

export interface Dean {
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

export interface ViceDean {
  id: number;
  full_name: string;
  title: string;
  responsibility_area: string;
  photo_url?: string;
  email?: string;
  phone?: string;
}

export interface CouncilMember {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  position: string;
}

export interface AcademicStaff {
  id: number;
  full_name: string;
  title: string;
  academic_degree?: string;
  department?: string;
  photo_url?: string;
  email?: string;
}

export interface Employee {
  id: number;
  full_name: string;
  position: string;
  photo_url?: string;
  cv_url?: string;
  email?: string;
}

export interface Laboratory {
  id: number;
  name: string;
  description?: string;
  head?: string;
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  year?: number;
  partner?: string;
}

export interface Specialization {
  id: number;
  name: string;
  code?: string;
  degree: "bachelor" | "master" | "phd";
  duration_years: number;
  description?: string;
}

export interface PartnerUniversity {
  country: string;
  universities: {
    name: string;
    website?: string;
  }[];
}

export interface FacultyContact {
  building: string;
  room: string;
  phone: string;
  email: string;
  fax?: string;
  working_hours?: string;
}
