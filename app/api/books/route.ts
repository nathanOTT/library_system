import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { db } from "../../../db/drizzle";
import { books } from "../../../db/schema";

// Ensure DB URL exists
if (!process.env.NEXT_PUBLIC_DB_URL) {
  throw new Error("Database URL not found in environment variables");
}

export async function GET(req: NextRequest) {
  try {
    // Fetch books using Drizzle ORM
    const result = await db.select().from(books).limit(20);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

// PostgreSQL connection pool
// const pool = new Pool({
//   connectionString: process.env.NEXT_PUBLIC_DB_URL,
//   max: 10, // Max connections in the pool
//   idleTimeoutMillis: 30000, // Close idle clients after 30s
//   connectionTimeoutMillis: 2000, // Timeout if connection takes >2s
// });

// // API Route to Fetch Books
// export async function GET(req: NextRequest) {
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT * FROM books LIMIT 10");
//     client.release();

//     // Return only the array (not wrapped in an object)
//     return NextResponse.json(result.rows, { status: 200 });
//   } catch (error) {
//     console.error("Database query error:", error);
//     return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
//   }
// }
