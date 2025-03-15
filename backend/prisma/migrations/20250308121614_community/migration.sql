-- DropForeignKey
ALTER TABLE `CommentLike` DROP FOREIGN KEY `CommentLike_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CommentReply` DROP FOREIGN KEY `CommentReply_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_teacherreceiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_teachersenderId_fkey`;

-- DropForeignKey
ALTER TABLE `PostLike` DROP FOREIGN KEY `PostLike_userId_fkey`;

-- DropForeignKey
ALTER TABLE `community` DROP FOREIGN KEY `community_authorId_fkey`;

-- AlterTable
ALTER TABLE `CommentLike` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CommentReply` MODIFY `authorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Comments` MODIFY `authorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Like` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Notification` MODIFY `senderId` VARCHAR(191) NULL,
    MODIFY `receiverId` VARCHAR(191) NULL,
    MODIFY `teacherreceiverId` VARCHAR(191) NULL,
    MODIFY `teachersenderId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `PostLike` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `community` MODIFY `authorId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `community` ADD CONSTRAINT `community_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentReply` ADD CONSTRAINT `CommentReply_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostLike` ADD CONSTRAINT `PostLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommentLike` ADD CONSTRAINT `CommentLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_teachersenderId_fkey` FOREIGN KEY (`teachersenderId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_teacherreceiverId_fkey` FOREIGN KEY (`teacherreceiverId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
