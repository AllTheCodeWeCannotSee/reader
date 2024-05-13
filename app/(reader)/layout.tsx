import Navbar from "@/app/(reader)/_components/navbar";
import {Toaster} from "@/components/ui/toaster";

interface ReadLayoutProps {
    children: React.ReactNode;

}
const ReadLayout = ({ children }: ReadLayoutProps) => {
    return (
        <div className="h-full">
            {children}
            <Toaster />
        </div>

    )
};

export default ReadLayout;
