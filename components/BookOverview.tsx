"use client";

import React from "react";
import useBooks from "@/components/hooks/useBooks";
import Star from "@/components/icons/Star";
import Read from "@/components/icons/Read";
import { Button } from "./ui/button";
import BookCover from "./BookCover";
import useMotion from "./hooks/useMotion";

interface BookOverviewProps {
  className?: string;
  coverColor?: string;
}

const BookOverview = ({
  className,
  coverColor = "#012B48",
}: BookOverviewProps) => {
  const { books, loading, error } = useBooks();
  const { motion } = useMotion();
  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;
  // Pick the first book (or provide a fallback)
  const book = books.length > 0 ? books[10] : null;

  if (!book) return <p>No book found</p>; // Fallback if no books

  return (
    <section className="book-overview1">
      <div className="flex-1 flex flex-col gap-2 max-w-3xl">
        <h1 className="flex-wrap text-3xl font-bold text-gray-300">
          Title: {book.book_title}
        </h1>
        <div className="book-info">
          <p className="text-gray-300">
            <span className="font-bold text-light-2">Author:</span>{" "}
            {book.book_author}
          </p>
        </div>
        <div className="book-info">
          <p className="text-gray-300">
            <span className="font-bold">Publisher:</span> {book.publisher}
          </p>
        </div>
        <div className="book-info">
          <p className="text-gray-300">
            <span className="font-bold">Year:</span> {book.year_of_publication}
          </p>
        </div>
        <div className="flex flex-row gap-1">
          <Star />
          <span className="text-gray-300">5.0 (100 reviews )</span>
        </div>
        <Button className="book-overview_btn">
          <Read />
          <p>
            <span className="text-gray-900">Borrow Book</span>
          </p>
        </Button>
      </div>
      <div className="book-stacked">
        <div className="book-stacked-back">
          <BookCover
            variant="large"
            coverColor={coverColor}
            className="absolute z-10"
          />
        </div>
        {/* Front Cover - Main Book */}
        <div className="relative">
          <BookCover
            variant="large"
            coverColor={coverColor}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};
export default BookOverview;
