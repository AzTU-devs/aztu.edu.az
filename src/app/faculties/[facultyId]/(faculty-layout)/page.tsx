import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default async function FacultyRootPage({ params }: Props) {
  const { facultyId } = await params;
  redirect(`/faculties/${facultyId}/haqqimizda`);
}
