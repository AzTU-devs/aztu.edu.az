import FacultyDetailLayout from "@/components/faculty/FacultyDetailLayout";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ facultyId: string }>;
}) {
  return <FacultyDetailLayout params={params}>{children}</FacultyDetailLayout>;
}
