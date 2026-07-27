import { NextRequest } from "next/server";

/**
 * Server-side proxy for the Research CMS payload.
 *
 * Identical in purpose to `/api/about/[pageKey]`: the backend authorises
 * browser traffic by `Origin` (aztu.edu.az only) and otherwise wants an
 * `X-API-Key`, so a direct browser fetch 401s on localhost. This runs
 * server-side and attaches the key, which never reaches the browser bundle.
 *
 * The only difference is the upstream prefix — `/api/research` rather than
 * `/api/about`, because the Research pages are their own backend module.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const API_KEY = process.env.API_KEY ?? "";

const ALLOWED_LANGS = new Set(["az", "en"]);

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ pageKey: string }> }
) {
    const { pageKey } = await params;

    // The key is a path segment on an upstream URL, so it is constrained here
    // rather than passed through verbatim.
    if (!/^[a-z0-9-]{1,100}$/.test(pageKey)) {
        return Response.json(
            { status_code: 400, message: "Invalid page key." },
            { status: 400 }
        );
    }

    const requested = request.nextUrl.searchParams.get("lang") ?? "az";
    const lang = ALLOWED_LANGS.has(requested) ? requested : "az";

    if (!API_BASE) {
        return Response.json(
            { status_code: 500, message: "NEXT_PUBLIC_API_BASE_URL is not set." },
            { status: 500 }
        );
    }

    try {
        const headers: Record<string, string> = { "Accept-Language": lang };
        if (API_KEY) headers["X-API-Key"] = API_KEY;

        const upstream = await fetch(
            `${API_BASE.replace(/\/$/, "")}/api/research/public/pages/${pageKey}?lang=${lang}`,
            {
                headers,
                // Editors expect a save to show up on the next reload.
                cache: "no-store",
            }
        );

        const body = await upstream.text();
        return new Response(body, {
            status: upstream.status,
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        console.error(`[research] upstream fetch failed for "${pageKey}":`, error);
        return Response.json(
            { status_code: 502, message: "Upstream request failed." },
            { status: 502 }
        );
    }
}
