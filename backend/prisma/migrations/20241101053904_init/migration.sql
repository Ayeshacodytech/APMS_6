/*
  Warnings:

  - You are about to drop the column `departmant` on the `Student` table. All the data in the column will be lost.
  - Added the required column `department` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Student` DROP COLUMN `departmant`,
    ADD COLUMN `department` VARCHAR(191) NOT NULL,
    MODIFY `YearofGraduation` VARCHAR(191) NOT NULL;
