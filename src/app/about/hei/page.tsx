import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * The institute root has no content of its own — like a structural unit, it
 * opens on its "About" section.
 */
export default async function HeiRootPage() {
    const cookieStore = await cookies();
    const lang = cookieStore.get("aztu-lang")?.value === "en" ? "en" : "az";

    if (lang === "en") {
        redirect("/en/academic/education-and-programs/higher-education-institute-hei/about");
    }
    redirect("/az/akademik/tehsil-ve-proqramlar/yuksek-tehsil-institutu-yti/haqqimizda");
}
