"use client";

import dynamic from "next/dynamic";

const ChatbotWidget = dynamic(() => import("./ChatbotWidget"), { ssr: false });

export default function ChatbotWidgetLoader() {
  return <ChatbotWidget />;
}
