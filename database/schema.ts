import { create } from "domain";
import { pgTable, serial, text, integer, uuid, bigint, doublePrecision, primaryKey, pgEnum, date, timestamp } from "drizzle-orm/pg-core";

// ✅ Define ENUMs for Role & Status
export const ROLE_ENUM = pgEnum("role", ["ADMIN", "USER", "SUPERADMIN"]);
export const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", ["BORROWED", "RETURNED"]);


// Define registration Table
export const registration = pgTable("registration", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  last_activity_date: date("last_activity_date").defaultNow(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  borrow_status: BORROW_STATUS_ENUM("borrow_status").default("BORROWED"),
});

// // Define the Books Table
// // ✅ Fix: `year_of_publication` should be `text`
// export const books = pgTable("books", {
//   isbn: text("isbn").notNull().primaryKey(),
//   book_title: text("book_title").notNull(),
//   book_author: text("book_author").notNull(),
//   year_of_publication: text("year_of_publication").notNull(), // ✅ Fix: Changed from `integer` to `text`
//   publisher: text("publisher").notNull(),
//   image_url_s: text("image_url_s").notNull(),
//   image_url_m: text("image_url_m").notNull(),
//   image_url_l: text("image_url_l").notNull(),
// });

// // ✅ Fix: `user_id` should be `bigint`, `age` should be `double precision`
// export const users = pgTable("users", {
//   user_id: bigint("user_id", { mode: "number" }).notNull().primaryKey(), // ✅ Fix: Changed from `text` to `bigint`
//   location: text("location").notNull(),
//   age: doublePrecision("age").notNull(), // ✅ Fix: Changed from `integer` to `double precision`
// });

// // ✅ Fix: `user_id` should be `bigint`, `book_rating` should be `bigint`
// export const ratings = pgTable("ratings", {
//   user_id: bigint("user_id", { mode: "number" }).notNull(), // ✅ Fix: Changed from `text` to `bigint`
//   isbn: text("isbn").notNull(),
//   book_rating: decimal("book_rating").notNull(), // ✅ Ensure proper type for decimal ratings
// }, (table) => ({
//   pk: primaryKey({ columns: [table.user_id, table.isbn] }), // ✅ Ensures Composite Primary Key
// }));

