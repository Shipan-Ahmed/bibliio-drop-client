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
        // ১. আগে নিশ্চিত হওয়া যে এটি রিকোয়েস্ট স্কোপের ভেতরেই কল হচ্ছে কিনা
        const headersList = await headers();

        const session = await auth.api.getSession({
            headers: headersList,
        });

        return session?.user || null;
    } catch (error) {
        // যদি রিকোয়েস্ট স্কোপের বাইরে (যেমন build time বা static render) কল হয়, 
        // তবে ক্র্যাশ না করে শুধু null রিটার্ন করবে।
        console.warn("getUser called outside of request scope:", error.message);
        return null;
    }
}

