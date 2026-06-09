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
        /* Match the admin editor's line spacing: tighten the oversized
           Tailwind "prose" paragraph margins so CMS text isn't spread out. */
        .sanitized-attachment-link p {
          margin-top: 0;
          margin-bottom: 0.6em;
        }
        .sanitized-attachment-link > :first-child {
          margin-top: 0;
        }
        .sanitized-attachment-link > :last-child {
          margin-bottom: 0;
        }
        /* A blank line (empty <p> from pressing Enter) renders as one line
           instead of a large gap. */
        .sanitized-attachment-link p:empty {
          margin: 0;
          min-height: 1em;
        }
        .sanitized-attachment-link h1,
        .sanitized-attachment-link h2,
        .sanitized-attachment-link h3,
        .sanitized-attachment-link h4,
        .sanitized-attachment-link h5,
        .sanitized-attachment-link h6 {
          margin-top: 1em;
          margin-bottom: 0.4em;
        }
        .sanitized-attachment-link ul,
        .sanitized-attachment-link ol {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }
        .sanitized-attachment-link li {
          margin-top: 0.15em;
          margin-bottom: 0.15em;
        }
      `}</style>
      <div
        className={`${combinedClassName} sanitized-attachment-link`}
        dangerouslySetInnerHTML={{ __html: sanitized || " " }}
      />
    </>
  );
}
