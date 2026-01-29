import apiClient from "@/util/apiClient";

export interface MenuItemInterface {
    item_id: number;
    url: string;
    display_order: number;
    title: string;
    created_at: string;
}

export interface MenuInterface {
    menu_id: number;
    category_id: number;
    url?: string;
    display_order: number;
    title: string;
    created_at: string;
    menu_items: MenuItemInterface[];
}

export const getMenus = async (langCode: string) => {
    try {
        const response = await apiClient.get(`/api/menu/all?lang_code=${langCode}`);

        if (response.data.status_code === 200) {
            return response.data.menus;
        } else if (response.data.status === 204) {
            return "NO_CONTENT";
        }
    } catch (err: unknown) {
        return "ERROR";
    }
}