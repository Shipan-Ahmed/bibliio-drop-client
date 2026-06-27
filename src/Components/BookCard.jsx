"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Image from 'next/image';

const BookCard = ({ book }) => {
    const { title, author, description, deliveryfee, coverImage, imageUrl, _id } = book || {};
    const bookCover = coverImage || imageUrl;
    console.log("Book id:", _id);
    console.log("Rendering BookCard for book:", book);

    return (
        <motion.div
            // Framer Motion entry animations
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -6 }} // Smooth lifting effect on hover
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col justify-between aspect-[4/5]  bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden h-full transition-shadow duration-300 hover:shadow-md group"
        >
            {/* Book Cover Image Container */}
            <div className="relative w-full bg-gray-50 overflow-hidden border-b border-gray-100">
                <Image
                    src={bookCover}
                    alt={title || "Book Cover"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={200}
                    height={200}
            
                />
                {/* Subtle dark overlay fade on cover hover */}
                {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" /> */}
            </div>

            {/* Book Content / Context Details */}
            <div className="flex-1 p-5 space-y-2">
                <h2 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                    {title || "Untitled Book"}
                </h2>
                <p className="text-sm font-medium text-primary">
                    By {author || "Unknown Author"}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {description || "No description provided for this book listing."}
                </p>
            </div>

            {/* View Details Action Navigation Link */}
            <div className="px-5 pb-5 pt-1">
                <Link href={`/browse-books/${_id}`} passHref legacyBehavior>
                    <Button
                        as="a"
                        color="primary"
                        variant="flat"
                        className="w-full font-semibold rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all duration-300 text-center block transform active:scale-[0.98]"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
};

export default BookCard;