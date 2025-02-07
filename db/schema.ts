import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

// Define the Books Table
export const books = pgTable("books", {
  isbn: text("isbn").notNull().unique(),
  book_title: text("book_title").notNull(),
  book_author: text("book_author").notNull(),
  year_of_publication: integer("year_of_publication").notNull(),
  publisher: text("publisher").notNull(),
  image_url_s: text("image_url_s").notNull(),
  image_url_m: text("image_url_m").notNull(),
  image_url_l: text("image_url_l").notNull(),
});