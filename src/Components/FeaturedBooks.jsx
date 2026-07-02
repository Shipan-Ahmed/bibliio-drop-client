
import BookCard from './BookCard';

import { auth } from '../lib/auth';
import { headers } from 'next/headers';
import { getAllBooksApproved } from '../lib/action/api';

const FeaturedBooks = async () => {
   

    const allBooks = await getAllBooksApproved();
    console.log("Fetched featured books from API:", allBooks);
    // only 6 books for display
    const featuredBooks = allBooks.books.slice(0, 8);
    return (
        <div className='min-h-screen max-w-7xl mx-auto '>
            <h1 className='text-3xl text-center font-bold p-4 my-4'>Featured Books</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {featuredBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedBooks;