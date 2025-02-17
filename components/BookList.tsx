"use client";

import React from "react";
import useBooks from "@/components/hooks/useBooks";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Calender from "./icons/Calender";
import { Button } from "./ui/button";

interface BookListProps {
  containerClassName?: string;
  isLoanedBook?: boolean;
}

const BookList = ({
  containerClassName,
  isLoanedBook = false,
}: BookListProps) => {
  const { books, loading, error } = useBooks();
  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="w-full mx-auto">
      <div className="flex flex-wrap items-center justify-between">
        <ul className="mx-auto">
          <li className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-6 gap-4 lg:gap-10">
            {books.map((book) => (
              <Link
                href={`/books/${book.isbn}`}
                key={book.isbn}
                className={cn(
                  "w-full flex flex-col items-center",
                  isLoanedBook ? "cursor-not-allowed" : "cursor-pointer"
                )}
              >
                <img
                  src={book.image_url_l || "/placeholder.jpg"}
                  alt={book.book_title}
                  className="w-full h-60 rounded-lg"
                  width={600}
                  height={600}
                />
                <div className={cn("mt-3", !isLoanedBook && "")}>
                  <h2 className="text-sm font-bold text-gray-300">
                    {book.book_title}
                  </h2>
                  <p className="text-sm text-gray-300">{book.book_author}</p>
                  <p className="text-xs text-gray-300">
                    {book.publisher} ({book.year_of_publication})
                  </p>
                </div>
                {isLoanedBook && (
                  <div className="mt-3 w-full">
                    <div className="book-loaned">
                      <Calender />
                      <p className="text-gray-300">
                        {isLoanedBook ? "Due Date: 12/12/2022" : ""}
                      </p>
                    </div>
                    <Button className="book-btn">Download Receipt</Button>
                  </div>
                )}
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BookList;
