/*
  Warnings:

  - A unique constraint covering the columns `[kode]` on the table `KelompokTahfidz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kode` to the `KelompokTahfidz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KelompokTahfidz" ADD COLUMN     "kode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "KelompokTahfidz_kode_key" ON "KelompokTahfidz"("kode");
