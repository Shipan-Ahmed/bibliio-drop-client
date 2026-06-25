
import { auth } from "@/src/lib/auth";
import { Button, Drawer } from "@heroui/react";
import { headers } from "next/headers";
import { FaRegCheckSquare } from "react-icons/fa";
import { FiMenu, FiPlusCircle } from "react-icons/fi";
import { LuBookOpen, LuBoxes, LuDollarSign, LuHeart, LuHistory, LuLayoutDashboard, LuStar, LuTruck, LuUsers, LuBook } from "react-icons/lu";




export default async function DashboardSidebar() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userRole = session?.user?.role || 'reader'; // Default to 'reader' if role is not available
    const DashboardItems = {
        reader: [
            { icon: LuLayoutDashboard , label: "Overview", link: "/dashboard/reader" },
            { icon: LuHistory , label: "Delivery History", link: "/dashboard/reader/delivery-history" },
            { icon: LuBookOpen, label: "My Reading List", link: "/dashboard/reader/reading-list" },
            { icon: LuStar , label: "My Reviews", link: "/dashboard/reader/reviews" },
            { icon: LuHeart , label: "Wishlist", link: "/dashboard/reader/wishlist" },
        ],
        librarian: [
            { icon: LuLayoutDashboard , label: "Overview", link: "/dashboard/librarian" },
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
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                </button>
            ))}
        </nav>
    );

    return (
        <>
            <aside className="hidden lg:block w-64 p-4 rounded-xl   text-foreground   ">
                {navlinks}
            </aside>
            <Drawer>
            <Button variant="secondary " className="lg:hidden" >
                <FiMenu size={20} />
                Menu
            </Button>
            <Drawer.Backdrop>
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