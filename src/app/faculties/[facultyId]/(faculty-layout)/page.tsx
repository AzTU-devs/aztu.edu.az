"use client";

import { use } from "react";
import { redirect } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function FacultyRootPage({ params }: Props) {
  const { facultyId } = use(params);
  const { lang } = useLanguage();
  
  const aboutSlug = lang === "az" ? "haqqimizda" : "about";
  const academicPrefix = lang === "az" ? "akademik" : "academic";
  const facultyPrefix = lang === "az" ? "fakulteler" : "faculties";
  
  redirect(`/${lang}/${academicPrefix}/${facultyPrefix}/${facultyId}/${aboutSlug}`);
}
