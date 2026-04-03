import { redirect } from "next/navigation";

export default async function CafedraRootPage({
  params,
}: {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}) {
  const { facultyId, cafedraId } = await params;
  redirect(`/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda`);
}
