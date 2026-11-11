import { describe, expect, it } from "vitest";
import { app } from "./app.js";

// Équivalent de JUnit : "describe" regroupe, "it" est un test, "expect" une assertion.
describe("API des tâches", () => {
  it("crée une tâche puis la liste", async () => {
    const creation = await app.request("/taches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titre: "Reprendre le code" }),
    });
    expect(creation.status).toBe(201);
    expect(await creation.json()).toEqual({
      id: 1,
      titre: "Reprendre le code",
      terminee: false,
    });

    const liste = await app.request("/taches");
    expect(await liste.json()).toHaveLength(1);
  });

  it("refuse une tâche sans titre", async () => {
    const reponse = await app.request("/taches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(reponse.status).toBe(400);
  });

  it("marque une tâche comme terminée", async () => {
    const reponse = await app.request("/taches/1/terminer", { method: "PATCH" });
    expect(reponse.status).toBe(200);
    expect((await reponse.json()).terminee).toBe(true);
  });

  it("renvoie 404 pour une tâche inconnue", async () => {
    const reponse = await app.request("/taches/999/terminer", { method: "PATCH" });
    expect(reponse.status).toBe(404);
  });
});
