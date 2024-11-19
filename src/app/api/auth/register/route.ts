import { NextRequest, NextResponse } from "next/server";
import authService from "@/src/app/services/authService";

// POST method to handle user registration
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json(); // Parse request body

    // Call the registration logic from the auth service
    const user = await authService.register({ name, email, password });

    // Respond with success
    return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
  } catch (err: any) {
    console.error("Error registering user:", err.message);

    // Handle Prisma duplicate email error
    if (err.code === "P2002") {
      return NextResponse.json({ message: "Email is already registered." }, { status: 409 });
    }

    // Handle validation errors
    if (err.message.includes("Invalid") || err.message.includes("required")) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }

    // Respond with general error
    return NextResponse.json({ message: "Failed to register user", error: err.message }, { status: 500 });
  }
}
