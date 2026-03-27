import PolicyPDFPage from "@/components/about/PolicyPDFPage";

export default function GeneralPoliciesPage() {
    return (
        <PolicyPDFPage
            title="General Policies"
            subtitle="Core institutional policies governing university-wide operations, conduct, and compliance."
            pdfUrl="/documents/general-policies.pdf"
            downloadFilename="AzTU-General-Policies.pdf"
        />
    );
}
