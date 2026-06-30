"use client";

import React, { useState } from "react";
import { changeUserRoleAction, deleteUserAction } from "@/src/lib/action/userActions";

const ManageUsersTable = ({ initialUsers, currentAdminId }) => {
    const [users, setUsers] = useState(initialUsers);

    const handleRoleChange = async (userId, newRole) => {
        const confirmChange = confirm(`Are you sure you want to change this user's role to ${newRole}?`);
        if (!confirmChange) return;

        const res = await changeUserRoleAction(userId, newRole);
        if (res.success) {
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
            alert("User role updated successfully!");
        } else {
            alert("Failed to update user role.");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (userId === currentAdminId) {
            alert("You cannot delete your own admin account!");
            return;
        }

        const confirmDelete = confirm("Are you sure you want to completely delete this user?");
        if (!confirmDelete) return;

        const res = await deleteUserAction(userId);
        if (res.success) {
            setUsers(users.filter(u => u._id !== userId));
            alert("User deleted successfully!");
        } else {
            alert("Failed to delete user.");
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-6 w-full mt-6">
            {/* <h3 className="text-xl font-bold text-gray-700 mb-4">Manage Users</h3> */}
            <div className="overflow-x-auto">
                <table className="table w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm border-b">
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Current Role</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b hover:bg-gray-50 text-gray-800">
                                <td className="p-3 font-medium">{user.name || "N/A"}</td>
                                <td className="p-3 text-gray-600">{user.email}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'admin' ? 'bg-red-100 text-red-700' :
                                            user.role === 'librarian' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-3 flex items-center justify-center gap-3">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="select select-bordered select-sm border border-gray-300 rounded p-1 text-sm outline-none"
                                        disabled={user._id === currentAdminId}
                                    >
                                        <option value="reader">Reader / User</option>
                                        <option value="librarian">Librarian</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-all"
                                        disabled={user._id === currentAdminId}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsersTable;