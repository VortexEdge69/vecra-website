
// src/lib/db.ts
import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export a function to get a connection from the pool
export const getConnection = async () => {
  return await pool.getConnection();
};

// Export the pool directly for more advanced use cases
export default pool;
