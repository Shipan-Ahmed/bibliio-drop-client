import Image from 'next/image';
import React from 'react';

const BookDetailsPage = async ({params}) => {
    const { id } = await params || {};
    console.log("Book ID from params:", id);
    const bookDetails = await fetch(`http://localhost:3002/api/books/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const book = await bookDetails.json();
    const { title, author, description, deliveryfee, coverimg, category } = book || {};
    

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-4 space-x-4">
                <div>
                    <Image src={coverimg} alt={title} className='w-64 h-64 object-cover' />
                </div>

                <div>
                    <h2> {title} </h2>
                    <p>Author: {author}</p>
                    <p>Description: {description}</p>
                    <p>Category: {category}</p>
                    <p>Delivery Fee: ${deliveryfee?.toFixed(2)}</p>

                </div>

            </div>

        </div>
    );
};

export default BookDetailsPage;