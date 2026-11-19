import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Équivalent d'une @Entity JPA : décrit la table "taches" de PostgreSQL.
export const taches = pgTable("taches", {
  id: serial("id").primaryKey(), // @Id @GeneratedValue
  titre: text("titre").notNull(), // @Column(nullable = false)
  terminee: boolean("terminee").notNull().default(false),
  creeLe: timestamp("cree_le", { withTimezone: true }).notNull().defaultNow(),
});

// Le type d'une tâche est déduit de la table : pas besoin de l'écrire deux fois.
export type Tache = typeof taches.$inferSelect;
