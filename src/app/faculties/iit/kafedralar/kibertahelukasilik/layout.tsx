import CafedraDetailLayout from "@/components/cafedra/CafedraDetailLayout";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ facultyId: string; cafedraId: string }>;
}) {
  return (
    <CafedraDetailLayout params={params}>{children}</CafedraDetailLayout>
  );
}
