"use client";

import { usePathname } from "next/navigation";
import ScienceIcon from "@mui/icons-material/Science";
import { EmptyState } from "@/components/faculty/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useScientificActivity } from "@/context/ScientificActivityContext";
import { SCIENTIFIC_NAV } from "@/util/cafedraSlugs";

export default function ElmiFealiyyetLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang: currentLang } = useLanguage();
  const { data, loading } = useScientificActivity();

  const segments = pathname.split("/").filter(Boolean);
  const section = SCIENTIFIC_NAV.find((s) => segments.includes(s.az) || segments.includes(s.en));

  // A hand-typed URL to a section the server reports as empty degrades to an
  // EmptyState instead of a 404. The hub itself (no section) is never guarded.
  if (section && !loading && !data?.available.includes(section.key)) {
    return (
      <EmptyState
        icon={ScienceIcon}
        title={currentLang === "az" ? "Məlumat tapılmadı" : "No data found"}
        hint={
          currentLang === "az"
            ? "Bu bölmə üzrə hələ məlumat əlavə edilməyib."
            : "No information has been added for this section yet."
        }
      />
    );
  }

  return <>{children}</>;
}
