/*
  Warnings:

  - You are about to drop the `Alimento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AlimentosExcluirUsuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AlimentosIncluirUsuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuGuardado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Padecimiento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PadecimientosUsuarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegistroIndicadoresUsuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AuthType" AS ENUM
('EMAIL', 'GOOGLE');

-- DropForeignKey
ALTER TABLE "AlimentosExcluirUsuario" DROP CONSTRAINT "AlimentosExcluirUsuario_alimentoId_fkey";

-- DropForeignKey
ALTER TABLE "AlimentosExcluirUsuario" DROP CONSTRAINT "AlimentosExcluirUsuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "AlimentosIncluirUsuario" DROP CONSTRAINT "AlimentosIncluirUsuario_alimentoId_fkey";

-- DropForeignKey
ALTER TABLE "AlimentosIncluirUsuario" DROP CONSTRAINT "AlimentosIncluirUsuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "MenuGuardado" DROP CONSTRAINT "MenuGuardado_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "PadecimientosUsuarios" DROP CONSTRAINT "PadecimientosUsuarios_padecimientoId_fkey";

-- DropForeignKey
ALTER TABLE "PadecimientosUsuarios" DROP CONSTRAINT "PadecimientosUsuarios_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "RegistroIndicadoresUsuario" DROP CONSTRAINT "RegistroIndicadoresUsuario_usuarioId_fkey";

-- DropTable
DROP TABLE "Alimento";

-- DropTable
DROP TABLE "AlimentosExcluirUsuario";

-- DropTable
DROP TABLE "AlimentosIncluirUsuario";

-- DropTable
DROP TABLE "MenuGuardado";

-- DropTable
DROP TABLE "Padecimiento";

-- DropTable
DROP TABLE "PadecimientosUsuarios";

-- DropTable
DROP TABLE "RegistroIndicadoresUsuario";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "User"
(
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "birthDate" TIMESTAMP(3),
    "gender" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "physicalActivity" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "userType" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auth"
(
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "authType" "AuthType" NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "googleId" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session"
(
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Affliction"
(
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Affliction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AfflictionsUsers"
(
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "afflictionId" TEXT NOT NULL,

    CONSTRAINT "AfflictionsUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food"
(
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodIncludeUser"
(
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,

    CONSTRAINT "FoodIncludeUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodToExcludeUser"
(
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,

    CONSTRAINT "FoodToExcludeUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuSaved"
(
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "MenuSaved_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndicatorsRegisterUser"
(
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imc" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IndicatorsRegisterUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity"
(
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "steps" INTEGER NOT NULL,
    "caloriesBurned" DOUBLE PRECISION NOT NULL,
    "distanceMeters" DOUBLE PRECISION NOT NULL,
    "activeMinutes" INTEGER NOT NULL,
    "heartPoints" INTEGER NOT NULL,
    "moveMinutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSession"
(
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "caloriesBurned" DOUBLE PRECISION NOT NULL,
    "distanceMeters" DOUBLE PRECISION NOT NULL,
    "averageHeartRateBpm" INTEGER NOT NULL,

    CONSTRAINT "WorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepSession"
(
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "totalSleepHrs" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SleepSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepStage"
(
    "id" TEXT NOT NULL,
    "sleepSessionId" TEXT NOT NULL,
    "lightSleepMinutes" INTEGER NOT NULL,
    "deepSleepMinutes" INTEGER NOT NULL,
    "remSleepMinutes" INTEGER NOT NULL,

    CONSTRAINT "SleepStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeartRate"
(
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "restingHeartRate" INTEGER NOT NULL,
    "averageHeartRate" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeartRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeartRateZone"
(
    "id" TEXT NOT NULL,
    "heartRateId" TEXT NOT NULL,
    "fatBurn" INTEGER NOT NULL,
    "cardio" INTEGER NOT NULL,
    "peak" INTEGER NOT NULL,

    CONSTRAINT "HeartRateZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nutrition"
(
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "waterIntakeMl" INTEGER NOT NULL,
    "caloriesConsumed" DOUBLE PRECISION NOT NULL,
    "carbohydratesG" DOUBLE PRECISION NOT NULL,
    "proteinsG" DOUBLE PRECISION NOT NULL,
    "fatsG" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Nutrition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userId_key" ON "Auth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_refreshToken_key" ON "Session"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Affliction_name_key" ON "Affliction"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AfflictionsUsers" ADD CONSTRAINT "AfflictionsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AfflictionsUsers" ADD CONSTRAINT "AfflictionsUsers_afflictionId_fkey" FOREIGN KEY ("afflictionId") REFERENCES "Affliction"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodIncludeUser" ADD CONSTRAINT "FoodIncludeUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodIncludeUser" ADD CONSTRAINT "FoodIncludeUser_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodToExcludeUser" ADD CONSTRAINT "FoodToExcludeUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodToExcludeUser" ADD CONSTRAINT "FoodToExcludeUser_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuSaved" ADD CONSTRAINT "MenuSaved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndicatorsRegisterUser" ADD CONSTRAINT "IndicatorsRegisterUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepSession" ADD CONSTRAINT "SleepSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepStage" ADD CONSTRAINT "SleepStage_sleepSessionId_fkey" FOREIGN KEY ("sleepSessionId") REFERENCES "SleepSession"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeartRate" ADD CONSTRAINT "HeartRate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeartRateZone" ADD CONSTRAINT "HeartRateZone_heartRateId_fkey" FOREIGN KEY ("heartRateId") REFERENCES "HeartRate"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutrition" ADD CONSTRAINT "Nutrition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON
UPDATE CASCADE;
