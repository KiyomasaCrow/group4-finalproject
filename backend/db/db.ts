import mysql, { Pool } from "mysql2/promise";

const db: Pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "eCommerce",
});

export default db;
