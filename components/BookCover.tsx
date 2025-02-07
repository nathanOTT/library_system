"use client";

import React, { useEffect, useState } from "react";
import useMotion from "./hooks/useMotion";
import { cn } from "@/lib/utils";
import useBooks from "@/components/hooks/useBooks";
import { Book } from "@/types";
import BookCoverSvg from "@/components/icons/BookCoverSvg";

interface BookCoverProps {
  variant?: "small" | "medium" | "large";
  coverColor?: string;
  coverUrl?: string;
  className?: string;
}

const BookCover = ({
  variant = "medium",
  className = "z-10",
  coverColor = "#012B48",
  coverUrl = "https://placehold.co/600x400/000000/FFFFFF/png",
}: BookCoverProps) => {
  const { motion, variantStyles, animations } = useMotion();
  const { books, loading, error } = useBooks();
  const [book, setBook] = useState<any>(null);

  // Wait for books to load, then set the book
  useEffect(() => {
    if (books.length > 0) {
      setBook(books[10]); // Select any book you want
    }
  }, [books]);

  if (loading) return <p>Loading book cover...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book || !book.image_url_l) return <p>No book cover found</p>;

  console.log("BookCover -> book", book.image_url_l);

  return (
    <motion.div
      className={cn(
        "relative flex w-[400px] h-[480px] justify-center items-center transition-all duration-300"
      )}
      animate="visible"
      variants={animations.fadeIn}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10 flex items-center justify-center"
        style={{ left: "10%", width: "87.5%", height: "88%" }}
      >
        <img
          src={book.image_url_l || coverUrl} // Ensure fallback
          alt={book.book_title || "Book Cover"}
          width={500}
          height={480}
          className="absolute inset-0 w-full h-[350px] object-fill rounded-xl transition-opacity duration-300"
          onError={(e) => (e.currentTarget.src = coverUrl)} // Handle broken images
        />
      </div>
    </motion.div>
  );
};

export default BookCover;
