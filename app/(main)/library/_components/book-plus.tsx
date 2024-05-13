"use client";
import {Plus} from "lucide-react";
import {useModalStore} from "@/store/useModalStore";

const BookPlus = () => {

    const { onOpen } = useModalStore((state) => state);
    return (
        <div
            className="flex items-center justify-center w-40 h-64 border rounded-md bg-neutral-900 hover:cursor-pointer"
            onClick={() => {
                onOpen("book-upload");
            }}
        >
            <Plus size={32}/>
        </div>
    )
}

export default BookPlus;
