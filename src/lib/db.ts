import { PrismaClient } from "@prisma/client";
// Create a global instance of the PrismaClient to interact with the database
// it fix the warn(prisma-client) This is the 10th instance of Prisma Client being started. Make sure this is intentional.
declare global {
  var prisma: PrismaClient | undefined;
}
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
