import { getUser } from '@/src/lib/userSession';
import Image from 'next/image';
import React from 'react';
import { Button } from '@heroui/react';
import { checkCommentable, getReviewsByBookId, getBookDetails } from '@/src/lib/action/api';
import ReviewSection from './ReviewSection'; // 👈 নতুন তৈরি করা ক্লায়েন্ট ফাইলটি ইম্পোর্ট করুন

const BookDetailsPage = async ({ params }) => {
    const user = await getUser();
    const userId = user?.id;

    const { id } = await params || {};
    const book = await getBookDetails(id);

    const { title, author, description, deliveryFee, coverImage, category, librarianId, availability } = book || {};
    const temporaryStatus = availability ? "Available" : "Not Available";

    const allReviews = await getReviewsByBookId(id) || [];
    const { commentable } = await checkCommentable({ bookId: id, userId });

    return (
        <div className='min-h-screen container mx-auto flex flex-col items-center justify-center bg-base-100 p-4'>
            <div className="flex flex-col md:flex-row bg-white/30 shadow-md rounded-lg p-4 space-x-4">
                <div className='p-4 rounded-lg overflow-hidden shadow-md flex flex-col items-center justify-center gap-4'>
                    <Image src={coverImage} alt={title || "Book Cover"} className='object-cover' width={300} height={300} />
                    <span className="badge badge-soft badge-primary">{temporaryStatus}</span>
                </div>

                <div className='flex flex-col gap-4 items-start bg-white rounded-2xl shadow-md p-4 w-full'>
                    <div className='flex flex-col justify-center items-center gap-2 p-4 rounded-lg shadow-md w-full'>
                        <h2 className='text-3xl font-bold p-2 pt-2 '>Book Title: {title}</h2>
                        <p className='text-lg'>Author: {author}</p>
                    </div>
                    <p className='w-full text-xl px-2 py-10'><span className="font-bold">Description:</span> {description}</p>
                    <div className='flex justify-between items-center text-xl p-4 w-full'>
                        <p className="badge badge-soft badge-info text-xl"><span className="font-bold">Category:</span> {category}</p>
                        <p className="badge badge-primary rounded-lg shadow text-xl"><span className="font-bold">Delivery Fee:</span> <span>${deliveryFee?.toFixed(2)}</span></p>
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <form action="/api/checkout_sessions" method="POST" className="w-full">
                            <input type="hidden" name="price" value={deliveryFee} />
                            <input type="hidden" name="title" value={title} />
                            <input type="hidden" name="librarianId" value={librarianId} />
                            <input type="hidden" name="availability" value={availability} />
                            <input type="hidden" name="bookId" value={id} />
                            <Button type='submit' role="link" disabled={userId === librarianId} className="btn btn-primary w-full text-xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                                Request to Delivery
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* 👇 ইনভ্যালিড রিভিউ পার্ট বাদ দিয়ে নতুন ক্লায়েন্ট কম্পোনেন্টটি বসানো হলো */}
            <ReviewSection
                bookId={id}
                userId={userId}
                userName={user?.name}
                commentable={commentable}
                initialReviews={allReviews}
            />
        </div>
    );
};

export default BookDetailsPage;