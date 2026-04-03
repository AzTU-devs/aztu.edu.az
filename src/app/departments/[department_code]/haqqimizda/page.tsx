import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import SectionBlock from "@/components/shared/SectionBlock";
import { getDepartmentByCode } from "@/services/departmentService/departmentService";
import { stripHtml } from "@/util/htmlSanitizer";
import type { Lang } from "@/util/apiClient";
import type { SectionItem } from "@/types/department";

interface Props {
  params: Promise<{ department_code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { department_code } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("aztu-lang")?.value as Lang) || "az";
  const department = await getDepartmentByCode(department_code, lang);

  if (!department) {
    return {
      title: "Şöbə Tapılmadı | Azərbaycan Texniki Universiteti",
    };
  }

  return {
    title: `${department.department_name} - Haqqımızda | Azərbaycan Texniki Universiteti`,
    description: stripHtml(department.about_html),
  };
}

export default async function DepartmentAboutPage({ params }: Props) {
  const { department_code } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("aztu-lang")?.value as Lang) || "az";
  const department = await getDepartmentByCode(department_code, lang);

  if (!department) {
    notFound();
  }

  const renderSectionItems = (title: string, items?: SectionItem[] | string) => {
    if (!items || (Array.isArray(items) && items.length === 0)) return null;

    if (typeof items === "string") {
      return (
        <SectionBlock title={title} accent>
          <SanitizedHtml
            html={items}
            className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-medium text-justify"
          />
        </SectionBlock>
      );
    }

    return (
      <SectionBlock title={title} accent>
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={item.id ?? i} className="flex items-start gap-3 group">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ee7c7e] group-hover:scale-125 transition-transform duration-300 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed font-medium text-justify">
                  {typeof item === "string" ? item : (item.title || item.description)}
                </p>
                {item.description && item.title && (
                   <SanitizedHtml html={item.description} className="mt-2 text-sm text-gray-500 dark:text-slate-400 text-justify" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </SectionBlock>
    );
  };

  return (
    <div className="space-y-12">
      {/* About Section */}
      <SectionBlock title={lang === "az" ? "Şöbə haqqında" : "About Department"} accent>
        <SanitizedHtml
          html={department.about_html}
          className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-medium text-justify"
        />
      </SectionBlock>

      {/* Objectives */}
      {renderSectionItems(lang === "az" ? "Məqsədlər" : "Objectives", department.objectives as any)}

      {/* Core Functions */}
      {renderSectionItems(lang === "az" ? "Əsas Funksiyalar" : "Core Functions", department.core_functions as any)}
    </div>
  );
}
