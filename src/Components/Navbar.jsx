'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLink from './NavLink';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import { Avatar, Button } from '@heroui/react';
import { useState } from 'react';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Mock Session data matching Better Auth schemas
    // Change role to "user", "librarian", "admin" or null to verify all UI states
    let user = {
        name: 'Jane Doe',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        role: 'librarian'
    };
    user = null; // Uncomment to simulate unauthenticated state

    const signOut = async () => {
        console.log("Clearing Better Auth session context...");
    };

    // Consolidated navigation endpoints
    const links = (
        <>
            <li><NavLink href='/'>Home</NavLink></li>
            <li><NavLink href='/browse-books'>Browse Books</NavLink></li>
            {user && (
                <li><NavLink href={`/dashboard/${user.role}`}>Dashboard</NavLink></li>
            )}
        </>
    );

    return (
        <header className='bg-base-100 border-b border-gray-100 shadow-sm sticky top-0 z-50 '>
            <nav className='container mx-auto px-4 sm:px-8 md:px-16 h-16 flex items-center justify-between'>

                {/* Brand Logo & Mobile Trigger Wrapper */}
                <div className='flex items-center gap-3'>
                    <div className='lg:hidden'>
                        <Button
                            isIconOnly
                            variant='light'
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Navigation"
                        >
                            {isMenuOpen ? <ImCross size={14} /> : <GiHamburgerMenu size={20} />}
                        </Button>

                        {/* Upgraded Mobile Dropdown Panel: Uses solid base colors instead of transparency */}
                        {isMenuOpen && (
                            <ul className='absolute top-16 left-4 z-50 bg-base-100 border border-gray-100 shadow-xl rounded-2xl flex flex-col p-4 space-y-3 min-w-[200px]'>
                                {links}
                            </ul>
                        )
                        }
                    </div>
                    <Link href="/">
                        <h2 className='font-heading text-2xl font-bold text-primary tracking-tight'>
                            Biblio<span className='text-secondary italic font-light'>Drop</span>
                        </h2>
                    </Link>
                </div>

                {/* Desktop Menu Navigation Panel */}
                <div className="hidden lg:flex">
                    <ul className='flex items-center gap-6 text-sm font-medium'>
                        {links}
                    </ul>
                </div>

                {/* Authentication Conditional Control Actions */}
                <div className='flex items-center gap-4'>
                    {user ? (
                        /* Systemic Role-Based Interaction Group */
                        // <div className='flex items-center gap-3'>
                        //     <div className="dropdown dropdown-end">
                        //         <label tabIndex={0} className="btn btn-ghost btn-circle avatar border border-gray-100">
                        //             <div className="w-9 rounded-full">
                        //                 <Image src={user.image} alt={user.name} width={36} height={36} />
                        //             </div>
                        //         </label>
                        //         <ul tabIndex={0} className="mt-3 z-50 p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-xl w-52 border border-gray-100">
                        //             <li className="px-3 py-2 border-b border-gray-100 mb-1">
                        //                 <p className="font-semibold text-sm text-primary block truncate">{user.name}</p>
                        //                 <span className="text-[10px] uppercase font-bold tracking-wider text-neutral/40 bg-gray-100 px-2 py-0.5 rounded-md w-max">
                        //                     {user.role}
                        //                 </span>
                        //             </li>
                        //             <li><Link href={`/dashboard/${user.role}`}>Dashboard</Link></li>
                        //             <li><button onClick={signOut} className="text-error"> <FiLogOut size={14} /> Sign Out</button></li>
                        //         </ul>
                        //     </div>
                        // </div>
                    
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  avatar m-1">
                                <div className="w-9 rounded-full">
                                    <Image src={user.image} alt={user.name} width={36} height={36} />
                                </div>
                            </div>
                            <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li className="px-3 py-2 border-b border-gray-100 mb-1">
                                    <p className="font-semibold text-sm text-primary block truncate">{user.name}</p>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral/40 bg-gray-100 px-2 py-0.5 rounded-md w-max">
                                        {user.role}
                                    </span>
                                </li>
                                <li><Link href={`/dashboard/${user.role}`}>Dashboard</Link></li>
                                <li><button onClick={signOut} className="text-error"><FiLogOut size={14} />  Sign Out</button></li>
                            </ul>
                        </div>
                    ) : (
                        /* Guest Entry Point Links */
                        <div className='flex items-center gap-2'>
                            <Link href="/auth/signin">
                                <Button size="sm" className="bg-primary text-white font-semibold rounded-xl text-xs px-4">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button size="sm" variant="outline" className="border-gray-200 text-neutral font-semibold rounded-xl text-xs px-4">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

            </nav>
        </header>
    );
};

export default Navbar;