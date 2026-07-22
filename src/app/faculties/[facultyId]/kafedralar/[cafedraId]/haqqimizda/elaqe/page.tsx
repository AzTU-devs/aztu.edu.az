"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FacultyPanel, FACULTY_PALETTES } from "@/components/faculty/ui";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail } from "@/types/cafedra";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function CafedraElaqePage({ params }: Props) {
  const { cafedraId } = use(params);
  const { lang: currentLang } = useLanguage();
  const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCafedraByCode(cafedraId, currentLang)
      .then((result) => {
        setCafedra(result);
        setLoading(false);
      })
      .catch(() => {
        setCafedra(null);
        setLoading(false);
      });
  }, [cafedraId, currentLang]);

  if (!cafedra && !loading) return null;

  const head = cafedra?.director;

  const contactFields = [
    {
      icon: LocationOnIcon,
      label: currentLang === "az" ? "Ünvan" : "Office Address",
      value: head?.room_number ? `${currentLang === "az" ? "Otaq" : "Room"} ${head.room_number}` : (currentLang === "az" ? "AzTU" : "AzTU"),
      sub: currentLang === "az" ? "H.Cavid pr. 25, Bakı" : "25 H.Javid Ave, Baku",
    },
    {
      icon: PhoneIcon,
      label: currentLang === "az" ? "Telefon" : "Direct Phone",
      value: head?.phone ?? "+994 12 539 12 34",
      href: head?.phone ? `tel:${head.phone}` : undefined,
    },
    {
      icon: EmailIcon,
      label: currentLang === "az" ? "E-poçt" : "Official Email",
      value: head?.email ?? "cafedra@aztu.edu.az",
      href: head?.email ? `mailto:${head.email}` : undefined,
    },
    {
      icon: AccessTimeIcon,
      label: currentLang === "az" ? "Qəbul saatları" : "Office Hours",
      value: head?.working_hours?.[0] ? `${head.working_hours[0].day}: ${head.working_hours[0].time_range}` : (currentLang === "az" ? "Bazar ertəsi – Cümə" : "Mon – Fri"),
      sub: !head?.working_hours?.[0] ? "09:00 – 18:00" : undefined,
    },
  ];

  return (
    <div className="space-y-8">
      <FacultyPanel
        icon={ContactSupportIcon}
        eyebrow={currentLang === "az" ? "Birbaşa əlaqə" : "Get in touch"}
        title={currentLang === "az" ? "Kafedra ilə əlaqə" : "Contact the Department"}
      >
        <p className="max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300">
          {currentLang === "az"
            ? "Kafedranın fəaliyyəti, tədris proqramları və digər suallarınızla bağlı birbaşa kafedra rəhbərliyi ilə əlaqə saxlaya bilərsiniz."
            : "You can contact the department leadership directly regarding departmental activities, curricula, and other questions."}
        </p>
      </FacultyPanel>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {contactFields.map((field, idx) => {
            const palette = FACULTY_PALETTES[idx % FACULTY_PALETTES.length];
            const Icon = field.icon;
            const Wrapper: React.ElementType = field.href ? "a" : "div";
            const wrapperProps = field.href ? { href: field.href } : {};
            return (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.45 }}
              >
                <Wrapper
                  {...wrapperProps}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20"
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${palette.tint}`}>
                    <Icon sx={{ fontSize: 24 }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#ee7c7e]">
                      {field.label}
                    </p>
                    <p className="break-words text-base font-bold text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                      {field.value}
                    </p>
                    {field.sub && (
                      <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{field.sub}</p>
                    )}
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Location */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 items-center gap-8 rounded-2xl bg-[#1a2355] p-8 text-white md:p-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#ee7c7e]">
              {currentLang === "az" ? "Məkanımız" : "Our Location"}
            </p>
            <h2 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl">
              {currentLang === "az" ? "Azərbaycan Texniki Universitet" : "Azerbaijan Technical University"}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="flex h-56 w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 lg:h-64">
              <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <LocationOnIcon sx={{ fontSize: 34, color: "#ee7c7e" }} />
              </span>
              <p className="text-sm font-bold uppercase tracking-wide">
                {currentLang === "az" ? "Əsas bina" : "Main building"}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
