"use client";

import { use, useEffect, useState } from "react";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail } from "@/types/cafedra";
import SectionBlock from "@/components/shared/SectionBlock";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function CafedraElaqePage({ params }: Props) {
  const { cafedraId } = use(params);
  const { lang } = useLanguage();
  const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCafedraByCode(cafedraId, lang).then((data) => {
      setCafedra(data);
      setLoading(false);
    });
  }, [cafedraId, lang]);

  if (loading) return <div className="animate-pulse h-64 bg-gray-200 dark:bg-slate-800 rounded-3xl" />;
  if (!cafedra || !cafedra.director) return null;

  const contactFields = [
    {
      icon: <LocationOnIcon />,
      label: lang === "az" ? "Ünvan" : "Address",
      value: cafedra.director.room_number,
    },
    {
      icon: <PhoneIcon />,
      label: lang === "az" ? "Tel" : "Phone",
      value: cafedra.director.phone,
      href: cafedra.director.phone ? `tel:${cafedra.director.phone}` : undefined,
    },
    {
      icon: <EmailIcon />,
      label: lang === "az" ? "E-poçt" : "Email",
      value: cafedra.director.email,
      href: cafedra.director.email ? `mailto:${cafedra.director.email}` : undefined,
    },
  ].filter(f => f.value);

  return (
    <div className="space-y-6">
      <SectionBlock title={lang === "az" ? "Əlaqə" : "Contact"} accent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactFields.map((field) => (
            <div
              key={field.label}
              className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 hover:border-[#ee7c7e] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1a2355]/5 dark:bg-[#1a2355]/20 flex items-center justify-center flex-shrink-0 text-[#1a2355] dark:text-blue-400 group-hover:bg-[#ee7c7e]/10 group-hover:text-[#ee7c7e] transition-colors">
                {field.icon}
              </div>
              <div>
                <p className="text-[10px] text-gray-400 dark:text-slate-500 font-black uppercase tracking-widest mb-1">
                  {field.label}
                </p>
                {field.href ? (
                  <a
                    href={field.href}
                    className="font-bold text-[#1a2355] dark:text-white hover:text-[#ee7c7e] transition-colors text-sm"
                  >
                    {field.value}
                  </a>
                ) : (
                  <p className="font-bold text-[#1a2355] dark:text-white text-sm">
                    {field.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}
