"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import PersonCard from "@/components/shared/PersonCard";
import { ViceDean } from "@/types/faculty";

const VICE_DEANS: ViceDean[] = [
  {
    id: 1,
    full_name: "Hüseynov Tural Elnur oğlu",
    title: "Dosent",
    responsibility_area: "Tədris işləri üzrə dekan müavini",
    photo_url: "https://ui-avatars.com/api/?name=Tural+Huseynov&background=1a2355&color=fff&size=200&bold=true",
    email: "t.huseynov@aztu.edu.az",
    phone: "+994 12 539 08 31",
  },
  {
    id: 2,
    full_name: "Məmmədova Günel Rafiq qızı",
    title: "Elmlər namizədi, dosent",
    responsibility_area: "Elmi işlər üzrə dekan müavini",
    photo_url: "https://ui-avatars.com/api/?name=Gunel+Mammadova&background=ee7c7e&color=fff&size=200&bold=true",
    email: "g.mammadova@aztu.edu.az",
    phone: "+994 12 539 08 35",
  },
  {
    id: 3,
    full_name: "Rzayev Orxan Mübariz oğlu",
    title: "Baş müəllim",
    responsibility_area: "Tələbə işləri üzrə dekan müavini",
    photo_url: "https://ui-avatars.com/api/?name=Orxan+Rzayev&background=334155&color=fff&size=200&bold=true",
    email: "o.rzayev@aztu.edu.az",
    phone: "+994 12 539 08 38",
  },
];

export default function DekanMuavinleriPage() {
  const viceDeans: ViceDean[] = VICE_DEANS;

  return (
    <div className="space-y-6">
      <SectionBlock title="Dekan müavinləri" accent>
        {viceDeans.length === 0 ? (
          <ComingSoon label="Dekan müavinləri haqqında məlumat əlavə ediləcək" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {viceDeans.map((vd) => (
              <div
                key={vd.id}
                className="bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-5 border border-gray-100 dark:border-slate-600"
              >
                <PersonCard
                  fullName={vd.full_name}
                  title={vd.title}
                  email={vd.email}
                  phone={vd.phone}
                />
                <p className="mt-3 text-xs text-center text-[#ee7c7e] font-semibold">
                  {vd.responsibility_area}
                </p>
              </div>
            ))}
          </div>
        )}
      </SectionBlock>
    </div>
  );
}
