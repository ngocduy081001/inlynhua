/**
 * lib/db.ts — SQLite database layer via better-sqlite3
 * File DB: /data/blog.db (tự tạo khi khởi động)
 */
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "blog.db");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;
  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");
  initSchema(_db);
  return _db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id            TEXT PRIMARY KEY,
      title         TEXT NOT NULL,
      slug          TEXT NOT NULL UNIQUE,
      status        TEXT NOT NULL DEFAULT 'draft',
      content       TEXT NOT NULL DEFAULT '',
      excerpt       TEXT NOT NULL DEFAULT '',
      thumbnail     TEXT NOT NULL DEFAULT '',
      category_slug TEXT NOT NULL DEFAULT '',
      tags          TEXT NOT NULL DEFAULT '[]',      -- JSON array
      meta_title    TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      canonical_url TEXT,
      focus_keyword TEXT NOT NULL DEFAULT '',
      keywords      TEXT NOT NULL DEFAULT '[]',      -- JSON array
      og_title      TEXT,
      og_description TEXT,
      og_image      TEXT,
      author_name   TEXT NOT NULL DEFAULT 'In Ly Giá Rẻ',
      author_role   TEXT,
      author_avatar TEXT,
      read_time     INTEGER NOT NULL DEFAULT 1,
      is_featured   INTEGER NOT NULL DEFAULT 0,      -- 0/1 boolean
      created_at    TEXT NOT NULL,
      updated_at    TEXT NOT NULL,
      published_at  TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_posts_slug      ON posts(slug);
    CREATE INDEX IF NOT EXISTS idx_posts_status    ON posts(status);
    CREATE INDEX IF NOT EXISTS idx_posts_category  ON posts(category_slug);
    CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published_at DESC);
  `);
}
