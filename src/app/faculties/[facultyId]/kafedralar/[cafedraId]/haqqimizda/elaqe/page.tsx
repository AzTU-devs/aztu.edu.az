"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PrintIcon from "@mui/icons-material/Print";

const contactFields = [
  {
    icon: <LocationOnIcon sx={{ fontSize: 22, color: "#1a2355" }} />,
    label: "Ünvan",
    value: "Bina, Otaq nömrəsi",
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 22, color: "#1a2355" }} />,
    label: "Tel",
    value: "+994 12 XXX XX XX",
    href: "tel:+994",
  },
  {
    icon: <PrintIcon sx={{ fontSize: 22, color: "#1a2355" }} />,
    label: "Faks",
    value: "+994 12 XXX XX XX",
  },
  {
    icon: <EmailIcon sx={{ fontSize: 22, color: "#1a2355" }} />,
    label: "E-poçt",
    value: "cafedra@aztu.edu.az",
    href: "mailto:cafedra@aztu.edu.az",
  },
];

export default function CafedraElaqePage() {
  return (
    <div className="space-y-6">
      <SectionBlock title="Əlaqə" accent>
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
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}
