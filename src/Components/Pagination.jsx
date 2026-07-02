'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@heroui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({ currentPage, totalPages }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/browse-books?${params.toString()}`);
    };

    // Generate pattern matching standard: Previous 1 2 3 ... 45 Next
    const renderPages = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // First structural indexes loop
            pages.push(1);
            pages.push(2);
            pages.push(3);

            // Gap checking condition helper injection
            if (totalPages > 4) {
                pages.push('...');
            }

            // Print target last block limit endpoint item
            pages.push(totalPages);
        }
        return pages;
    };

    const visiblePages = renderPages();

    return (
        <div className="flex justify-center items-center gap-3 mt-10 w-full select-none">

            {/* Previous layout item link button */}
            <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="flex items-center gap-1 text-sm font-bold text-neutral-500 hover:text-primary transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <FaChevronLeft className="text-xs" /> Previous
            </button>

            {/* Pages arrays loop blocks container row render context mapping */}
            <div className="flex items-center gap-1">
                {visiblePages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`dots-${index}`} className="px-2 text-neutral-400 font-bold tracking-widest">
                                ...
                            </span>
                        );
                    }

                    const isCurrentActive = page === currentPage;
                    return (
                        <button
                            key={`page-btn-${page}`}
                            type="button"
                            onClick={() => handlePageChange(page)}
                            className={`h-9 w-9 text-sm font-bold rounded-lg flex items-center justify-center transition-all ${isCurrentActive
                                    ? 'bg-primary text-white shadow-md scale-105'
                                    : 'text-neutral-600 hover:bg-neutral-100'
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Next page layout sequence link link button */}
            <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="flex items-center gap-1 text-sm font-bold text-neutral-500 hover:text-primary transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
                Next <FaChevronRight className="text-xs" />
            </button>

        </div>
    );
}