/*
  Warnings:

  - You are about to drop the `Nutrition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Nutrition" DROP CONSTRAINT "Nutrition_userId_fkey";

-- AlterTable
ALTER TABLE "ExcludedFoodUser" ADD COLUMN     "state" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "IncludedFoodUser" ADD COLUMN     "state" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "Nutrition";
