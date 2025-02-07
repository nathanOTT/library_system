"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/icons/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Logo />
        <span className="flex items-center text-base font-bold">
          Library System
        </span>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link href="/books">Books</Link>
        </li>
        <li>
          <Link href="/authors">Authors</Link>
        </li>
        <li>
          <Link href="/publishers">Publishers</Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-pink-400 rounded-full text-primary-500 font-semibold text-2xl">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
