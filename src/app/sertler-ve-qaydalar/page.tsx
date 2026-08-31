"use client";

import LegalDocument from "@/components/legal/LegalDocument";
import { useLanguage } from "@/context/LanguageContext";
import { TERMS } from "./content";

export default function TermsConditionsPage() {
    const { lang } = useLanguage();
    return <LegalDocument doc={TERMS[lang]} />;
}
