import React from 'react';
import BookCard from '@/src/Components/BookCard';
import FilterHorizontal from '@/src/Components/FilterHorizontal';
import Pagination from '@/src/Components/Pagination';
import { getAllBooksApproved } from '@/src/lib/action/api';

const BrowseBook = async ({ searchParams }) => {
    // Sync parameter parsing safely
    const resolvedParams = await searchParams;
    const search = resolvedParams?.search || '';
    const category = resolvedParams?.category || 'all';
    const maxFee = resolvedParams?.maxFee || '150';
    const availability = resolvedParams?.availability || 'all';
    const currentPage = parseInt(resolvedParams?.page) || 1;

    // Load matching records limit 8
    const apiResponse = await getAllBooksApproved({
        search,
        category,
        maxFee,
        availability,
        page: currentPage,
        limit: 8
    });

    const allBooks = apiResponse?.books || [];
    // Dynamic absolute safely fallbacks check
    const totalPages = parseInt(apiResponse?.totalPages) || 1;

    return (
        <div className='min-h-screen max-w-7xl mx-auto px-4 py-8  flex flex-col justify-between'>

            <div>
                <div className="mb-6 pb-4 border-b border-neutral-100">
                    <h1 className='text-3xl font-extrabold text-neutral-800 tracking-tight'>
                        Browse Books Collection
                    </h1>
                </div>

                {/* Top filter control bar */}
                <FilterHorizontal />

                {/* Books layout grids logic */}
                {allBooks.length === 0 ? (
                    <div className="text-center py-24 bg-neutral-50/50 rounded-xl border border-dashed border-neutral-200 text-neutral-400 font-medium my-4">
                        Match matching dataset list entry dynamic data zero context!
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8'>
                        {allBooks.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                )}
            </div>

            {/* FORCE DISPLAY: Always visible wrapper component block to secure precise alignment */}
            <div className="w-full mt-auto block py-4">
                <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default BrowseBook;