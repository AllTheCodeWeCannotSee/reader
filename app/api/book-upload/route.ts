import {NextResponse} from "next/server";
import {db} from "@/lib/db";


export async function POST(req: Request) {
    try {
        const { name, url } = await req.json();

        const book = await db.book.create({
            data: {
                name: name,
                fileUrl: url,
            }
        });

        return NextResponse.json(book);
    } catch (error) {
        console.log("[BOOK_UPLOAD]", error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}
