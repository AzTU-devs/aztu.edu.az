"use client";

import LegalDocument from "@/components/legal/LegalDocument";
import { useLanguage } from "@/context/LanguageContext";
import { PRIVACY } from "./content";

export default function PrivacyPolicyPage() {
    const { lang } = useLanguage();
    return <LegalDocument doc={PRIVACY[lang]} />;
}
