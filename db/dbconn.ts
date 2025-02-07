import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres', // Default to 'postgres'
  host: process.env.POSTGRES_HOST || 'localhost', // Localhost if running locally
  database: process.env.POSTGRES_NAME || 'library_system', // Your local database name
  password: process.env.POSTGRES_PASSWORD || '', // Database password
  port: parseInt(process.env.POSTGRES_PORT || '5432'), // PostgreSQL default port
  max: 10, // Max connections in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30s
  connectionTimeoutMillis: 2000, // Timeout if connection takes >2s
});

export default pool;
