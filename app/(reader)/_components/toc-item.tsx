"use client";

import {NavItem} from "epubjs";
import {cn} from "@/lib/utils";
import {useHrefStore} from "@/store/useHrefStore";

interface TocItemProps {
    item: NavItem;
    key: string;
}

const TocItem = ({item}: TocItemProps) => {
    const {tocHref, updateTocHref, updateLocHref} = useHrefStore((state) => state)
    return (
        <div
            className="text-zinc-400 text-sm cursor-pointer mb-4"
        >
            <p
                className={cn("", tocHref === item.href ? "text-blue-400" : "")}
                onClick={() => {
                    console.log(item)
                    updateTocHref(item.href);
                    updateLocHref(item.href);
                }}
            >
                {item.label}
            </p>

            {item.subitems && item.subitems.length > 0 && (
                <ul className="pl-4 pt-4">
                    {item.subitems.map((subItem, index) => (
                        <TocItem item={subItem} key={subItem.id}/>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TocItem;
