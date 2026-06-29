"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * 📝 Fetch API কল করে বইয়ের তথ্য আপডেট করার Server Action
 * @param {FormData} formData - এডিট ফর্ম থেকে আসা ডেটা
 */
export async function updateBookAction(formData) {
    // ১. ফর্ম থেকে ইনপুট ডেটা লুফে নেওয়া
    const id = formData.get("id");
    const title = formData.get("title")?.toString().trim();
    const author = formData.get("author")?.toString().trim();
    const category = formData.get("category")?.toString().trim();
    const deliveryFee = parseFloat(formData.get("deliveryFee"));
    const description = formData.get("description")?.toString().trim();

    // ২. বেসিক ব্যাকএন্ড ভ্যালিডেশন
    if (!id || !title || !author || isNaN(deliveryFee)) {
        throw new Error("সবগুলো প্রয়োজনীয় ফিল্ড সঠিকভাবে পূরণ করুন।");
    }

    try {
        // ৩. আপনার ডোমেন ইউআরএল (পরিবেশ অনুযায়ী .env ফাইল থেকে বা সরাসরি লোকালহোস্ট)
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";

        // ৪. সরাসরি Fetch API কল করা (PUT Method)
        const response = await fetch(`${baseUrl}/api/books/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // যদি আপনার কোনো অথেনটিকেশন টোকেন লাগে, এখানে পাস করতে পারেন
            },
            body: JSON.stringify({
                title,
                author,
                category,
                deliveryFee,
                description
            }),
        });

        // যদি রেসপন্স ওকে (200-299) না হয়
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "API এর মাধ্যমে বুক আপডেট করতে ব্যর্থ হয়েছে।");
        }

        console.log(`✅ Book successfully updated via Fetch API! ID: ${id}`);

    } catch (error) {
        console.error("❌ Error in updateBookAction:", error);
        // ফ্রন্টএন্ডে ইরর মেসেজ হ্যান্ডেল করার জন্য এটি থ্রো করা হচ্ছে
        throw new Error(error.message || "সার্ভারে কোনো সমস্যা হয়েছে।");
    }

    // ৫. ক্যাশ রিলিজ করা যাতে রিফ্রেশ ছাড়াই নতুন ডেটা দেখা যায়
    revalidatePath(`/browse-books/${id}`);
    revalidatePath(`/browse-books`);

    // ৬. সফলভাবে আপডেট শেষে মূল বইয়ের ডিটেইলস পেজে রিডাইরেক্ট
    redirect(`/browse-books/${id}`);
}