/*
  Warnings:

  - You are about to drop the column `slides` on the `Class` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "slides";

-- CreateTable
CREATE TABLE "Slide" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "classId" INTEGER NOT NULL,
    "totalSlides" INTEGER NOT NULL DEFAULT 1,
    "currentPage" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
