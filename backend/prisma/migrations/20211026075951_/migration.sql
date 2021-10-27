/*
  Warnings:

  - The values [KELOMPOK_TAHFIDZ] on the enum `EventModelType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `KelompokTahfidz` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventModelType_new" AS ENUM ('USER', 'GURU', 'HALAQOH', 'MURID', 'PARENT', 'SESSION', 'ALQURAN', 'JAM_TAHFIDZ', 'ROLES');
ALTER TABLE "Event" ALTER COLUMN "target" TYPE "EventModelType_new" USING ("target"::text::"EventModelType_new");
ALTER TYPE "EventModelType" RENAME TO "EventModelType_old";
ALTER TYPE "EventModelType_new" RENAME TO "EventModelType";
DROP TYPE "EventModelType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "KelompokTahfidz" DROP CONSTRAINT "KelompokTahfidz_guruId_fkey";

-- DropForeignKey
ALTER TABLE "MuridTahfidzDetails" DROP CONSTRAINT "MuridTahfidzDetails_kelompokTahfidzId_fkey";

-- DropTable
DROP TABLE "KelompokTahfidz";

-- CreateTable
CREATE TABLE "Halaqoh" (
    "id" SERIAL NOT NULL,
    "kode" TEXT NOT NULL,
    "guruId" INTEGER NOT NULL,

    CONSTRAINT "Halaqoh_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Halaqoh_kode_key" ON "Halaqoh"("kode");

-- AddForeignKey
ALTER TABLE "MuridTahfidzDetails" ADD CONSTRAINT "MuridTahfidzDetails_kelompokTahfidzId_fkey" FOREIGN KEY ("kelompokTahfidzId") REFERENCES "Halaqoh"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Halaqoh" ADD CONSTRAINT "Halaqoh_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "GuruTahfidzDetails"("guruId") ON DELETE RESTRICT ON UPDATE CASCADE;
