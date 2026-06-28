'use client'; // 👈 এটি একটি ক্লায়েন্ট কম্পোনেন্ট

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

const ReviewSection = ({ bookId, userId, userName, commentable, initialReviews , title }) => {
    const router = useRouter();
    const [reviews, setReviews] = useState(initialReviews || []);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const comment = formData.get('comment');

        const reviewData = {
            bookId,
            userId,
            userName: userName || "Anonymous",
            comment,
            title,
            timestamp: new Date().toISOString(),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Review submitted successfully:", data);

                e.target.reset();

                setReviews([reviewData, ...reviews]);

                router.refresh();
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col gap-4 items-start bg-white rounded-2xl shadow-md p-4 w-full mt-10'>
            <h2 className='text-3xl font-bold p-2 pt-2 '>Reviews ({reviews.length})</h2>
            <p className='text-gray-600'>Only users who have read this book can leave a review.</p>

            <div className='flex flex-col gap-4 w-full mt-10'>
              
                {commentable && (
                    <div className='border-b border-gray-300 pb-4 bg-white shadow-md rounded-lg p-4'>
                        <h3 className='text-xl font-semibold mb-2'>Leave a Review</h3>
                        <form onSubmit={onSubmit} className='flex flex-col gap-2'>
                            <textarea
                                name="comment"
                                placeholder="Write your review here..."
                                className='border border-gray-300 rounded-lg p-2 w-full'
                                required
                            ></textarea>
                            <Button
                                type='submit'
                                isLoading={loading}
                                className='btn btn-primary text-xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5'
                            >
                                Submit Review
                            </Button>
                        </form>
                    </div>
                )}

                {reviews.map((review, index) => (
                    <div key={review._id || index} className='border-b border-gray-300 pb-4 bg-white shadow-md rounded-lg p-4'>
                        <p className='text-gray-700'>{review.comment}</p>
                        <p className='text-sm text-gray-500'>
                            By {review.userName} on {new Date(review.timestamp).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewSection;