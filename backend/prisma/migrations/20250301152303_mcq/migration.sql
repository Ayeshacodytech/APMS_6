/*
  Warnings:

  - You are about to drop the column `link` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Resource` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resourse]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resourse` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Resource_link_key` ON `Resource`;

-- AlterTable
ALTER TABLE `Resource` DROP COLUMN `link`,
    DROP COLUMN `title`,
    ADD COLUMN `resourse` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Resource_resourse_key` ON `Resource`(`resourse`);
