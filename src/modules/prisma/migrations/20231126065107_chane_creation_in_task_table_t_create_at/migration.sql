/*
  Warnings:

  - You are about to drop the column `creationDate` on the `task` table. All the data in the column will be lost.
  - Added the required column `createAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `creationDate`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL;
