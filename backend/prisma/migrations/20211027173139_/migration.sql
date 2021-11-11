-- AlterTable
ALTER TABLE "Halaqoh" ADD COLUMN     "closed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
