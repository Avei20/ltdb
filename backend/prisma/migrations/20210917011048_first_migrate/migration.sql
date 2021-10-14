-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GURU', 'MURID', 'KEPALA_TAHFIDZ', 'PARENT', 'TU');

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "TipeSesi" AS ENUM ('Murojah', 'Hafalan');

-- CreateEnum
CREATE TYPE "TipeEvent" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "EventModelType" AS ENUM ('USER', 'GURU', 'KELOMPOK_TAHFIDZ', 'MURID', 'PARENT', 'SESSION', 'ALQURAN');

-- CreateEnum
CREATE TYPE "GolonganDarah" AS ENUM ('Aplus', 'Aminus', 'Bplus', 'Bminus', 'Oplus', 'Ominus', 'ABPlus', 'ABminus');

-- CreateEnum
CREATE TYPE "Agama" AS ENUM ('Islam', 'Kristen', 'Buddha', 'Hindu', 'Kong_Hu_Chu', 'Katolik');

-- CreateEnum
CREATE TYPE "Pendidikan" AS ENUM ('Tidak_Sekolah', 'SD', 'SMP', 'SMA', 'Diploma', 'S1', 'S2', 'S3');

-- CreateEnum
CREATE TYPE "Hidup" AS ENUM ('HIDUP', 'MENINGGAL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guru" (
    "id" SERIAL NOT NULL,
    "nig" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "jenisKelamin" "JenisKelamin" NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "profileUrl" TEXT NOT NULL,

    CONSTRAINT "Guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuruDetails" (
    "guruId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GuruDetails_pkey" PRIMARY KEY ("guruId")
);

-- CreateTable
CREATE TABLE "GuruTahfidzDetails" (
    "guruId" INTEGER NOT NULL,

    CONSTRAINT "GuruTahfidzDetails_pkey" PRIMARY KEY ("guruId")
);

-- CreateTable
CREATE TABLE "Murid" (
    "id" SERIAL NOT NULL,
    "nis" TEXT NOT NULL,
    "nism" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenisKelamin" "JenisKelamin" NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "anakKe" INTEGER NOT NULL,
    "jumlahSaudaraKandung" INTEGER NOT NULL,
    "jumlahSaudaraTiri" INTEGER NOT NULL,
    "jumlahSaudaraAngkat" INTEGER NOT NULL,
    "golonganDarah" "GolonganDarah" NOT NULL,
    "profileUrl" TEXT NOT NULL,

    CONSTRAINT "Murid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuridDetails" (
    "muridId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MuridDetails_pkey" PRIMARY KEY ("muridId")
);

-- CreateTable
CREATE TABLE "MuridTahfidzDetails" (
    "muridId" INTEGER NOT NULL,
    "kelompokTahfidzId" INTEGER NOT NULL,

    CONSTRAINT "MuridTahfidzDetails_pkey" PRIMARY KEY ("muridId")
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "agama" "Agama" NOT NULL,
    "pendidikanTerakhir" "Pendidikan" NOT NULL,
    "penghasilanPerBulan" INTEGER NOT NULL,
    "pekerjaan" TEXT NOT NULL,
    "nomorTelepon" TEXT NOT NULL,
    "statusHidup" "Hidup" NOT NULL,
    "profileUrl" TEXT NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentDetails" (
    "parentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ParentDetails_pkey" PRIMARY KEY ("parentId")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "type" "TipeEvent" NOT NULL,
    "target" "EventModelType" NOT NULL,
    "targetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KelompokTahfidz" (
    "id" SERIAL NOT NULL,
    "guruId" INTEGER NOT NULL,

    CONSTRAINT "KelompokTahfidz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "type" "TipeSesi" NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "juz" INTEGER NOT NULL,
    "halaman" INTEGER NOT NULL,
    "awalSetoran" TEXT NOT NULL,
    "akhirSetoran" TEXT NOT NULL,
    "nilaiTajwid" INTEGER NOT NULL,
    "nilaiKelancaran" INTEGER NOT NULL,
    "nilaiMakhroj" INTEGER NOT NULL,
    "nilaiSifatHuruf" INTEGER NOT NULL,
    "jamTahfidz" TEXT NOT NULL,
    "muridId" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JamTahfidz" (
    "id" SERIAL NOT NULL,
    "waktuMulai" TIMESTAMP(3) NOT NULL,
    "waktuSelesai" TIMESTAMP(3) NOT NULL,
    "namaJam" TEXT NOT NULL,
    "tipe" "TipeSesi" NOT NULL,

    CONSTRAINT "JamTahfidz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlQuran" (
    "id" SERIAL NOT NULL,
    "ayat" INTEGER NOT NULL,
    "baris" INTEGER NOT NULL,
    "halaman" INTEGER NOT NULL,
    "surah" TEXT NOT NULL,
    "juz" INTEGER NOT NULL,

    CONSTRAINT "AlQuran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MuridToParent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Guru_nig_key" ON "Guru"("nig");

-- CreateIndex
CREATE UNIQUE INDEX "GuruDetails_userId_unique" ON "GuruDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Murid_nis_key" ON "Murid"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "Murid_nism_key" ON "Murid"("nism");

-- CreateIndex
CREATE UNIQUE INDEX "Murid_nisn_key" ON "Murid"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "MuridDetails_userId_unique" ON "MuridDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ParentDetails_userId_unique" ON "ParentDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_MuridToParent_AB_unique" ON "_MuridToParent"("A", "B");

-- CreateIndex
CREATE INDEX "_MuridToParent_B_index" ON "_MuridToParent"("B");

-- AddForeignKey
ALTER TABLE "GuruDetails" ADD CONSTRAINT "GuruDetails_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "Guru"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuruDetails" ADD CONSTRAINT "GuruDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuruTahfidzDetails" ADD CONSTRAINT "GuruTahfidzDetails_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "GuruDetails"("guruId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MuridDetails" ADD CONSTRAINT "MuridDetails_muridId_fkey" FOREIGN KEY ("muridId") REFERENCES "Murid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MuridDetails" ADD CONSTRAINT "MuridDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MuridTahfidzDetails" ADD CONSTRAINT "MuridTahfidzDetails_muridId_fkey" FOREIGN KEY ("muridId") REFERENCES "MuridDetails"("muridId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MuridTahfidzDetails" ADD CONSTRAINT "MuridTahfidzDetails_kelompokTahfidzId_fkey" FOREIGN KEY ("kelompokTahfidzId") REFERENCES "KelompokTahfidz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentDetails" ADD CONSTRAINT "ParentDetails_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentDetails" ADD CONSTRAINT "ParentDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelompokTahfidz" ADD CONSTRAINT "KelompokTahfidz_guruId_fkey" FOREIGN KEY ("guruId") REFERENCES "GuruTahfidzDetails"("guruId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_muridId_fkey" FOREIGN KEY ("muridId") REFERENCES "MuridTahfidzDetails"("muridId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MuridToParent" ADD FOREIGN KEY ("A") REFERENCES "Murid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MuridToParent" ADD FOREIGN KEY ("B") REFERENCES "Parent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
