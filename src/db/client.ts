import { PGlite } from "@electric-sql/pglite";
import { drizzle, type PgliteDatabase } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import { fileURLToPath } from "node:url";
import * as schema from "./schema.js";

export type Db = PgliteDatabase<typeof schema>;

// Ouvre la base et applique les migrations (comme Flyway ou Liquibase en Java).
// - avec un dossier : les données sont conservées sur le disque ;
// - sans dossier : base en mémoire, vidée à l'arrêt (utilisée par les tests).
export async function ouvrirBase(dossier?: string): Promise<Db> {
  const client = new PGlite(dossier);
  const db = drizzle({ client, schema });
  await migrate(db, { migrationsFolder: fileURLToPath(new URL("../../drizzle", import.meta.url)) });
  return db;
}
