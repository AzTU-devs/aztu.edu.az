/**
 * Which language's casing rules a string should be uppercased under.
 *
 * `text-transform: uppercase` follows the element's `lang`, and Azerbaijani (like
 * Turkish) maps `i` to the dotted `İ`. With `lang="az"` on `<html>`, every Latin
 * brand string rendered through a `uppercase` class came out mangled —
 * "AZERBAİJAN TECHNİCAL UNİVERSİTY", "INNOVATİON & TECHNOLOGY HUB",
 * "GREENMETRİC", "İFLA".
 *
 * Tagging those elements `lang="en"` fixes the casing, but the text is often
 * CMS-supplied and may legitimately be Azerbaijani, where `lang="en"` would be
 * just as wrong in the other direction (`İ` → `I`). So the language is derived
 * from the characters actually present: anything carrying a letter unique to the
 * Azerbaijani alphabet is Azerbaijani, everything else is treated as Latin.
 */
const AZERBAIJANI_ONLY = /[əƏğĞşŞçÇıİöÖüÜ]/;

export function brandLang(text: string | null | undefined): "az" | "en" {
    return text && AZERBAIJANI_ONLY.test(text) ? "az" : "en";
}
