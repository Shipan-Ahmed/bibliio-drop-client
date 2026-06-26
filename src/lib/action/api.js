import { getUser } from "../userSession";

export const getData = async () => {
    const user = await getUser();
    const userId = user?.id; // Fallback to null if user ID is not available
    const userAllBooks = await fetch(`http://localhost:3002/api/books?librarianId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const allBooks = await userAllBooks.json();
    return allBooks;
};