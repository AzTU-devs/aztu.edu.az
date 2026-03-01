"use client";

import { useState } from "react";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import { ScientificPublication } from "@/types/cafedra";
import ArticleIcon from "@mui/icons-material/Article";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const typeConfig: Record<
  string,
  { label: string; icon: React.ReactNode; color: string }
> = {
  article: {
    label: "Məqalə",
    icon: <ArticleIcon sx={{ fontSize: 18 }} />,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  book: {
    label: "Kitab",
    icon: <MenuBookIcon sx={{ fontSize: 18 }} />,
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
  conference: {
    label: "Konfrans",
    icon: <DescriptionIcon sx={{ fontSize: 18 }} />,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  },
  patent: {
    label: "Patent",
    icon: <EmojiObjectsIcon sx={{ fontSize: 18 }} />,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  },
};

export default function ElmiFealiyyetPage() {
  const publications: ScientificPublication[] = [
    {
      id: 1,
      title: "Deep Learning Approaches for Cybersecurity Threat Detection in Industrial IoT Networks",
      authors: ["Quliyev R.Ə.", "Nəsirov V.K.", "Həsənli A.C."],
      journal: "IEEE Transactions on Industrial Informatics",
      year: 2025,
      doi: "10.1109/TII.2025.123456",
      type: "article",
    },
    {
      id: 2,
      title: "Distributed Database Management Systems: Theory and Practice",
      authors: ["Quliyev R.Ə."],
      year: 2024,
      type: "book",
    },
    {
      id: 3,
      title: "Cloud-Native Architecture Patterns for Scalable Enterprise Applications",
      authors: ["Cəfərov M.H.", "Qasımov E.Z."],
      journal: "International Conference on Cloud Computing and Services Science (CLOSER)",
      year: 2025,
      type: "conference",
    },
    {
      id: 4,
      title: "Verilənlərin şifrələnməsi üçün adaptiv kriptoqrafik protokol",
      authors: ["Nəsirov V.K.", "Süleymanova N.R."],
      year: 2024,
      type: "patent",
    },
    {
      id: 5,
      title: "Federated Learning for Privacy-Preserving Machine Learning in Healthcare",
      authors: ["Həsənli A.C.", "Cəfərov M.H."],
      journal: "Journal of Biomedical Informatics",
      year: 2024,
      doi: "10.1016/j.jbi.2024.789012",
      type: "article",
    },
    {
      id: 6,
      title: "Graph Neural Networks in Anomaly Detection: A Survey",
      authors: ["Qasımov E.Z.", "Süleymanova N.R.", "Nəsirov V.K."],
      journal: "ACM Computing Surveys",
      year: 2025,
      doi: "10.1145/3600000",
      type: "article",
    },
    {
      id: 7,
      title: "Rəqəmsal Transformasiya: Azərbaycan Perspektivi",
      authors: ["Quliyev R.Ə.", "Cəfərov M.H."],
      year: 2023,
      type: "book",
    },
    {
      id: 8,
      title: "Blockchain-Based Supply Chain Transparency Framework",
      authors: ["Həsənli A.C."],
      journal: "Proceedings of the International Conference on Blockchain Technology",
      year: 2024,
      type: "conference",
    },
  ];
  const [filter, setFilter] = useState<string>("all");

  const types = ["all", "article", "book", "conference", "patent"];
  const typeLabels: Record<string, string> = {
    all: "Hamısı",
    article: "Məqalələr",
    book: "Kitablar",
    conference: "Konfranslar",
    patent: "Patentlər",
  };

  const filtered =
    filter === "all"
      ? publications
      : publications.filter((p) => p.type === filter);

  return (
    <div className="space-y-6">
      <SectionBlock title="Elmi fəaliyyət" accent>
        {publications.length === 0 ? (
          <ComingSoon label="Elmi nəşrlər haqqında məlumat tezliklə əlavə olunacaq" />
        ) : (
          <>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    filter === t
                      ? "bg-[#1a2355] text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {typeLabels[t]}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filtered.map((pub) => {
                const config = typeConfig[pub.type];
                return (
                  <div
                    key={pub.id}
                    className="bg-gray-50 dark:bg-slate-700/40 rounded-xl p-5 border border-gray-100 dark:border-slate-600 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${config.color}`}
                          >
                            {config.icon}
                            {config.label}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-slate-500">
                            {pub.year}
                          </span>
                        </div>
                        <p className="font-semibold text-[#1a2355] dark:text-white text-sm mb-1 leading-snug">
                          {pub.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">
                          {pub.authors.join(", ")}
                        </p>
                        {pub.journal && (
                          <p className="text-xs text-gray-400 dark:text-slate-500 italic">
                            {pub.journal}
                          </p>
                        )}
                      </div>
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 text-[#1a2355] dark:text-blue-400 hover:text-[#ee7c7e] transition-colors"
                          title="DOI linki"
                        >
                          <OpenInNewIcon sx={{ fontSize: 18 }} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </SectionBlock>
    </div>
  );
}
