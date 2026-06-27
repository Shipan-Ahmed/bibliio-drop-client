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
    console.log("Fetched book details from API:", book);
    const { title, author, description, deliveryFee, coverImage, category } = book || {};
    

    return (
        <div className='min-h-screen container mx-auto flex items-center justify-center bg-base-200 p-4'>
            <div className="flex flex-col md:flex-row bg-base-300 shadow-md rounded-lg p-4 space-x-4  ">
                <div className='p-4 bg-white rounded-lg overflow-hidden shadow-md '>
                    <Image src={coverImage} alt={title} className=' object-cover' width={300} height={300} />
                </div>

                <div className='flex flex-col gap-4 items-start   '>
                    <div className='flex flex-col justify-center items-center gap-2 bg-white p-4 rounded-lg shadow-md w-full'>
                        <h2 className='text-3xl font-bold p-2 pt-2 '>Book Title:  {title} </h2>
                        <p className='text-lg'>Author: {author}</p>
                    </div>
                    <p className='bg-white w-full text-xl px-2 py-10'><span className="font-bold">Description:</span> {description}</p>
                    <div className='  flex justify-between items-center text-xl bg-white p-4 rounded-lg shadow-md w-full'>
                        <p className="badge badge-soft badge-info text-xl"><span className="font-bold  ">Category:</span> {category}</p>
                        <p className="badge badge-primary rounded-lg shadow text-xl"><span className="font-bold ">Delivery Fee:</span> <span className='text'>${deliveryFee?.toFixed(2)}</span></p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default BookDetailsPage;