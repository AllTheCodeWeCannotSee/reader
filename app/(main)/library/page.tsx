import BookList from "@/app/(main)/library/_components/book-list";
import {db} from "@/lib/db";

const LibraryPage = async () => {
    const books = await db.book.findMany();

    if (!books) {
        return;
    }
    return (

        <div>
            <BookList data={books}/>
        </div>
    )
}

export default LibraryPage;
