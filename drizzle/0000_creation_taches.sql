CREATE TABLE "taches" (
	"id" serial PRIMARY KEY NOT NULL,
	"titre" text NOT NULL,
	"terminee" boolean DEFAULT false NOT NULL,
	"cree_le" timestamp with time zone DEFAULT now() NOT NULL
);
