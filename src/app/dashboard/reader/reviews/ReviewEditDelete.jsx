'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

const ReviewList = ({ initialReviews }) => {
    const router = useRouter();
    const [reviews, setReviews] = useState(initialReviews || []);
    const [editingId, setEditingId] = useState(null);
    const [editComment, setEditComment] = useState("");

   
    const handleDelete = async (reviewId) => {
    

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reviews/${reviewId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setReviews(reviews.filter(r => r._id !== reviewId));
                router.refresh();
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    // edit mode on
    const startEdit = (review) => {
        setEditingId(review._id);
        setEditComment(review.comment);
    };

    
    const handleUpdate = async (reviewId) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reviews/${reviewId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment: editComment }),
            });

            if (res.ok) {
                // state update for the edited review
                setReviews(reviews.map(r => r._id === reviewId ? { ...r, comment: editComment } : r));
                setEditingId(null);
                router.refresh();
            }
        } catch (error) {
            console.error("Error updating review:", error);
        }
    };

    if (reviews.length === 0) {
        return <p className="text-gray-500 mt-6">You haven't reviewed any books yet.</p>;
    }

    return (
        <div className="flex flex-col gap-4 mt-6 w-full max-w-4xl">
            {reviews.map((review) => (
                <div key={review._id} className="bg-white shadow border border-gray-200 rounded-xl p-5 flex flex-col justify-between md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-xl font-bold text-neutral-800">{review.bookTitle || review.title || "Book Title"}</h3>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                {new Date(review.timestamp || review.date).toLocaleDateString()}
                            </span>
                        </div>

                        {editingId === review._id ? (
                            <textarea
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 w-full mt-2 text-sm"
                                rows={2}
                            />
                        ) : (
                            <p className="text-gray-600 mt-2 text-base italic">"{review.comment}"</p>
                        )}
                    </div>

                    {/* action buttons */}
                    <div className="flex gap-2 self-end md:self-center">
                        {editingId === review._id ? (
                            <>
                                <Button size="sm" color="success" className="text-white font-medium" onClick={() => handleUpdate(review._id)}>
                                    Save
                                </Button>
                                <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button size="sm" variant="secondary" color="warning" onClick={() => startEdit(review)}>
                                    Edit
                                </Button>
                                    <Button size="sm" variant="danger-soft" color="danger" onClick={() => handleDelete(review._id)}>
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;