'use server';
import { headers } from "next/headers";
import { auth } from "./auth";

// export const getUser = async () => {
//     const session = await auth.api.getSession({
//         headers: await headers(),
//     });
//     return session?.user || null; // Return null if user is not available
// }


export const getUser = async () => {
    try {
        const headersList = await headers();

        const session = await auth.api.getSession({
            headers: headersList,
        });

        return session?.user || null;
    } catch (error) {
        console.warn("getUser called outside of request scope:", error.message);
        return null;
    }
}

