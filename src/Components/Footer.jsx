"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri"; // Modern X logo matching the requirements

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Prevents page reloads during form submission placeholder test
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <footer className="w-full bg-primary text-white border-t border-white/10 font-body">
            {/* Upper Main Footer Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

                    {/* Column 1: Logo & Vision */}
                    <div className="md:col-span-4 space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="font-heading text-2xl font-bold tracking-tight text-base-100">
                                Biblio<span className="text-secondary italic">Drop</span>
                            </span>
                        </Link>
                        <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                            Democratizing access to literature by seamless connection with local book providers
                            and state-of-the-art secure doorstep dispatching workflows.
                        </p>
                        {/* Social Media Links featuring the rebranded X Logo */}
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-secondary hover:text-neutral transition-colors duration-300" aria-label="Facebook">
                                <FaFacebookF size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-secondary hover:text-neutral transition-colors duration-300" aria-label="X (formerly Twitter)">
                                <RiTwitterXFill size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-secondary hover:text-neutral transition-colors duration-300" aria-label="Instagram">
                                <FaInstagram size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-secondary hover:text-neutral transition-colors duration-300" aria-label="LinkedIn">
                                <FaLinkedinIn size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="md:col-span-3 md:col-start-6 space-y-4">
                        <h4 className="font-heading text-base-100 font-bold tracking-wider text-base uppercase">
                            Quick Navigation
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/about" className="text-white/70 hover:text-secondary transition-colors duration-200">
                                    About Our Platform
                                </Link>
                            </li>
                            <li>
                                <Link href="/browse" className="text-white/70 hover:text-secondary transition-colors duration-200">
                                    Browse Book Library
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white/70 hover:text-secondary transition-colors duration-200">
                                    Contact Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="text-white/70 hover:text-secondary transition-colors duration-200">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Newsletter Signup Placeholder */}
                    <div className="md:col-span-4 space-y-4">
                        <h4 className="font-heading text-base-100 font-bold tracking-wider text-base uppercase">
                            Stay in the Loop
                        </h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Subscribe to discover newly registered independent collections and top regional librarians.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 pt-1">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                required
                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-secondary transition-colors text-sm"
                            />
                            <button
                                type="submit"
                                className="bg-secondary hover:bg-[#c59262] text-neutral font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 transform active:scale-95 whitespace-nowrap text-sm shadow-md"
                            >
                                Join Now
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* Lower Copyright Area */}
            <div className="w-full border-t border-white/5 bg-black/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
                    <p>© {currentYear} BiblioDrop Ecosystem. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/terms" className="hover:text-secondary transition-colors duration-200">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-secondary transition-colors duration-200">Cookie Management</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}