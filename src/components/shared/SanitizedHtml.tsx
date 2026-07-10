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
  // Wrap tables so wide/many-column tables scroll horizontally inside the
  // article column instead of overflowing the page.
  const withScrollableTables = sanitized
    .replace(/<table\b/gi, '<div class="sanitized-table-scroll"><table')
    .replace(/<\/table>/gi, "</table></div>");

  const defaultProseClasses = "prose prose-slate dark:prose-invert max-w-none";
  const combinedClassName = className.includes("prose")
    ? className
    : `${defaultProseClasses} ${className}`;

  return (
    <>
      <style>{`
        /* Links and download attachments render in blue so they read as links,
           not plain text. */
        .sanitized-attachment-link a {
          color: #2563eb;
          text-decoration: underline;
        }
        .sanitized-attachment-link a:hover {
          color: #1d4ed8;
        }
        .dark .sanitized-attachment-link a {
          color: #60a5fa;
        }
        .dark .sanitized-attachment-link a:hover {
          color: #93c5fd;
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
        /* Preserve the spacing the author typed in the CMS editor: multiple
           spaces, leading spaces and indentation are kept exactly (text still
           wraps normally). Matches the editor's white-space: pre-wrap. */
        .sanitized-attachment-link p,
        .sanitized-attachment-link li,
        .sanitized-attachment-link td,
        .sanitized-attachment-link th,
        .sanitized-attachment-link h1,
        .sanitized-attachment-link h2,
        .sanitized-attachment-link h3,
        .sanitized-attachment-link h4,
        .sanitized-attachment-link h5,
        .sanitized-attachment-link h6 {
          white-space: pre-wrap;
        }
        /* Render tables as a full grid, the same way the admin editor shows
           them (Tailwind "prose" only draws faint row borders, so pasted
           tables didn't look like tables). */
        /* Let wide tables scroll horizontally within the article instead of
           pushing the page out. */
        .sanitized-attachment-link .sanitized-table-scroll {
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 1rem 0;
        }
        .sanitized-attachment-link table {
          width: 100%;
          border-collapse: collapse;
          margin: 0;
          display: table;
        }
        .sanitized-attachment-link th,
        .sanitized-attachment-link td {
          border: 1px solid #d1d5db;
          padding: 0.5rem;
          text-align: left;
          vertical-align: top;
        }
        .sanitized-attachment-link th {
          background-color: #f9fafb;
          font-weight: 600;
        }
        .dark .sanitized-attachment-link th {
          background-color: #1f2937;
        }
        .dark .sanitized-attachment-link th,
        .dark .sanitized-attachment-link td {
          border-color: #374151;
        }
      `}</style>
      <div
        className={`${combinedClassName} sanitized-attachment-link`}
        dangerouslySetInnerHTML={{ __html: withScrollableTables || " " }}
      />
    </>
  );
}
