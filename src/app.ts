import { zValidator } from "@hono/zod-validator";
import { asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import type { Db } from "./db/client.js";
import { taches } from "./db/schema.js";

// Règles de validation, équivalent de Bean Validation (@NotBlank, @Size...).
const schemaCreation = z.object({
  titre: z.string().trim().min(1, "Le titre est obligatoire.").max(200),
});

const schemaModification = z
  .object({
    titre: z.string().trim().min(1).max(200).optional(),
    terminee: z.boolean().optional(),
  })
  .refine((d) => d.titre !== undefined || d.terminee !== undefined, {
    message: "Rien à modifier : envoyez 'titre' et/ou 'terminee'.",
  });

const schemaId = z.object({ id: z.coerce.number().int().positive() });

// En cas de données invalides, renvoie une erreur 400 lisible.
const valider = <T extends z.ZodType>(cible: "json" | "param", schema: T) =>
  zValidator(cible, schema, (resultat, c) => {
    if (!resultat.success) {
      return c.json({ erreur: resultat.error.issues.map((i) => i.message).join(" ") }, 400);
    }
  });

// La base est passée en paramètre : c'est de l'injection de dépendances,
// comme un constructeur @Autowired en Spring. Les tests y passent une base vide.
export function creerApp(db: Db) {
  const app = new Hono();

  // Autorise le futur site web (sur une autre adresse) à appeler l'API.
  app.use("*", cors());

  // GET /taches : liste toutes les tâches.
  app.get("/taches", async (c) => {
    const liste = await db.select().from(taches).orderBy(asc(taches.id));
    return c.json(liste);
  });

  // GET /taches/:id : renvoie une tâche.
  app.get("/taches/:id", valider("param", schemaId), async (c) => {
    const { id } = c.req.valid("param");
    const [tache] = await db.select().from(taches).where(eq(taches.id, id));
    return tache ? c.json(tache) : c.json(introuvable(id), 404);
  });

  // POST /taches : crée une tâche.
  app.post("/taches", valider("json", schemaCreation), async (c) => {
    const { titre } = c.req.valid("json");
    const [tache] = await db.insert(taches).values({ titre }).returning();
    return c.json(tache, 201);
  });

  // PATCH /taches/:id : modifie le titre et/ou l'état d'une tâche.
  app.patch(
    "/taches/:id",
    valider("param", schemaId),
    valider("json", schemaModification),
    async (c) => {
      const { id } = c.req.valid("param");
      const modifications = c.req.valid("json");
      const [tache] = await db
        .update(taches)
        .set(modifications)
        .where(eq(taches.id, id))
        .returning();
      return tache ? c.json(tache) : c.json(introuvable(id), 404);
    },
  );

  // DELETE /taches/:id : supprime une tâche.
  app.delete("/taches/:id", valider("param", schemaId), async (c) => {
    const { id } = c.req.valid("param");
    const [tache] = await db.delete(taches).where(eq(taches.id, id)).returning();
    return tache ? c.body(null, 204) : c.json(introuvable(id), 404);
  });

  return app;
}

const introuvable = (id: number) => ({ erreur: `Tâche ${id} introuvable.` });
