import { defineConfig } from "drizzle-kit";

// Configuration de l'outil qui génère les migrations SQL à partir de src/db/schema.ts.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
});
