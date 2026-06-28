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
