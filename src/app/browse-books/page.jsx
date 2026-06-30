import BookCard from '@/src/Components/BookCard';
import { getAllBooksApproved } from '@/src/lib/action/api';
import React from 'react';

const BrowseBook = async () => {
    const allBooks = await getAllBooksApproved() || [];
    console.log("Fetched books from API:", allBooks);
    
    return (
        <div className='min-h-screen container mx-auto'>
            <h1 className='text-3xl font-bold p-4 my-4'>All Books</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {allBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
}
export default BrowseBook;