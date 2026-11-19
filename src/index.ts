import { serve } from "@hono/node-server";
import { creerApp } from "./app.js";
import { ouvrirBase } from "./db/client.js";

// Point d'entrée, équivalent du "public static void main" en Java.
const port = Number(process.env.PORT ?? 3000);
const db = await ouvrirBase("./donnees");
const app = creerApp(db);

serve({ fetch: app.fetch, port }, () => {
  console.log(`API démarrée sur http://localhost:${port}`);
});
