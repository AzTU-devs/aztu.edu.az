"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface SanitizedHtmlProps {
  html: string;
  className?: string;
}

export default function SanitizedHtml({ html, className }: SanitizedHtmlProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    setSanitizedHtml(DOMPurify.sanitize(html));
  }, [html]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
