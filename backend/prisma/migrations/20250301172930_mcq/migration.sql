/*
  Warnings:

  - You are about to drop the column `resourse` on the `Resource` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resource]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resource` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Resource_resourse_key` ON `Resource`;

-- AlterTable
ALTER TABLE `Resource` DROP COLUMN `resourse`,
    ADD COLUMN `resource` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Resource_resource_key` ON `Resource`(`resource`);
