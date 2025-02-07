import Logo from "@/components/icons/Logo";
import React, { ReactNode } from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3 items-center">
            <Logo />
            <h1 className="text-2xl font-semibold text-white">
              Library System
            </h1>
          </div>
          {children}
        </div>
      </section>
      <section className="auth-illustration">
        <Image
          src="/images/library.jpg"
          alt="Illustration"
          width={1000}
          height={1000}
          className="size-full object-cover"
          priority={true}
          aria-hidden="true"
        />
      </section>
    </main>
  );
};

export default layout;
