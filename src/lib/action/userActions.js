"use server";

import { revalidatePath } from "next/cache";

export async function changeUserRoleAction(userId, newRole) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, newRole }),
        });

        if (!res.ok) throw new Error("don't show anything");

        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (error) {
        console.error("Error updating role:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteUserAction(userId) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/users/${userId}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("don't delete user");

        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error: error.message };
    }
}