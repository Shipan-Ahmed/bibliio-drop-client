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

  
    if (!id || !title || !author || isNaN(deliveryFee)) {
        throw new Error("all required fields must be provided and valid.");
    }

    try {
      
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ;

        const response = await fetch(`${baseUrl}/api/books/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            
            },
            body: JSON.stringify({
                title,
                author,
                category,
                deliveryFee,
                description
            }),
        });

     
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "API এর মাধ্যমে বুক আপডেট করতে ব্যর্থ হয়েছে।");
        }

        console.log(`✅ Book successfully updated via Fetch API! ID: ${id}`);

    } catch (error) {
        console.error("❌ Error in updateBookAction:", error);
     
        throw new Error(error.message || "সার্ভারে কোনো সমস্যা হয়েছে।");
    }

  
    revalidatePath(`/browse-books/${id}`);
    revalidatePath(`/browse-books`);

 
    redirect(`/browse-books/${id}`);
}