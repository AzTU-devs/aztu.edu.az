import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import SectionBlock from "@/components/shared/SectionBlock";
import DirectorCard from "@/components/department/DirectorCard";
import { getDepartmentByCode } from "@/services/departmentService/departmentService";
import type { Lang } from "@/util/apiClient";

interface Props {
  params: Promise<{ department_code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { department_code } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("aztu-lang")?.value as Lang) || "az";
  const department = await getDepartmentByCode(department_code, lang);

  if (!department) {
    return { title: "Şöbə Tapılmadı" };
  }

  return {
    title: `${department.department_name} - Rəhbərlik | Azərbaycan Texniki Universiteti`,
  };
}

export default async function DepartmentDirectorPage({ params }: Props) {
  const { department_code } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("aztu-lang")?.value as Lang) || "az";
  const department = await getDepartmentByCode(department_code, lang);

  if (!department) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <SectionBlock title={lang === "az" ? "Rəhbərlik" : "Director"} accent>
        {department.director ? (
          <DirectorCard director={department.director} />
        ) : (
          <p className="text-gray-500 dark:text-slate-400 text-center py-10">
            {lang === "az" ? "Bu şöbə üçün rəhbər təyin edilməyib." : "No director assigned for this department."}
          </p>
        )}
      </SectionBlock>
    </div>
  );
}
