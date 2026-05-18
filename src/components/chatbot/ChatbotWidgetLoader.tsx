"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatbotWidget = dynamic(() => import("./ChatbotWidget"), { ssr: false });

export default function ChatbotWidgetLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = () => setReady(true);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(load, { timeout: 4000 });
    } else {
      const t = setTimeout(load, 3000);
      return () => clearTimeout(t);
    }
  }, []);

  if (!ready) return null;
  return <ChatbotWidget />;
}
