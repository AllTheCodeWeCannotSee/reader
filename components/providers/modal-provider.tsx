"use client";

import {useEffect, useState} from "react";
import {BookUploadModal} from "@/components/modals/book-upload-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <BookUploadModal />
    )
}
