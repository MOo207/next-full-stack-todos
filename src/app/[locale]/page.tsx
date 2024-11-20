// src/app/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/src/app/api/auth/[...nextauth]/auth"; // Replace with your auth function

const HomePage = async () => {
  const session = await auth(); // Get the authenticated session

  const defaultLocale = "en"; // Default locale

  if (session?.user) {
    // Redirect authenticated users to todos
    redirect(`/${defaultLocale}/todos`);
  } else {
    // Redirect unauthenticated users to login
    redirect(`/${defaultLocale}/auth/login`);
  }

  return null; // Render nothing as the user is redirected
};

export default HomePage;
