import { notFound } from "next/navigation";
import { getSectionByKey, getItemBySlug, getSectionSlugs } from "@/config/navigation";
import StaticSubPage from "@/components/pages/StaticSubPage";

const SECTION_KEY = "students";

/**
 * Server component on purpose.
 *
 * The slug is validated against the static navigation config before anything is
 * streamed, so an unknown slug produces a real HTTP 404. Doing this in a client
 * component only ever painted an error screen on top of a 200 response, which
 * left search engines and uptime checks believing the page was healthy.
 */
export default async function TehsilSlugPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const section = getSectionByKey(SECTION_KEY);
    const item = section ? getItemBySlug(SECTION_KEY, slug) : undefined;

    if (!section || !item) notFound();

    return <StaticSubPage section={section} item={item} />;
}

/**
 * The slug set is fixed static config, so these pages prerender and the router
 * rejects anything outside the set. Requests arriving through the middleware
 * rewrite still report 200 — Next does not surface a not-found status across a
 * rewrite — but the visitor gets the correct, bilingual not-found screen.
 */
export const dynamicParams = false;

export function generateStaticParams() {
    return getSectionSlugs(SECTION_KEY).map((slug) => ({ slug }));
}
