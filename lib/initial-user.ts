import {currentUser, redirectToSignIn} from "@clerk/nextjs/server";
import {db} from "@/lib/db";


type UserProfile = {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};
export const initialUser = async () : Promise<UserProfile | void> => {
    const user = await currentUser();

    if (!user) {
        return;
    }

    const userProfile = await db.user.findUnique({
        where: {
            userId: user.id,
        }
    });

    if (userProfile) {
        return userProfile;
    }

    const newUserProfile = await db.user.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });
    return newUserProfile;
}
