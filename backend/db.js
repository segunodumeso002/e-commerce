import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
  // ssl: { rejectUnauthorized: false }, // Remove or comment out this line for local dev
});

export default {
  query: (text, params) => pool.query(text, params),
};