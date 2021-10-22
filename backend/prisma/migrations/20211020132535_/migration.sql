/*
  Warnings:

  - A unique constraint covering the columns `[nigs]` on the table `Guru` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kodeGuru]` on the table `Guru` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kodeGuru` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nigs` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalMasuk` to the `Guru` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guru" ADD COLUMN     "kodeGuru" TEXT NOT NULL,
ADD COLUMN     "nigs" TEXT NOT NULL,
ADD COLUMN     "tanggalMasuk" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Guru_nigs_key" ON "Guru"("nigs");

-- CreateIndex
CREATE UNIQUE INDEX "Guru_kodeGuru_key" ON "Guru"("kodeGuru");
