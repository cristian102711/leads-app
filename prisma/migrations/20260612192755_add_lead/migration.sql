-- CreateTable
CREATE TABLE "lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mensaje" TEXT,
    "producto" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'nuevo',
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
