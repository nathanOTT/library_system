import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode, Suspense } from "react";
import "@/styles/admin.css";
import drizzledb from "@/database/drizzle";
import { registration } from "@/database/schema";
import { eq } from "drizzle-orm";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const isSuperAdmin = await drizzledb
    .select({ role: registration.role })
    .from(registration)
    .where(eq(registration.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.role === "SUPERADMIN");

  if (!isSuperAdmin || isSuperAdmin !== true) {
    redirect("/sign-in");
  }

  return (
    <main className="flex min-h-screen w-full flex-row">
      <div className="admin-container">{children}</div>
    </main>
  );
};

export default layout;
