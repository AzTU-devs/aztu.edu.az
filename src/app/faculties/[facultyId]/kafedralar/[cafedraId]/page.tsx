import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default async function CafedraRootPage({ params }: Props) {
  const { facultyId, cafedraId } = await params;
  redirect(`/faculties/${facultyId}/kafedralar/${cafedraId}/giris`);
}
