/**
 * lib/db.ts — MySQL database layer via mysql2
 * Connection pool to MySQL server
 */
import mysql from "mysql2/promise";

let _pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (_pool) return _pool;

  _pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "inlynhua",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return _pool;
}

export async function initSchema() {
  const pool = getPool();

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id            VARCHAR(64) PRIMARY KEY,
      name          VARCHAR(200) NOT NULL,
      slug          VARCHAR(200) NOT NULL UNIQUE,
      description   TEXT,
      icon          VARCHAR(100),
      color         VARCHAR(20),
      sort_order    INT NOT NULL DEFAULT 0,
      created_at    VARCHAR(30) NOT NULL,
      updated_at    VARCHAR(30) NOT NULL,
      INDEX idx_categories_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id            VARCHAR(64) PRIMARY KEY,
      title         VARCHAR(500) NOT NULL,
      slug          VARCHAR(255) NOT NULL UNIQUE,
      status        VARCHAR(20) NOT NULL DEFAULT 'draft',
      content       LONGTEXT NOT NULL,
      excerpt       TEXT NOT NULL,
      thumbnail     VARCHAR(500) NOT NULL DEFAULT '',
      category_slug VARCHAR(100) NOT NULL DEFAULT '',
      tags          JSON NOT NULL,
      meta_title    VARCHAR(500) NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL,
      canonical_url VARCHAR(500),
      focus_keyword VARCHAR(255) NOT NULL DEFAULT '',
      keywords      JSON NOT NULL,
      og_title      VARCHAR(500),
      og_description TEXT,
      og_image      VARCHAR(500),
      author_name   VARCHAR(100) NOT NULL DEFAULT 'In Ly Giá Rẻ',
      author_role   VARCHAR(100),
      author_avatar VARCHAR(500),
      read_time     INT NOT NULL DEFAULT 1,
      is_featured   TINYINT(1) NOT NULL DEFAULT 0,
      created_at    VARCHAR(30) NOT NULL,
      updated_at    VARCHAR(30) NOT NULL,
      published_at  VARCHAR(30),
      INDEX idx_posts_slug (slug),
      INDEX idx_posts_status (status),
      INDEX idx_posts_category (category_slug),
      INDEX idx_posts_published (published_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
}
