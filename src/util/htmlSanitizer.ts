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

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => NAMED_ENTITIES[name] ?? m);
}

export function stripHtml(html?: string, maxLength?: number): string {
  if (!html) return "";

  let working = html;
  for (let i = 0; i < 3; i++) {
    const decoded = decodeEntities(working);
    if (decoded === working) break;
    working = decoded;
  }

  const text = working
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<\/(p|div|br|li|h[1-6]|tr)\s*>/gi, " ")
    .replace(/<br\s*\/?>(\s*)/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (maxLength && text.length > maxLength) {
    return text.slice(0, maxLength).trimEnd() + "…";
  }
  return text;
}
