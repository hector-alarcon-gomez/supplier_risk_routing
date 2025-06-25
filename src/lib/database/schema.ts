import { Database } from 'better-sqlite3';

export function createTables(db: Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      risk_score INTEGER,
      risk_categories TEXT,
      location TEXT,
      industry TEXT
    )
  `);
}
