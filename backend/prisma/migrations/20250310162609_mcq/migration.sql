-- DropForeignKey
ALTER TABLE `GatemcqAttempt` DROP FOREIGN KEY `GatemcqAttempt_gatemcqId_fkey`;

-- DropForeignKey
ALTER TABLE `McqAttempt` DROP FOREIGN KEY `McqAttempt_mcqId_fkey`;

-- AddForeignKey
ALTER TABLE `McqAttempt` ADD CONSTRAINT `McqAttempt_mcqId_fkey` FOREIGN KEY (`mcqId`) REFERENCES `Mcq`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GatemcqAttempt` ADD CONSTRAINT `GatemcqAttempt_gatemcqId_fkey` FOREIGN KEY (`gatemcqId`) REFERENCES `Gatemcq`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
