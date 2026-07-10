export interface MenuItem {
    ID: number;
    title: string;
    post_title?: string;
    url: string;
    target?: string;
    menu_item_parent: string | number;
    classes?: Array<string>;
    fields?: {
        _menu_mega_menu?: unknown;
        _menu_icon?: string;
        _menu_media_icon?: string;
    };
}

export interface MenuNode extends MenuItem {
    children: Array<MenuNode>;
}

export type Menus = Record<string, Array<MenuItem>>;
