import DOMPurify from "isomorphic-dompurify";

interface SanitizedHtmlProps {
  html: string;
  className?: string;
}

// Decode HTML entities. Server-safe — does not touch the DOM.
function decodeHtmlEntities(encoded: string): string {
  if (!encoded) return "";
  return encoded
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
}

/**
 * Renders pre-sanitized HTML. Works in both Server Components (initial HTML
 * goes into the SSR response — great for SEO) and Client Components.
 * Uses isomorphic-dompurify which transparently switches between DOMPurify
 * (browser) and JSDOM-backed DOMPurify (server).
 */
export default function SanitizedHtml({ html, className = "" }: SanitizedHtmlProps) {
  const sanitized = html ? DOMPurify.sanitize(decodeHtmlEntities(html)) : "";

  const defaultProseClasses = "prose prose-slate dark:prose-invert max-w-none";
  const combinedClassName = className.includes("prose")
    ? className
    : `${defaultProseClasses} ${className}`;

  return (
    <div
      className={combinedClassName}
      dangerouslySetInnerHTML={{ __html: sanitized || " " }}
    />
  );
}
