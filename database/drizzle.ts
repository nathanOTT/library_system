import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import config from "@/lib/config";

// Check if the database URL is set
if (!process.env.DATABASE_URL) {
  throw new Error('Database URL not found in environment variables');
}

// Create a new Neon instance
const sql = neon(config.env.databaseUrl || '');

// Create a Drizzle instance using the Neon connection
export const drizzleDb = drizzle({ client: sql });

// Export the Drizzle instance
export default drizzleDb;