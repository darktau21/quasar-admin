/*
  Warnings:

  - You are about to drop the column `is_shown` on the `news` table. All the data in the column will be lost.
  - You are about to drop the `Characters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `news` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Medal" AS ENUM ('MEDAL1', 'MEDAL2', 'MEDAL3', 'MEDAL4');

-- AlterTable
ALTER TABLE "news" DROP COLUMN "is_shown",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "news_id_seq";

-- DropTable
DROP TABLE "Characters";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "session" UUID NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quote" TEXT,
    "tags" TEXT[],
    "description" TEXT NOT NULL,
    "is_shown" BOOLEAN NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "winners" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "review" TEXT,
    "descripction" TEXT NOT NULL,
    "medals" "Medal"[],
    "is_shown" BOOLEAN NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "winners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_id_key" ON "news"("id");
