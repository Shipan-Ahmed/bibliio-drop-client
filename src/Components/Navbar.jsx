
'use client';
import Link from 'next/link';
import NavLink from './NavLink';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';
import { Avatar } from '@heroui/react';
import { useState } from 'react';
import { Button } from '@heroui/react';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const {
    //     data: session,
    //     isPending
    // } = authClient.useSession()

    // if (isPending) {
    //     return <div className='text-center py-4'><div><span className="loading loading-spinner text-error"></span></div></div>;
    // }

    // const user = session?.user;
    const user = null; // Replace with actual user data from session

    const signOut = async () => {
        await authClient.signOut();
    }

    const links = <>
        <li className="text-lg"><NavLink href='/' >Home</NavLink></li>
        <li className="text-lg"><NavLink href='/browse-books' >Browse Books</NavLink></li>
       
    </>
    return (
        <header className='bg-base-100 shadow-md mb-2'>
            <nav className='container mx-auto  rounded p-2 mb-4 flex items-center justify-between'>
                <div className='flex '>
                    <div className='lg:hidden mr-2'>
                        <Button variant='outline' className='ml-4 bg-blue-600 hover:bg-indigo-600 text-white lg:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {
                                isMenuOpen ? <ImCross /> : <GiHamburgerMenu size={20} />
                            }
                        </Button>
                        {
                            isMenuOpen && (
                                <ul className='absolute top-16 left-0 z-12  bg-transparent  shadow-md rounded flex flex-col items-start space-y-1  justify-start pl-8 pr-2 '>
                                    {links}
                                </ul>
                            )
                        }
                    </div>
                    <h2 className='text-3xl font-bold'>Biblio<span className='text-blue-500'>Drop</span></h2>
                </div>
                <div className="hidden lg:flex ">
                    <ul className='hidden lg:flex space-x-4'>
                        {links}
                    </ul>

                </div>
                <div className='flex justify-between items-center gap-2'>
                    <div className='flex text-lg items-center gap-2'>
                        <span> Dark mode</span>
                        {/* <Switch /> */}
                        {/* <ThemeToggle /> */}
                    </div>
                    <div>
                        {user ? (
                            <div className='flex items-center gap-3'>
                                <Avatar size="sm">
                                    <Avatar.Image alt={user.name} src={user.image} referrerPolicy="no-referrer" />
                                    <Avatar.Fallback>{user.name?.[0]}</Avatar.Fallback>
                                </Avatar>
                                <Button onClick={() => signOut()} className='btn btn-outline bg-blue-500 hover:bg-blue-600 text-white border-none'>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className='flex gap-2'>
                                <Link href="/login"><Button className='text-lg btn btn-primary  text-white border-none'>  Sign In</Button></Link>
                                <Link href="/signup" ><Button className='text-lg btn btn-outline border border-blue-800  text-black  '>Sign Up</Button></Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;