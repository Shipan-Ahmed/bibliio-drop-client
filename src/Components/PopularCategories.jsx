'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@heroui/react";
// Eloquent icons library theke icons import kora hochhe
import {
    FaRocket,
    FaFlask,
    FaGraduationCap,
    FaGhost,
    FaHeart,
    FaHistory
} from 'react-icons/fa';

import Link from 'next/link';

// Static Categories Data
const CATEGORIES = [
    {
        id: 1,
        name: 'Science Fiction & Literature',
        description: 'Golpo ebong sahitter bishal somahar.',
        count: '1,240+ Books',
        icon: <FaHeart className="text-pink-500 text-2xl" />,
        bgColor: 'bg-pink-50',
        borderColor: 'hover:border-pink-200'
    },
    {
        id: 2,
        name: 'Fantasy',
        description: 'Kalponik biggyan o rop-kothar jagat.',
        count: '850+ Books',
        icon: <FaRocket className="text-purple-500 text-2xl" />,
        bgColor: 'bg-purple-50',
        borderColor: 'hover:border-purple-200'
    },
    {
        id: 3,
        name: 'Romance',
        description: 'Shikhagoto o gobeshonamulok boikhata.',
        count: '980+ Books',
        icon: <FaFlask className="text-blue-500 text-2xl" />,
        bgColor: 'bg-blue-50',
        borderColor: 'hover:border-blue-200'
    },
    {
        id: 4,
        name: 'History & Biography',
        description: 'Itihas obong bikkhato bbyaktitder jiboni.',
        count: '640+ Books',
        icon: <FaHistory className="text-amber-500 text-2xl" />,
        bgColor: 'bg-amber-50',
        borderColor: 'hover:border-amber-200'
    },
    {
        id: 5,
        name: 'Non-Fiction & Self-Help',
        description: 'Nijer bbyaktitto bbriddhir boi.',
        count: '520+ Books',
        icon: <FaGraduationCap className="text-emerald-500 text-2xl" />,
        bgColor: 'bg-emerald-50',
        borderColor: 'hover:border-emerald-200'
    },
    {
        id: 6,
        name: 'Mystery & Thriller',
        description: 'Rohosso o romoncho bhora kahini.',
        count: '710+ Books',
        icon: <FaGhost className="text-indigo-500 text-2xl" />,
        bgColor: 'bg-indigo-50',
        borderColor: 'hover:border-indigo-200'
    }
];

// Framer Motion Animation Settings
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
};

const PopularCategories = () => {
    return (
        <section className=" max-w-7xl mx-auto py-16 bg-white">
            <div className=" px-4 ">

                {/* Section Title Header */}
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary text-sm font-semibold tracking-wider uppercase px-3 py-1 bg-primary/10 rounded-full"
                    >
                        Genre Explore
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold mt-3 text-neutral-800"
                    >
                        Popular Categories
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-neutral-500 mt-2 max-w-md mx-auto"
                    >
                        Apnar pochhonder bishoy ti khuje nite amader bishal boi-er somahar gulo gure dekhun.
                    </motion.p>
                </div>

                {/* Categories Grid Container */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {CATEGORIES.map((category) => (
                        <motion.div key={category.id} variants={itemVariants}>
                            <Link href="/browse-books" >
                                <Card
                                    variant="default"
                                    className={`w-full border border-neutral-200/60 bg-white transition-all duration-300 group shadow-sm hover:shadow-md ${category.borderColor} cursor-pointer`}
                                >
                                    <Card.Content className="p-6 flex items-start gap-4">

                                        {/* Dynamic Custom Icon Shape Frame */}
                                        <div className={`p-4 rounded-xl ${category.bgColor} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                                            {category.icon}
                                        </div>

                                        {/* Text Description Box */}
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold text-neutral-800 group-hover:text-primary transition-colors duration-200">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm text-neutral-400 mt-1 line-clamp-2">
                                                {category.description}
                                            </p>

                                            {/* Badge Count Static Indicator */}
                                            <span className="inline-block text-xs font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded mt-3">
                                                {category.count}
                                            </span>
                                        </div>

                                    </Card.Content>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default PopularCategories;