/*
  Warnings:

  - You are about to drop the column `dealine` on the `task` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `dealine`,
    ADD COLUMN `deadline` DATETIME(3) NOT NULL;
