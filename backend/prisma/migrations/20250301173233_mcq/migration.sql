/*
  Warnings:

  - You are about to drop the column `addedById` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `addedByType` on the `Resource` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Resource` DROP FOREIGN KEY `Resource_Student_fkey`;

-- DropForeignKey
ALTER TABLE `Resource` DROP FOREIGN KEY `Resource_Teacher_fkey`;

-- AlterTable
ALTER TABLE `Resource` DROP COLUMN `addedById`,
    DROP COLUMN `addedByType`,
    ADD COLUMN `addedByStudentId` VARCHAR(191) NULL,
    ADD COLUMN `addedByTeacherId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Resource` ADD CONSTRAINT `Resource_Student_fkey` FOREIGN KEY (`addedByStudentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resource` ADD CONSTRAINT `Resource_Teacher_fkey` FOREIGN KEY (`addedByTeacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
