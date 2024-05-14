import BookList from "@/app/(main)/library/_components/book-list";
import {db} from "@/lib/db";
import {initialUser} from "@/lib/initial-user";

const LibraryPage = async () => {
    const user = await initialUser();

    if (!user) {
        return;
    }
    const books = await db.book.findMany({
        where: {
            userId: user.id,
        }
    });

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
