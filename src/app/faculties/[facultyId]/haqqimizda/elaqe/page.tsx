"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const contactFields = [
  {
    icon: <LocationOnIcon sx={{ fontSize: 22, color: "#1a2355" }} />,
    label: "Ünvan",
    value: "Bina, Otaq nömrəsi",
    sub: "AzTU kampusu",
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 22, color: "#1a2355" }} />,
    label: "Telefon",
    value: "+994 12 XXX XX XX",
    href: "tel:+994",
  },
  {
    icon: <EmailIcon sx={{ fontSize: 22, color: "#1a2355" }} />,
    label: "E-poçt",
    value: "faculty@aztu.edu.az",
    href: "mailto:faculty@aztu.edu.az",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 22, color: "#1a2355" }} />,
    label: "İş saatları",
    value: "Bazar ertəsi – Cümə",
    sub: "09:00 – 18:00",
  },
];

export default function ElaqePage() {
  return (
    <div className="space-y-6">
      <SectionBlock title="Əlaqə" accent>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
          Fakültə ilə əlaqə saxlamaq üçün aşağıdakı məlumatlardan istifadə edə bilərsiniz.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactFields.map((field) => (
            <div
              key={field.label}
              className="flex items-start gap-4 bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-5 border border-gray-100 dark:border-slate-600 hover:shadow-sm transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center flex-shrink-0">
                {field.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-slate-500 font-medium uppercase tracking-wide mb-1">
                  {field.label}
                </p>
                {field.href ? (
                  <a
                    href={field.href}
                    className="font-semibold text-[#1a2355] dark:text-white hover:text-[#ee7c7e] transition-colors"
                  >
                    {field.value}
                  </a>
                ) : (
                  <p className="font-semibold text-[#1a2355] dark:text-white">
                    {field.value}
                  </p>
                )}
                {field.sub && (
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                    {field.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* Map placeholder */}
      <SectionBlock title="Xəritə">
        <div className="w-full h-56 rounded-xl bg-[#1a2355]/5 dark:bg-[#1a2355]/10 flex items-center justify-center border border-dashed border-[#1a2355]/20 dark:border-[#1a2355]/30">
          <div className="text-center">
            <LocationOnIcon sx={{ fontSize: 40, color: "#1a2355", opacity: 0.3 }} />
            <p className="text-sm text-gray-400 dark:text-slate-500 mt-2">
              Xəritə tezliklə əlavə olunacaq
            </p>
          </div>
        </div>
      </SectionBlock>
    </div>
  );
}
