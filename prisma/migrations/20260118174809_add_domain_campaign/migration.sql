-- AlterTable
ALTER TABLE "Domain" ADD COLUMN     "campaign" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Server" ALTER COLUMN "expiredAt" SET DEFAULT (now() + interval '1 month' - interval '1 day');
