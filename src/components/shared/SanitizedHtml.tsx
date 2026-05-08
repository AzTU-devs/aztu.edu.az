import { sanitizeHtml, decodeHtmlEntities } from "@/util/sanitizeHtml";

interface SanitizedHtmlProps {
  html: string;
  className?: string;
}

/**
 * Renders pre-sanitized HTML. Works in both Server Components (initial HTML
 * goes into the SSR response — great for SEO) and Client Components.
 * Uses a pure-JS sanitizer so server and client produce identical output —
 * no hydration mismatches, no DOM/jsdom dependency.
 */
export default function SanitizedHtml({ html, className = "" }: SanitizedHtmlProps) {
  const sanitized = html ? sanitizeHtml(decodeHtmlEntities(html)) : "";

  const defaultProseClasses = "prose prose-slate dark:prose-invert max-w-none";
  const combinedClassName = className.includes("prose")
    ? className
    : `${defaultProseClasses} ${className}`;

  return (
    <>
      <style>{`
        .sanitized-attachment-link a[download] {
          color: #2563eb;
          text-decoration: underline;
        }
        .sanitized-attachment-link a[download]:hover {
          color: #1d4ed8;
        }
      `}</style>
      <div
        className={`${combinedClassName} sanitized-attachment-link`}
        dangerouslySetInnerHTML={{ __html: sanitized || " " }}
      />
    </>
  );
}
