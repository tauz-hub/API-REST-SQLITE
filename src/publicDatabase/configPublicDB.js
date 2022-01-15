import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: './src/publicDatabase/database.db',
    driver: sqlite3.Database,
  });
}
