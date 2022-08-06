-- CreateTable
CREATE TABLE `Header` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `text` VARCHAR(191) NOT NULL,
    `cardId` VARCHAR(191) NOT NULL,

    INDEX `Header_cardId_idx`(`cardId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
