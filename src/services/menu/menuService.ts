import apiClient from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";

// Header menu types (New API)
export interface SubItem {
  id: number;
  title: string;
  slug: string;
  direct_url: string;
}

export interface MenuItem {
  id: number;
  title: string;
  slug: string;
  direct_url: string | null;
  sub_items: SubItem[];
}

export interface MenuHeader {
  id: number;
  title: string;
  slug: string;
  image_url: string | null;
  direct_url: string | null;
  items: MenuItem[];
}

// Footer menu types
export interface FooterLink {
    label: string;
    url: string;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterContact {
    email?: string;
    phones?: string[];
    address?: string;
}

export interface SocialLink {
    platform: string;
    url: string;
}

export interface PartnerLogo {
    label: string;
    image_url: string;
    url: string;
}

export interface QuickIcon {
    label: string;
    icon: string;
    url: string;
}

export interface FooterMenuData {
    university_name?: string;
    columns?: FooterColumn[];
    contact?: FooterContact;
    social_links?: SocialLink[];
    partner_logos?: PartnerLogo[];
    quick_icons?: QuickIcon[];
}

// Quick menu types
export interface QuickMenuItem {
    label: string;
    url: string;
}

export interface QuickMenuSection {
    key: string;
    title: string;
    items: QuickMenuItem[];
}

export interface QuickMenuData {
    title?: string;
    left_items?: QuickMenuItem[];
    contact?: { email?: string; phones?: string[] };
    social_links?: SocialLink[];
    right_sections?: QuickMenuSection[];
}

export const getHeaderMenu = async (lang: Lang = "az"): Promise<MenuHeader[]> => {
    try {
        const response = await apiClient.get(`/api/menu/header/?lang_code=${lang}`, {
            headers: { "Accept-Language": lang },
        });
        if (response.data.status_code === 200 && response.data.data) {
            return response.data.data as MenuHeader[];
        }
        return [];
    } catch {
        return [];
    }
};

export const getFooterMenu = async (lang: Lang = "az") => {
    try {
        const response = await apiClient.get(`/api/menu/footer?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });
        if (response.data.status_code === 200 && response.data.data) {
            return response.data.data as FooterMenuData;
        }
        return null;
    } catch {
        return null;
    }
};

export const getQuickMenu = async (lang: Lang = "az") => {
    try {
        const response = await apiClient.get(`/api/menu/quick?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });
        if (response.data.status_code === 200 && response.data.data) {
            return response.data.data as QuickMenuData;
        }
        return null;
    } catch {
        return null;
    }
};
