-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "executedAt" DROP NOT NULL,
ALTER COLUMN "canceledAt" DROP NOT NULL;
