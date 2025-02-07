import { Book } from "@/types";
import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";

const BookCard = (book: Book) => {
  return (
    <li className="p-4 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition">
      <Link href={`/books/${book.isbn}`} className="block">
        <BookCover
          coverUrl={book.image_url_l || book.image_url_m || book.image_url_s}
        />
      </Link>

      {/* ✅ Display Book Info */}
      <div className="mt-3 text-white text-sm">
        <p className="font-bold">{book.book_title}</p>
        <p className="text-gray-400">{book.book_author}</p>
      </div>
    </li>
  );
};

export default BookCard;
