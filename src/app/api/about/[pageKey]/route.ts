import { NextRequest } from "next/server";

/**
 * Server-side proxy for the About CMS payload.
 *
 * The backend's public API accepts a browser request only when its
 * `Origin`/`Referer` is an aztu.edu.az host, and otherwise demands
 * `X-API-Key`. That means a direct browser fetch works in production but 401s
 * on `localhost` during development, and the page silently falls back to its
 * built-in copy — which looks exactly like "the CMS isn't working".
 *
 * Routing through here fixes both: this runs on the server, so it can attach
 * the key from `API_KEY` (no `NEXT_PUBLIC_` prefix, so it never reaches the
 * browser bundle), and the page fetches its own origin, which is always
 * allowed.
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
            `${API_BASE.replace(/\/$/, "")}/api/about/public/pages/${pageKey}?lang=${lang}`,
            {
                headers,
                // Editors expect a save to show up on the next reload, so this
                // payload is never cached.
                cache: "no-store",
            }
        );

        const body = await upstream.text();
        return new Response(body, {
            status: upstream.status,
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        console.error(`[about] upstream fetch failed for "${pageKey}":`, error);
        return Response.json(
            { status_code: 502, message: "Upstream request failed." },
            { status: 502 }
        );
    }
}
