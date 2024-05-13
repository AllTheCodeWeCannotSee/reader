"use client";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";


const BackButton = () => {
    const router = useRouter();
    return (
        <div
            className="bg-blueGray  p-4"
            onClick={() => {router.push('/library')}}
        >
            <div className="group rounded-full bg-neutral-700 w-8 h-8 flex items-center justify-center hover:bg-neutral-500  transition-all duration-300 ease-in-out">
                <ArrowLeft size={24} className="text-zinc-400 group-hover:text-zinc-200"/>
            </div>
        </div>
    )
}

export default BackButton;
