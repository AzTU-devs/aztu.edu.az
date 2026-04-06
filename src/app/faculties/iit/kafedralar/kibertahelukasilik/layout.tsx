import CafedraDetailLayout from "@/components/cafedra/CafedraDetailLayout";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hardcodedParams = Promise.resolve({
    facultyId: "iit",
    cafedraId: "kibertahelukasilik",
  });

  return (
    <CafedraDetailLayout params={hardcodedParams}>{children}</CafedraDetailLayout>
  );
}
