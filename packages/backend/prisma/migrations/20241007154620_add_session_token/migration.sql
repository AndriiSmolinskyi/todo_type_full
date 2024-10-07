-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetPasswordCode" TEXT,
ADD COLUMN     "resetPasswordExpires" TIMESTAMP(3),
ADD COLUMN     "sessionToken" TEXT,
ADD COLUMN     "verificationCode" TEXT;
