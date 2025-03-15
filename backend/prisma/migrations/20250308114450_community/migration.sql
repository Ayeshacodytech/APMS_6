/*
  Warnings:

  - Added the required column `teacherreceiverId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teachersenderId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CommentLike` ADD COLUMN `teacherId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CommentReply` ADD COLUMN `teacherId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CommentReplyLike` ADD COLUMN `teacherId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `teacherId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Like` ADD COLUMN `teacherId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `teacherreceiverId` VARCHAR(191) NOT NULL,
    ADD COLUMN `teachersenderId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PostLike` ADD COLUMN `teacherId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `community` ADD COLUMN `teacherId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `community` ADD CONSTRAINT `community_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentReply` ADD CONSTRAINT `CommentReply_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentLike` ADD CONSTRAINT `CommentLike_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentReplyLike` ADD CONSTRAINT `CommentReplyLike_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_teachersenderId_fkey` FOREIGN KEY (`teachersenderId`) REFERENCES `Teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_teacherreceiverId_fkey` FOREIGN KEY (`teacherreceiverId`) REFERENCES `Teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
