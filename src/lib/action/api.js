import { getUser } from "../userSession";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const user = await getUser();
const userId = user?.id; // Fallback to null if user ID is not available
export const getData = async () => {
    const userAllBooks = await fetch(`${baseUrl}/api/books?librarianId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const allBooks = await userAllBooks.json();
    return allBooks;
};

export const getBookDetails = async (id) => {
    const bookDetails = await fetch(`${baseUrl}/api/books/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return bookDetails.json();
}
export const updateBookAvailability = async (bookId, newStatus) => {
    try {
        const response = await fetch(`${baseUrl}/api/books/${bookId}/availability`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating book availability:', error);
        throw error;
    }
};


export const DeleteBook = async (bookId) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        console.log("Delete response:", data);
        return data; // Return the response data for further handling if needed
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error; // Rethrow the error for further handling if needed
    }
   
}

export const getPaymentlibrarian = async () => {
    const userPaymentStatus = await fetch(`${baseUrl}/api/payment-status/librarian?librarianId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const paymentStatus = await userPaymentStatus.json();
    return paymentStatus;
};


export const getPaymentUser = async () => {
    const userPaymentStatus = await fetch(`${baseUrl}/api/payment-status/user?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const paymentStatus = await userPaymentStatus.json();
    return paymentStatus;
};


export const getReviewsByBookId = async (bookId) => {
    const reviewsResponse = await fetch(`${baseUrl}/api/reviews/${bookId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const reviews = await reviewsResponse.json();
    return reviews;
};
export const checkCommentableByBookId = async (bookId) => {
    const reviewsResponse = await fetch(`${baseUrl}/api/payment-status//${bookId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const reviews = await reviewsResponse.json();
    return reviews;
};

export const checkCommentable = async (data) => {
    const { bookId, userId } = data;
    const commentableResponse = await fetch(`${baseUrl}/api/commentable/${bookId}/userId?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const commentable = await commentableResponse.json();
    return commentable;
};

export const getUserReviews = async (userId) => {
    const reviewsResponse = await fetch(`${baseUrl}/api/reviews/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const reviews = await reviewsResponse.json();
    return reviews;
};