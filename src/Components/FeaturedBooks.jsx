import React from 'react';
import BookCard from './BookCard';

const FeaturedBooks = async () => {
    const allBooks = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books`);
    const books = await allBooks.json();
    console.log("Fetched featured books from API:", books);
    // only 6 books for display
    const featuredBooks = books.slice(0, 8);
    return (
        <div className='min-h-screen container mx-auto'>
            <h1 className='text-3xl font-bold p-4 my-4'>Featured Books</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {featuredBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedBooks;