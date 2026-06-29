
import { auth } from "@/src/lib/auth";
import { Button, Drawer } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaRegCheckSquare } from "react-icons/fa";
import { FiMenu, FiPlusCircle } from "react-icons/fi";
import { LuBookOpen, LuBoxes, LuDollarSign, LuHeart, LuHistory, LuLayoutDashboard, LuStar, LuTruck, LuUsers, LuBook } from "react-icons/lu";




export default async function DashboardSidebar() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userRole = session?.user?.role || 'reader'; // Default to 'reader' if role is not available
    const user = session?.user;
    const DashboardItems = {
        reader: [
            { icon: LuLayoutDashboard , label: "Overview", link: "/dashboard/reader/overview" },
            { icon: LuHistory , label: "Delivery History", link: "/dashboard/reader/delivery-history" },
            { icon: LuBookOpen, label: "My Reading List", link: "/dashboard/reader/reading-list" },
            { icon: LuStar , label: "My Reviews", link: "/dashboard/reader/reviews" },
            { icon: LuHeart , label: "Wishlist", link: "/dashboard/reader/wishlist" },
        ],
        librarian: [
            { icon: LuLayoutDashboard , label: "Overview", link: "/dashboard/librarian/overview" },
            { icon: FiPlusCircle , label: "Add Book", link: "/dashboard/librarian/add-book" },
            { icon: LuBoxes , label: "Manage Inventory", link: "/dashboard/librarian/inventory" },
            { icon: LuTruck , label: "Manage Deliveries", link: "/dashboard/librarian/deliveries" },
        ],
        admin: [
            { icon: LuLayoutDashboard , label: "Overview", link: "/dashboard/admin" },
            { icon: FaRegCheckSquare , label: "Book Approval Queue", link: "/dashboard/admin/approval-queue" },
            { icon: LuUsers , label: "Manage Users", link: "/dashboard/admin/users" },
            { icon: LuBook , label: "Manage All Books", link: "/dashboard/admin/books" },
            { icon: LuDollarSign , label: "View All Transactions", link: "/dashboard/admin/transactions" },
        ]
    };

    const navItems = DashboardItems[userRole] || [];

    // const navItems = [
    //     { icon: BsHouse, label: "Home" },
    //     { icon: SlMagnifier, label: "Search" },
    //     { icon: BiBell, label: "Notifications" },
    //     { icon: BiEnvelope, label: "Messages" },
    //     { icon: BsPerson, label: "Profile" },
    //     { icon: CiSettings, label: "Settings" },
    // ];

    const navlinks = (
        <nav className="flex flex-col gap-1.5 w-full">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.link}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral/80 transition-all hover:bg-primary/5 hover:text-primary group"
                >
                    <item.icon className="size-5 text-neutral/40 group-hover:text-primary transition-colors" />
                    <span>{item.label}</span>
                </Link>
            ))}
        </nav>
    );
    return (
        <>
            <aside className="hidden lg:flex flex-col w-64 bg-gray-100 border-r border-gray-100 h-full p-4 shrink-0">
                <div className="px-4 py-3 mb-6  border-b border-gray-200 rounded-lg flex flex-col items-center gap-2">
                    <Link href="/" className="font-heading text-lg font-bold tracking-tight text-primary">
                        Biblio<span className="text-secondary italic">Drop</span>
                    </Link>
                    {/* <span className="block text-[10px] uppercase tracking-widest text-neutral/40 font-bold mt-0.5">
                        {userRole} Portal
                    </span> */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                            <Image src={user.image} alt="Logo" width={40} height={40} />
                        </div>
                        <p className="font-semibold  text-neutral/80 mt-2">
                            {user.name}
                        </p>
                        <p className="block text-[10px] uppercase tracking-widest text-neutral/40 font-bold mt-0.5">{userRole} </p>
                    </div>
                </div>
                {navlinks}
            </aside>
            <Drawer >
            <Button variant="secondary " className="lg:hidden" >
                <FiMenu size={20} />
                Menu
            </Button>
            <Drawer.Backdrop className="bg-gray-100">
                <Drawer.Content placement="left">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                            <Drawer.Heading>Navigation</Drawer.Heading>
                        </Drawer.Header>
                        <Drawer.Body>
                            {navlinks}
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
            </Drawer>
        </>
    );
}