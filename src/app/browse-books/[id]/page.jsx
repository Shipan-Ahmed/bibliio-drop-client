import { getUser } from '@/src/lib/userSession';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@heroui/react';

const BookDetailsPage = async ({ params }) => {
    const user = await getUser();
    const userId = user?.id; // Fallback to null if user ID is not available
    console.log("Current user ID user:", userId);

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
    const { title, author, description, deliveryFee, coverImage, category, librarianId } = book || {};
    console.log("librarianId from book details:", librarianId);
    
    const temporaryStatus = "Available"; // Temporary status for demonstration purposes
    return (
        <div className='min-h-screen container mx-auto flex items-center justify-center bg-base-100 p-4'>
            <div className="flex flex-col md:flex-row bg-white/30 shadow-md rounded-lg p-4 space-x-4  ">
                <div className='p-4  rounded-lg overflow-hidden shadow-md flex flex-col items-center justify-center gap-4'>
                    <Image src={coverImage} alt={title} className=' object-cover' width={300} height={300} />
                    <span className="badge badge-soft badge-primary" >{temporaryStatus} </span>
                </div>

                <div className='flex flex-col gap-4 items-start bg-white rounded-2xl shadow-md p-4 w-full'>
                    <div className='flex flex-col justify-center items-center gap-2 p-4 rounded-lg shadow-md w-full'>
                        <h2 className='text-3xl font-bold p-2 pt-2 '>Book Title:  {title} </h2>
                        <p className='text-lg'>Author: {author}</p>
                    </div>
                    <p className=' w-full text-xl px-2 py-10'><span className="font-bold">Description:</span> {description}</p>
                    <div className='  flex justify-between items-center text-xl p-4 w-full'>
                        <p className="badge badge-soft badge-info text-xl"><span className="font-bold  ">Category:</span> {category}</p>
                        <p className="badge badge-primary rounded-lg shadow text-xl"><span className="font-bold ">Delivery Fee:</span> <span className='text'>${deliveryFee?.toFixed(2)}</span></p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <form action="/api/checkout_sessions" method="POST" className="w-full">
                            <input type="hidden" name="price" value={deliveryFee} />
                            <input type="hidden" name="title" value={title} />
                            <Button type='submit' role="link" disabled={userId === librarianId} className="btn btn-primary w-full text-xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                                Request to Delivery
                            </Button>
                        </form>
                    </div>
                </div>
                

            </div>

        </div>
    );
};

export default BookDetailsPage;