export const dynamic = 'force-dynamic';
import ManageUsersTable from '@/src/Components/ManageUsersTable';
import { getUser } from '@/src/lib/userSession';
import React from 'react';

const ManageUserPage = async () => {
    const user = await getUser();
    const userId = user?.id;

    let AllUsers = [];
    try {
        const resUsers = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (resUsers.ok) {
            AllUsers = await resUsers.json();
        }
    } catch (err) {
        console.error("Failed to fetch users from external backend:", err);
    }

    return (
        <div className="container mx-auto p-4 md:p-8 flex flex-col gap-6 min-h-screen bg-base-200">
           <h2 className="text-3xl font-bold">Manage Users</h2>
            <ManageUsersTable initialUsers={AllUsers} currentAdminId={userId} />
        </div>
    );
};

export default ManageUserPage;