import bcrypt from "bcryptjs";
import { prisma } from "@/src/app/lib/prisma";

const authService = {
  async register({ name, email, password }: { name: string; email: string; password: string }) {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Login.error.userExists"); // Translation key for "User already exists"
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Login.error.userNotFound"); // Translation key for "User not found"
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Login.error.invalidPassword"); // Translation key for "Invalid password"
    }

    return user;
  },
};

export default authService;
