
import Navbar from "@/app/(reader)/_components/navbar";
import Viewer from "@/app/(reader)/_components/viewer";

import {db} from "@/lib/db";

interface ReadPageProps {
    params: {
        bookId: string;
    }
}
const ReadPage = async ({
    params
                        }: ReadPageProps) => {

    const book = await db.book.findUnique({
        where: {
            id: params.bookId,
        }
    });
    if (!book) {
        return;
    }
    return (
        <div className="flex flex-col h-full">
            <Navbar/>
            <Viewer
                bookName={book.name}
                bookFileUrl={book.fileUrl}
            />
        </div>);
};

export default ReadPage;
