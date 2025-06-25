import Database from 'better-sqlite3';
import { createTables } from './schema';
import { seedSuppliers } from './seed';

export const db = new Database('sqlite.db');

createTables(db);
seedSuppliers(db);
