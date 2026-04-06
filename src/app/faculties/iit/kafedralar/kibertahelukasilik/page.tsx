import { redirect } from "next/navigation";

export default async function CafedraRootPage() {
  const facultyId = "iit";
  const cafedraId = "kibertahelukasilik";
  redirect(`/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda`);
}
