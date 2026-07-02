
export const dynamic = 'force-dynamic';
import { getUserReviews } from '@/src/lib/action/api';
import { getUser } from '@/src/lib/userSession';
import React from 'react';
import ReviewList from './ReviewEditDelete';


const MyReviewPage = async () => {
    const user = await getUser();
    const userId = user?.id;

 
    const myAllReview = await getUserReviews(userId) || [];
    console.log("My Reviews:", myAllReview);

    return (
        <div className="min-h-screen container mx-auto p-4 md:p-8 flex flex-col items-start">
            <h2 className="text-3xl font-bold text-neutral-800">My Reviews</h2>
            <p className="text-gray-500">Here are the books I've reviewed</p>

            <ReviewList initialReviews={myAllReview} />
        </div>
    );
};

export default MyReviewPage;