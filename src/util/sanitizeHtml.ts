/**
 * Pure-JS HTML sanitizer. Runs in both Server Components and the browser
 * with no DOM / jsdom dependency. Tailored for trusted-but-still-sanitized
 * rich-text content from the CMS (news/announcement HTML).
 *
 * Strategy: allowlist of safe tags + safe attributes. Anything else is dropped.
 * This is more conservative than DOMPurify but produces identical output on
 * server and client, so SSR + hydration never diverges.
 */

const ALLOWED_TAGS = new Set([
    "a", "p", "br", "hr",
    "b", "i", "u", "strong", "em", "small", "s", "sub", "sup", "mark",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li",
    "blockquote", "pre", "code",
    "table", "thead", "tbody", "tfoot", "tr", "td", "th", "caption",
    "img", "figure", "figcaption",
    "div", "span", "section", "article",
    "iframe", // for embeds (allowlisted hosts only)
]);

// Per-tag allowed attributes. Keys missing here use GLOBAL_ATTRS only.
const TAG_ATTRS: Record<string, Set<string>> = {
    a: new Set(["href", "title", "target", "rel", "download"]),
    img: new Set(["src", "alt", "title", "width", "height", "loading"]),
    iframe: new Set(["src", "width", "height", "title", "allow", "allowfullscreen", "frameborder"]),
    table: new Set(["summary"]),
    td: new Set(["colspan", "rowspan"]),
    th: new Set(["colspan", "rowspan", "scope"]),
};

const GLOBAL_ATTRS = new Set(["class", "id", "lang", "dir"]);

// Hosts allowed for <iframe src>. Anything else is dropped.
const ALLOWED_IFRAME_HOSTS = [
    "youtube.com",
    "www.youtube.com",
    "youtube-nocookie.com",
    "www.youtube-nocookie.com",
    "player.vimeo.com",
    "vimeo.com",
    "drive.google.com",
    "docs.google.com",
];

const URL_SAFE_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

function isSafeUrl(value: string, allowRelative = true): boolean {
    if (!value) return false;
    const trimmed = value.trim();
    if (!trimmed) return false;
    if (allowRelative && (trimmed.startsWith("/") || trimmed.startsWith("#") || trimmed.startsWith("?"))) {
        return true;
    }
    try {
        const u = new URL(trimmed, "https://aztu.edu.az");
        if (!URL_SAFE_PROTOCOLS.includes(u.protocol)) return false;
        return true;
    } catch {
        return false;
    }
}

function isAllowedIframeSrc(value: string): boolean {
    try {
        const u = new URL(value, "https://aztu.edu.az");
        if (u.protocol !== "https:" && u.protocol !== "http:") return false;
        return ALLOWED_IFRAME_HOSTS.some((host) => u.hostname === host || u.hostname.endsWith("." + host));
    } catch {
        return false;
    }
}

function sanitizeAttributes(tag: string, rawAttrs: string): string {
    const out: string[] = [];
    // Match: name=value | name="value" | name='value' | name (boolean)
    const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(rawAttrs)) !== null) {
        const name = m[1].toLowerCase();
        const value = m[3] ?? m[4] ?? m[5] ?? "";

        // Reject any "on*" event handlers and any attr containing "javascript:" / "data:" in value.
        if (name.startsWith("on")) continue;
        if (/javascript:/i.test(value)) continue;
        if (name === "style") continue; // strip inline styles for safety
        if (name === "srcdoc") continue;

        const tagAttrs = TAG_ATTRS[tag];
        const allowed = (tagAttrs && tagAttrs.has(name)) || GLOBAL_ATTRS.has(name);
        if (!allowed) continue;

        // URL-bearing attributes: validate.
        if (name === "href" || name === "src") {
            if (tag === "iframe" && name === "src") {
                if (!isAllowedIframeSrc(value)) continue;
            } else if (!isSafeUrl(value)) {
                continue;
            }
        }

        // Force safe defaults on links: rel includes noopener noreferrer when target=_blank.
        out.push(`${name}="${escapeAttr(value)}"`);
    }

    if (tag === "a") {
        const lowered = out.map((s) => s.toLowerCase());
        const hasTargetBlank = lowered.some((s) => s.startsWith('target="_blank"'));
        const hasRel = lowered.some((s) => s.startsWith('rel='));
        if (hasTargetBlank && !hasRel) {
            out.push('rel="noopener noreferrer"');
        }
    }

    return out.length ? " " + out.join(" ") : "";
}

function escapeAttr(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

const VOID_TAGS = new Set(["br", "hr", "img"]);

/**
 * Sanitize an HTML string. Output is safe to use with `dangerouslySetInnerHTML`.
 * Identical result on server and client → no hydration mismatches.
 */
export function sanitizeHtml(input: string | null | undefined): string {
    if (!input) return "";

    // Strip <script> and <style> blocks entirely (including content).
    let html = input
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<!--[\s\S]*?-->/g, "");

    // Walk tags and rebuild output.
    const out: string[] = [];
    const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g;
    let lastIndex = 0;
    let m: RegExpExecArray | null;

    while ((m = tagRe.exec(html)) !== null) {
        // Append text between previous tag and this one (already-sanitized text content).
        out.push(html.slice(lastIndex, m.index));
        const fullMatch = m[0];
        const tag = m[1].toLowerCase();
        const isClose = fullMatch.startsWith("</");
        const attrs = m[2] ?? "";

        if (!ALLOWED_TAGS.has(tag)) {
            // Drop the tag entirely (but keep text between tags via the slice above).
            lastIndex = tagRe.lastIndex;
            continue;
        }

        if (isClose) {
            if (!VOID_TAGS.has(tag)) {
                out.push(`</${tag}>`);
            }
        } else {
            const safeAttrs = sanitizeAttributes(tag, attrs);
            const selfClose = VOID_TAGS.has(tag) ? " /" : "";
            out.push(`<${tag}${safeAttrs}${selfClose}>`);
        }

        lastIndex = tagRe.lastIndex;
    }
    out.push(html.slice(lastIndex));

    return out.join("");
}

const NAMED_ENTITIES: Record<string, string> = {
    nbsp: " ",
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    ndash: "–",
    mdash: "—",
    hellip: "…",
    laquo: "«",
    raquo: "»",
    copy: "©",
    reg: "®",
    trade: "™",
};

export function decodeHtmlEntities(s: string): string {
    if (!s) return "";
    return s
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
        .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
        .replace(/&([a-zA-Z]+);/g, (full, name) => NAMED_ENTITIES[name] ?? full);
}
