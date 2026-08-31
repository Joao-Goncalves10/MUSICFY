import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('musicfy.db');

export async function initDatabase() {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      year INTEGER,
      cover TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      album_id INTEGER NOT NULL,
      rating REAL NOT NULL,
      review TEXT,
      status TEXT DEFAULT 'ouvido',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (album_id) REFERENCES albums(id)
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      content TEXT,
      album_id INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (album_id) REFERENCES albums(id)
    );
  `);
}