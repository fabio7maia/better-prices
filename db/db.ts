import * as SQLite from "expo-sqlite";

export const getDb = async () =>
  await SQLite.openDatabaseAsync("betterPrices.db");

export const initDb = async () => {
  const db = await getDb();

  // `execAsync()` is useful for bulk queries when you want to execute altogether.
  // Please note that `execAsync()` does not escape parameters and may lead to SQL injection.
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY NOT NULL, 
        reference INTEGER NOT NULL, 
        image TEXT, 
        name TEXT NOT NULL, 
        price DECIMAL(9,2) NOT NULL, 
        UNIQUE(reference)
    );
  `);
};
