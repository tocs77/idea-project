/*
  Warnings:

  - A unique constraint covering the columns `[serialNuber]` on the table `Idea` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "serialNuber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Idea_serialNuber_key" ON "Idea"("serialNuber");
