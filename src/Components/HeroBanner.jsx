"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiTruck } from "react-icons/fi";


export default function HeroBanner() {
    // Animation variants for text sliding up cleanly
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="relative w-full min-h-[75vh] sm:min-h-[85vh] bg-gradient-to-br from-primary via-[#13544a] to-primary text-white flex items-center overflow-hidden px-4 sm:px-8 md:px-16" > 
            {/* Decorative Editorial Background Elements */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4a373_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-base-100/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 w-full py-12">

                {/* Left Side: Text and CTA content */}
                <motion.div
                    className="lg:col-span-7 space-y-6 text-center lg:text-left"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-secondary text-sm font-medium tracking-wide border border-white/10 backdrop-blur-md">
                        <FiBookOpen className="text-secondary" />
                        <span>Redefining The Library Experience</span>
                    </motion.div>

                    {/* Tagline / Heading */}
                    <motion.h1
                        className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] text-base-100"
                        variants={fadeInUp}
                    >
                        Your Local Library, <br />
                        <span className="text-secondary italic font-light">Delivered.</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="font-body text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        variants={fadeInUp}
                    >
                        Connect directly with neighborhood libraries and book lovers. Browse extensive collections, request secure doorstep delivery, and manage your custom reading lists flawlessly. [cite: 3, 4]
                    </motion.p>

                    {/* Call to Action Button */}
                    <motion.div variants={fadeInUp} className="pt-4">
                        <Link
                            href="/browse-books"
                            className="inline-flex items-center gap-3 bg-secondary hover:bg-[#c59262] text-neutral font-body font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-secondary/20 transition-all duration-300 transform hover:-translate-y-0.5 group"
                        >
                            <span>Browse Books</span>
                            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right Side: High-Quality Graphic Representation */}
                <motion.div
                    className="lg:col-span-5 hidden lg:flex justify-center items-center relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                    {/* Main Visual Aesthetic Card */}
                    <div className="relative bg-base-100 text-neutral p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-secondary/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute top-4 right-4 bg-primary/10 text-primary px-3 py-1 rounded-md text-xs font-semibold tracking-wider uppercase">
                            BiblioDrop Express
                        </div>

                        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary text-3xl">
                            <FiTruck />
                        </div>

                        <h3 className="font-heading text-xl font-bold mb-2 text-primary">Doorstep Reading Journey</h3>
                        <p className="font-body text-sm text-neutral/70 mb-6 leading-relaxed">
                            Skip the long commutes. Pay your nominal delivery fee securely via Stripe, and local librarians handle the rest. [cite: 6, 9, 10]
                        </p>

                        {/* Visual Progress Mockup representing delivery states */}
                        <div className="space-y-3 pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-xs font-semibold text-neutral/50">
                                <span className="w-2 h-2 rounded-full bg-success"></span>
                                <span>Pending Approval → Dispatched → Delivered</span> [cite: 10]
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}