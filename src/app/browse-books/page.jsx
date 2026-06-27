import BookCard from '@/src/Components/BookCard';
import React from 'react';

const BrowseBook = async () => {
    const allBooks = await fetch('http://localhost:3002/api/allbooks', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const books = await allBooks.json();
    console.log("Fetched books from API:", books);
    
    return (
        <div className='min-h-screen container mx-auto'>
            <h1 className='text-3xl font-bold text-center my-4'>All Books</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
}
export default BrowseBook;