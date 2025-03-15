/*
  Warnings:

  - You are about to drop the `MCQ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MCQAttempt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MCQAttempt` DROP FOREIGN KEY `MCQAttempt_mcqId_fkey`;

-- DropForeignKey
ALTER TABLE `MCQAttempt` DROP FOREIGN KEY `MCQAttempt_studentId_fkey`;

-- DropTable
DROP TABLE `MCQ`;

-- DropTable
DROP TABLE `MCQAttempt`;

-- CreateTable
CREATE TABLE `Mcq` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `options` JSON NOT NULL,
    `correctAnswer` INTEGER NOT NULL,
    `explanation` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `McqAttempt` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `mcqId` VARCHAR(191) NOT NULL,
    `isCorrect` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `McqAttempt` ADD CONSTRAINT `McqAttempt_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `McqAttempt` ADD CONSTRAINT `McqAttempt_mcqId_fkey` FOREIGN KEY (`mcqId`) REFERENCES `Mcq`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
