import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ department_code: string }>;
}

export default async function DepartmentRootPage({ params }: Props) {
  const { department_code } = await params;
  redirect(`/idareetme/struktur-bolmeler/${department_code}/haqqimizda`);
}
