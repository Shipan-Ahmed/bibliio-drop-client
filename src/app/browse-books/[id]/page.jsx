import { getUser } from '@/src/lib/userSession';
import Image from 'next/image';
import React from 'react';
import { Button } from '@heroui/react';
import { checkCommentable, getReviewsByBookId, getBookDetails, DeleteBook } from '@/src/lib/action/api';
import ReviewSection from './ReviewSection';
import Link from 'next/link';
import { Delete } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const BookDetailsPage = async ({ params }) => {
    const user = await getUser();
    const userId = user?.id;

    const { id } = await params || {};
    const book = await getBookDetails(id);

    const { title, author, description, deliveryFee, coverImage, category, librarianId, availability } = book || {};
    const temporaryStatus = availability ? "Available" : "Not Available";

    const isOk = librarianId === userId;
    console.log("User ID:", userId, "librarian ID:", librarianId, "Is User the Owner of the Book?", isOk);

    const allReviews = await getReviewsByBookId(id) || [];
    const { commentable } = await checkCommentable({ bookId: id, userId });

    // Librarian Actions
    const handleDeleteBook = async () => {
        "use server";
        console.log("Deleting book:", id);
        const res = await DeleteBook(id);
        if (res.success) {
            console.log("Book deleted successfully:", res);
            revalidatePath('/browse-books');
            redirect('/browse-books');

        } else {
            console.error("Failed to delete book:", res);
        }
    };

    const handleUnpublishBook = async () => {
        "use server";
        console.log("Unpublishing book:", id);
    };

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

                    {/* 🛒 ২. ডেলিভারি বাটন (সবার জন্যই থাকবে, কিন্তু লাইব্রেরিয়ান বা নট-এভেইলেবল হলে ডিজেবল হয়ে যাবে) */}
                    <div className="w-full flex justify-center items-center">
                        <form action="/api/checkout_sessions" method="POST" className="w-full">
                            <input type="hidden" name="price" value={deliveryFee} />
                            <input type="hidden" name="title" value={title} />
                            <input type="hidden" name="librarianId" value={librarianId} />
                            <input type="hidden" name="bookId" value={id} />
                            <Button
                                type='submit'
                                role="link"
                                // 👈 ইউজার নিজে লাইব্রেরিয়ান (isOk) হলে অথবা বুক এভেইলেবল না থাকলে বাটন লক হবে
                                disabled={isOk || availability === false || availability === "false"}
                                className={`btn btn-primary w-full text-xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${(isOk || availability === false || availability === "false")
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none border-none pointer-events-none"
                                        : ""
                                    }`}
                            >
                                Request to Delivery
                            </Button>
                        </form>
                    </div>
                    {/* 🔒 ১. লাইব্রেরিয়ান কন্ট্রোলস (মালিক হলে আলাদাভাবে উপরে দেখাবে) */}
                    {isOk && (
                        <div className="w-full bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col sm:flex-row gap-3 justify-center items-center mb-2">
                            <Link href={`/browse-books/${id}/edit`} className="w-full sm:w-auto flex-1">
                                <Button color="warning" className="w-full font-bold text-white rounded-lg shadow">
                                    Edit Book
                                </Button>
                            </Link>

                            <form action={handleUnpublishBook} className="w-full sm:w-auto flex-1">
                                <Button type="submit" color="default" className="w-full font-bold rounded-lg shadow bg-gray-400 text-white">
                                    Unpublish
                                </Button>
                            </form>

                            <form action={handleDeleteBook} className="w-full sm:w-auto flex-1">
                                <Button type="submit" color="danger" className="w-full font-bold rounded-lg shadow">
                                    Delete
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <ReviewSection
                bookId={id}
                userId={userId}
                userName={user?.name}
                commentable={commentable}
                initialReviews={allReviews}
                title={title}
            />
        </div>
    );
};

export default BookDetailsPage;