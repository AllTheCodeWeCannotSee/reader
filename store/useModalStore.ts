import {create} from "zustand";


export type ModalType = "book-upload";
interface ModalStore {
    isOpen: boolean;
    type: ModalType | null
    onOpen: (type: ModalType) => void;
    onClose: () => void;
}


export const useModalStore = create<ModalStore>((set) => ({
    isOpen: false,
    type: null,
    onOpen: (type) => set({ isOpen: true, type }),
    onClose: () => set({ isOpen: false, type: null}),
}));
