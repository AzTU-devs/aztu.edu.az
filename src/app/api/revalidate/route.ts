import { revalidatePath, revalidateTag } from "next/cache";

interface RevalidateBody {
    secret?: string;
    path?: string;
    tag?: string;
    paths?: string[];
}

/**
 * On-demand revalidation webhook for the CMS / admin tool to call after
 * publishing news / announcements / faculty edits.
 *
 * Example:
 *   POST /api/revalidate
 *   { "secret": "...", "path": "/news/example-news-123" }
 *   { "secret": "...", "paths": ["/news", "/sitemap.xml", "/news-sitemap.xml", "/feed.xml"] }
 *
 * Set `REVALIDATE_SECRET` in `.env.local` and prod env. Without it, the
 * endpoint always 401s.
 */
export async function POST(req: Request) {
    const expected = process.env.REVALIDATE_SECRET;
    if (!expected) {
        return Response.json(
            { ok: false, error: "REVALIDATE_SECRET is not configured on the server" },
            { status: 500 }
        );
    }

    let body: RevalidateBody;
    try {
        body = (await req.json()) as RevalidateBody;
    } catch {
        return Response.json({ ok: false, error: "invalid json" }, { status: 400 });
    }

    if (body.secret !== expected) {
        return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const revalidated: { paths: string[]; tags: string[] } = { paths: [], tags: [] };

    if (body.tag) {
        revalidateTag(body.tag);
        revalidated.tags.push(body.tag);
    }
    if (body.path) {
        revalidatePath(body.path);
        revalidated.paths.push(body.path);
    }
    if (Array.isArray(body.paths)) {
        for (const p of body.paths) {
            if (typeof p === "string" && p.length > 0) {
                revalidatePath(p);
                revalidated.paths.push(p);
            }
        }
    }

    if (revalidated.paths.length === 0 && revalidated.tags.length === 0) {
        return Response.json(
            { ok: false, error: "provide path, paths, or tag" },
            { status: 400 }
        );
    }

    return Response.json({ ok: true, revalidated, now: Date.now() });
}
