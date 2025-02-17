import React, { ReactNode } from "react";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import drizzledb from "@/database/drizzle";
import { registration } from "@/database/schema";
import { eq } from "drizzle-orm";
import { after } from "next/server";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  console.log("session", session);

  after(async () => {
    if (!session?.user?.id) return;

    // get the user and see if the last activity is today
    const user = await drizzledb
      .select()
      .from(registration)
      .where(eq(registration.id, session?.user.id))
      .limit(1);
    if (user[0].created_at?.toDateString() === new Date().toDateString())
      return;

    // Update user's last seen
    await drizzledb
      .update(registration)
      .set({ created_at: new Date() })
      .where(eq(registration.id, session?.user.id));
  });
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
