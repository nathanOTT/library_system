"use server";

import drizzledb from "@/database/drizzle";
import { registration } from "@/database/schema";
import { eq } from "drizzle-orm";

// ✅ Fetch all users
export const getUsers = async () => {
  try {
    const users = await drizzledb
      .select({
        id: registration.id,
        fullName: registration.fullName,
        email: registration.email,
        universityId: registration.universityId,
        universityCard: registration.universityCard,
        status: registration.status,
        last_activity_date: registration.last_activity_date,
        borrow_status: registration.borrow_status,
        role: registration.role,
        createdAt: registration.created_at,
      })
      .from(registration)
      .execute();
    return { success: true, data: users };
  } catch (error) {
    console.error("🚨 Error fetching users:", error);
    return { success: false, message: "Error fetching users." };
  }
};

// ✅ Update user role
export const updateUserRole = async (userId: string, role: "USER" | "ADMIN" | "SUPERADMIN") => {
  try {
    await drizzledb
      .update(registration)
      .set({ role })
      .where(eq(registration.id, userId))
      .execute();

    return { success: true, message: "User role updated successfully." };
  } catch (error) {
    console.error("🚨 Error updating user role:", error);
    return { success: false, message: "Error updating user role." };
  }
};

// ✅ Delete user
export const deleteUser = async (userId: string) => {
  try {
    await drizzledb.delete(registration).where(eq(registration.id, userId)).execute();
    return { success: true, message: "User deleted successfully." };
  } catch (error) {
    console.error("🚨 Error deleting user:", error);
    return { success: false, message: "Error deleting user." };
  }
};

