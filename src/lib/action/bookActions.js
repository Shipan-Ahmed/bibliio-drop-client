"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function updateBookAction(formData) {
   
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
            throw new Error(errorData.message || "failed to update book via API.");
        }

        console.log(`✅ Book successfully updated via Fetch API! ID: ${id}`);

    } catch (error) {
        console.error(" Error in updateBookAction:", error);
     
        throw new Error(error.message || "failed to update book via API.");
    }

  
    revalidatePath(`/browse-books/${id}`);
    revalidatePath(`/browse-books`);

 
    redirect(`/browse-books/${id}`);
}