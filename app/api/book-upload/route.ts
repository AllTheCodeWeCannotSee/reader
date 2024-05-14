import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {currentUser} from "@/lib/current-user";


export async function POST(req: Request) {
    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", {status: 401});
    }


    try {
        const { name, url } = await req.json();

        const book = await db.book.create({
            data: {
                name: name,
                fileUrl: url,
                userId: user.id,
            }
        });

        return NextResponse.json(book);
    } catch (error) {
        console.log("[BOOK_UPLOAD]", error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}
