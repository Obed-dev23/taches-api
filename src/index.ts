import { serve } from "@hono/node-server";
import { app } from "./app.js";

// Point d'entrée, équivalent du "public static void main" en Java.
const port = 3000;

serve({ fetch: app.fetch, port }, () => {
  console.log(`API démarrée sur http://localhost:${port}`);
});
