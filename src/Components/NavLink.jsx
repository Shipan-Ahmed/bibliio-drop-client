
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { use } from 'react';

const NavLink = ({ href, children }) => {
    const pathName = usePathname();
    const isActive = href === pathName;
    return (
        <Link className={`${isActive ? 'font-bold  border-b border-blue-600 ' : ''}`} href={href}>
            {children}
        </Link>
    );
};

export default NavLink;