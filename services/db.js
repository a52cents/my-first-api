import {PrismaClient} from '@prisma/client';
//Connect to db using .env config
let client = new PrismaClient();
console.log("[DEBUG] Connected to db");
export const prisma = client;
