/*
  Warnings:

  - The values [BLOCK_IDEAS] on the enum `UserPermissions` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserPermissions_new" AS ENUM ('BLOCK_IDEA', 'ALL');
ALTER TABLE "User" ALTER COLUMN "permissions" TYPE "UserPermissions_new"[] USING ("permissions"::text::"UserPermissions_new"[]);
ALTER TYPE "UserPermissions" RENAME TO "UserPermissions_old";
ALTER TYPE "UserPermissions_new" RENAME TO "UserPermissions";
DROP TYPE "UserPermissions_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT;
