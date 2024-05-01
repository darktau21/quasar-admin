/*
  Warnings:

  - You are about to drop the column `descripction` on the `winners` table. All the data in the column will be lost.
  - Added the required column `description` to the `winners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "winners" DROP COLUMN "descripction",
ADD COLUMN     "description" TEXT NOT NULL;
