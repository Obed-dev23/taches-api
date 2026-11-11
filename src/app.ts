import { Hono } from "hono";

// Équivalent d'un "record" Java : la forme d'une tâche.
// En TypeScript, un type décrit une structure ; il n'y a pas de classe à instancier.
export type Tache = {
  id: number;
  titre: string;
  terminee: boolean;
};

// Stockage en mémoire pour l'instant (comme une List<Tache> en Java).
// On le remplacera par PostgreSQL à l'étape suivante.
const taches: Tache[] = [];
let prochainId = 1;

// Équivalent d'un @RestController Spring : on y déclare les routes.
export const app = new Hono();

// GET /taches : renvoie toutes les tâches.
app.get("/taches", (c) => c.json(taches));

// POST /taches : crée une tâche à partir du JSON reçu.
app.post("/taches", async (c) => {
  const corps = await c.req.json().catch(() => null);
  const titre = typeof corps?.titre === "string" ? corps.titre.trim() : "";

  if (titre === "") {
    return c.json({ erreur: "Le champ 'titre' est obligatoire." }, 400);
  }

  const tache: Tache = { id: prochainId++, titre, terminee: false };
  taches.push(tache);
  return c.json(tache, 201);
});

// PATCH /taches/:id/terminer : marque une tâche comme terminée.
app.patch("/taches/:id/terminer", (c) => {
  const id = Number(c.req.param("id"));
  const tache = taches.find((t) => t.id === id);

  if (!tache) {
    return c.json({ erreur: `Tâche ${id} introuvable.` }, 404);
  }

  tache.terminee = true;
  return c.json(tache);
});
