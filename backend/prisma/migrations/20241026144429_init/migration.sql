-- CreateTable
CREATE TABLE `Student` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `registernumber` VARCHAR(191) NULL,
    `year` VARCHAR(191) NOT NULL,
    `departmant` VARCHAR(191) NOT NULL,
    `YearofGraduation` INTEGER NOT NULL,
    `cgpa` VARCHAR(191) NOT NULL,
    `batch` VARCHAR(191) NOT NULL,
    `isPlaced` BOOLEAN NOT NULL DEFAULT false,
    `FieldofInterest` ENUM('Core', 'IT') NOT NULL,

    UNIQUE INDEX `Student_email_key`(`email`),
    UNIQUE INDEX `Student_registernumber_key`(`registernumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobs` (
    `id` VARCHAR(191) NOT NULL,
    `CompanyName` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `package` VARCHAR(191) NOT NULL,
    `jobdescription` VARCHAR(191) NOT NULL,
    `Type` ENUM('Core', 'IT') NOT NULL,
    `eligibility` VARCHAR(191) NOT NULL,
    `departmant` JSON NOT NULL,
    `applylink` VARCHAR(191) NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `companyvisit` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'current',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `placedCompany` (
    `id` VARCHAR(191) NOT NULL,
    `studentid` VARCHAR(191) NOT NULL,
    `placedCompanyname` VARCHAR(191) NOT NULL,
    `onCampus` BOOLEAN NOT NULL DEFAULT true,
    `package` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `placedCompany` ADD CONSTRAINT `placedCompany_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
