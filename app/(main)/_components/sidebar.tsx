"use client";
import {Library} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";

import Logo from "@/app/(main)/home/_components/logo";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";


const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className="flex flex-col h-full w-16 bg-blueGray items-center pt-5 gap-y-2">
            <Logo/>
            <Separator className="bg-zinc-700 mt-2 w-8 h-[2px]"/>
            <div className="mt-2 ">
                <Button
                    className={cn("h-8 w-8 rounded-md bg-blueGray hover:bg-zinc-700 flex items-center justify-center transition-all duration-300 ease-in-out",
                        pathname === "/library" && "bg-blue-300 hover:bg-blue-300 transition-all duration-300 ease-in-out")}
                    onClick={() => { router.push("/library")}}
                >
                    <div>
                        <Library size={24} className={cn("text-zinc-500 hover:text-zinc-300", pathname === "/library" && "text-blue-500 hover:text-blue-500")}/>
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default Sidebar;
