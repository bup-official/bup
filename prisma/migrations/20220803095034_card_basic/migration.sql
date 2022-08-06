-- CreateTable
CREATE TABLE `BupCard` (
    `id` VARCHAR(191) NOT NULL,
    `cardSlug` VARCHAR(191) NOT NULL,
    `cardTitle` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `BupCard_cardSlug_key`(`cardSlug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
