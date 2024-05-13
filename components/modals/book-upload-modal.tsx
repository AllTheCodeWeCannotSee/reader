"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import {UploadButton} from "@/utlis/uploadthing";
import {ClientUploadedFileData} from "uploadthing/types";
import axios from "axios";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useModalStore} from "@/store/useModalStore";


export const BookUploadModal = () => {
    const router = useRouter();
    const {
        isOpen,
        onClose,

    } = useModalStore((state) => state);
    const onClientUploadComplete = async (res:  ClientUploadedFileData<null>[]) => {
        try {
            await axios.post("/api/book-upload", res[0]);
            toast({
                title: "Upload Completed",
                duration: 1000
            });
            onClose();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={() => onClose()}>

            <DialogContent className="aspect-square">
                <DialogHeader>
                    <DialogTitle>上传Epub图书</DialogTitle>
                    <DialogDescription>选择一本喜欢的书，开始一段知识旅程✈️</DialogDescription>
                </DialogHeader>

                <UploadButton
                    endpoint="epubUploader"
                    onClientUploadComplete={onClientUploadComplete}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                    }}
                />
            </DialogContent>
        </Dialog>
    )
}
