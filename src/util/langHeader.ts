/**
 * Name of the request header the middleware uses to carry the active locale
 * into the rewritten request.
 *
 * The site is served under `/az` and `/en` prefixes, but `middleware.ts`
 * rewrites both onto the same prefix-less route tree — so by the time a server
 * component runs, the only surviving trace of the visitor's language is this
 * header. Anything that renders on the server and needs the locale (metadata,
 * `<html lang>`) reads it from here.
 *
 * Kept in its own module with no imports so the edge middleware bundle can pull
 * it in without dragging `next/headers` along.
 */
export const LANG_HEADER = "x-aztu-lang";
