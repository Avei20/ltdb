/*
  Warnings:

  - The primary key for the `Roles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Roles_pkey" PRIMARY KEY ("id");
