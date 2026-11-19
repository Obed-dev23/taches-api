import { beforeEach, describe, expect, it } from "vitest";
import { creerApp } from "./app.js";
import { ouvrirBase } from "./db/client.js";

// Équivalent de JUnit : "describe" regroupe, "it" est un test, "expect" une assertion.
// Avant chaque test (@BeforeEach), on repart d'une base PostgreSQL vide, en mémoire.
let app: ReturnType<typeof creerApp>;

beforeEach(async () => {
  app = creerApp(await ouvrirBase());
});

// Petit utilitaire pour envoyer du JSON.
const envoyer = (methode: string, chemin: string, corps?: unknown) =>
  app.request(chemin, {
    method: methode,
    headers: { "Content-Type": "application/json" },
    body: corps === undefined ? undefined : JSON.stringify(corps),
  });

describe("API des tâches", () => {
  it("crée une tâche puis la retrouve dans la liste", async () => {
    const creation = await envoyer("POST", "/taches", { titre: "  Reprendre le code  " });
    expect(creation.status).toBe(201);
    const tache = await creation.json();
    expect(tache).toMatchObject({ id: 1, titre: "Reprendre le code", terminee: false });

    const liste = await (await app.request("/taches")).json();
    expect(liste).toHaveLength(1);
  });

  it("lit une tâche par son identifiant", async () => {
    await envoyer("POST", "/taches", { titre: "Lire" });
    const reponse = await app.request("/taches/1");
    expect(reponse.status).toBe(200);
    expect((await reponse.json()).titre).toBe("Lire");
  });

  it("refuse une tâche sans titre", async () => {
    const reponse = await envoyer("POST", "/taches", { titre: "   " });
    expect(reponse.status).toBe(400);
    expect((await reponse.json()).erreur).toContain("obligatoire");
  });

  it("modifie le titre et l'état d'une tâche", async () => {
    await envoyer("POST", "/taches", { titre: "Avant" });
    const reponse = await envoyer("PATCH", "/taches/1", { titre: "Après", terminee: true });
    expect(reponse.status).toBe(200);
    expect(await reponse.json()).toMatchObject({ titre: "Après", terminee: true });
  });

  it("refuse une modification vide", async () => {
    await envoyer("POST", "/taches", { titre: "Tâche" });
    const reponse = await envoyer("PATCH", "/taches/1", {});
    expect(reponse.status).toBe(400);
  });

  it("supprime une tâche", async () => {
    await envoyer("POST", "/taches", { titre: "À supprimer" });
    expect((await envoyer("DELETE", "/taches/1")).status).toBe(204);
    expect((await app.request("/taches/1")).status).toBe(404);
  });

  it("renvoie 404 pour une tâche inconnue", async () => {
    expect((await app.request("/taches/999")).status).toBe(404);
    expect((await envoyer("PATCH", "/taches/999", { terminee: true })).status).toBe(404);
    expect((await envoyer("DELETE", "/taches/999")).status).toBe(404);
  });

  it("refuse un identifiant qui n'est pas un nombre", async () => {
    expect((await app.request("/taches/abc")).status).toBe(400);
  });
});
