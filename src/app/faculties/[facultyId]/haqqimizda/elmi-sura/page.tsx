"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import { CouncilMember } from "@/types/faculty";

const COUNCIL_MEMBERS: CouncilMember[] = [
  { id: 1, last_name: "Əliyev", first_name: "Kamran", middle_name: "Rauf oğlu", position: "Şura sədri, dekan, professor" },
  { id: 2, last_name: "Hüseynov", first_name: "Tural", middle_name: "Elnur oğlu", position: "Şura katibi, dekan müavini, dosent" },
  { id: 3, last_name: "Məmmədova", first_name: "Günel", middle_name: "Rafiq qızı", position: "Elmi işlər üzrə dekan müavini, dosent" },
  { id: 4, last_name: "Quliyev", first_name: "Rauf", middle_name: "Əli oğlu", position: "Kafedra müdiri, professor" },
  { id: 5, last_name: "İsmayılova", first_name: "Sevinc", middle_name: "Nadir qızı", position: "Kafedra müdiri, dosent" },
  { id: 6, last_name: "Babayev", first_name: "Elnur", middle_name: "Faiq oğlu", position: "Professor" },
  { id: 7, last_name: "Nəsirov", first_name: "Vüsal", middle_name: "Kamil oğlu", position: "Dosent" },
  { id: 8, last_name: "Həsənli", first_name: "Aytən", middle_name: "Cavid qızı", position: "Dosent" },
  { id: 9, last_name: "Cəfərov", first_name: "Mübariz", middle_name: "Həsən oğlu", position: "Baş elmi işçi, dosent" },
  { id: 10, last_name: "Orucova", first_name: "Lalə", middle_name: "Tofiq qızı", position: "Müəllim, elmlər namizədi" },
  { id: 11, last_name: "Bağırov", first_name: "Anar", middle_name: "Şərif oğlu", position: "Tələbə nümayəndəsi" },
  { id: 12, last_name: "Süleymanova", first_name: "Nigar", middle_name: "Ramiz qızı", position: "Tələbə nümayəndəsi" },
];

export default function ElmiSuraPage() {
  const members: CouncilMember[] = COUNCIL_MEMBERS;

  return (
    <div className="space-y-6">
      <SectionBlock title="Fakültə elmi şurası" accent>
        {members.length === 0 ? (
          <ComingSoon label="Elmi şura üzvləri haqqında məlumat əlavə ediləcək" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-600">
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                    №
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                    Soyadı, adı, ata adı
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                    Vəzifəsi
                  </th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, idx) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-500 dark:text-slate-400 font-medium">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 text-[#1a2355] dark:text-white font-semibold">
                      {m.last_name} {m.first_name} {m.middle_name}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      {m.position}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionBlock>
    </div>
  );
}
