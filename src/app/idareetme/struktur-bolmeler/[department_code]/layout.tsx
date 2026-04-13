import DepartmentDetailLayout from "@/components/department/DepartmentDetailLayout";

interface Props {
  children: React.ReactNode;
  params: Promise<{ department_code: string }>;
}

export default function Layout({ children, params }: Props) {
  return (
    <DepartmentDetailLayout params={params}>
      {children}
    </DepartmentDetailLayout>
  );
}
