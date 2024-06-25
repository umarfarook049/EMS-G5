import { Pool } from 'pg';

const pool = new Pool ({

  user: 'postgres',
  host: 'localhost',
  database: 'emps',
  password: 'Umar@123',
  port: 5432, // Default port for PostgreSQL

 });

export default pool;