'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, Button } from '@heroui/react';
import { FaSearch, FaFilter, FaUndo } from 'react-icons/fa';

const BOOK_CATEGORIES = [
    { id: 'all', name: 'All Categories' },
    { id: 'ScienceFiction', name: 'Science Fiction' },
    { id: 'Fantasy', name: 'Fantasy' },
    { id: 'Mystery', name: 'Mystery & Thriller' },
    { id: 'History', name: 'Historical Fiction' },
    { id: 'Romance', name: 'Romance' },
    { id: 'NonFiction', name: 'Non Fiction' }
];

export default function FilterHorizontal() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Local state initialized from URL params
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'all');
    const [maxFee, setMaxFee] = useState(searchParams.get('maxFee') || '150');
    const [availability, setAvailability] = useState(searchParams.get('availability') || 'all');

    const handleApplyFilters = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (search) params.set('search', search);
        if (category && category !== 'all') params.set('category', category);
        if (maxFee) params.set('maxFee', maxFee);
        if (availability && availability !== 'all') params.set('availability', availability);

        // Filters change korle page 1 e reset hobe
        params.set('page', '1');

        router.push(`/browse-books?${params.toString()}`);
    };

    const handleReset = () => {
        setSearch('');
        setCategory('all');
        setMaxFee('150');
        setAvailability('all');
        router.push('/browse-books');
    };

    return (
        <Card variant="default" className="border border-neutral-200/60 bg-white shadow-sm p-4 mb-8">
            <Card.Content className="p-0">
                <form onSubmit={handleApplyFilters} className="flex flex-col lg:flex-row items-end gap-4 w-full">

                    {/* 1. Advanced Search Input */}
                    <div className="flex flex-col gap-1.5 flex-1 w-full">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Search Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by book title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full text-sm pl-9 pr-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary transition h-10"
                            />
                            <FaSearch className="absolute left-3 top-3.5 text-neutral-400 text-xs" />
                        </div>
                    </div>

                    {/* 2. Category Dropdown Selector */}
                    <div className="flex flex-col gap-1.5 w-full lg:w-48">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full text-sm p-2 border border-neutral-200 rounded-lg bg-white focus:outline-none focus:border-primary transition h-10"
                        >
                            {BOOK_CATEGORIES.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* 3. Availability Filter Selector */}
                    <div className="flex flex-col gap-1.5 w-full lg:w-44">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Availability</label>
                        <select
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            className="w-full text-sm p-2 border border-neutral-200 rounded-lg bg-white focus:outline-none focus:border-primary transition h-10"
                        >
                            <option value="all">Show All</option>
                            <option value="available">In Stock</option>
                            <option value="unavailable">Out of Stock</option>
                        </select>
                    </div>

                    {/* 4. Delivery Fee Slider Control */}
                    <div className="flex flex-col gap-1.5 w-full lg:w-48">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Max Fee</label>
                            <span className="text-xs font-bold text-primary">${maxFee}</span>
                        </div>
                        <div className="flex items-center h-10">
                            <input
                                type="range"
                                min="0"
                                max="150"
                                value={maxFee}
                                onChange={(e) => setMaxFee(e.target.value)}
                                className="w-full accent-primary cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* 5. Action Buttons (Submit & Reset) */}
                    <div className="flex items-center gap-2 w-full lg:w-auto shrink-0">
                        <Button type="submit" color="primary" className="font-bold shadow-sm h-10 px-5 flex-1 lg:flex-none">
                            <FaFilter className="text-xs mr-1" /> Apply
                        </Button>
                        <Button type="button" variant="flat" color="danger" isIconOnly onClick={handleReset} className="h-10 w-10 shrink-0">
                            <FaUndo className="text-xs" />
                        </Button>
                    </div>

                </form>
            </Card.Content>
        </Card>
    );
}