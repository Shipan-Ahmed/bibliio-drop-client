'use server';
import { auth } from "../auth"; 
import { headers } from "next/headers"; 
import { getUser } from "../userSession";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const fetchWithAuth = async (url, options = {}) => {
   
    const tokenObj = await auth.api.getToken({
        headers: await headers()
    });

    const token = tokenObj?.token || null;

    const headersConfig = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers: headersConfig });
    return response.json();
};


export const getData = async () => {
    const user = await getUser();
    const userId = user?.id;

    if (!userId) {
        console.error("User ID not found for getData");
        return [];
    }

    return fetchWithAuth(`${baseUrl}/api/books?librarianId=${userId}`, { method: 'GET' });
};

export const getAllBooks = async () => {
    return fetchWithAuth(`${baseUrl}/api/allbooks`, { method: 'GET' });
};


// export const getAllBooksApproved = async () => {
//     // without token, public endpoint
//     try {
//         const response = await fetch(`${baseUrl}/api/books/approved`, { method: 'GET' });
//         if (!response.ok) {
//             throw new Error(`Failed to fetch approved books: ${response.statusText}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching approved books:", error);
//         return [];
//     }
// };



export async function getAllBooksApproved(params) {
    try {
        const query = new URLSearchParams({
            search: params?.search || '',
            category: params?.category || 'all',
            maxFee: params?.maxFee || '150',
            availability: params?.availability || 'all',
            page: params?.page || 1,
            limit: params?.limit || 8
        });

   
        const res = await fetch(`${baseUrl}/api/books/approved?${query.toString()}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error("Failed to fetch from backend API");
        }

        return await res.json();
    } catch (error) {
        console.error("Error in getAllBooksApproved Server Action:", error);
        
        return { books: [], totalPages: 1, currentPage: 1, totalItems: 0 };
    }
}


export const getBookDetails = async (id) => {
    // return fetchWithAuth(`${baseUrl}/api/books/${id}`, { method: 'GET' });
    // without token, public endpoint
    try {
        const response = await fetch(`${baseUrl}/api/books/${id}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to fetch book details for ID ${id}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching book details for ID ${id}:`, error);
        return null;
    }
};

export const updateBookAvailability = async (bookId, newStatus) => {
    try {
        return await fetchWithAuth(`${baseUrl}/api/books/${bookId}/availability`, {
            method: 'PATCH',
            body: JSON.stringify({ availability: newStatus }),
        });
    } catch (error) {
        console.error('Error updating book availability:', error);
        throw error;
    }
};


export const DeleteBook = async (bookId) => {
    try {
        const data = await fetchWithAuth(`${baseUrl}/api/books/${bookId}`, {
            method: 'DELETE',
        });
        console.log("Delete response:", data);
        return data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};


export const getAllAdminPendingBooks = async () => {
    return fetchWithAuth(`${baseUrl}/api/admin/pending-books`, { method: 'GET' });
};

export const getAllPaymentData = async () => {
    return fetchWithAuth(`${baseUrl}/api/payments`, { method: 'GET' });
};


export const getPaymentlibrarian = async () => {
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return null;

    return fetchWithAuth(`${baseUrl}/api/payment-status/librarian?librarianId=${userId}`, { method: 'GET' });
};

export const getPaymentUser = async () => {
    const user = await getUser();
    const userId = user?.id;

    if (!userId) return null;

    return fetchWithAuth(`${baseUrl}/api/payment-status/user?userId=${userId}`, { method: 'GET' });
};


export const getReviewsByBookId = async (bookId) => {
    // return fetchWithAuth(`${baseUrl}/api/reviews/${bookId}`, { method: 'GET' });
    // without token, public endpoint
    try {
        const response = await fetch(`${baseUrl}/api/reviews/${bookId}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to fetch reviews for book ID ${bookId}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching reviews for book ID ${bookId}:`, error);
        return [];
    }
};


export const checkCommentableByBookId = async (bookId) => {
    return fetchWithAuth(`${baseUrl}/api/payment-status/${bookId}`, { method: 'GET' });
};


export const checkCommentable = async (data) => {
    const { bookId, userId } = data;
    // return fetchWithAuth(`${baseUrl}/api/commentable/${bookId}/userId?userId=${userId}`, { method: 'GET' });
    // without token, public endpoint
    try {
        const response = await fetch(`${baseUrl}/api/commentable/${bookId}/userId?userId=${userId}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to check commentable for book ID ${bookId} and user ID ${userId}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error checking commentable for book ID ${bookId} and user ID ${userId}:`, error);
        return { commentable: false };
    }
};


export const getUserReviews = async (userId) => {
    return fetchWithAuth(`${baseUrl}/api/reviews/user/${userId}`, { method: 'GET' });
};


export const getAllUser = async () => {
    return fetchWithAuth(`${baseUrl}/api/users`, { method: 'GET' });
};