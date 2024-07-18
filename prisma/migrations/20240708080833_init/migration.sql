/*
  Warnings:

  - The primary key for the `AuthRolePrivilege` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AuthRolePrivilege` table. All the data in the column will be lost.
  - The primary key for the `AuthUserRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AuthUserRole` table. All the data in the column will be lost.
  - Added the required column `privilegeId` to the `AuthRolePrivilege` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `AuthRolePrivilege` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `AuthUserRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `AuthUserRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AuthRolePrivilege` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `privilegeId` VARCHAR(191) NOT NULL,
    ADD COLUMN `roleId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`roleId`, `privilegeId`);

-- AlterTable
ALTER TABLE `AuthUserRole` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `roleId` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`userId`, `roleId`);

-- CreateTable
CREATE TABLE `AuthAPIPrivilege` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `privilegeId` VARCHAR(191) NOT NULL,
    `apiId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`privilegeId`, `apiId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuthAPI` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuthUserRole` ADD CONSTRAINT `AuthUserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `AuthUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthUserRole` ADD CONSTRAINT `AuthUserRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `AuthRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthRolePrivilege` ADD CONSTRAINT `AuthRolePrivilege_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `AuthRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthRolePrivilege` ADD CONSTRAINT `AuthRolePrivilege_privilegeId_fkey` FOREIGN KEY (`privilegeId`) REFERENCES `AuthPrivilege`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthAPIPrivilege` ADD CONSTRAINT `AuthAPIPrivilege_privilegeId_fkey` FOREIGN KEY (`privilegeId`) REFERENCES `AuthPrivilege`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthAPIPrivilege` ADD CONSTRAINT `AuthAPIPrivilege_apiId_fkey` FOREIGN KEY (`apiId`) REFERENCES `AuthAPI`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
