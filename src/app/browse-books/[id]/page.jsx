import { getUser } from '@/src/lib/userSession';
import Image from 'next/image';
import React from 'react';
import { Button, Card, Chip } from '@heroui/react';
import { checkCommentable, getReviewsByBookId, getBookDetails, DeleteBook } from '@/src/lib/action/api';
import ReviewSection from './ReviewSection';
import Link from 'next/link';
import { Edit3, EyeOff, Trash2, BookOpen, User, DollarSign, Tag, Info } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const BookDetailsPage = async ({ params }) => {
    const user = await getUser();
    const userId = user?.id;

    const { id } = await params || {};
    const book = await getBookDetails(id);

    const { title, author, description, deliveryFee, coverImage, category, librarianId, availability } = book || {};

    // Check clean runtime state safely
    const isAvailable = availability === true || availability === "true";
    const temporaryStatus = isAvailable ? "In Stock" : "Unavailable";

    const isOk = librarianId === userId;
    console.log("User ID:", userId, "Librarian ID:", librarianId, "Owner Check:", isOk);

    const allReviews = await getReviewsByBookId(id) || [];
    const { commentable } = await checkCommentable({ bookId: id, userId });

    // Librarian Actions Server Actions
    const handleDeleteBook = async () => {
        "use server";
        console.log("Deleting book:", id);
        const res = await DeleteBook(id);
        if (res.success) {
            revalidatePath('/browse-books');
            redirect('/browse-books');
        } else {
            console.error("Failed to delete book:", res);
        }
    };

    const handleUnpublishBook = async () => {
        "use server";
        console.log("Unpublishing book:", id);
        let adminStatus = "approve";

       
        let shouldRedirect = false;

        try {
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books/${id}/unpublish?adminStatus=${adminStatus}`;

            const res = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const resData = await res.json();
            console.log("Unpublish response:", resData);

            if (!res.ok) {
                throw new Error(`Failed to unpublish book with ID ${id}`);
            }

            if (resData.success) {
                
                revalidatePath('/browse-books');
                shouldRedirect = true;
            }
        }
        catch (error) {
            console.error('Error unpublishing book:', error);
        }

       
        if (shouldRedirect) {
            redirect('/browse-books');
        }
    };

    return (
        <div className='min-h-screen bg-neutral-50/50 py-12 px-4 sm:px-6 lg:px-8'>
            <div className="max-w-6xl mx-auto bg-white border border-neutral-200/60 rounded-2xl shadow-sm overflow-hidden mb-10">
                <div className="flex flex-col lg:flex-row">

                    {/* LEFT SIDE: Beautiful Book Cover Block */}
                    <div className="lg:w-2/5 bg-neutral-100/60 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-200/60 relative">
                        <div className="relative group w-[260px] h-[370px] rounded-xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                            <Image
                                src={coverImage || "/placeholder-book.png"}
                                alt={title || "Book Cover"}
                                fill
                                className='object-cover'
                                priority
                            />
                        </div>

                        {/* Dynamic Floating Stock Badge */}
                        <div className="mt-6">
                            <Chip
                                color={isAvailable ? "success" : "danger"}
                                variant="flat"
                                className="font-bold uppercase tracking-wider text-xs px-3 py-1"
                            >
                                {temporaryStatus}
                            </Chip>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Rich Details Content Stack */}
                    <div className="lg:w-3/5 p-8 flex flex-col justify-between gap-6">
                        <div>
                            {/* Title & Author Title Block */}
                            <div className="border-b border-neutral-100 pb-5 mb-5">
                                <h1 className="text-3xl lg:text-4xl font-extrabold text-neutral-800 tracking-tight flex items-start gap-2.5">
                                    <BookOpen className="text-primary shrink-0 mt-1.5 w-7 h-7" />
                                    <span>{title}</span>
                                </h1>
                                <p className="text-neutral-500 font-medium text-lg mt-2 flex items-center gap-1.5 pl-1">
                                    <User className="w-4 h-4 text-neutral-400" /> By <span className="text-neutral-700 font-semibold">{author}</span>
                                </p>
                            </div>

                            {/* Dynamic Specifications Strip Badges */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                <Chip variant="bordered" className="border-neutral-200 text-neutral-600 font-medium text-sm px-2">
                                    <span className="font-bold text-neutral-400 mr-1">Category:</span> {category}
                                </Chip>
                                <Chip color="primary" variant="flat" className="font-bold text-sm px-2">
                                    <span className="opacity-70 mr-1">Delivery Fee:</span> ${deliveryFee?.toFixed(2)}
                                </Chip>
                            </div>

                            {/* Summary Content Body Description */}
                            <div className="bg-neutral-50/70 rounded-xl p-5 border border-neutral-100">
                                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                    <Info className="w-3.5 h-3.5" /> Book Description
                                </h3>
                                <p className="text-neutral-600 text-base leading-relaxed whitespace-pre-line">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* BOTTOM ACTIONS AREA CONTAINER ROW */}
                        <div className="pt-4 border-t border-neutral-100 mt-4">

                            {/* Standard Public Reader action: Checkout Request Form */}
                            <form action="/api/checkout_sessions" method="POST" className="w-full">
                                <input type="hidden" name="price" value={deliveryFee} />
                                <input type="hidden" name="title" value={title} />
                                <input type="hidden" name="librarianId" value={librarianId} />
                                <input type="hidden" name="bookId" value={id} />

                                <Button
                                    type='submit'
                                    role="link"
                                    disabled={isOk || !isAvailable}
                                    color={isOk || !isAvailable ? "default" : "primary"}
                                    size="lg"
                                    className={`w-full font-bold text-lg rounded-xl shadow-sm transition-all duration-300 ${(isOk || !isAvailable)
                                            ? "bg-neutral-200 text-neutral-400 cursor-not-allowed opacity-60 shadow-none pointer-events-none"
                                            : "hover:shadow-md hover:translate-y-[-1px]"
                                        }`}
                                >
                                    {isOk ? "You Own This Book" : !isAvailable ? "Currently Out of Stock" : "Request Doorstep Delivery"}
                                </Button>
                            </form>

                            {/* OWNER CONTROL PANEL: Rendered only if User owns the asset book record */}
                            {isOk && (
                                <div className="mt-4 bg-amber-50/40 p-4 rounded-xl border border-amber-100/70 flex flex-col sm:flex-row gap-3 items-center w-full">
                                    <Link href={`/browse-books/${id}/edit`} className="w-full sm:flex-1">
                                        <Button
                                            color="warning"
                                            variant="flat"
                                            className="w-full font-bold rounded-lg flex items-center justify-center gap-1.5"
                                        >
                                            <Edit3 className="w-4 h-4" /> Edit Metadata
                                        </Button>
                                    </Link>

                                    <form action={handleUnpublishBook} className="w-full sm:flex-1">
                                        <Button
                                            type="submit"
                                            variant="flat"
                                            className="w-full font-bold rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 flex items-center justify-center gap-1.5"
                                        >
                                            <EyeOff className="w-4 h-4" /> Unpublish
                                        </Button>
                                    </form>

                                    <form action={handleDeleteBook} className="w-full sm:flex-1">
                                        <Button
                                            type="submit"
                                            color="danger"
                                            className="w-full font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5"
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete Book
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {/* SEPARATE REVIEWS SUB SECTION GRID BLOCK */}
            <div className="max-w-6xl mx-auto">
                <ReviewSection
                    bookId={id}
                    userId={userId}
                    userName={user?.name}
                    commentable={commentable}
                    initialReviews={allReviews}
                    title={title}
                />
            </div>
        </div>
    );
};

export default BookDetailsPage;