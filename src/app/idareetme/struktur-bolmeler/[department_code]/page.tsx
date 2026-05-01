import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface Props {
  params: Promise<{ department_code: string }>;
}

export default async function DepartmentRootPage({ params }: Props) {
  const { department_code } = await params;
  const cookieStore = await cookies();
  const lang = cookieStore.get("aztu-lang")?.value === "en" ? "en" : "az";

  if (lang === "en") {
    redirect(`/en/management/structural-units/${department_code}/about`);
  }
  redirect(`/az/idareetme/struktur-bolmeler/${department_code}/haqqimizda`);
}
