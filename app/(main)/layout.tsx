import Sidebar from "@/app/(main)/_components/sidebar";
import {Toaster} from "@/components/ui/toaster";

interface HomeLayoutProps {
    children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 bg-[#161c22]">
            {children}
            <Toaster />
        </div>
    </div>
  );
}
export default HomeLayout;
