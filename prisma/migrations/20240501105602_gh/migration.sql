/*
  Warnings:

  - You are about to drop the column `is_shown` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `is_shown` on the `winners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "team" DROP COLUMN "is_shown";

-- AlterTable
ALTER TABLE "winners" DROP COLUMN "is_shown";
