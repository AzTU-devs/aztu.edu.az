export interface Laboratory {
  id: string;
  name: {
    az: string;
    en: string;
  };
  department: {
    az: string;
    en: string;
  };
  description: {
    az: string;
    en: string;
  };
  educationalObjectives: {
    az: string;
    en: string;
  };
  contact?: string;
  image?: string;
}

export interface DepartmentLaboratories {
  department: {
    az: string;
    en: string;
  };
  labs: Laboratory[];
}
