-- CreateEnum
CREATE TYPE "PhysicalActivityLevel" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE');

-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('EMAIL', 'GOOGLE');

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
CREATE TYPE "Goals" AS ENUM ('lose_weight', 'gain_muscle', 'maintain_health', 'increase_energy', 'improve_digestion', 'balanced_diet');

-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('ECTOMORPH', 'SLENDER', 'ATHLETIC', 'THICK_SET', 'STOCKY', 'HEAVYSET', 'OBESE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "gender" "UserGender",
    "dietaryPreference" "DietaryPreference",
    "country" TEXT,
    "state" TEXT,
    "metricUnit" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "goal" "Goals",
    "physicalActivity" "PhysicalActivityLevel",
    "status" "UserStatus" DEFAULT 'ACTIVE',
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "authType" "AuthType" NOT NULL,
    "passwordHash" TEXT,
    "googleId" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Affliction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Affliction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AfflictionUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "afflictionId" TEXT NOT NULL,

    CONSTRAINT "AfflictionUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "FoodCategory",

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthIndicatorUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
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
CREATE TABLE "WorkoutSession" (
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
CREATE TABLE "SleepSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "totalSleepHrs" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SleepSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleepStage" (
    "id" TEXT NOT NULL,
    "sleepSessionId" TEXT NOT NULL,
    "lightSleepMinutes" INTEGER NOT NULL,
    "deepSleepMinutes" INTEGER NOT NULL,
    "remSleepMinutes" INTEGER NOT NULL,

    CONSTRAINT "SleepStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeartRate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "restingHeartRate" INTEGER NOT NULL,
    "averageHeartRate" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeartRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeartRateZone" (
    "id" TEXT NOT NULL,
    "heartRateId" TEXT NOT NULL,
    "fatBurn" INTEGER NOT NULL,
    "cardio" INTEGER NOT NULL,
    "peak" INTEGER NOT NULL,

    CONSTRAINT "HeartRateZone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nutrition" (
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
CREATE UNIQUE INDEX "Session_refreshToken_key" ON "Session"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Affliction_name_key" ON "Affliction"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepSession" ADD CONSTRAINT "SleepSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleepStage" ADD CONSTRAINT "SleepStage_sleepSessionId_fkey" FOREIGN KEY ("sleepSessionId") REFERENCES "SleepSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeartRate" ADD CONSTRAINT "HeartRate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeartRateZone" ADD CONSTRAINT "HeartRateZone_heartRateId_fkey" FOREIGN KEY ("heartRateId") REFERENCES "HeartRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nutrition" ADD CONSTRAINT "Nutrition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
