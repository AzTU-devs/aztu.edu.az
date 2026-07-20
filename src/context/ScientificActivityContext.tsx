"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getCafedraScientificActivity } from "@/services/cafedraService/cafedraService";
import type { CafedraScientificActivity } from "@/types/scientificActivity";

type ScientificActivityContextType = {
  data: CafedraScientificActivity | null;
  loading: boolean;
};

const ScientificActivityContext = createContext<ScientificActivityContextType>({
  data: null,
  loading: true,
});

export function ScientificActivityProvider({
  cafedraCode,
  children,
}: {
  cafedraCode: string;
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();
  const [data, setData] = useState<CafedraScientificActivity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cafedraCode) {
      setData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    getCafedraScientificActivity(cafedraCode, lang).then((result) => {
      if (cancelled) return;
      setData(result);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [cafedraCode, lang]);

  return (
    <ScientificActivityContext.Provider value={{ data, loading }}>
      {children}
    </ScientificActivityContext.Provider>
  );
}

export const useScientificActivity = () => useContext(ScientificActivityContext);
