import PolicyPDFPage from "@/components/about/PolicyPDFPage";

export default function AcademicPoliciesPage() {
    return (
        <PolicyPDFPage
            title="Academic Policies"
            subtitle="Policies regulating academic standards, assessment, progression, and student rights."
            pdfUrl="/documents/academic-policies.pdf"
            downloadFilename="AzTU-Academic-Policies.pdf"
        />
    );
}
