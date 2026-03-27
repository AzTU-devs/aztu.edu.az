import PolicyPDFPage from "@/components/about/PolicyPDFPage";

export default function ProcedureGuidelinesPage() {
    return (
        <PolicyPDFPage
            title="Procedure & Guidelines"
            subtitle="Step-by-step procedures and operational guidelines for students, faculty, and staff."
            pdfUrl="/documents/procedure-guidelines.pdf"
            downloadFilename="AzTU-Procedure-Guidelines.pdf"
        />
    );
}
