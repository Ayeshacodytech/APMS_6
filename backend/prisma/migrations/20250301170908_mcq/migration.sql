/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Mcq` table. All the data in the column will be lost.
  - Added the required column `answer` to the `Mcq` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Mcq` DROP COLUMN `correctAnswer`,
    ADD COLUMN `answer` VARCHAR(191) NOT NULL;
