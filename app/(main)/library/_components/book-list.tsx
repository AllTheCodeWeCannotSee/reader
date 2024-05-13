import BookCard from "@/app/(main)/library/_components/book-card";
import BookPlus from "@/app/(main)/library/_components/book-plus";

interface BookListProps {
    data: {
        id: string;
        name: string;
        imageUrl: string | null;
        fileUrl: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
}

const BookList = ({data}: BookListProps) => {


    return (
        <div className="grid grid-cols-8 mx-10 mt-4">
            <BookPlus/>
            {data.map((book) => (
                <div key={book.id}>
                    <BookCard id={book.id} title={book.name} imageUrl={book.imageUrl} fileUrl={book.fileUrl}/>
                </div>
            ))}

        </div>
    )

}

export default BookList;
