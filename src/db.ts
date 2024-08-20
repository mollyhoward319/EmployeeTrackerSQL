import { Pool, PoolClient } from "pg";
import dotenv from "dotenv";

dotenv.config();

export default class Database {
  private static instance: Database;

  private connection: PoolClient | null = null;

  private pool = new Pool({
    user: process.env.db_user!,
    password: process.env.db_password!,
    host: process.env.db_host!,
    port: parseInt(process.env.db_port!),
    database: process.env.db_database!,
  });
  private constructor() {
    // Initialize database connection
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public async query(query: string, value?: any): Promise<any> {
    this.connection = await this.pool.connect();

    try {
      return await this.connection.query(query, value);
    } finally {
      this.connection.release();
    }
  }
}
