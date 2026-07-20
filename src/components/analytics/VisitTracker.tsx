"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { API_BASE_URL } from "@/util/apiClient";

const TRACK_URL = API_BASE_URL ? `${API_BASE_URL}/api/visits/track` : null;

// Anything that is not a rendered page: API calls and static asset requests.
const NON_PAGE = /^\/api(\/|$)|\.[a-z0-9]{2,5}$/i;

function send(path: string) {
  if (!TRACK_URL) return;

  const payload = JSON.stringify({ path });

  try {
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([payload], { type: "application/json" });
      if (navigator.sendBeacon(TRACK_URL, blob)) return;
    }
  } catch {
    // fall through to fetch
  }

  try {
    void fetch(TRACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // fire-and-forget: a failed page view must never surface to the visitor
  }
}

export default function VisitTracker() {
  const pathname = usePathname();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    if (lastSent.current === pathname) return;
    if (NON_PAGE.test(pathname)) return;

    lastSent.current = pathname;
    send(pathname);
  }, [pathname]);

  return null;
}
