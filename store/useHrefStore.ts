import {create} from "zustand";

interface HrefStore {
    tocHref: string;
    locHref: string
    updateTocHref: (newHref: string) => void;
    updateLocHref: (newHref: string) => void;
}

export const useHrefStore= create<HrefStore>((set) => ({
    tocHref: "",
    locHref: "0",

    updateTocHref: (newHref) => set({tocHref: newHref}),
    updateLocHref: (newHref) => set({locHref: newHref}),
}))
