"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface SanitizedHtmlProps {
  html: string;
  className?: string;
}

function decodeHtmlEntities(encoded: string): string {
  if (typeof window === "undefined") return encoded;
  const textarea = document.createElement("textarea");
  textarea.innerHTML = encoded;
  return textarea.value;
}

export default function SanitizedHtml({ html, className = "" }: SanitizedHtmlProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    if (html) {
      const decoded = decodeHtmlEntities(html);
      setSanitizedHtml(DOMPurify.sanitize(decoded));
    }
  }, [html]);

  // Default prose classes that ensure good styling for rich text
  const defaultProseClasses = "prose prose-slate dark:prose-invert max-w-none";
  const combinedClassName = className.includes("prose") 
    ? className 
    : `${defaultProseClasses} ${className}`;

  return (
    <div
      className={combinedClassName}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml || " " }}
    />
  );
}
