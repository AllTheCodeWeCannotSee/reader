import {NavItem} from "epubjs";

export interface TocItem {
    label: string;
    href: string;
    subitems: NavItem[];
}
