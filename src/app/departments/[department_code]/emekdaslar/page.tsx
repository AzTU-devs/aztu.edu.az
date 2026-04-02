import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import SectionBlock from "@/components/shared/SectionBlock";
import WorkerCard from "@/components/department/WorkerCard";
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
    title: `${department.department_name} - Əməkdaşlar | Azərbaycan Texniki Universiteti`,
  };
}

export default async function DepartmentWorkersPage({ params }: Props) {
  const { department_code } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("aztu-lang")?.value as Lang) || "az";
  const department = await getDepartmentByCode(department_code, lang);

  if (!department) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <SectionBlock title={lang === "az" ? "Əməkdaşlar" : "Workers"} accent>
        {department.workers && department.workers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {department.workers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-slate-400 text-center py-10">
            {lang === "az" ? "Bu şöbə üçün əməkdaş məlumatı tapılmadı." : "No worker information found for this department."}
          </p>
        )}
      </SectionBlock>
    </div>
  );
}
