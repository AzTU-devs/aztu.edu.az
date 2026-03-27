import PolicyPDFPage from "@/components/about/PolicyPDFPage";

export default function SustainabilityPoliciesPage() {
    return (
        <PolicyPDFPage
            title="Sustainability Policies"
            subtitle="AzTU's environmental commitments, green campus standards, and sustainability reporting framework."
            pdfUrl="/documents/sustainability-policies.pdf"
            downloadFilename="AzTU-Sustainability-Policies.pdf"
        />
    );
}
