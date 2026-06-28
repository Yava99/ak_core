import { getDatabase } from "./db";

export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const db = getDatabase();
    await db.ping();
    return true;
  } catch {
    return false;
  }
}