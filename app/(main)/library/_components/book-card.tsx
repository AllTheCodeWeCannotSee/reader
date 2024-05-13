"use client";
import {Book} from "lucide-react";
import {useRouter} from "next/navigation";
import Image from "next/image";

interface BookCardProps {
    id: string;
    title: string;
    imageUrl: string | null;
    fileUrl: string;
}

const BookCard = ({
                      id,
                      title,
                      imageUrl,
                      fileUrl
                  }: BookCardProps) => {
    const router = useRouter();
    return (
        <div
            className="group flex flex-col items-center justify-between py-4 w-40 h-64   bg-[#171c21] hover:cursor-pointer"
            onClick={() => {
                router.push(`/read/${id}`)
            }}
        >

            {imageUrl && <Image src={imageUrl} alt="book-cover" width={120} height={150} className="rounded-md"/>}
            <p className="text-zinc-400 group-hover:text-zinc-200">{title}</p>
        </div>
    )
}

export default BookCard;
