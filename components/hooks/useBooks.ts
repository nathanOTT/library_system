import { useState, useEffect } from "react";
import { Book } from "@/types";



export default function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) throw new Error("Failed to fetch books");

        const data: Book[] = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
}
