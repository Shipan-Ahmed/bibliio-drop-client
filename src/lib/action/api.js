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