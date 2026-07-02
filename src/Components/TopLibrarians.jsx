'use client';

import React from 'react';
import { motion } from 'framer-motion';
// Import only Card and Avatar according to your library pattern
import { Card, Avatar } from "@heroui/react";
import { FaBookmark, FaTruck, FaStar } from 'react-icons/fa';
import Image from 'next/image';

const TOP_LIBRARIANS = [
    {
        id: 1,
        name: 'Sarah Jenkins',
        library: 'Metro Central Library',
        deliveries: 142,
        rating: 4.9,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
        id: 2,
        name: 'David Chen',
        library: 'Beacon Books Collective',
        deliveries: 128,
        rating: 5.0,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    {
        id: 3,
        name: 'Elena Rostova',
        library: 'Community Reading Hub',
        deliveries: 115,
        rating: 4.8,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
};

const TopLibrarians = () => {
    return (
        <section className=" max-w-7xl mx-auto py-16 bg-neutral-50/50">
            <div className=" px-4 ">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary text-sm font-semibold tracking-wider uppercase px-3 py-1 bg-primary/10 rounded-full"
                    >
                        Community Pillars
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold mt-3 text-neutral-800"
                    >
                        Top Librarians & Providers
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-neutral-500 mt-2 max-w-md mx-auto"
                    >
                        Connecting avid readers with independent book owners and community libraries handling the highest volumes.
                    </motion.p>
                </div>

                {/* Librarians Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {TOP_LIBRARIANS.map((librarian) => (
                        <motion.div key={librarian.id} variants={cardVariants}>
                            <Card
                                variant="default"
                                className="w-full border border-neutral-200/60 bg-white hover:border-primary/30 transition-all duration-300 group shadow-sm hover:shadow-md"
                            >
                                {/* Using your specific Card.Content notation structure */}
                                <Card.Content className="p-6 flex flex-col items-center text-center relative overflow-hidden">

                                    {/* Rating Badge */}
                                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-50 text-amber-600 font-medium text-xs px-2 py-1 rounded-full border border-amber-200">
                                        <FaStar className="text-amber-500 text-[10px]" />
                                        <span>{librarian.rating.toFixed(1)}</span>
                                    </div>

                                    {/* Librarian Avatar Ring */}
                                    <div className="relative mb-4 mt-2">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 blur-sm group-hover:scale-125 transition-transform duration-300" />
                                        <Image
                                            src={librarian.avatar}
                                            className="w-20 h-20 text-large border-2 border-white relative z-10"
                                            alt={librarian.name}
                                            width={80}
                                            height={80}
                                        />
                                    </div>

                                    {/* Profile Typography */}
                                    <h3 className="text-lg font-bold text-neutral-800 group-hover:text-primary transition-colors duration-200">
                                        {librarian.name}
                                    </h3>

                                    <p className="text-xs text-neutral-400 font-medium flex items-center gap-1.5 mt-1 mb-5">
                                        <FaBookmark className="text-neutral-300 text-[11px]" />
                                        {librarian.library}
                                    </p>

                                    <div className="w-full border-t border-neutral-100 my-2" />

                                    {/* Delivery Stats Grid */}
                                    <div className="w-full flex justify-between items-center pt-2 px-2 text-neutral-600">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-primary/10 rounded-lg text-primary text-sm">
                                                <FaTruck />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider leading-none">Deliveries</p>
                                                <p className="text-base font-extrabold text-neutral-700 mt-0.5">{librarian.deliveries}</p>
                                            </div>
                                        </div>

                                        <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200/50">
                                            Active Partner
                                        </span>
                                    </div>

                                </Card.Content>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default TopLibrarians;