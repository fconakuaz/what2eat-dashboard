/*
  Warnings:

  - You are about to drop the column `email` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `User` table. All the data in the column will be lost.
  - The `physicalActivity` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `AfflictionsUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FoodIncludeUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FoodToExcludeUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IndicatorsRegisterUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuSaved` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `birthDate` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `gender` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PhysicalActivityLevel" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BANNED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserGender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "FoodCategory" AS ENUM ('FRUITS', 'VEGETABLES', 'GRAINS', 'PROTEINS', 'DAIRY', 'LEGUMES', 'NUTS_SEEDS', 'FATS_OILS', 'SWEETS_DESSERTS', 'BEVERAGES', 'HERBS_SPICES');

-- CreateEnum
CREATE TYPE "DietaryPreference" AS ENUM ('VEGAN', 'VEGETARIAN', 'GLUTEN_FREE', 'KETO', 'PALEO', 'HALAL', 'KOSHER', 'NONE');

-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('ECTOMORPH', 'SLENDER', 'ATHLETIC', 'THICK_SET', 'STOCKY', 'HEAVYSET', 'OBESE');

-- DropForeignKey
ALTER TABLE "AfflictionsUsers" DROP CONSTRAINT "AfflictionsUsers_afflictionId_fkey";

-- DropForeignKey
ALTER TABLE "AfflictionsUsers" DROP CONSTRAINT "AfflictionsUsers_userId_fkey";

-- DropForeignKey
ALTER TABLE "FoodIncludeUser" DROP CONSTRAINT "FoodIncludeUser_foodId_fkey";

-- DropForeignKey
ALTER TABLE "FoodIncludeUser" DROP CONSTRAINT "FoodIncludeUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "FoodToExcludeUser" DROP CONSTRAINT "FoodToExcludeUser_foodId_fkey";

-- DropForeignKey
ALTER TABLE "FoodToExcludeUser" DROP CONSTRAINT "FoodToExcludeUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "IndicatorsRegisterUser" DROP CONSTRAINT "IndicatorsRegisterUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "MenuSaved" DROP CONSTRAINT "MenuSaved_userId_fkey";

-- DropIndex
DROP INDEX "Auth_email_key";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "category" "FoodCategory";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "height",
DROP COLUMN "lastname",
DROP COLUMN "userType",
DROP COLUMN "weight",
ADD COLUMN     "dietaryPreference" "DietaryPreference" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER',
ALTER COLUMN "birthDate" SET NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "UserGender" NOT NULL,
DROP COLUMN "physicalActivity",
ADD COLUMN     "physicalActivity" "PhysicalActivityLevel" NOT NULL DEFAULT 'SEDENTARY',
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "AfflictionsUsers";

-- DropTable
DROP TABLE "FoodIncludeUser";

-- DropTable
DROP TABLE "FoodToExcludeUser";

-- DropTable
DROP TABLE "IndicatorsRegisterUser";

-- DropTable
DROP TABLE "MenuSaved";

-- CreateTable
CREATE TABLE "AfflictionUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "afflictionId" TEXT NOT NULL,

    CONSTRAINT "AfflictionUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncludedFoodUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,

    CONSTRAINT "IncludedFoodUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExcludedFoodUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,

    CONSTRAINT "ExcludedFoodUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedMenu" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "SavedMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthIndicatorUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "bmi" DOUBLE PRECISION,
    "bodyType" "BodyType",
    "bodyFat" DOUBLE PRECISION,
    "bodyWater" DOUBLE PRECISION,
    "bodyProtein" DOUBLE PRECISION,
    "basalMetabolism" DOUBLE PRECISION,
    "visceralFat" DOUBLE PRECISION,
    "boneMass" DOUBLE PRECISION,

    CONSTRAINT "HealthIndicatorUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AfflictionUser" ADD CONSTRAINT "AfflictionUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AfflictionUser" ADD CONSTRAINT "AfflictionUser_afflictionId_fkey" FOREIGN KEY ("afflictionId") REFERENCES "Affliction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncludedFoodUser" ADD CONSTRAINT "IncludedFoodUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncludedFoodUser" ADD CONSTRAINT "IncludedFoodUser_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcludedFoodUser" ADD CONSTRAINT "ExcludedFoodUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcludedFoodUser" ADD CONSTRAINT "ExcludedFoodUser_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedMenu" ADD CONSTRAINT "SavedMenu_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthIndicatorUser" ADD CONSTRAINT "HealthIndicatorUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
