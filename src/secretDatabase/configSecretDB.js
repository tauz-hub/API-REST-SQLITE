import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDbScret() {
  return open({
    filename: './src/SecretDatabase/secretDatabase.db',
    driver: sqlite3.Database,
  });
}
