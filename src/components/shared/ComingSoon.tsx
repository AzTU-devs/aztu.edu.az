"use client";

import ConstructionIcon from "@mui/icons-material/Construction";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  label?: string;
}

export default function ComingSoon({ label }: Props) {
  const t = useTranslation();
  const { lang } = useLanguage();
  const subtitle = lang === "az"
    ? "Bu məzmun tezliklə əlavə ediləcək."
    : "This content will be available soon.";
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <div className="w-16 h-16 rounded-full bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center">
        <ConstructionIcon sx={{ fontSize: 32, color: "#1a2355" }} />
      </div>
      <p className="text-gray-500 dark:text-slate-400 font-medium">
        {label ?? t.common.comingSoon}
      </p>
      <p className="text-sm text-gray-400 dark:text-slate-500 max-w-xs">
        {subtitle}
      </p>
    </div>
  );
}
