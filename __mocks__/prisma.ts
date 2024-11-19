import { PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";

// Use jest-mock-extended to create strongly typed mocks
const mockPrisma = mockDeep<PrismaClient>();

export const prisma: DeepMockProxy<PrismaClient> = mockPrisma;
export default prisma;
