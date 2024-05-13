"use client";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Image from "next/image";
const Logo = () => {
    const router = useRouter();
    return (
        <div className="">
            <Button
                asChild
                className="w-8 h-8 rounded-none aspect-square hover:cursor-pointer bg-blueGray hover:bg-blueGray"
                onClick={() => router.push("/home")}
            >
                <div className="relative w-full h-full">
                    <Image
                        src="/logo.svg"
                        fill
                        alt="logo"
                        sizes="100vw"
                        className="object-contain"
                    />
                </div>

            </Button>

        </div>
    )
}

export default Logo;
