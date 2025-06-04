import { Pool, PoolClient } from "pg";

export const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT_NUMBER ? parseInt(process.env.PORT_NUMBER) : undefined,
});

export default async function dbConnect() {
  let client: PoolClient | undefined;

  try {
    client = await pool.connect();
    await client.query("SELECT NOW()");
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection error:", (error as Error).stack);
  } finally {
    client?.release();
  }
}
