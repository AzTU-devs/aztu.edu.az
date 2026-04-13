import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ department_code: string }>;
}

export default async function DepartmentRootPage({ params }: Props) {
  const { department_code } = await params;
  redirect(`/departments/${department_code}/haqqimizda`);
}
